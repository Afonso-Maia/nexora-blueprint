# Delivery Increments and Vertical Slices

**Status:** Approved

## Decision

Use ten outcome-oriented increments. Codes express dependency order, not fixed dates or a promise that only one increment may be active.

| Increment | Integrated outcome | Principal dependencies |
| --- | --- | --- |
| I0 — Delivery Enablement | Paved repository-to-preview path with identity, policy, Audit, Design System, data, telemetry, and quality seams | Approved Blueprint |
| I1 — Governed Discovery | Users can find and understand governed catalog products through accessible pt-BR discovery | I0, Catalog, content/media, Search |
| I2 — Confident Evaluation | Users can evaluate, compare, and understand deterministic Compatibility and commercial availability | I1, Compatibility, Pricing, Inventory |
| I3 — Safe Purchase | Users can maintain a Cart and complete unified Checkout to an authoritative Order outcome | I2, identity option, payment sandbox, orchestration |
| I4 — Post-Purchase Continuity | Guests and customers can access Orders, fulfillment, Account continuity, and notifications | I3, identity assurance, provider delivery |
| I5 — Support Continuity | Users and agents can resolve issues through governed content and typed Support Cases | I4, support operations, evidence storage |
| I6 — PC Builder | Users can create, restore, validate, share, and convert durable PC Builds | I2, Compatibility, Cart |
| I7 — AI Guidance | Users can optionally receive grounded, cited guidance with deterministic alternatives | I1/I2 source tools, evaluation gates |
| I8 — Governed Workforce Operations | Authorized staff can operate source capabilities through Admin queues and workspaces | Source capability readiness, workforce identity, Audit |
| I9 — Launch Readiness and GA | Approved capabilities progress through pilot/beta to GA with operational evidence | Prior selected increments and readiness gates |

I8 is delivered capability-by-capability alongside its source increment; the code denotes the integrated Admin maturity outcome, not a late Admin-only project. I6 and I7 may proceed after their named dependencies without delaying I3–I5.

Every increment satisfies the vertical-increment contract in Decision 1. Partial demonstrations are labelled spikes or previews and do not count as completion.

## Sequencing rule

The critical commercial spine is I0 → I1 → I2 → I3 → I4 → I5 → I9. I6, I7, and Admin capability slices join when their authoritative prerequisites and specialist evidence are ready.

## References

- [Framing and Delivery-Planning Model](01-framing-and-delivery-planning-model.md)
- [Dependency and Critical Path](25-dependency-graph-and-critical-path.md)
