# State Ownership and Restoration

**Status:** Approved

## Purpose

This document defines ownership and synchronization for URL, request, session, server, cache, client, form, draft, workspace, optimistic, operation, offline, and provider state.

It prevents duplicated authority, hidden persistence, unsafe optimistic behavior, generic offline mutation queues, and restoration that silently overwrites newer source state.

## Decision

Use a **single-authority, explicit-projection state model**.

Every meaningful state has:

- One authoritative owner
- A stable identity
- A version or concurrency representation where mutation can conflict
- Declared projections and caches
- Freshness and invalidation rules
- Mutation and synchronization direction
- Restoration and discard behavior
- Privacy, authorization, retention, and observability classification

Frontend state is either authoritative only for local interaction and unsaved drafts, or a derived projection of a source-owned object. Copying state does not copy authority.

Use:

- Next.js route parameters and search parameters for canonical URL state
- React local state and reducers for component or feature-scoped interaction
- React context only for stable scoped capabilities and coordinators
- TanStack Query selectively for client-interactive server projections requiring refresh, polling, pagination, or mutation coordination
- Source-owned durable records for cross-route, cross-device, consequential, or collaborative state
- IndexedDB only for approved substantial local drafts or offline read snapshots
- `sessionStorage` only for non-sensitive tab-scoped navigation or restoration hints
- `localStorage` only for approved non-sensitive presentation preferences or small recoverable drafts
- Secure server-managed cookies for session references and narrowly approved security controls

Do not use a universal global client store, generic persisted mutation queue, or browser storage as a source of commerce truth.

## State classes

### S0 — Canonical URL state

Owner: route contract.

Includes safe, shareable, reloadable navigation state such as query, visible filters, sort, pagination, selected comparison products when allowed, article anchors, and authorized saved-view identifiers.

URL state uses typed parsing, normalization, defaults, size limits, and canonical serialization. Invalid values recover explicitly and cannot reach source contracts as trusted input.

### S1 — Request state

Owner: experience runtime for one request.

Includes locale resolution, correlation, request identity context, source query results, server composition, and request memoization.

Request state does not survive navigation or become shared cache automatically. It is isolated between users and requests.

### S2 — Identity and session state

Owner: Identity and Security.

Includes anonymous, guest, customer, representative, workforce, provider, service, assurance, expiry, and revocation context.

The browser holds only approved session references or public context. It cannot assert roles, capabilities, assurance, ownership, or restriction state.

Customer and Admin sessions, storage namespaces, cookies, caches, and broadcast channels remain separate.

### S3 — Authoritative durable domain state

Owner: approved source module.

Includes:

- Catalog products, taxonomy, and attributes
- Compatibility rules and evaluations
- Prices and pricing rules
- Inventory positions, reservations, and availability
- Cart, Checkout, and orders under Purchase
- Customer continuity and preferences
- Support cases, messages, evidence, and obligations
- PC builds
- AI conversations
- Roles, grants, policies, and authorization records
- Source-owned notifications and operational objects

Durable state is changed only through owned commands and transactions or workflows. A page, BFF, client cache, Search index, analytics model, Admin view, AI context, or audit record cannot mutate it indirectly.

### S4 — Server projection and read-model state

Owner: projection owner; authority remains the source modules.

Includes BFF compositions, Account summaries, Admin worklists, Search documents, reporting models, notification views, and other derived reads.

Every projection declares source versions, freshness, lag, rebuild, authorization, deletion, and reconciliation. A projection is rechecked against the source before consequential action.

### S5 — Shared cache state

Owner: cache contract and source owner.

Includes public source-versioned content and approved commerce projections under the [Rendering and Navigation Strategy](07-rendering-and-navigation-strategy.md).

Cache state is never mutated as an independent record. It is populated or invalidated from source contracts and can be discarded and rebuilt.

### S6 — Client query projection

Owner: feature query contract; authority remains the server source.

Use TanStack Query only when a Client Component needs:

- Live or user-triggered refresh
- Polling an operation or changing source record
- Infinite or virtualized pagination
- Coordinated deduplication across one interactive feature
- Mutation pending/error tracking
- Bounded optimistic projection

Do not hydrate an application-wide query cache by default. Hydration boundaries are feature-scoped and include only authorized, serializable, necessary data.

