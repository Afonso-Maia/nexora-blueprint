# Error, Degraded-Mode, and Resilience Testing

**Status:** Approved

## Decision

Resilience validation starts from operation dependency profiles and host-owned state contracts. Faults are injected at narrow seams first, then in bounded deployed chaos and recovery drills.

Each required/optional dependency covers validation, denial, conflict, timeout, rate limit, partial response, stale data, capacity, network partition, instance/zone loss, and recovery. Assertions prove confirmed truth remains visible, missing data is not zero/empty/success, unsafe actions block, drafts/operation identity persist, focus and announcements remain correct, and recovery revalidates affected actions.

The program includes database failover/PITR restore, cache loss, queue duplication/backlog/poison, worker crash, provider timeout/late success, Search loss, AI loss, object-storage delay, clock skew, invalidation loss, and approved secondary-region rebuild.

Load-shedding tests prove protection order for Checkout, Orders, authentication, Support obligations, and recovery before optional work. Production experiments require owner, hypothesis, blast radius, abort condition, approval, telemetry, and cleanup.

A restore succeeds only after data integrity, idempotency continuity, provider reconciliation, and source outcome checks.

## References

- [System States](../03-product-structure/08-error-empty-and-degraded-states.md)
- [Resilience Architecture](../06-engineering/26-error-degraded-mode-and-resilience-architecture.md)
