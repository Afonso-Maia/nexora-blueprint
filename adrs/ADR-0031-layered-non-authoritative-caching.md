# ADR-0031: Layered Non-Authoritative Caching

- **Status:** Accepted
- **Date:** 2026-08-03

## Decision

Use browser, CDN, framework, and managed Redis-compatible cache layers only through registered source-owned freshness contracts.

Public and private cache boundaries remain separate. Consequential state revalidates with its authority. Distributed cache loss cannot lose business truth.

Do not implement a general offline mutation queue. Offline behavior is limited to safe cached reads and bounded drafts reconciled against current source state.

## Consequences

Performance and read continuity improve, but cache inventory, invalidation, subject isolation, and stale-state presentation become required engineering work.

## References

- [Caching, Offline Behavior, and State Restoration](../06-engineering/25-caching-offline-and-state-restoration.md)
- [ADR-0014: State Ownership](ADR-0014-state-ownership.md)

