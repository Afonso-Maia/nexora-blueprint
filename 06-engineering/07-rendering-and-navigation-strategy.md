# Rendering and Navigation Strategy

**Status:** Approved

## Purpose

This document defines how Nexora selects prerendering, cached server rendering, dynamic server rendering, streaming, and client interaction; how URLs own navigation state; and how metadata, indexing, prefetching, redirects, route transitions, focus, scroll, and recovery behave.

It applies the approved Next.js App Router foundation to the 89 canonical pages without allowing framework defaults to redefine source truth, freshness, page identity, state semantics, or accessibility.

## Decision

Use an **explicit mixed-rendering strategy based on page purpose, data authority, personalization, consequence, and freshness**.

- Public stable shells and governed published content may be prerendered.
- Public source facts may be cached only under an owned freshness and invalidation contract.
- Price, inventory, eligibility, Compatibility at commitment points, permissions, personal data, transactions, workspaces, and Admin operations are dynamic or revalidated at the source.
- Streaming reveals stable page structure and independent regions without hiding required prerequisites or presenting placeholders as facts.
- Client rendering is limited to approved interactive behavior and restoration.
- Next.js Cache Components may implement mixed static, cached, and dynamic regions, but every cache scope must be explicit and governed.
- Canonical, shareable, non-sensitive discovery and decision state belongs in the URL.
- Durable personal and operational state belongs to its source domain, not browser history.

Rendering is declared per route and region. Accidental framework inference is not an architecture policy.

## Rendering classes

### R0 — Build-stable public

Use build-time prerendering for content that changes only with an application or governed content release and contains no request-specific data.

Examples:

- Stable global shells
- Static brand and informational framing
- Versioned legal document body when publication is release-bound
- Static recovery guidance

Requirements:

- Content source and version are known at build time.
- No cookies, headers, identity, geolocation, or request-specific policy affect the output.
- A publication correction has an expedited rebuild or invalidation path.
- Metadata, canonical URL, and language are generated with the page.

### R1 — Published public content

Use prerendering with source-driven revalidation for governed content that changes independently of application deployment.

Examples:

- Buying guides
- Support articles and FAQs
- About content
- Legal and policy versions
- Campaign and collection editorial content
- Brand and category editorial framing

Requirements:

- The source publishes immutable version identity and update events.
- Cache tags or equivalent keys identify owner, record, locale, and version.
- Publication, correction, withdrawal, expiry, and successor events invalidate affected output.
- Maximum tolerated staleness and stale-on-failure behavior are declared.
- Withdrawn or access-restricted content cannot remain public from cache.

Time-based expiry is a safety bound, not the primary publication mechanism.

### R2 — Public commerce composition

Use a prerendered or cached public shell with dynamic or independently cached source regions.

Examples:

- Home merchandising
- Deals Hub
- Collection and Brand pages
- Category Discovery
- Product Detail
- Comparison for public product facts

Typical composition:

- Stable page hierarchy and editorial framing: R0 or R1
- Catalog identity and specifications: source-tagged R1 or R2 cache
- Reviews and aggregate ratings: separately cached with declared freshness
- Price, promotions, financing representation, inventory, and availability: dynamic or short source-owned cache
- Compatibility evaluation: dynamic for selected products and mandatory at consequential action
- Personal wishlist, comparison, recommendation, and account state: request-specific dynamic region

Cached public commerce facts are never accepted as commitment truth. Cart addition, Checkout, order creation, and Admin mutation revalidate authoritative sources.

### R3 — Query-derived public discovery

Use dynamic server rendering and streaming for query-dependent public results.

Examples:

- Universal Search Results
- Search suggestions
- Dynamic Category Discovery result regions
- Filtered and sorted public lists

Requirements:

- Query, visible intent, filters, sort, and pagination are URL-owned.
- Search indexes disclose meaningful lag or degradation where it affects decisions.
- Price, inventory, Compatibility, and protected personalization retain source-specific freshness.
- Query output may use bounded query caching only when identity, locale, market, permissions, ranking version, and filter state are safe cache dimensions.
- Arbitrary Search result URLs are not indexed by default.

