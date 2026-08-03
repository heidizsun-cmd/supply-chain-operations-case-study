import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/"), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the public supply-chain case study", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Supply Chain Operations Case Study<\/title>/i);
  assert.match(html, /Supply-chain decisions/i);
  assert.match(html, /WORK IN PROGRESS/i);
  assert.match(html, /fictionalized operating data/i);
  assert.match(html, /Supply-chain decision lab/i);
  assert.doesNotMatch(html, /TravelOps|PRIVATE · HEIDI ONLY|Heidi Sun/i);
});

test("excludes private travel and document-storage modules", async () => {
  const root = new URL("../", import.meta.url);
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const layout = await readFile(new URL("app/layout.tsx", root), "utf8");
  const packageJson = await readFile(new URL("package.json", root), "utf8");
  assert.match(packageJson, /"name": "supply-chain-operations-case-study"/);
  assert.match(layout, /title: "Supply Chain Operations Case Study"/);
  assert.doesNotMatch(page + layout, /TravelOps|Heidi|private workspace/i);
  await assert.rejects(access(new URL("app/travelops", root)));
  await assert.rejects(access(new URL("app/api/travel-documents", root)));
});
