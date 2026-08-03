# System Context and Runtime Topology

**Status:** Approved

## Purpose

This document defines Nexora's system context, initial executable roles, trust boundaries, request and background-work paths, and co-deployment rules.

It refines the approved [modular authoritative core](01-system-shape-and-deployment-boundary.md) without selecting a cloud provider, region, container platform, serverless platform, network product, frontend framework, protocol style, database, queue, search engine, or AI provider.

## Decision

Adopt a **trust-segmented runtime topology with six primary executable roles**:

1. Customer Experience Runtime
2. Administrative Experience Runtime
3. Authoritative Commerce Core Runtime
4. Authoritative Core Worker Runtime
5. Search Runtime
6. AI Orchestration Runtime

Edge delivery, shared data and messaging infrastructure, observability, secrets, and provider connections support these roles but do not become domain authorities.

The topology begins with the fewest operationally credible deployment units:

- Customer and Admin runtimes are isolated from one another.
- The authoritative domain modules co-deploy in one Commerce Core runtime.
- Durable background work for the core runs in a separate worker process using the same governed module contracts.
- Search runs as an independently degradable query and indexing capability.
- AI orchestration runs as an independently degradable and security-bounded capability.
- Media, notifications, and provider-specific work begin as owned worker roles or isolated queues and become separate deployments only when the approved threshold is met.

## System context

Nexora interacts with:

- Anonymous, guest, and authenticated customers
- Workforce and bounded external-provider users
- Authorized customer representatives
- Service, automation, and delegated AI identities
- Payment, financing, fraud, delivery, repair, communication, media, identity, and other governed providers
- Product, inventory, fulfillment, policy, and operational data sources
- Engineering and operational personnel using controlled diagnostics and deployment systems

Nexora remains accountable for its customer and operational outcomes when an external provider participates. Provider state is translated into source-owned Nexora lifecycle semantics and reconciled when delivery is delayed, duplicated, reordered, or contradictory.

## Logical topology

```text
Customer clients
    │
Public edge
    │
Customer Experience Runtime
    │
    ├───────────────┐
    │               │
Authoritative       Search Runtime
Commerce Core       │
    │               │
    ├───────────────┤
    │               │
Core Worker         AI Orchestration Runtime
    │               │
    └──────┬────────┘
           │
Owned data, messaging, cache, media, and provider adapters

Workforce and provider clients
    │
Protected Admin edge
    │
Administrative Experience Runtime
    │
Authoritative Commerce Core and governed operational capabilities
```

This diagram expresses allowed flow classes, not unrestricted network reachability. Every connection requires identity, authorization, purpose, contract, timeout, observability, and data-minimization rules appropriate to the boundary.

## Runtime roles

### Customer Experience Runtime

The Customer Experience Runtime serves the approved customer-facing application boundary:

- Storefront, Discovery, and Product Evaluation
- Comparison, Cart, and unified Checkout
- Account, orders, Wishlist, preferences, and notifications
- Customer authentication and assurance experiences
- Support Center and customer case continuity
- PC Builder
- AI Shopping Assistant presentation
- Legal, informational, and customer recovery destinations

It owns experience composition, route presentation, approved page-template realization, request-context propagation, and host-owned interface states.

It does not own authoritative catalog, price, inventory, compatibility, Cart, Checkout, order, Support, permission, or identity truth. It cannot connect directly to private data stores or external commerce providers.

The runtime may deliver static assets and server-generated or client-consumed experience data. Exact rendering and BFF composition are later decisions.

### Administrative Experience Runtime

The Administrative Experience Runtime serves the capability-adaptive Admin application through a separately protected ingress and session boundary.

It owns:

- Admin shell, navigation, routing, and workspace composition
- Permission-aware presentation
- Worklist and resource-workspace interaction state
- Governed command submission and operation tracking
- Host-owned Admin loading, partial, stale, conflict, denied, and recovery states

It does not mutate source records directly. All reads and commands use governed source-domain or application contracts, with authorization rechecked by the authoritative source.

Customer and workforce sessions, cookies, tokens, caches, origins, and telemetry contexts are not interchangeable.

### Authoritative Commerce Core Runtime

The Commerce Core Runtime hosts the modular monolith and its synchronous application interfaces.

It contains governed authoritative modules and application coordination for the initial commerce core. Module co-deployment does not permit private model or storage access.

The runtime:

- Validates identity, assurance, authorization context, and command preconditions
- Executes authoritative local transactions
- Coordinates synchronous use cases across public module contracts
- Persists source outcomes and durable workflow intent
- Publishes attributable operation and event records through governed mechanisms
- Returns explicit success, rejection, pending, conflict, stale, or indeterminate outcomes

Long-running provider calls, unbounded computation, media transformation, notification delivery, bulk work, and retry loops do not remain inside customer-facing authoritative transactions.

### Authoritative Core Worker Runtime

The Core Worker Runtime executes durable asynchronous work owned by authoritative modules.

It uses the same module boundaries and source enforcement as the Commerce Core but has separate:

- Process lifecycle
- Concurrency and resource controls
- Queue or schedule consumption
- Retry and poison-work handling
- Deployment health and scaling
- Operational diagnostics

Worker execution never implies weaker authorization or audit. Human-requested work retains the initiating subject, effective authorization or approved execution grant, intent, scope, assurance, correlation, and source owner.

A generic job payload cannot authorize work. The source module revalidates applicable policy and resource state at execution time.

### Search Runtime

The Search Runtime is independently degradable because query traffic, indexing, freshness, ranking diagnostics, and recovery differ durably from authoritative commerce transactions.

It provides:

- Customer Universal Search query and suggestion capabilities
- Governed indexing and backfill execution
- Facet and filter projections derived from governed attributes
- Permission-safe operational search projections where later approved
- Freshness, lag, indexing, and ranking diagnostics

Search documents and indexes are derived state. Source domains own indexed facts. Search does not authorize opening a protected resource or executing an action; source authorization is rechecked.

Search unavailability must not erase direct customer fast paths, known destination navigation, Cart, Checkout continuity, Account obligations, Support cases, or Admin source work that can safely operate without the index.

Exact query, ranking, indexing, and storage architecture remain later decisions.

### AI Orchestration Runtime

The AI Orchestration Runtime is independently degradable and security-bounded because model-provider access, prompt and tool isolation, cost, latency, provenance, safety, and data-minimization differ from authoritative commerce operations.

It provides governed orchestration for customer assistance and explicitly approved AI-assisted operational use. It:

- Retrieves authorized authoritative context through owned contracts
- Separates deterministic facts from generated explanation
- Applies prompt, tool, output, and provider policy
- Records model, source, provenance, and correlation metadata
- Uses delegated identity and confirmation for any later-approved action
- Enforces budgets, timeouts, cancellation, and safe fallback

The runtime cannot own product facts, compatibility rules, prices, inventory, eligibility, permissions, order state, case state, or operation outcomes.

AI failure cannot block deterministic Search, navigation, Comparison, Cart, Checkout, PC Builder compatibility evaluation, Account, Support, or Admin source operations.

## Supporting platform roles

### Edge delivery

The edge layer provides public and protected ingress, transport security, request routing, static asset delivery, bounded caching, abuse controls, and coarse traffic protection.

It cannot make source authorization decisions from route visibility or cached presentation. Personalized, permissioned, transactional, and workforce responses require cache and identity rules defined in later decisions.

Customer and Admin ingress use distinct origins or equivalently strong isolation. Admin is not exposed through customer application routing.

### Data plane

Persistence, Search storage, object storage, cache, and messaging are private platform capabilities reached only by owning runtimes or approved adapters.

Shared technology does not imply shared schema, keys, access, lifecycle, or authority. Each data resource declares owner, classification, permitted identities, backup, retention, migration, and recovery behavior.

### Observability plane

Logs, metrics, traces, profiles, audit correlations, and diagnostics use controlled collection paths. Observability data is classified, minimized, access-controlled, retained, and redacted.

The observability plane cannot become a substitute source database or an ungoverned export of customer, workforce, payment, Support, or AI context.

### Delivery and control plane

Build, deployment, configuration, secret, and infrastructure control systems are separated from request-serving identities. Production mutation requires attributable workforce or automation identity, scoped authority, and audit.

Application workloads cannot use deployment credentials, and deployment systems cannot rely on shared human credentials.

## Trust boundaries

### Public client boundary

All browser and device input is untrusted, including routes, headers, cookies, uploaded files, persisted client state, AI text, and values previously emitted by Nexora.

Client validation improves interaction but never replaces server-side validation, authorization, or lifecycle enforcement.

### Customer identity boundary

Anonymous, guest, authenticated customer, representative, and assurance-elevated contexts remain distinct. Session transition, Cart merge, order claiming, saved-build ownership, Support access, and recovery require explicit rules.

### Workforce boundary