### R4 — Personalized continuity

Use dynamic server rendering with private request-scoped or explicitly private caching.

Examples:

- Account Dashboard
- Orders and Order Detail
- Wishlist, Addresses, Payment Methods, Notifications, and Settings
- Saved Builds
- My Support Cases and Support Case Detail

Requirements:

- Shared edge or public server caches are prohibited.
- Identity, assurance, authorization, field scope, restriction, and current object access are checked before rendering.
- Page regions may stream independently only when doing so cannot disclose resource existence or protected relationships.
- Browser and framework caches are cleared or partitioned on sign-out, identity change, impersonation boundary, permission change, and account restriction.
- Source-owned changes invalidate or refresh affected private compositions.

### R5 — Transaction and persistent workspace

Use dynamic server rendering for entry and authoritative refresh, with Client Components for governed interaction.

Examples:

- Cart
- Unified Checkout
- Order Confirmation
- PC Builder Engineering Workspace
- AI Assistant Conversation
- Contact and Case Start
- Authentication, recovery, verification, and security challenge

Requirements:

- The server establishes current identity, state, eligibility, assurance, and operation context.
- Client state remains a draft or interaction projection until the authoritative source accepts it.
- Every consequential mutation uses idempotency, current preconditions, and explicit outcomes.
- Restoration distinguishes locally recoverable draft, source-saved state, pending operation, conflict, stale state, and expired or invalid flow.
- Shared output caching is prohibited.
- Back, refresh, duplicate tab, retry, and interrupted assurance behavior are specified.

### R6 — Workforce operational

Use dynamic server rendering and permission-filtered streaming for all Administrative Dashboard pages.

Requirements:

- Shared public caching is prohibited.
- Workforce identity, assurance, effective capabilities, field scope, and resource scope are checked before composition.
- Operational lists, projections, and saved views declare freshness and source recheck points.
- Commands always execute through authoritative gateways.
- Permission change invalidates navigation, fields, cached reads, selections, exports, recent work, and pending command eligibility.
- Streaming cannot disclose object existence, counts, fields, queue membership, or derived sensitive information before authorization.

### R7 — Route recovery

Use minimal server-rendered or prerendered recovery appropriate to the failure:

- Not Found
- Access Denied
- Unexpected Error
- Service Unavailable
- Offline

Route recovery preserves known context and safe next actions without exposing protected resource existence. A host-owned state remains inside its canonical page when route identity and safe recovery still exist.

## Page-family defaults

| Page family | Default rendering |
| --- | --- |
| Public Home, hubs, collections, brands, campaigns, guides, articles, legal, and informational pages | R0 or R1 with dynamic source regions where needed |
| Category and Product Detail | R2 |
| Universal Search Results | R3 |
| Comparison Workspace | R2 for public facts plus request-specific interaction; R4 when loading saved private state |
| Cart, Checkout, confirmation, Builder workspace, AI conversation, case start, and authentication | R5 |
| Account, saved builds, and customer case continuity | R4 |
| Admin pages | R6 |
| System recovery destinations | R7 |

The complete 89-page implementation mapping is a Phase 4 traceability artifact. A route may refine its default only with an explicit data and state contract.

## Cache policy

### Cache is a derived store

Every cache entry declares:

- Accountable source owner
- Data classification
- Key and partition dimensions
- Authorized consumers
- Freshness target and maximum stale bound
- Source version or validation token
- Event-driven invalidation
- Time-based safety expiry
- Stale-on-error behavior
- Permission and deletion propagation
- Observability and purge path

A framework directive alone is not a cache contract.

### Cache Components

Enable Next.js Cache Components only with repository rules that require explicit cached scopes and approved cache profiles.

Use cached scopes for public, non-sensitive, source-versioned data. Read request identity, headers, cookies, and other runtime context outside shared cached scopes. Do not pass sensitive context into a cache key merely to make private data technically cacheable.

Private cache mechanisms require a dedicated later approval covering identity partitioning, eviction, sign-out, authorization change, privacy deletion, and incident purge. Request memoization is permitted within one render when it does not extend data lifetime.