Each query key includes stable identity, source contract version, locale or market where relevant, and bounded view parameters. Raw credentials, authorization headers, sensitive fields, or unbounded objects never enter keys.

Queries declare freshness, garbage collection, retry, refetch, focus, reconnect, and invalidation behavior by data class. Library defaults are not product policy.

### S7 — Ephemeral interaction state

Owner: nearest component or feature controller.

Includes disclosure, focus target, overlay state, row expansion, local selection, transient input, hover intent, and in-progress interaction.

Use React local state or a reducer. Lift state only to the nearest common owner. Context is appropriate for stable scoped services or coordinated regions, not high-frequency unrelated application data.

Ephemeral state is discarded on owner unmount unless the approved journey requires restoration.

### S8 — Form state

Owner: form instance until accepted.

Includes values, touched state, client validation, server validation mapping, submission intent, and pending state.

Form values do not mutate the source until an owned command succeeds. Server validation remains authoritative. Failed submission preserves safe input and returns field, form, or operation errors without fabricating completion.

Sensitive values have stricter retention and restoration. Credentials, one-time codes, payment secrets, and security answers are not persisted in browser storage.

The form library, if any, must preserve native form semantics and remains a later dependency decision.

### S9 — Local draft state

Owner: user or workforce subject within a declared draft contract.

Includes meaningful unfinished composition that may safely persist before source acceptance, such as case-start content, PC Builder guest drafts, staged Admin edits where approved, or long-form content.

A draft declares:

- Draft identity and owner
- Source object and base version, if any
- Fields included and excluded
- Storage location
- Encryption or device-bound protection where required
- Expiry and retention
- Cross-tab and cross-device behavior
- Save, restore, merge, submit, discard, and claim semantics

Local persistence is not enabled merely because a form is long.

### S10 — Durable workspace state

Owner: source domain.

Includes saved PC builds, AI conversations, Comparison persistence where approved, staged Admin change envelopes, saved views, bulk operations, and case work.

It survives route, tab, device, and session boundaries according to policy. Client interaction state may project it, but save and conflict resolution use source versions.

### S11 — Optimistic projection

Owner: mutation instance; authority remains the source.

Optimistic UI is permitted only when:

- User intent is unambiguous.
- The change is reversible in presentation.
- Failure is common enough to design and rare enough not to mislead.
- The source command is idempotent.
- Rollback or replacement uses a captured prior version.
- Conflict and permission change have explicit handling.
- The interface clearly distinguishes pending from completed when consequence matters.

Suitable examples may include Wishlist membership, low-risk preference changes, local Cart quantity projection, or reversible row selection.

Do not present as optimistically completed:

- Order creation, cancellation, return, refund, or fulfillment transition
- Payment authorization, capture, refund, or financing approval
- Inventory adjustment or reservation outcome
- Compatibility rule activation
- Price or promotion publication
- Role, permission, delegation, break-glass, or assurance change
- Admin approval or execution
- Support obligation completion
- Account closure or privacy-request completion

High-consequence operations use pending or accepted states tied to a durable operation record.

### S12 — Operation state

Owner: authoritative command or workflow owner.

Each consequential operation has:

- Operation identity
- Idempotency identity
- Initiating and effective subject
- Intent and target
- Authorization and assurance context
- Input or command version
- Status and timestamps
- Correlated source outcome
- Retry, timeout, cancellation, and reconciliation state
- Safe presentation and recovery contract

Operation states distinguish:

- Preparing
- Submitted
- Accepted
- In progress
- Awaiting external result
- Completed
- Rejected
- Failed before effect
- Failed after partial effect
- Indeterminate
- Compensating or correcting
- Cancelled or expired

A network timeout does not prove failure. The client resolves an unknown outcome by operation identity before permitting a new consequence.

### S13 — Offline snapshot and deferred intent

Owner: snapshot contract or draft owner; authority remains online source.

Offline reads may expose explicitly cached non-sensitive content, last-known personal summaries where approved, and local drafts. They show capture time and limitations.

There is no generic offline mutation queue.

Consequential commerce, payment, order, Support lifecycle, Account security, authorization, and Admin commands are blocked offline. Low-risk deferred intent requires a dedicated contract defining identity, expiry, revalidation, idempotency, user confirmation, conflict, and visible queue management.

