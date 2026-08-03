# Support Center and Support Case Delivery

**Status:** Approved

## Decision

Deliver I5 in two connected slices: governed self-service first, then typed Case continuity.

Self-service includes Support home, searchable versioned articles, product/order-aware continuations, applicability metadata, accessibility, and content operations. Case delivery adds authenticated or appropriately verified initiation, one typed Case envelope, append-only communication, governed Evidence, explicit Obligations, source Remedy Requests, provider work packages, and status/reconciliation.

Support staff operate through Admin capability slices backed by Support authority. They do not mutate Orders, payments, fulfillment, or other source truth directly.

## Exposure

Article content can ship with I1 when governed and applicable. Order-help entry joins I4. Case types are enabled individually only when ownership, policy, operations, provider paths, templates, and evidence are ready.

## Gates

Non-disclosure, authorization, evidence privacy, attachment safety, obligation clocks, duplicate messages, provider ambiguity, remedies, accessibility, and operational staffing are blocking.

## References

- [Support Architecture](../06-engineering/20-support-cases-communication-evidence-and-external-work.md)
- [Support Testing](../07-testing/26-support-case-and-external-work-testing.md)