### Invalidation

Source events drive invalidation for publication, product lifecycle, category and attribute changes, price and promotion changes, inventory changes where cached, review moderation, policy updates, permission changes, and deletion.

Invalidation is idempotent. Missed invalidation is detected through version comparison, safety expiry, and reconciliation. Purge completion is observable.

### Forbidden shared caching

Do not shared-cache:

- Customer or workforce identity and session material
- Cart, Checkout, payment, order, case, saved-build, address, payment-method, notification, or preference records
- Permission decisions or protected field values beyond their approved policy cache
- CSRF or assurance artifacts
- AI conversations or private grounding context
- Admin queries, selections, exports, drafts, or operation results
- Error responses whose reuse could disclose existence or denial

## Streaming

Streaming is used when independently useful regions have different latency and can appear without misrepresenting completeness.

Stream:

- Secondary recommendations after primary facts
- Reviews after product identity and critical commerce facts
- Account summaries after obligation-first framing
- Admin supporting panels after authorized primary workspace identity
- Search groups when their order and loading status remain understandable

Do not stream past unresolved prerequisites that determine:

- Resource existence or access
- Price or availability required for commitment
- Compatibility required for safe purchase
- Current approval or execution eligibility
- Authentication or assurance
- Legal consent required for continuation

Loading boundaries use approved skeleton, progress, or state components. They preserve layout, announce meaningful progress without noise, and never display fabricated values.

## URL ownership

The URL owns state that is:

- Safe to expose
- Meaningful on reload
- Shareable or bookmarkable
- Part of result identity or navigation history
- Deterministically restorable

Examples:

- Search query
- Category or collection location
- Visible filters
- Sort order
- Pagination or continuation identity where stable
- Comparison product identifiers when sharing is allowed
- Support intent and article anchor
- Admin saved-view identifier when authorized
- Selected resource identifier in a canonical workspace route

The URL does not contain:

- Secrets, tokens, credentials, one-time codes, or raw provider payloads
- Sensitive personal, payment, Support, or workforce data
- Authoritative Cart, Checkout, order, case, build, or approval state
- Hidden AI instructions or unrestricted conversation context
- Permission grants or assurance claims

Large, private, or mutable workspace state uses a durable source object and opaque stable identifier with access checks.

## Query-string contract

Each route defines:

- Canonical parameter names
- Type, multiplicity, order, normalization, and defaults
- Unknown and invalid parameter behavior
- Share and indexing policy
- Back/forward semantics
- Analytics redaction
- Maximum size and selection limits
- Migration and deprecated aliases

Omitted defaults are preferred in canonical URLs. Parameter order is normalized for canonicalization and stable caching. Filters derive from governed attributes rather than arbitrary client keys.

Changing a parameter's meaning is a versioned route-contract change.

## Navigation

Use semantic links for destinations and forms or buttons for actions. Next.js `Link` is the default internal navigation adapter.

Navigation preserves:

- Browser history and reload
- Canonical URL and deep linking
- Active Search, filter, sort, comparison, and workspace context where appropriate
- Pending and unsaved state protection
- Authentication and assurance return targets
- Safe restoration after recoverable interruption
- Responsive continuity

Imperative router navigation is limited to completed operations, validated substitutions, or interaction patterns without a meaningful link.

## Prefetch policy

Prefetch:

- Stable public destinations with high intent
- Primary navigation and likely product-detail transitions
- Dynamic route shells and loading boundaries when safe

Limit or disable prefetch for:

- Large result lists and dense Admin tables
- Personalized or sensitive destinations
- Sign-out, assurance, recovery, payment, and mutation routes
- Links whose rendering triggers expensive queries
- Metered or constrained network contexts where detectable without fingerprinting
- Low-intent below-the-fold collections

Prefetch is read-only. It cannot create sessions, reserve inventory, mutate Cart, begin payment, mark communication read, consume one-time tokens, or record consequential intent.

## Focus and announcements

After a full route change:

- Update the document title synchronously with meaningful page identity.
- Place focus at the page heading or approved main-region target when this helps orientation.
- Announce the new page or significant route state without duplicating title and heading excessively.

