"use client";

import { useMemo, useState } from "react";
import SupplyChainLab from "./SupplyChainLab";
import WorkflowContext from "./WorkflowContext";

type View = "Today" | "Sourcing" | "Pricing" | "Makers" | "Orders";

const icons: Record<View, string> = { Today: "✦", Sourcing: "⌕", Pricing: "$", Makers: "◎", Orders: "□" };

const suppliers = [
  { name: "Luz Cerámica", place: "Oaxaca, MX", type: "Artisan studio", unit: 18.4, moq: 50, lead: 32, quality: 96, score: 92, status: "Sample approved" },
  { name: "Kintsu Works", place: "Kyoto, JP", type: "Small-batch maker", unit: 24.1, moq: 24, lead: 40, quality: 99, score: 89, status: "Sample in transit" },
  { name: "Shenzhen Forma", place: "Shenzhen, CN", type: "Manufacturer", unit: 9.8, moq: 300, lead: 26, quality: 87, score: 81, status: "RFQ received" },
  { name: "Terra House", place: "Los Angeles, US", type: "Domestic studio", unit: 29.6, moq: 18, lead: 18, quality: 94, score: 84, status: "Awaiting sample" },
];

const tasks = [
  { time: "9:00", title: "Review Luz Cerámica sample", meta: "Stoneware collection · QA table", kind: "Quality", color: "pink" },
  { time: "10:30", title: "B2B onboarding · Solace Hotels", meta: "Confirm packaging & ship window", kind: "Client", color: "yellow" },
  { time: "1:00", title: "Supplier call · Shenzhen Forma", meta: "MOQ negotiation · 10:00 PM CST", kind: "Sourcing", color: "blue" },
  { time: "3:30", title: "Pack creator drop samples", meta: "12 units · Presidio studio", kind: "Fulfillment", color: "green" },
];

function Sparkline() {
  return <div className="spark" aria-label="Margin trend rising from 52 to 61 percent"><i /><i /><i /><i /><i /><i /><i /></div>;
}

function Today() {
  return <>
    <section className="hero">
      <div><p className="eyebrow">OPERATIONS OVERVIEW</p><h1>Supply-chain decisions,<br/><i>made explainable.</i></h1><p className="lede">The maker network is moving. Here is what needs attention today.</p></div>
      <button className="primary">＋ New workstream</button>
    </section>
    <div className="stats">
      <article className="stat coral"><p>OPEN RFQs</p><b>12</b><span>3 need a reply today ↗</span></article>
      <article className="stat butter"><p>AVG. MARGIN</p><div className="statrow"><b>61%</b><Sparkline /></div><span>+4.8% this month ↗</span></article>
      <article className="stat mint"><p>MAKERS ONBOARDING</p><b>8</b><span>5 countries · 3 categories</span></article>
      <article className="stat lilac"><p>ORDERS AT RISK</p><b>2</b><span>Both have owners →</span></article>
    </div>
    <div className="today-grid">
      <section className="panel agenda"><div className="panelhead"><div><p className="eyebrow">YOUR DAY</p><h2>Today’s run of show</h2></div><span className="count">4 priorities</span></div>
        {tasks.map(t => <div className="task" key={t.time}><time>{t.time}</time><span className={`dot ${t.color}`} /><div><b>{t.title}</b><p>{t.meta}</p></div><em>{t.kind}</em><button aria-label={`Open ${t.title}`}>↗</button></div>)}
      </section>
      <aside className="panel pulse"><div className="panelhead"><div><p className="eyebrow">OPS PULSE</p><h2>What changed</h2></div><button className="dots">•••</button></div>
        <div className="pulseitem"><span className="avatar a1">LC</span><p><b>Luz Cerámica</b> uploaded final glaze photos.<small>12 minutes ago</small></p></div>
        <div className="pulseitem"><span className="avatar a2">SF</span><p><b>Shenzhen Forma</b> quoted 14% below target.<small>48 minutes ago</small></p></div>
        <div className="pulseitem"><span className="avatar a3">SH</span><p><b>Solace Hotels</b> approved the pilot.<small>1 hour ago</small></p></div>
        <button className="textbutton">View activity log →</button>
      </aside>
    </div>
    <section className="panel watch"><div className="panelhead"><div><p className="eyebrow">EXCEPTION QUEUE</p><h2>Two things worth catching early</h2></div><span className="live"><i /> LIVE</span></div>
      <div className="exception"><span className="alert">!</span><div><b>Stoneware vessels may miss B2B photography</b><p>Sample is held in customs · DHL #884102</p></div><span className="risk">4 days at risk</span><button>Resolve →</button></div>
      <div className="exception"><span className="alert peach">↘</span><div><b>Creator drop margin fell below 55%</b><p>Expedited packaging added $3.20 / unit</p></div><span className="risk">Now 52.8%</span><button>Model options →</button></div>
    </section>
    <SupplyChainLab />
  </>;
}