Draft save may continue locally without claiming source persistence.

### S14 — External-provider state

Owner: external provider for its native record; owning Nexora domain for mapped lifecycle truth.

Provider callbacks, polling results, tokens, and statuses are inputs to an owned adapter and reconciliation process.

The frontend never presents provider state directly as a Nexora outcome without authoritative mapping. Provider redirects and browser SDK state cannot complete orders, payments, delivery, repair, or identity lifecycle by themselves.

## Ownership matrix

| State | Durable | Shareable | Browser-persisted | Optimistic | Authoritative owner |
| --- | --- | --- | --- | --- | --- |
| Search and filter URL | Through URL | Yes when safe | History | Not applicable | Route contract |
| Product projection | Rebuildable | Public subset | Query cache only | No | Catalog and source owners |
| Price and availability projection | Rebuildable | Public subset | Short-lived query cache only | No | Pricing and Inventory |
| Cart | Yes | No | Optional non-authoritative hint only | Bounded | Purchase |
| Checkout | Yes while active | No | No sensitive persistence | No completion | Purchase |
| Order | Yes | No | Read projection only | No | Purchase |
| Comparison interaction | Conditional | Conditional | Approved draft only | Local only | Customer or route contract per persistence |
| PC build | Yes when saved | Governed share | Approved guest draft | Bounded draft | PC Builder |
| AI conversation | Policy-bound | Governed share only | No raw provider state | No source facts | AI |
| Support case | Yes | No | Approved draft only | No lifecycle completion | Support |
| Admin staged change | Yes | No | No shared browser persistence | Local preview only | Source domain/change envelope |
| Permission decision | Policy-bound | No | Never authoritative | Never | Roles and Permissions/source enforcement |
| Operation | Yes when consequential | No | Reference only | Pending presentation | Command/workflow owner |

## State-copy contract

Every state copy or projection answers:

1. What is the authority?
2. Why does the copy exist?
3. Which identity and version does it represent?
4. How fresh may it be?
5. How is it populated, invalidated, and deleted?
6. Which fields and subjects may access it?
7. Can it be rebuilt?
8. What happens when source and copy disagree?
9. When is it discarded?
10. Which telemetry proves its behavior?

If these cannot be answered, the copy is not approved.

## Synchronization rules

### One-way projections

Source state flows to read models, caches, indexes, and client queries. Consumers do not write back by editing projections.

### Commands

Intent flows through an owned command containing identity, idempotency, base version or preconditions, and explicit requested effect. The response returns current authoritative state or an operation reference.

### Events

Events update derived projections and trigger work. They describe source facts that already occurred and are not editable commands.

### No dual write

A request cannot independently write source state and a cache, index, analytics record, or provider mirror and call the combined result atomic.

The source transaction records its outcome and durable publication intent. Derived systems update asynchronously with reconciliation.

## Concurrency and conflict

Use opaque source versions, entity tags, sequence values, or equivalent concurrency tokens on mutable durable objects.

On conflict:

- Preserve the user's draft and submitted intent.
- Fetch or present current source state.
- Identify changed fields or constraints where safe.
- Offer merge, reapply, duplicate, reload, or discard according to domain policy.
- Re-run authorization, validation, price, inventory, Compatibility, and lifecycle eligibility.
- Do not silently use last-write-wins for consequential or collaborative state.

Automatic merge is limited to fields with explicit commutative or independent semantics.

## Restoration precedence

Restore in this order:

1. Confirm current identity, session, assurance, and access.
2. Resolve any pending or indeterminate authoritative operation.
3. Load current source-owned durable object and version.
4. Load eligible local draft and its base version.
5. Apply canonical URL-owned state.
6. Reconcile, merge, or present conflict.
7. Apply safe presentation preferences.
8. Fall back to approved defaults.

Local state never overwrites newer source state silently.

Restoration records why state was restored, rejected, expired, migrated, conflicted, or discarded when material to the user.

## Sign-in, sign-out, and account transition

### Sign-in

Anonymous or guest state may merge only under an owner-defined contract:

- Cart uses Purchase merge rules.
- Wishlist uses Customer merge rules.
- Comparison uses its approved persistence owner.
- PC Builder claims eligible guest drafts through PC Builder.
- Support cases require verified access rather than identifier matching.