After an in-page URL change:

- Filter, sort, pagination, tab, or disclosure changes preserve focus on the initiating control unless task logic requires movement.
- Result changes announce count and relevant constraint changes after completion.
- Validation and operation errors move or link focus according to the approved form and state pattern.

Streaming does not move focus merely because a region completes. Completion announcements are scoped and deduplicated.

## Scroll restoration

- New destination navigation normally begins at the main content start, accounting for sticky headers.
- Browser back and forward restore prior scroll and URL-owned state where content identity remains compatible.
- Filter and sort changes retain the control and result context rather than always jumping to the page top.
- Pagination behavior is declared per list; a new result segment must be discoverable by keyboard and assistive technology.
- Workspace panels preserve meaningful independent scroll only while the same durable object and version remain active.
- Stale or incompatible restoration resets safely and explains lost context where material.

Scroll position is not durable business state.

## Unsaved and pending work

Navigation protection applies only to meaningful loss:

- Unsaved form or staged change
- Unpersisted Builder work
- Attachment upload
- Consequential operation whose outcome is not yet known

Do not block navigation for trivially reproducible UI state.

Pending source operations survive navigation through a durable operation reference. A browser prompt cannot be the only protection for a consequential mutation.

## Metadata and indexing

Use Next.js server metadata APIs and file conventions for titles, descriptions, canonical URLs, robots, sitemaps, icons, and share images.

### Index by default

Subject to publication and content-quality rules:

- Home
- Deals, Collection, Brand, Category, and public Campaign pages
- Buying Guides Hub and Buying Guide
- Product Detail
- Public Support Center hubs and articles
- About and current public legal or policy documents

### Noindex by default

- Universal Search Results and arbitrary filter combinations
- Comparison URLs containing transient selections unless an approved share artifact exists
- Cart, Checkout, Order Confirmation
- Account, orders, Wishlist, settings, notifications, addresses, and payment methods
- Saved Builds and non-public Shared Builds
- AI conversations
- Support case start, lists, and case detail
- Authentication, recovery, verification, and challenge routes
- All Admin pages
- Access Denied, Unexpected Error, Service Unavailable, and Offline routes
- Preview, draft, experiment, and internal diagnostic routes

Not Found returns the correct HTTP status and is not indexed.

Indexing never grants public access. Private routes enforce authentication and authorization regardless of robots directives.

## Canonicalization

Each indexable page has one canonical URL based on approved route identity.

- Tracking and presentation-only parameters are excluded.
- Default filters and sort are omitted.
- Product and content successor rules define canonical transitions.
- Locale behavior remains explicit even while Brazilian Portuguese is primary.
- Duplicate aliases redirect to the canonical route.
- Pagination and filtered collection indexing require dedicated SEO approval rather than automatic expansion.

Metadata uses authoritative product and content sources and does not claim stale price, inventory, rating, offer, or availability.

## Redirects, rewrites, and retired routes

Maintain a governed route registry containing:

- Canonical route pattern
- Owning page ID and domain
- Prior aliases
- Successor
- Redirect type and reason
- Activation and review date
- Analytics and removal policy

Use permanent redirects only for durable successors. Use temporary redirects for bounded operational or campaign changes. Authentication and assurance interruptions retain a validated same-origin return target without open redirects.

Rewrites are exceptional. They may isolate runtime implementation or support controlled migration but cannot hide a second canonical page, bypass authorization, or obscure ownership.

Retired routes follow SYS-001 behavior when no successor exists.

## Route recovery

Map route outcomes deliberately:

- Unknown or retired public identity without successor → Not Found
- Known protected resource without access → Access Denied or non-disclosing Not Found according to policy
- Missing authentication → focused authentication with safe return target
- Additional assurance required → Security Challenge with resumable intent
- Route-render failure with valid route → host or route Unexpected Error
- Broad required dependency failure → Service Unavailable
- Connectivity loss → host-owned offline state or Offline route when the application shell cannot continue

Framework `notFound`, error boundaries, and redirects implement these decisions; they do not define them.

## Security and privacy