function Sourcing() {
  const [selected, setSelected] = useState(0);
  return <><section className="hero compact"><div><p className="eyebrow">GLOBAL SOURCING</p><h1>Find the right hands,<br/><i>not only the lowest price.</i></h1><p className="lede">Normalize quotes, compare tradeoffs, and move promising makers toward a sample.</p></div><button className="primary">＋ Start an RFQ</button></section>
    <div className="source-layout"><section className="panel supplier-list"><div className="table-tools"><label>⌕ <input placeholder="Search makers, materials, places…" /></label><button>All categories⌄</button><button>Compare 2</button></div>
      <div className="table-head"><span>MAKER</span><span>UNIT / MOQ</span><span>LEAD TIME</span><span>FIT SCORE</span></div>
      {suppliers.map((s,i)=><button key={s.name} className={`supplier ${selected===i?"selected":""}`} onClick={()=>setSelected(i)}><span><i className={`avatar a${i+1}`}>{s.name.split(" ").map(x=>x[0]).join("")}</i><span><b>{s.name}</b><small>{s.place} · {s.type}</small></span></span><span><b>${s.unit.toFixed(2)}</b><small>{s.moq} units</small></span><span><b>{s.lead} days</b><small>production</small></span><span><strong>{s.score}</strong><small>{s.status}</small></span></button>)}
      </section><aside className="panel maker-card"><p className="eyebrow">MAKER BRIEF</p><div className="maker-title"><span className="big-avatar">{suppliers[selected].name.slice(0,1)}</span><div><h2>{suppliers[selected].name}</h2><p>{suppliers[selected].place}</p></div></div><div className="score-ring"><b>{suppliers[selected].score}</b><span>Overall fit</span></div><div className="bars"><label>Quality <i style={{width:`${suppliers[selected].quality}%`}} /></label><label>Unit economics <i style={{width:`${Math.min(100,120-suppliers[selected].unit*2)}%`}} /></label><label>Flexibility <i style={{width:`${Math.max(40,110-suppliers[selected].moq/4)}%`}} /></label><label>Communication <i style={{width:"91%"}} /></label></div><div className="maker-note"><b>Operator assessment</b><p>Strong craft fit and responsive communication. Worth paying a premium for a low-risk first run.</p></div><button className="primary full">Draft sample request →</button><small className="safe">Draft only · nothing sends automatically</small></aside></div>
  </>;
}

function Pricing() {
  const [qty,setQty]=useState(120); const [retail,setRetail]=useState(68); const [freight,setFreight]=useState(4.8); const unit=18.4; const fees=retail*.031; const defect=unit*.035; const landed=unit+freight+2.1+defect; const margin=(retail-landed-fees)/retail*100; const profit=(retail-landed-fees)*qty;
  return <><section className="hero compact"><div><p className="eyebrow">UNIT ECONOMICS</p><h1>Price for wonder.<br/><i>Protect the margin.</i></h1><p className="lede">See every assumption, stress-test the plan, and explain the decision clearly.</p></div><span className="scenario">Stoneware vessel · v3</span></section>
    <div className="pricing-grid"><section className="panel controls"><p className="eyebrow">SCENARIO INPUTS</p><h2>First production run</h2><label>Order quantity <output>{qty} units</output><input type="range" min="24" max="500" value={qty} onChange={e=>setQty(+e.target.value)} /></label><label>Retail price <output>${retail}</output><input type="range" min="40" max="120" value={retail} onChange={e=>setRetail(+e.target.value)} /></label><label>Freight per unit <output>${freight.toFixed(2)}</output><input type="range" min="1" max="12" step=".1" value={freight} onChange={e=>setFreight(+e.target.value)} /></label><div className="assumptions"><span>Unit quote <b>${unit.toFixed(2)}</b></span><span>Packaging <b>$2.10</b></span><span>Defect reserve <b>3.5%</b></span><span>Payment fee <b>3.1%</b></span></div></section>
    <section className="panel result"><p className="eyebrow">LIVE MODEL</p><div className="margin-number"><span>Contribution margin</span><b>{margin.toFixed(1)}%</b><em className={margin>=55?"good":"warn"}>{margin>=55?"Healthy":"Needs work"}</em></div><div className="costbar"><i style={{width:`${100-margin}%`}}/><span style={{width:`${margin}%`}}/></div><div className="legend"><span><i/>Costs ${(retail-(retail-landed-fees)).toFixed(2)}</span><span><i/>Contribution ${(retail-landed-fees).toFixed(2)}</span></div><div className="model-stats"><div><span>LANDED COST</span><b>${landed.toFixed(2)}</b></div><div><span>RUN PROFIT</span><b>${profit.toLocaleString(undefined,{maximumFractionDigits:0})}</b></div><div><span>BREAK-EVEN</span><b>{Math.ceil(780/(retail-landed-fees))} units</b></div></div><div className="insight"><span>✦</span><p><b>A useful move</b><br/>At {Math.max(50,qty-30)} units, you can preserve optionality and still hold a {Math.max(0,margin-2.4).toFixed(1)}% margin.</p></div></section></div>
  </>;
}

