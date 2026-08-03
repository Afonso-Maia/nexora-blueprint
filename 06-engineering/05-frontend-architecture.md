# Frontend Architecture

**Status:** Approved

## Purpose

This document defines the frontend technology foundation, application composition, server and client component boundary, feature-module model, Design System consumption, browser state rules, accessibility infrastructure, and browser-support contract.

It applies to the Customer Experience and Administrative Experience runtimes defined in [System Context and Runtime Topology](04-system-context-and-runtime-topology.md).

## Decision

Use:

- **TypeScript** as the frontend implementation language
- **React** as the component and interaction model
- **Next.js App Router** as the application framework for both Customer Experience and Administrative Experience applications

Use a **server-first React architecture**:

- Server Components are the default composition boundary.
- Client Components are explicit interactive islands.
- Route layouts, pages, loading boundaries, error boundaries, and metadata use App Router conventions.
- Server rendering, static generation, streaming, caching, and client rendering are selected per route and data requirement in the later rendering decision.
- Browser JavaScript is a budgeted capability, not the default location for business or data orchestration.

Customer and Admin remain separate Next.js applications in the governed monorepo. They share approved Design System and technical packages but not route trees, sessions, application state, authorization assumptions, or unrestricted feature code.

## Rationale

Nexora requires:

- Search-visible commercial and editorial pages
- Fast first presentation on product-rich routes
- Authenticated and highly interactive workspaces
- Server-controlled access to experience contracts
- Streaming and route-level state boundaries
- Strong composition for shared layouts and canonical routes
- A mature React Server Component integration
- One component ecosystem for customer and dense Admin experiences

Next.js App Router provides file-based layouts and routes, Server and Client Components, Suspense integration, route-level loading and error conventions, prefetching, and multiple rendering strategies. React's Server Component model keeps server-only work and dependencies outside the browser bundle while composing interactive Client Components where needed.

React Router Framework Mode is a viable alternative with strong route modules, loaders, actions, SSR, static rendering, and type-safe route capabilities. Its React Server Component integration is not selected because its official RSC path remains unstable and depends on experimental bundler integration.

A client-rendered SPA for both applications is also viable, particularly for Admin, but would make customer initial rendering, indexing, browser payload, no-script resilience, and request waterfalls harder to govern uniformly.

## Version policy

Framework and language dependencies use supported stable releases pinned exactly in the lockfile.

- Major upgrades require compatibility, migration, rendering, accessibility, performance, and deployment review.
- React and Next.js versions are upgraded as a tested pair according to framework support.
- Canary, release-candidate, experimental, and unstable APIs are prohibited in production architecture unless a time-bounded exception documents need, containment, fallback, and removal.
- React Server Component framework internals are consumed through Next.js public stable interfaces rather than custom bundler integration.
- Security fixes may use an expedited coordinated change while preserving validation evidence.

The Blueprint records the technology family and policy rather than freezing a version number that will become stale.

## Application composition

### Customer application

The customer application contains route modules for:

- Storefront and merchandising
- Search and Category Discovery
- Product Detail and Comparison
- Cart and Checkout
- Account and post-purchase continuity
- Customer authentication and recovery
- Support Center and cases
- PC Builder
- AI Shopping Assistant
- Legal, informational, and recovery routes

Route modules own experience composition and host states. They consume source-owned contracts through the application boundary and cannot import another domain's private implementation.

### Admin application

The Admin application contains:

- Workforce authentication and assurance shell integration
- Capability-adaptive navigation
- Operations Overview
- Governed worklists and saved views
- Resource workspaces
- Approval and execution experiences
- Operational Search and command presentation
- Audit and reporting presentation
- Admin recovery and operation tracking

Admin uses a separate root layout, origin, security policy, session context, route tree, error boundary, telemetry context, and deployment artifact.

Admin does not reuse customer application feature modules. Shared behavior belongs in the Design System, a governed contract, or a narrowly owned technical capability.

## Route-module anatomy

Each route module declares:

- Canonical Page Inventory ID and primary template
- Accountable page domain and supporting source domains
- Route parameters and URL-owned state
- Rendering and freshness classification
- Required queries and mutation contracts
- Authentication, assurance, authorization, and field restrictions
- Loading, empty, partial, stale, conflict, offline, denied, error, pending, and completion behavior
- Metadata, indexing, canonicalization, and sharing rules
- Responsive, theme, density, localization, and accessibility obligations
- Performance budget and observability identifiers