- Cache keys and URLs are treated as observable.
- Sensitive query values are rejected and redacted from logs, analytics, referrers, and error reports.
- Metadata and streamed shells cannot disclose protected resource existence.
- Redirect destinations are allowlisted and normalized.
- Prefetch requests receive the same identity, authorization, rate, and privacy controls as ordinary reads.
- Shared caches vary only on approved bounded dimensions and never on raw authorization headers or unbounded user input.
- Sign-out and permission changes invalidate private navigation and client caches.

## Observability

Measure by route and rendering class:

- Static, cached, and dynamic render counts
- Cache hit, miss, age, invalidation, purge, and reconciliation
- Source and region latency
- Stream boundary completion and failure
- Navigation start, feedback, completion, cancellation, and error
- Prefetch volume, usefulness, and waste
- Metadata and indexing validation
- Redirect use and retired-route demand
- Focus and restoration defects
- Client bundle, hydration, and interaction cost

Telemetry uses canonical route templates and page IDs rather than sensitive raw URLs.

## Rejected alternatives

### Static-first for all public commerce

This would maximize edge delivery but make price, inventory, promotion, review, and compatibility freshness difficult to represent truthfully. Nexora instead caches stable public composition and refreshes consequential facts by ownership.

### Dynamic rendering for every route

This would simplify freshness reasoning but waste computation, increase latency, and reduce resilience for stable published content and shells.

### Client-side SPA rendering

This would centralize data loading in the browser but increase initial JavaScript, request waterfalls, indexing complexity, and exposure of composition logic.

### Time-to-live-only caching

TTL-only caching is operationally simple but cannot respond promptly to publication withdrawal, price change, inventory correction, permission revocation, or privacy deletion. Source-driven invalidation with safety expiry is required.

## Validation

This decision:

- Covers every approved page family and all nine templates.
- Preserves Search-first URLs and governed filters.
- Keeps price, inventory, Compatibility, permission, and operation truth authoritative.
- Supports Account, Checkout, Builder, AI, Support, authentication, and Admin persistence without public caching.
- Preserves host-owned state and route-level recovery distinctions.
- Carries focus, announcements, scroll, responsive continuity, and meaningful restoration through navigation.
- Separates indexing policy from access control.

## Consequences

### Benefits

- Stable public content is fast and resilient.
- Consequential and private facts remain fresh and protected.
- Streaming improves perceived performance without flattening prerequisites.
- URL-owned discovery state supports sharing, history, and restoration.
- Explicit cache contracts make staleness and invalidation operable.

### Costs and risks

- Mixed rendering requires route and region classification discipline.
- Event-driven invalidation needs reconciliation and purge diagnostics.
- Streaming and route transitions require careful accessibility validation.
- Framework cache behavior must remain subordinate to source contracts across upgrades.

## Governance

- Every route declares rendering class, cache policy, metadata, indexing, and recovery.
- Every cached region has an accountable source and invalidation contract.
- Private or consequential data cannot enter shared caches.
- New indexable parameter combinations require content and SEO approval.
- A material change to rendering classes, cache posture, URL ownership, or indexing defaults requires a superseding ADR.

## References

- [ADR-0013: Explicit Mixed Rendering and Canonical Navigation](../adrs/ADR-0013-mixed-rendering-and-navigation.md)
- [Next.js Linking and Navigating](https://nextjs.org/docs/app/getting-started/linking-and-navigating)
- [Next.js Cache Components](https://nextjs.org/docs/app/getting-started/partial-prerendering)
- [Next.js Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js Link](https://nextjs.org/docs/app/api-reference/components/link)
- [Page Inventory](../03-product-structure/01-page-inventory.md)
- [Page-Level Information Hierarchy](../03-product-structure/03-information-hierarchy.md)
- [Error, Empty, Loading, Offline, and Degraded States](../03-product-structure/08-error-empty-and-degraded-states.md)
- [Frontend Architecture](05-frontend-architecture.md)

## Next decision

Define client, server, URL, cache, session, durable, draft, optimistic, and operation-state ownership, including synchronization, invalidation, restoration, conflict, and offline behavior.