Workforce and external-provider access uses distinct identity, session, assurance, authorization, device, and monitoring controls. Customer credentials cannot enter the Admin trust zone.

### Runtime boundary

Experience runtimes are less trusted than authoritative modules for mutation. Runtime-to-runtime calls use workload identity and least privilege; private network location alone does not grant access.

### Asynchronous boundary

Messages, schedules, callbacks, and replayed work are untrusted inputs until schema, origin, identity, deduplication, authorization, state, and applicability are validated.

### Provider boundary

Provider requests and callbacks are authenticated, validated, rate-limited, idempotent, attributable, and reconciled. Provider identifiers and statuses map through owned adapters.

### Data and operations boundary

Production data access, diagnostics, migrations, backfills, break-glass, and repair operations use dedicated identities and governed paths. Direct storage access is exceptional, time-bounded, monitored, and cannot bypass source correction records.

## Synchronous request paths

### Customer read

`Customer client → Public edge → Customer Experience Runtime → application or source contract → response`

The experience may compose authoritative facts and derived Search or AI results. Each fact retains source, freshness, access, and degradation semantics.

### Customer command

`Customer client → Public edge → Customer Experience Runtime → authoritative application contract → source transaction or durable workflow`

The source validates intent, identity, assurance, authorization, state, idempotency, and preconditions. The response distinguishes completion from accepted, pending, rejected, conflicted, or indeterminate execution.

### Admin read

`Workforce client → Protected Admin edge → Administrative Experience Runtime → permission-filtered query contract → response`

Navigation filtering and field omission occur before presentation, but the source remains responsible for authorization and data minimization.

### Admin command

`Workforce client → Protected Admin edge → Administrative Experience Runtime → governed command gateway → authoritative source`

Approval, execution, segregation, assurance, resource and field scope, and concurrent state are evaluated at the source. Admin retains operation correlation rather than fabricating success.

### Search and AI

Customer and Admin clients do not call Search indexes, model providers, or AI tools directly. Experience runtimes call governed Search or AI contracts with bounded context.

Consequential facts are refreshed from their authoritative source at decision or action time.

## Asynchronous paths

An authoritative transaction records its source outcome and durable publication intent atomically or through an equivalently safe mechanism. Background publication and consumers tolerate retries and duplicate delivery.

Asynchronous work includes:

- Search indexing and removal
- Notification composition and delivery
- Media processing
- Provider callbacks and polling
- Long-running Admin operations
- Bulk changes and exports
- Support obligations and external work
- Reconciliation and repair
- AI work explicitly allowed to continue beyond a request

Every asynchronous path declares:

- Source event or command owner
- Durable identity and correlation
- Schema and version
- Ordering assumptions
- Idempotency and deduplication
- Retry and timeout policy
- Dead-letter or quarantined-work behavior
- Authorization and field restrictions
- Completion, failure, and indeterminate outcomes
- Reconciliation and operator ownership
- Customer or workforce visibility

The event, queue, and workflow technologies remain later decisions.

## Co-deployment and isolation

### Initially co-deployed

- Authoritative commerce domain modules in the Commerce Core Runtime
- Shared application coordination that requires local authoritative transactions
- Domain-owned provider ports whose actual I/O runs through governed adapters

### Separate process, potentially same release artifact

- Core Worker Runtime

This preserves runtime isolation for background work without requiring separate source ownership or premature independent versioning.

### Independently deployable from the beginning

- Customer Experience Runtime
- Administrative Experience Runtime
- Commerce Core Runtime
- Search Runtime
- AI Orchestration Runtime

Independent deployability does not require independent release timing at first. Compatibility gates and coordinated promotion may deliberately release several artifacts together.

### Deferred extraction candidates

- Media processing
- Notifications
- Provider-specific adapter runtimes
- Specialized workflow workers

Extraction occurs only when resource, reliability, security, provider, release, or team-accountability evidence passes the approved threshold.

## Failure and degradation boundaries

| Impaired capability | Required continuity |
| --- | --- |
| Customer Experience Runtime | Static recovery and status communication; no false operation completion |
| Administrative Experience Runtime | Source operations remain intact; Admin users receive protected recovery rather than customer routing |
| Commerce Core Runtime | No authoritative mutation through fallback; read-only derived content must disclose staleness |
| Core Worker Runtime | Accepted work remains durable and visibly pending; backlog and age are observable |
| Search Runtime | Direct navigation, known routes, Cart, Checkout continuity, Account, Support, and applicable Admin source work remain available |
| AI Orchestration Runtime | All deterministic discovery, Compatibility, commerce, Support, and Admin paths remain available |
| Messaging | Source transactions do not claim downstream completion; publication backlog and reconciliation are observable |
| Provider | Source-owned pending, failed, or indeterminate semantics apply; retries cannot duplicate consequence |
| Observability | High-consequence operations fail closed where required audit evidence cannot be preserved |