The route file is a framework adapter and composition root. Substantial domain or presentation logic does not accumulate in route files.

Route groups may organize layouts and policy without changing canonical URLs. Framework folder structure cannot silently redefine Page Inventory identity or create unapproved destinations.

## Server and client boundary

### Server Components by default

Use Server Components for:

- Route and template composition
- Initial authoritative or composed reads
- Localization resource selection
- Metadata and canonical link construction
- Permission-aware server presentation
- Static and editorial content
- Non-interactive product, order, policy, and operational facts
- Server-only dependency use
- Passing minimal serializable state into interactive components

Server Components do not access domain databases directly. They call the approved BFF or application contracts for their experience runtime.

### Client Components by explicit need

Use Client Components when the interface requires:

- Browser event handling
- Local interactive state
- Focus, selection, disclosure, overlay, drag, or keyboard coordination
- Browser APIs
- Optimistic or pending interaction
- Live workspace behavior
- Client-side measurement that cannot be expressed through CSS or server output
- Resumable client-only draft behavior approved by the state architecture

The `"use client"` boundary is placed as low as practical. Marking a page shell, template, or broad feature tree as client-side requires performance and architecture justification.

Client Components receive minimal serializable props. They do not receive secrets, unrestricted authorization context, private source records, provider tokens, or functions disguised as domain authority.

### Server Functions

Server Functions may serve as framework-local transport adapters for approved queries or commands. They are not domain services, transaction owners, or authorization shortcuts.

Every consequential mutation still passes through the governed application contract and authoritative source module with explicit identity, assurance, authorization, idempotency, preconditions, and operation outcome.

Public or cross-runtime contracts cannot exist only as opaque framework-generated Server Function behavior.

## Feature-module model

Frontend source is organized by accountable experience feature and route composition, not by generic technical file type.

A feature module may contain:

- Route-specific composition
- View models and contract adapters
- Domain-specific components and patterns
- Host-owned state mapping
- Interaction controllers
- Frontend validation that mirrors but does not replace source validation
- Feature tests, fixtures, stories, and diagnostics

Feature modules depend on:

- Approved Design System entry points
- Owned public contracts
- Narrow frontend platform capabilities
- Explicitly allowed sibling composition entry points

They cannot depend on:

- Another domain's private feature implementation
- Core persistence or provider SDKs
- Admin code from the customer application or customer code from Admin
- Generic shared state containing unrelated domains

Cross-feature reuse must pass the approved shared-code threshold.

## Design System consumption

Both applications consume the Design System through governed layer entry points:

`Foundations → Tokens → Primitives → Components → Patterns → Page templates`

Rules:

- Applications consume semantic and approved component tokens, not raw reference values by default.
- Route features compose approved page templates before adding optional domain modules.
- Domain components remain separate when authority, state, accessibility, or recovery differs.
- Page-level CSS cannot redefine token semantics, focus appearance, control behavior, or state meaning.
- Escape hatches are typed, reviewable, measurable, and covered by the Design System exception process.
- Light and dark themes use the same semantic component APIs.
- Compact density cannot remove capability or reduce accessibility.

The exact styling and token-generation toolchain remains a dedicated decision.

## State ownership

The frontend recognizes these state classes:

| State class | Primary owner |
| --- | --- |
| Canonical location, query, filter, sort, selection eligible for sharing | URL |
| Authoritative product, price, inventory, Compatibility, Cart, order, case, permission, and operation state | Source module |
| Server-composed route data | Experience server cache or request scope under source freshness rules |
| Durable customer continuity | Owning source domain |
| Interactive component state | Nearest Client Component |
| Multi-region workspace interaction | Feature-scoped controller |
| Form draft | Form or approved restoration store |
| Theme and supported presentation preference | Governed preference owner |
| Pending mutation | Mutation instance correlated to source operation |
| Cross-route durable operation | Source workflow and operation reference |

A global client store is not the default. It requires cross-route interactive need, explicit ownership, lifecycle, persistence, privacy, restoration, invalidation, and debugging rules.

Server state is not copied into a client store merely for convenience. Client caches remain derived, permission-sensitive, and subordinate to source truth.

Detailed client, server, URL, and durable state behavior follows the dedicated state-ownership decision.

## Forms and mutations

Forms use native semantics and progressive enhancement where the journey permits.

