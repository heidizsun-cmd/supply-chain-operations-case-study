# Supply Chain Operations Case Study

> **Project status:** Active work in progress. Interfaces, documentation, and implementation details may change.

An evidence-based decision system for sourcing, supplier development, pricing, quality, capacity, and fulfillment in a fictional small maker network.

## Case study: evidence-based operations for a small maker network

### Problem

Small product businesses often operate from fragmented quotes, forecasts, supplier conversations, and operating records. A weighted score can hide a disqualifying risk, an average forecast can hide uncertainty, and adding suppliers may not create value as expected. This system turns those failure modes into visible operating guardrails.

### Decision model

Store guardrails and analytics define the commercial need, the company's costs define quantity and timing. The vendor profiles define manufacturability, cost, capacity, quality, and recovery; and a live scenario produces an explainable go/hold decision. This model favors explicit constraints and traceable evidence instead of a single opaque score. The thought process behind this is so that eventually the data can be sourced for an internal finance team for ease of differential analysis and managerial decisions. 

### Connected Decision Lab

The lab is organized around four linked records instead of isolated calculators:

1. **Store profile and analytics:** positioning, margin and quality floors, fulfillment mode, conversion, returns, demand trend, and profile gaps.
2. **Company or channel commitment:** customer, order size, due date, expected margin, and unresolved account risk.
3. **Vendor profile:** capabilities, geography, capacity, lead time, MOQ, quote, quality history, and distinct response modes.
4. **Scenario and decision brief:** demand range, MOQ-adjusted order plan, window capacity, landed cost, contribution margin, decision fit, blockers, and next action.

'Vendor fit' factor will not average away a failed guardrail. Capacity, margin, and quality thresholds are explicit blockers. Scenario results must retain the selected store, company, and vendor context so the recommendation is auditable.

### Research translated into product behavior

| Research finding | Supply-chain system implementation | Decision produced |
|---|---|---|
| Replenishment orders can amplify sales through demand processing, batching, promotions, and shortage behavior [1, 2]. | Compare order and sales variability; flag a bullwhip ratio above 1.20× for investigation. | Pause automatic scaling and inspect distortion before increasing supply. |
| People can be overprecise when ordering under uncertainty [8]. | Present forecast error, a planning range, safety stock, and a service target rather than one certain number. | Reorder point with an explicit uncertainty buffer. |
| WIP, throughput, and cycle time are linked by Little's Law. | Cap WIP at measured throughput × target cycle time. | A release limit that protects cycle time. |
| The lowest capacity among complementary stages constrains finished output [7]. | Model craft, glaze, and packing separately; identify the minimum as effective capacity. | Invest at the actual bottleneck. |
| Risk awareness needs reconfigurable resources and response infrastructure to create resilience [4]. | Frame risks around an owner, trigger, deployable response, resource, and recovery target. | A concrete recovery action rather than a passive label. |
| Different response modes can matter more than supplier count [6]. | Count meaningful differences in geography, route, process, material, reserved capacity, or recovery method. | Add an independent response or run a drill. |
| Disruption impacts can persist after the immediate event [5]. | Track initial loss, stabilization, recovery time, cumulative loss, and return to baseline. | A comparable recovery record. |
| Evaluation and certification precede effective supplier knowledge transfer [3]. | Evaluate and certify → agree on gap → transfer knowledge → verify change. | Samples and pilots precede controlled scale. |
| Integrated forecasting, inventory, and pricing produced gains in specific field settings [9, 10]. | Connect demand range, buffer, landed margin, capacity, and staged commitment. | A decision brief exposing tradeoffs. |
| Effective quality programs are associated with improved operating performance [11]. | Specification → inspection → defect classification → root cause → corrective action → verification. | Defects become measured improvement work. |

### Current case recommendation

For example-store, the model recommends a 50-unit pilot rather than immediate scale. Advancement requires a stable sample-quality baseline, sufficient constraint capacity, and landed contribution margin of at least 55% in the downside scenario. This is a decision support, not a guaranteed outcome.

### Measurement plan

Recalibrates from observed results. Tracks forecast error, order-to-sales variability, constraint utilization, WIP, cycle time, first-pass yield, defects by cause, on-time delivery, disruption loss, recovery time, landed margin, and supplier-development milestone completion.

## References

1. Lee, Padmanabhan & Whang (1997), “Information Distortion in a Supply Chain.” *Management Science*. https://doi.org/10.1287/mnsc.43.4.546
2. Chen, Luo & Shang (2017), “Measuring the Bullwhip Effect.” *Manufacturing & Service Operations Management*. https://doi.org/10.1287/msom.2016.0590
3. Modi & Mabert (2007), “Supplier Development.” *Journal of Operations Management*. https://doi.org/10.1016/j.jom.2006.02.001
4. Ambulkar, Blackhurst & Grawe (2015), “Firm's Resilience to Supply Chain Disruptions.” *Journal of Operations Management*. https://doi.org/10.1016/j.jom.2014.11.002
5. Baghersad & Zobel (2021), “Assessing the Extended Impacts of Supply Chain Disruptions.” *International Journal of Production Economics*. https://doi.org/10.1016/j.ijpe.2020.107862
6. “Supplying Resilience Through Assessing Diversity of Responses to Disruption” (2020). *International Journal of Operations & Production Management*. https://doi.org/10.1108/IJOPM-01-2019-0006
7. Li et al. (2023), “Supplier Bottleneck and Information Dissemination.” *Journal of Operations Management*. https://doi.org/10.1002/joom.1239
8. Ren & Croson (2013), “Overconfidence in Newsvendor Orders.” *Management Science*. https://doi.org/10.1287/mnsc.2013.1715
9. Ferreira, Lee & Simchi-Levi (2016), “Analytics for an Online Retailer.” *Manufacturing & Service Operations Management*. https://doi.org/10.1287/msom.2015.0561
10. Deng et al. (2023), “Alibaba Realizes Millions in Cost Savings Through Integrated Demand Forecasting, Inventory Management, Price Optimization, and Product Recommendations.” *INFORMS Journal on Applied Analytics*. https://doi.org/10.1287/inte.2022.1145
11. Hendricks & Singhal (1997), “Does Implementing an Effective TQM Program Actually Improve Operating Performance?” *Management Science*. https://doi.org/10.1287/mnsc.43.9.1258

## Privacy and limitations

Research informs diagnostics and workflow design; it does not prove that a recommendation will succeed in every context. The case uses fictionalized operating data. Thresholds must be recalibrated against observed results before real-world use.
