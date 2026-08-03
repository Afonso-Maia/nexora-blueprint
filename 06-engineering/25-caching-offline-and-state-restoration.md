# Caching, Offline Behavior, and State Restoration

**Status:** Approved

## Decision

Use a layered cache architecture:

1. Browser HTTP and in-memory interaction cache
2. CDN and edge cache for public safe representations
3. Next.js route and data caches under explicit source policy
4. Managed distributed key-value cache for bounded server projections, coordination hints, and rate limits
5. Source-owned database and Search projections

Every cache declares owner, key, audience, source revision, freshness, expiry, invalidation, stale behavior, and rebuild path.

Nexora does not provide a general offline commerce mode or offline mutation queue. Offline capability is limited to safe viewing and bounded local drafts; authoritative mutations resume after current source reconciliation.

## Cache classes

### Public immutable

Versioned assets, published Legal versions, Design System artifacts, and content-addressed media can use long caching and immutable URLs.

### Public revalidatable

Catalog and published content can use CDN caching with source revision, surrogate tags, conditional requests, and safety expiry.

Price, inventory, promotion, eligibility, and Compatibility use their stricter source contracts and are not made durable merely because they appear on a public page.

### Private subject-bound

Account, Cart, Build, Support, and Admin projections can use short BFF or browser memory caches bound to subject, session, permission, locale, field set, and source revision.

They use `private` or `no-store` browser semantics as required and never enter shared CDN cache.

### Consequential

Checkout, payment, authorization, approval, operation outcome, current reservation, and Place Order state use direct authoritative reads or explicitly version-bound private projections. Shared caching is prohibited.

## Distributed cache

Use a managed Redis-compatible key-value capability initially.

Eligible uses:

- Public projection acceleration
- Short private BFF projection cache
- Idempotent coalescing and stampede protection
- Rate-limit counters
- Revocation and invalidation hints
- Ephemeral realtime presence or connection routing

It is not authoritative for Cart, session, permission assignment, inventory, reservation, payment, Order, Case, Workflow, audit, or durable lock state unless an owning decision explicitly says otherwise.

Loss of the distributed cache must reduce performance, not corrupt business truth.

## Keys

Keys include all semantic dimensions:

- Contract and schema version
- Resource and source revision
- Locale, theme-independent content variant, and market
- Query, filter, sort, and ranking profile
- Subject, session, delegation, permission, and field set for private entries
- Experiment when it changes representation

Secrets and raw personal values are not embedded in keys. Use stable hashes where necessary.

## Invalidation

Use:

- Versioned immutable keys where practical
- Source outbox invalidation events
- Surrogate tags for public groups
- Direct eviction for security and access changes
- Bounded time expiry as missed-event safety
- Reconciliation after outage or deploy

Invalidation is idempotent. Unknown cache generation is a miss.

Critical revocation, publication withdrawal, legal restriction, price safety, and resource deletion use direct source checks or maximum propagation boundaries; they do not rely only on eventual eviction.

## Freshness

Each response exposes internal freshness metadata and customer-visible stale state when decision relevant.

Supported behavior:

- Fresh
- Stale-while-revalidate where source policy allows
- Stale-if-error for explicitly eligible read-only data
- Miss
- Unavailable

Stale is not current. A stale representation cannot authorize a mutation.

## Stampede and hot keys

- Request coalescing has bounded leases.
- Jitter expiry.
- Prewarm only measured hot public data.
- Limit cache object size.
- Partition subject-heavy keys.
- Fall back to bounded source load, not uncontrolled fan-out.
- Apply negative caching only to safe non-disclosing outcomes.

An unavailable protected resource is not cached across subjects.

## HTTP caching

Use ETags and conditional requests for versioned representations.

- Strong ETags for concurrency and exact representation.
- Cache-Control appropriate to audience.
- `Vary` only on bounded dimensions.
- No cookies in public cache keys.
- Protected responses use `private`, `no-store`, or equivalent.
- Downloads and signed object URLs use narrow expiry.

## Browser persistence

Allowed:

- Safe UI preferences
- Bounded guest or form recovery draft
- Last authorized read projection where offline viewing is approved
- Non-sensitive query and navigation state

Prohibited:

- Access or refresh tokens
- Payment credentials
- Server session secrets
- Permission grants
- Checkout commitment
- Inventory Reservation
- Authoritative Cart or Build as sole copy
- Unrestricted Case Evidence
- Admin data or export

Local records include owner/session binding, schema, base revision, created time, expiry, and sensitivity.

## Offline behavior

When disconnected:

- Public cached pages can remain viewable with offline state.
- Last authorized Account, Build, Case, or Order summary can remain only where policy permits and with freshness.
- Search may show recent safe results but cannot imply live stock or price.
- Form, Case-start, and Build interaction drafts can persist locally within policy.
- Cart, Checkout, payment, order, message, evidence completion, Admin, approval, export, and source mutations do not execute.

The service worker, if used, follows an allowlist. It does not broadly cache authenticated routes.

## Restoration

On reconnect:

1. Reestablish identity and session.
2. Refetch current source revision and permissions.
3. Validate local draft schema, owner, and expiry.
4. Compare base and current revisions.
5. Offer reapply, merge, duplicate, reload, or discard according to domain policy.
6. Submit through the ordinary idempotent command.

Restoration never silently overwrites current source state.

## Cache security

- Encrypt managed cache in transit and at rest.
- Private network access and workload identities.
- Separate environments and customer/Admin namespaces.
- Disable dangerous broad administrative access.
- Avoid secrets and raw regulated data.
- Bound TTL and memory.
- Redact key and value diagnostics.
- Treat serialization as untrusted input at read.

## Degraded behavior

- Distributed-cache outage bypasses safely to source under load protection.
- CDN outage uses origin without changing source semantics.
- Invalidation outage shortens TTL and invokes reconciliation.
- Browser storage denial reduces restoration, not functionality.
- Corrupt cache entries are discarded.
- Source outage uses stale data only under the registered contract.

## Quality gates

- Inventory every cache and browser store.
- Test subject, permission, locale, and field-set isolation.
- Test invalidation loss, reorder, delay, and duplicate.
- Test cache poisoning, key collision, serialization failure, and stampede.
- Prove consequential mutations revalidate source.
- Test offline/reconnect conflict for Cart, Build, forms, and Cases.
- Prove sign-out, revocation, and Account switch clear private state.

## Consequences

Layered caching improves performance and resilience without creating hidden authority. It requires strict inventory, keys, invalidation, and private-data discipline.

## References

- [State Ownership and Restoration](08-state-ownership-and-restoration.md)
- [Rendering and Navigation](07-rendering-and-navigation-strategy.md)
- [ADR-0031: Layered Non-Authoritative Caching](../adrs/ADR-0031-layered-non-authoritative-caching.md)