- Persistent labels, instructions, grouping, autocomplete, input purpose, and error association are required.
- Client validation provides timely guidance; authoritative validation occurs at the source.
- Submission preserves user input when recovery is safe.
- Repeat submission uses the same idempotency context for the same intent.
- Pending state identifies the affected operation and does not disable unrelated recovery.
- Completion is announced and focused appropriately.
- Navigation away from meaningful unsaved state requires governed protection or restoration.
- High-consequence actions use explicit review and confirmation proportional to risk.

## Navigation

Use semantic links for navigation and buttons for actions. Framework imperative navigation is reserved for behavior that cannot be represented as a link or form outcome.

Navigation must preserve:

- Canonical and shareable URLs
- Browser history expectations
- Search and filter state
- Meaningful focus placement
- Scroll restoration appropriate to the task
- Unsaved or pending work
- Authentication and assurance return targets
- Permission-change and retired-route recovery

Prefetching is bounded by user intent, data sensitivity, device/network constraints, and source load. Admin commands and sensitive customer data are never prefetched as mutations.

Detailed route, URL, rendering, and navigation behavior follows the dedicated decision.

## Accessibility infrastructure

The frontend platform provides governed implementations for:

- Document landmarks, headings, titles, language, and route announcements
- Skip links and focus placement
- Visible focus and focus restoration
- Disclosure, tabs, overlays, menus, comboboxes, selection, and roving focus
- Form labels, descriptions, validation summaries, and error focus
- Live announcements for loading, progress, pending, completion, and relevant updates
- Reduced motion, contrast, zoom, reflow, and target-size behavior
- Accessible tables, grids, Comparison, Admin worklists, and workspaces
- Keyboard alternatives to drag and pointer-only interaction
- Image, media, chart, and generated-content alternatives

Native HTML is preferred. ARIA supplements semantics when a native element cannot express the approved behavior; it does not repair an inappropriate interaction model.

Route transitions and streamed content do not automatically move focus or announce every update. Each host follows the approved state and hierarchy contract.

Automated accessibility checks run at component and route levels, but manual keyboard, screen-reader, zoom, reflow, contrast, motion, and representative-device validation remain required.

## Localization

Brazilian Portuguese is the default document and interface locale.

- User-visible text does not live in domain logic or arbitrary component literals.
- Message ownership follows Design System, feature, source domain, Legal, or operational authority.
- Interpolation uses typed named values and locale-aware formatting.
- Sentence fragments and string concatenation that break grammar are prohibited.
- Date, time, number, currency, unit, address, phone, and identifier presentation use governed formatters.
- Layout and component tests include Portuguese expansion, long technical values, and fallback behavior.

Exact localization resource, translation, and formatting architecture remains a later decision.

## Error and state boundaries

App Router loading, error, not-found, and related conventions are framework mechanisms, not the product state taxonomy by themselves.

Route and feature boundaries map technical conditions to the approved host-owned semantics:

- Initial and incremental loading
- First-use empty, zero result, and no eligible item
- Partial and unavailable data
- Recoverable failure
- Stale state and conflict
- Offline behavior
- Authentication, assurance, access denial, and permission change
- Pending, indeterminate, and completed operations
- Route-level Not Found, Access Denied, Unexpected Error, Service Unavailable, and Offline recovery

One generic error boundary cannot replace operation-aware state.

## Security and privacy

- Server-only modules are explicitly marked and cannot enter browser bundles.
- Browser environment variables are public by definition and contain no secrets.
- Rich text, external HTML, URLs, uploads, and generated content are untrusted and governed.
- Content Security Policy compatibility is a component and dependency requirement.
- Customer and Admin cookies, origins, storage keys, caches, service workers, and telemetry remain separate.
- Authorization decisions and sensitive field filtering occur at authoritative and server boundaries, not only through conditional rendering.
- Client logs, error reports, replay tools, analytics, and performance telemetry minimize and redact protected data.
- Third-party scripts require purpose, consent, performance, accessibility, security, and failure review.

## Browser support

Support a capability-based baseline across:

- Current and previous stable desktop versions of Chrome, Edge, Firefox, and Safari
- Current and previous major iOS Safari versions
- Current stable Chrome on supported Android versions

The support matrix is reviewed at least twice yearly using Brazilian audience evidence, vendor security support, accessibility impact, and critical-journey capability.

Critical commerce, authentication, Account obligation, Support, and recovery paths use progressive enhancement. Unsupported enhancement does not justify inaccessible or silent failure.

