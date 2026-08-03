# ADR-0014: Single-Authority State and Explicit Client Projections

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora must coordinate canonical URL state, server composition, sessions, durable commerce objects, caches, client interaction, forms, drafts, persistent workspaces, optimistic projections, background operations, offline snapshots, and external providers.

Viable approaches included:

1. One broad client state and data-fetching layer
2. Browser-first persistence with later server synchronization
3. State-class ownership with source authority and bounded projections

Broad client state simplifies access but obscures authority, lifecycle, privacy, invalidation, and server rendering. Browser-first persistence weakens cross-device, concurrency, security, and consequential-operation behavior.

## Decision

Use a single-authority, explicit-projection state model.

URL, request, session, source, projection, cache, client query, interaction, form, draft, workspace, optimistic, operation, offline, and provider state each have a declared owner and lifecycle.

Use local React state for scoped interaction and typed URL contracts for safe shareable state. Use source-owned durable records for cross-route, cross-device, collaborative, or consequential state.

Use TanStack Query selectively for client-interactive server projections requiring refresh, polling, pagination, or mutation coordination. It is not an application-wide source of truth and is not required for server-composed pages.

Browser persistence is denied by default for private and consequential records. There is no generic offline mutation queue.

Optimistic completion is prohibited for high-consequence payment, order, inventory, compatibility-rule, pricing, permission, approval, Support-obligation, privacy, and Admin execution outcomes.

Consequential operations use durable operation identity and distinguish pending, failure, partial effect, indeterminate outcome, correction, and completion.

Restoration resolves current identity and authoritative operations before source state, local drafts, URL state, preferences, and defaults. Local state cannot silently overwrite a newer source version.

## Consequences

### Benefits

- Authority and derived copies remain distinguishable.
- Client state is bounded and easier to secure.
- Indeterminate operations can be resolved safely after timeout.
- Draft and conflict behavior is explicit.
- Offline behavior cannot replay stale consequential intent generically.

### Costs and risks

- Every feature must classify its state.
- Draft migration and cleanup require maintenance.
- Selective client-query use needs enforcement to prevent duplicate fetching.
- Conflict and restoration require domain-specific interfaces.

## Governance

- Persisted state requires owner, schema, version, expiry, privacy, restoration, and deletion.
- Optimistic operations require risk and indeterminate-outcome review.
- Client projections cannot mutate source state except through owned commands.
- Permission and identity changes invalidate affected caches and storage.
- A material change to state classes, query posture, restoration precedence, or offline mutation policy requires a superseding ADR.

## References

- [State Ownership and Restoration](../06-engineering/08-state-ownership-and-restoration.md)
- [TanStack Query server rendering and hydration](https://tanstack.com/query/latest/docs/framework/react/guides/ssr)
- [Rendering and Navigation Strategy](../06-engineering/07-rendering-and-navigation-strategy.md)
- [Error, Empty, Loading, Offline, and Degraded States](../03-product-structure/08-error-empty-and-degraded-states.md)
- [ADR-0013: Explicit Mixed Rendering and Canonical Navigation](ADR-0013-mixed-rendering-and-navigation.md)