function Makers() { const steps=["Profile & capability","Compliance docs","Commercial terms","Sample review","Production ready"]; return <><section className="hero compact"><div><p className="eyebrow">MAKER NETWORK</p><h1>Make onboarding feel<br/><i>human and exact.</i></h1><p className="lede">One shared path from first hello to production-ready.</p></div><button className="primary">＋ Invite a maker</button></section><section className="panel onboarding"><div className="panelhead"><div><p className="eyebrow">IN PROGRESS</p><h2>Eight makers across five countries</h2></div><div className="avatars"><i>LC</i><i>KW</i><i>TF</i><i>+5</i></div></div><div className="step-head">{steps.map((s,i)=><span key={s}><b>{i+1}</b>{s}</span>)}</div>{[suppliers[1],suppliers[3],suppliers[2]].map((s,j)=><div className="onboard-row" key={s.name}><div><span className={`avatar a${j+2}`}>{s.name.slice(0,2)}</span><p><b>{s.name}</b><small>{s.place}</small></p></div>{steps.map((x,i)=><span key={x} className={i<3-j?"done":i===3-j?"current":""}>{i<3-j?"✓":i===3-j?"●":"·"}</span>)}<button>Open →</button></div>)}</section><div className="mini-grid"><article className="panel"><p className="eyebrow">B2B LAUNCH READINESS</p><h2>Solace Hotels pilot</h2><div className="check"><span>✓</span><p><b>Client specs confirmed</b><small>120 engraved vessels</small></p></div><div className="check"><span>✓</span><p><b>Maker capacity held</b><small>Production slot through Aug 28</small></p></div><div className="check waiting"><span>3</span><p><b>Packaging dieline</b><small>Waiting on client legal mark</small></p></div></article><article className="panel content-card"><p className="eyebrow">CHANNEL READINESS</p><h2>Launch content</h2><div className="content-preview"><span>STONE / STORY</span><b>Made by hands.<br/>Shaped by yours.</b></div><div className="progress"><span><i style={{width:"75%"}}/></span><p><b>6 of 8 assets approved</b><small>PDP copy and maker story remain</small></p></div></article></div></> }

function Orders() { const [resolved,setResolved]=useState(false); return <><section className="hero compact"><div><p className="eyebrow">FULFILLMENT & QUALITY</p><h1>Every object should arrive<br/><i>worthy of the idea.</i></h1><p className="lede">Pack, inspect, and recover with care—especially when things get messy.</p></div><button className="primary">Scan an order</button></section><div className="orders-grid"><section className="panel"><div className="panelhead"><div><p className="eyebrow">TODAY’S SHIP BENCH</p><h2>18 orders · 42 objects</h2></div><span className="count">67% packed</span></div><div className="packing"><span><i style={{width:"67%"}}/></span></div>{[["AR-1048","Solace Hotels","12 / 12","Ready"],["AR-1049","Avery Chen","2 / 3","Inspect"],["AR-1050","Mina Studio","8 / 8","Label"],["AR-1051","Noor Patel","0 / 1","Queue"]].map(x=><div className="order" key={x[0]}><b>{x[0]}</b><span>{x[1]}</span><span>{x[2]}</span><em>{x[3]}</em><button>→</button></div>)}</section><aside className="panel qa"><p className="eyebrow">QUALITY CHECK</p><h2>AR-1049 · Espresso set</h2><div className="product-shape"><i/><i/><span>2 of 3 passed</span></div><div className={`defect ${resolved?"resolved":""}`}><span>{resolved?"✓":"!"}</span><p><b>{resolved?"Replacement queued":"Hairline glaze crack"}</b><small>{resolved?"Customer ship date protected":"Cup 03 · rim interior"}</small></p></div><label className="notes">Inspection note<textarea defaultValue="Visible under direct light. Safe to handle, not within the Supply-chain system quality bar." /></label><button className="primary full" onClick={()=>setResolved(true)}>{resolved?"Resolved — nice catch":"Create replacement →"}</button></aside></div></> }

export default function Home() {
  const [view,setView]=useState<View>("Today");
  const content=useMemo(()=>({Today:<Today/>,Sourcing:<Sourcing/>,Pricing:<Pricing/>,Makers:<Makers/>,Orders:<Orders/>})[view],[view]);
  return <div className="app-shell"><aside className="sidebar"><div className="brand"><span className="sunmark">✺</span><div><b>supply lab</b><small>operations case study</small></div></div><nav>{(Object.keys(icons) as View[]).map(v=><button key={v} className={view===v?"active":""} onClick={()=>setView(v)}><span>{icons[v]}</span>{v}{v==="Orders"&&<em>2</em>}</button>)}</nav><div className="sidebar-note"><span>✦</span><p><b>Active case study</b><br/>fictionalized operating data.</p></div><div className="user"><span>OP</span><div><b>Demo operator</b><small>Public case study</small></div><button>⌄</button></div></aside><main><header className="topbar"><div className="crumb"><span>Decision system</span><b>/</b><strong>{view}</strong></div><div className="top-actions"><button aria-label="Search">⌕</button><button aria-label="Notifications">♢<i/></button><span className="demo">WORK IN PROGRESS</span></div></header><div className="content"><WorkflowContext view={view}/>{content}<footer><span>Supply Chain Operations Case Study</span><p>Priorities, decisions, and execution in one place.</p></footer></div></main></div>;
}
