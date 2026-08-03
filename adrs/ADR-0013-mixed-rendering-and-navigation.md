# ADR-0013: Explicit Mixed Rendering and Canonical Navigation

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora combines stable public content, changing commerce facts, query-derived discovery, private Account continuity, persistent workspaces, transactions, authentication, and high-assurance Admin operations.

Three broad rendering strategies were viable:

1. Static-first rendering for public surfaces
2. Dynamic server rendering for every route
3. Explicit mixed rendering by page purpose, source freshness, personalization, and consequence

Neither universal static nor universal dynamic rendering satisfies Nexora's combination of performance, source truth, resilience, privacy, and operational simplicity.

## Decision

Use explicit mixed rendering:

- Build-stable and governed published content may be prerendered.
- Public source facts may be cached under owner-led freshness and invalidation contracts.
- Query-derived results use dynamic server rendering.
- Private continuity, transactions, workspaces, authentication, and Admin use dynamic server rendering and cannot enter shared caches.
- Streaming exposes independently useful regions but cannot bypass access, assurance, compatibility, price, availability, consent, or execution prerequisites.
- Client rendering is reserved for approved interaction and restoration.

Enable Next.js Cache Components only through declared cache profiles. Source events drive invalidation; time expiry is a safety bound. Cache entries remain derived state.

Canonical, shareable, non-sensitive discovery state belongs in the URL. Durable private and operational state belongs to its source domain.

Use semantic links, governed prefetching, accessible focus and scroll restoration, server metadata, explicit indexing defaults, and a route registry for redirects and successors.

## Consequences

### Benefits

- Stable public pages remain fast without treating cached commerce facts as commitment truth.
- Private and consequential data remain dynamically authorized.
- Streaming improves progress while retaining honest prerequisites.
- URL state supports search, sharing, history, and restoration.
- Source-driven invalidation responds to corrections and lifecycle changes.

### Costs and risks

- Routes and regions require explicit classification.
- Cache invalidation and reconciliation need operational investment.
- Streaming, focus, and browser-history behavior require accessibility testing.
- Framework upgrades may change cache mechanics and need contract regression.

## Governance

- Every route declares rendering class, cache, metadata, indexing, and recovery behavior.
- Shared caching of private or consequential state is prohibited.
- Cached data has an owner, bounded freshness, invalidation, reconciliation, and purge path.
- Arbitrary Search, filter, private, transactional, authentication, Admin, and recovery routes are noindex by default.
- A material change to rendering classes, URL ownership, cache posture, or indexing defaults requires a superseding ADR.

## References

- [Rendering and Navigation Strategy](../06-engineering/07-rendering-and-navigation-strategy.md)
- [Next.js Linking and Navigating](https://nextjs.org/docs/app/getting-started/linking-and-navigating)
- [Next.js Cache Components](https://nextjs.org/docs/app/getting-started/partial-prerendering)
- [Page Inventory](../03-product-structure/01-page-inventory.md)
- [Error, Empty, Loading, Offline, and Degraded States](../03-product-structure/08-error-empty-and-degraded-states.md)
- [ADR-0011: TypeScript, React, and Next.js Frontend Foundation](ADR-0011-nextjs-frontend-foundation.md)