Merge is idempotent, attributable, and conflict-aware.

### Sign-out

Sign-out:

- Revokes or expires the server session.
- Clears private client queries and hydrated data.
- Clears protected browser storage and in-memory state.
- Stops polling and subscription channels.
- Invalidates private prefetch and navigation state.
- Preserves only explicitly approved anonymous preferences or drafts.

Back navigation cannot reveal protected rendered state after sign-out.

### Identity or permission change

Account switch, delegated context change, representative boundary, workforce role change, permission revocation, and assurance expiry invalidate affected state before further display or action.

## Multi-tab behavior

Tabs are independent interaction contexts sharing the same authoritative source.

Use BroadcastChannel or an equivalent same-origin mechanism only to signal:

- Sign-out or session invalidation
- Permission or identity-context change
- Source record invalidation
- Cart or durable workspace refresh hint
- Theme or approved preference change

Broadcast messages carry identifiers and invalidation intent, not sensitive record bodies or authorization claims.

The receiving tab re-fetches and reauthorizes. Last-tab-wins is not an authoritative concurrency policy.

## Browser storage

### Cookies

Use secure, HTTP-only, same-site server-managed cookies for session references where the identity decision approves them. Client JavaScript cannot read authentication secrets.

### sessionStorage

May hold non-sensitive, tab-scoped return targets, transient flow correlation, or restoration hints. It cannot hold credentials, permission claims, payment secrets, full private objects, or authoritative operation outcomes.

### localStorage

May hold theme, density, and other approved non-sensitive presentation preferences or small drafts with explicit schema, version, expiry, and deletion.

It cannot hold session tokens, customer or workforce profiles, orders, cases, addresses, payment data, roles, permissions, AI context, or Admin records.

### IndexedDB

May hold approved larger local drafts and offline read snapshots. Records require:

- Schema and migration
- Owner and purpose
- User and tenant partition
- Expiry and quota behavior
- Sign-out, permission, deletion, and account-switch cleanup
- Encryption assessment
- Corruption and unavailable-storage recovery

Browser storage is treated as attacker- and user-modifiable input on restoration.

## TanStack Query contract

TanStack Query is a frontend projection and mutation-coordination tool, not a data-access architecture.

Rules:

- Create separate QueryClient instances per browser application context and isolated server render.
- Use feature-scoped key factories owned by the providing contract.
- Hydrate only queries required for interactive continuation.
- Do not dehydrate secrets, authorization context, failures containing protected detail, or unrelated queries.
- Configure retries by operation and error class; do not retry authorization, validation, conflict, or non-idempotent consequences blindly.
- Window-focus and reconnect refresh are enabled only where safe and useful.
- Mutation success invalidates or replaces queries using authoritative returned versions.
- Query persistence is disabled by default and requires explicit offline/privacy approval.
- Query devtools and diagnostics are unavailable or access-controlled in production.
- ESLint and architecture checks enforce stable clients, keys, and dependency use.

Server-composed pages can use source contracts directly without TanStack Query. Avoid double-fetching merely to populate a client cache.

## Optimistic-update algorithm

For an approved optimistic mutation:

1. Validate intent locally.
2. Generate or reuse the idempotency identity.
3. Cancel or sequence conflicting projection refresh.
4. Capture prior projection and version.
5. Apply a visibly pending optimistic projection.
6. Submit the source command with base version.
7. On success, replace with authoritative returned state.
8. On rejection or safe failure, restore or reconcile from source.
9. On conflict, preserve intent and enter conflict recovery.
10. On timeout or indeterminate result, poll or query by operation identity.

Do not roll back an indeterminate mutation until the source outcome is resolved.

## Host-owned state mapping

Technical state maps to the approved host-owned taxonomy:

- Missing initial query → loading
- Background refetch → incremental or background loading
- No source records → first-use or operational empty
- No query matches → zero results
- Source unreachable with usable projection → stale or partial
- Version mismatch → conflict
- Offline with cached read → offline and stale
- Submitted command without result → pending
- Timeout with unknown effect → indeterminate
- Source rejection → validation, prerequisite, ineligible, denied, or failure according to cause
- Accepted source outcome → completion

