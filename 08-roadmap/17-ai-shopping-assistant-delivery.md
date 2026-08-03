# AI Shopping Assistant Delivery

**Status:** Approved

## Decision

Deliver I7 only after useful Catalog, Search, Compatibility, Pricing, and Inventory tools are governed and observable. AI remains optional and never blocks deterministic discovery or purchase.

Sequence provider-neutral model adapter; source-owned read tools; explicit context and consent boundaries; citations and provenance; refusal and uncertainty behavior; evaluation corpus; privacy and safety controls; bounded conversation persistence; dedicated Assistant; and carefully scoped contextual entry points.

The first exposure is employee/internal evaluation, then synthetic preview, then a limited customer pilot with no autonomous consequential effects. Any proposed Cart or other effect requires structured preview and human confirmation through the authoritative command.

## Gates

Grounding, citation correctness, stale evidence, prompt injection, data leakage, unsafe advice, optional-path equivalence, latency/cost limits, provider failure degradation, accessibility, and incident controls are blocking. Model and provider changes require versioned reevaluation.

## References

- [AI Architecture](../06-engineering/22-ai-orchestration-grounding-provenance-and-safety.md)
- [AI Testing](../07-testing/28-ai-grounding-provenance-safety-and-optionality-testing.md)