Detailed degraded-mode behavior remains a dedicated later decision, but no topology choice may make optional Search or AI failure equivalent to core commerce failure.

## Environment topology

Each supported environment reproduces the same logical trust and ownership boundaries even when local or preview environments collapse physical infrastructure.

Local convenience cannot permit production-only architecture violations. Provider simulators, local queues, embedded stores, or shared processes must implement the same public contracts and failure semantics needed for representative validation.

Production data and production credentials do not enter development, preview, test, or local environments.

Exact environment classes, isolation, data generation, deployment promotion, and parity follow later decisions.

## Capacity and scaling direction

Each runtime scales according to its own workload:

- Customer Experience: request rate, rendering work, asset traffic, and connection behavior
- Admin Experience: workforce concurrency, dense queries, exports, and long-lived operation tracking
- Commerce Core: authoritative transaction rate, contention, and dependency latency
- Core Worker: queue depth, work age, job class, and downstream capacity
- Search: query concurrency, index size, update rate, and backfill load
- AI Orchestration: request budget, model latency, token or compute use, and tool concurrency

Scaling does not relax ordering, authorization, idempotency, accessibility, freshness, or source-of-truth contracts. Capacity values and budgets remain later decisions.

## Rejected alternatives

### One universal runtime

A single process serving customer, Admin, authoritative commerce, background work, Search, and AI would minimize initial deployment count but combine incompatible trust, scaling, resource, degradation, and provider profiles. It would make optional AI or indexing load capable of impairing Checkout and source operations.

### Service per domain

An independently deployed runtime for every named domain would maximize physical separation but introduce distributed consistency and operational coordination before the team or workload justifies it. Approved domain boundaries remain enforceable inside the Commerce Core.

## Validation

This decision:

- Preserves the modular authoritative core and selective-deployment criteria.
- Separates customer and workforce trust, sessions, ingress, and experience runtimes.
- Keeps authoritative commerce transactions isolated from long-running work.
- Gives Search and AI independent degradation and scaling boundaries.
- Prevents browser access to private stores, providers, Search indexes, and model tools.
- Preserves source authorization for synchronous, asynchronous, cached, indexed, Admin, and AI paths.
- Supports all approved customer, Support, PC Builder, AI, authentication, and Admin surfaces.
- Remains neutral about implementation technologies and physical cloud topology.

## Consequences

### Benefits

- Optional or resource-intensive capabilities cannot directly exhaust authoritative commerce processes.
- Workforce and customer risk profiles remain isolated.
- Background work can scale and recover without extending request transactions.
- Runtime roles have coherent ownership, failure, and capacity profiles.
- The topology remains practical for a small team while supporting later extraction.

### Costs and risks

- Six executable roles require contract, deployment, and observability discipline.
- Search and AI independence introduce network and availability boundaries.
- Coordinated releases may still be necessary while contracts evolve.
- Local development needs representative composition without erasing trust boundaries.

## Governance

- A new runtime role must pass the independent-deployment threshold.
- No runtime receives source authority from network position or deployment independence.
- Customer and Admin identity and session contexts cannot be shared.
- Optional capability failure cannot block deterministic critical paths.
- Runtime-to-runtime access uses attributable workload identity and least privilege.
- A material change to executable roles, trust segmentation, or initial co-deployment requires a superseding ADR.

## References

- [ADR-0010: Trust-Segmented Runtime Topology](../adrs/ADR-0010-trust-segmented-runtime-topology.md)
- [System Shape and Deployment Boundary](01-system-shape-and-deployment-boundary.md)
- [Repository and Application Organization](03-repository-and-application-organization.md)
- [Roles and Permissions](../03-product-structure/07-roles-and-permissions.md)
- [Error, Empty, Loading, Offline, and Degraded States](../03-product-structure/08-error-empty-and-degraded-states.md)
- [Scalability Guidelines](../03-product-structure/09-scalability-guidelines.md)

## Next decision

Define the frontend architecture and framework-selection requirements, including application composition, server and client boundaries, feature modules, Design System consumption, accessibility infrastructure, and browser support.