TanStack Query booleans or HTTP status codes do not define the customer-facing state by themselves.

## Security and privacy

- State keys and identifiers are classified and minimized.
- Client state cannot contain fields the subject may not currently read.
- Permission revocation propagates to queries, caches, storage, logs, and broadcasts.
- Error and operation state do not disclose protected resource existence.
- Draft and telemetry content use field allowlists and redaction.
- Browser storage, hydrated payloads, page source, extensions, and device backups are treated as exposed surfaces.
- Sensitive source values are fetched only when required and discarded promptly.

## Observability

Measure:

- Query age, invalidation, refresh, retry, and stale presentation
- Draft save, restore, expiry, migration, conflict, and discard
- Operation pending duration, indeterminate outcomes, reconciliation, and duplicates prevented
- Optimistic success, rollback, conflict, and correction
- Multi-tab invalidation latency
- Sign-out and permission-change cleanup
- Offline snapshot use and blocked mutations
- Client storage quota, corruption, and cleanup failures

Telemetry uses state class and contract identity rather than sensitive values.

## Rejected alternatives

### One global client store

A universal store would make cross-component access convenient but obscure ownership, persistence, invalidation, server rendering, and security boundaries. Nexora uses local, URL, query, draft, and source state according to purpose.

### TanStack Query for all server data

This would standardize frontend fetching but duplicate server-first composition, increase hydration, and encourage every source projection to persist in the browser. It is reserved for interactive client needs.

### Browser-first persistence

Persisting Cart, Checkout, Builder, forms, and workspace state primarily in the browser would simplify anonymous continuity but weaken cross-device behavior, concurrency, security, and source reconciliation.

### Generic offline mutation queue

A general queue cannot safely preserve current price, inventory, Compatibility, assurance, permission, approval, or provider preconditions. Only explicitly approved deferred intent is allowed.

## Validation

This decision:

- Gives every meaningful state class one owner.
- Preserves URL-owned discovery and source-owned commerce continuity.
- Prevents caches, client queries, Admin, AI, and provider state from becoming authority.
- Makes optimistic behavior proportional to consequence.
- Covers sign-in merge, sign-out cleanup, multi-tab invalidation, offline, conflict, and restoration.
- Maps technical state to approved host-owned semantics.
- Supports Cart, Checkout, Account, Comparison, Builder, AI, Support, authentication, and Admin behavior.

## Consequences

### Benefits

- Ownership and synchronization remain traceable.
- Client state stays bounded and easier to secure and debug.
- Durable operations survive refresh and timeout safely.
- Restoration protects newer source state.
- Offline behavior cannot silently queue stale consequential actions.

### Costs and risks

- Features must classify state rather than choosing a convenient store.
- Draft schemas, versions, and cleanup require maintenance.
- Selective TanStack Query use requires boundaries to avoid duplicate fetching.
- Conflict and indeterminate-operation UX require domain-specific work.

## Governance

- New persisted state requires an owner, schema, lifecycle, privacy, restoration, and deletion contract.
- New optimistic operations require risk and indeterminate-outcome review.
- Browser storage is denied by default for private and consequential records.
- Query persistence and offline mutations require explicit approval.
- A material change to state classes, client-query posture, restoration precedence, or offline mutation policy requires a superseding ADR.

## References

- [ADR-0014: Single-Authority State and Explicit Client Projections](../adrs/ADR-0014-state-ownership.md)
- [TanStack Query server rendering and hydration](https://tanstack.com/query/latest/docs/framework/react/guides/ssr)
- [TanStack Query prefetching and router integration](https://tanstack.com/query/latest/docs/framework/react/guides/prefetching)
- [Next.js Linking and Navigating](https://nextjs.org/docs/app/getting-started/linking-and-navigating)
- [Rendering and Navigation Strategy](07-rendering-and-navigation-strategy.md)
- [Error, Empty, Loading, Offline, and Degraded States](../03-product-structure/08-error-empty-and-degraded-states.md)
- [Account and Post-Purchase Architecture](../03-product-structure/04-account-architecture.md)
- [PC Builder Architecture](../02-information-architecture/09-pc-builder.md)

## Next decision

Define API and Backend-for-Frontend topology, interaction styles, schemas, error and operation envelopes, pagination, compatibility, versioning, and external API boundaries.