A browser may be removed only with usage evidence, security status, affected journey analysis, an equivalent path, communication, and approval. Exact versions belong in a maintained support matrix rather than permanent architecture text.

## Performance direction

- Server Components and static output reduce unnecessary client JavaScript.
- Client boundaries are measured by route and interaction.
- Route code is split along real navigation and capability boundaries.
- Fonts, images, icons, editors, charts, and third-party scripts follow explicit budgets.
- Hydration work, long tasks, interaction latency, layout shift, streaming order, and data waterfalls are observable.
- Admin density does not excuse excessive initial data, DOM size, or client computation.

Numeric budgets follow the performance decision.

## Testing and quality gates

Frontend projects require:

- Type checking with strict compiler settings
- Dependency and server/client boundary checks
- Unit and contract tests for view models and state mapping
- Component interaction and accessibility tests
- Route composition and metadata tests
- Theme, density, responsive, and localization visual validation
- Keyboard and assistive-technology checks for critical patterns
- Browser-level critical-journey tests
- Bundle, rendering, and interaction performance checks
- Security checks for server-only code, unsafe content, and third-party scripts

TypeScript types do not validate network, storage, URL, provider, or user input at runtime. Boundary data uses governed runtime schemas.

Detailed testing strategy remains in the later Testing phase; Phase 4 defines the interfaces and architectural gates necessary to make it possible.

## Rejected alternatives

### React Router Framework Mode

React Router Framework Mode is viable and offers strong route modules, loaders, actions, code splitting, SPA, SSR, and static rendering. It is not selected because Nexora benefits from a stable, integrated Server Component framework and React Router's current RSC integration remains unstable and experimental.

### Client-rendered React SPA

A client-rendered SPA would simplify the initial server/client mental model and suit dense Admin interaction. Using it for the whole ecosystem would increase browser orchestration, data waterfalls, initial JavaScript, and customer rendering risk. The selected architecture still permits deeply interactive client regions inside server-composed routes.

### Separate frontend stacks

Using different frameworks for customer and Admin could optimize each independently but would split expertise, accessibility infrastructure, Design System integration, tooling, and incident behavior without a durable current need.

## Validation

This decision:

- Supports the separate customer and Admin runtime boundaries.
- Preserves all 89 canonical pages and nine templates.
- Supports public discovery, authenticated continuity, transactions, dense workspaces, and route recovery.
- Keeps domain authority behind governed application contracts.
- Makes client JavaScript deliberate and measurable.
- Carries accessibility, localization, themes, density, responsive behavior, permissions, and host-owned states into implementation.
- Avoids prematurely deciding exact rendering, BFF, API, styling, or client-state libraries.

## Consequences

### Benefits

- One frontend language and component model serve customer and Admin experiences.
- Server-first composition reduces unnecessary browser code and hides server-only dependencies.
- Route conventions provide consistent layout, loading, error, and metadata integration.
- Shared Design System and accessibility infrastructure can evolve coherently.
- Separate applications preserve workforce and customer risk boundaries.

### Costs and risks

- Server and Client Component boundaries require training and enforcement.
- Framework caching or mutation conveniences could obscure source contracts if used without governance.
- Next.js upgrades require coordinated React, rendering, deployment, and regression review.
- Two application artifacts still require shared tooling without accidental feature coupling.

## Governance

- New Client Component boundaries require a browser capability or interaction reason.
- Framework primitives cannot redefine domain, authorization, state, accessibility, or navigation semantics.
- Experimental APIs require approved exceptions.
- Customer and Admin feature code does not cross application boundaries.
- A material change to language, component model, application framework, or server-first posture requires a superseding ADR.

## References

- [ADR-0011: TypeScript, React, and Next.js Frontend Foundation](../adrs/ADR-0011-nextjs-frontend-foundation.md)
- [Next.js App Router documentation](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro)
- [React Router modes](https://reactrouter.com/start/modes)
- [React Router RSC integration](https://reactrouter.com/how-to/react-server-components)
- [Repository and Application Organization](03-repository-and-application-organization.md)
- [System Context and Runtime Topology](04-system-context-and-runtime-topology.md)
- [Accessibility Foundations](../04-design-system/10-accessibility-foundations.md)
- [Page Templates](../04-design-system/25-page-templates.md)

## Next decision

Define Design System implementation architecture, including token sources and outputs, styling, package boundaries, component APIs, documentation, versioning, and release behavior.
