# System Shape and Deployment Boundary

**Status:** Approved

## Purpose

This document establishes the initial Phase 4 system shape and the threshold for creating independently deployed capabilities.

It defines deployment direction, not a technology stack. Later decisions must select repository organization, application boundaries, contracts, storage, identity, authorization evaluation, events, infrastructure, and implementation technologies without weakening the approved ownership model.

## Decision

Adopt the following directional architecture:

`Experience applications → BFF and application layer → governed domain modules → platform adapters → infrastructure`

Use a **modular authoritative core** as the default deployment boundary for commerce authority. The core is a modular monolith with explicit domain modules, owned data, governed internal contracts, defined transaction boundaries, background workers, and architecture enforcement.

Capabilities may deploy independently when a durable operational distinction justifies the distributed-systems cost. Initial candidates include:

- Search indexing and query infrastructure
- AI orchestration
- Media processing
- Notifications
- Long-running jobs and workflow workers
- Selected external-provider adapters

Candidate status does not approve independent deployment by itself. Each boundary requires a focused decision based on its data, transactions, scale, degradation, security, integration, deployment, and ownership requirements.

## Layer responsibilities

### Experience applications

Customer Website, Administrative Dashboard, Support, PC Builder, and AI experiences present approved pages, templates, permissions, states, and responsive behavior. They do not become authoritative merely because they compose a workflow.

### BFF and application layer

The BFF and application layer compose experience-specific reads and use cases, propagate identity and authorization context, coordinate governed operations, and translate contracts for their consumers.

This layer cannot own domain truth, bypass source-module authorization, or create competing lifecycle and status models. Separate BFFs require durable consumer, assurance, performance, release, or degradation needs rather than UI naming alone.

### Governed domain modules

Domain modules own authoritative rules, data, mutations, and transaction boundaries according to the approved ownership ledger. In particular:

- Catalog owns product data, taxonomy, and governed attributes.
- Compatibility owns deterministic rules, evaluation, versioning, and explanations.
- Pricing owns authoritative prices and pricing rules.
- Inventory owns quantities, reservations, and availability truth.
- Purchase owns Cart, Checkout composition, and authoritative orders under the approved ownership ledger.
- Customer owns continuity and preferences, not every object visible in Account.
- Support owns cases, communication, evidence, obligations, and coordination.
- Identity and Security own authentication and assurance responsibilities.
- Approved Roles and Permissions semantics govern authorization; authoritative source modules enforce access.
- Admin coordinates source-owned work through governed application gateways.
- AI consumes authoritative sources and cannot create source truth.
- Audit records attributable activity and correlated outcomes but does not replace source outcomes.

Module boundaries must be enforceable. A module cannot read or mutate another module's private storage directly. Cross-module access uses an owned contract, and consequential mutations retain one accountable transaction or workflow owner.

### Platform adapters

Adapters isolate infrastructure and external providers from domain policy. They translate governed contracts, apply provider-specific resilience, and expose operational outcomes without allowing provider representations to become Nexora lifecycle truth.

### Infrastructure

Infrastructure supplies runtime, persistence, messaging, caching, secrets, observability, and deployment mechanisms. Technology selection cannot silently alter domain ownership, consistency promises, authorization behavior, accessibility, or operation semantics.

## Independent-deployment threshold

A separate deployment must have a durable distinction in one or more of:

- Data ownership
- Transaction boundary
- Scaling profile
- Reliability or degradation behavior
- Security boundary
- Deployment independence
- External integration
- Team accountability

Naming correspondence with a product domain, page group, or Admin navigation area is insufficient.

Before extraction or independent deployment, the proposal must define:

1. Authoritative data and mutation ownership
2. Synchronous and asynchronous contracts
3. Consistency, freshness, and reconciliation behavior
4. Idempotency and duplicate-delivery handling
5. Authentication, authorization, and field-scope enforcement
6. Failure, timeout, retry, fallback, and degraded-mode behavior
7. Versioning, migration, rollback, and compatibility policy
8. Observability, correlation, audit, and operational ownership
9. Capacity need and measurable operational benefit
10. Local development, testing, and incident-response consequences

## Transaction and data boundaries

The modular core does not imply shared authority. Each module owns its model and storage contract even when modules initially share a database technology or deployment.

Cross-module table access and ungoverned shared models are prohibited. Atomic local transactions are preferred where one authoritative operation requires them. Asynchronous events are used for reactions, projections, integration, and work that may complete later.

Where a workflow crosses transaction boundaries, it must declare its durable state, accountable coordinator, idempotency keys, retries, timeouts, compensation or corrective action, reconciliation, and customer-visible outcome. Eventual consistency must be explicit rather than hidden behind optimistic presentation.

## Selective deployment direction

The following characteristics make the initial candidates credible without pre-approving them:

- Search has distinct indexing, query, freshness, ranking, and degradation behavior.
- AI orchestration has distinct safety, grounding, provenance, cost, latency, and provider concerns.
- Media processing and long-running work have asynchronous scaling and retry profiles.
- Notifications react to source-owned events and must not become lifecycle authority.
- External-provider adapters may require isolation for credentials, rate limits, callbacks, and provider failure.

Authoritative commerce operations remain in the modular core unless a later approved decision demonstrates that an independent boundary improves the system without obscuring transaction or source-of-truth semantics.

## Rejected alternative

A distributed-services-first architecture aligned to major commerce and operational domains is viable for an organization with independently accountable teams, mature platform operations, and demonstrated scaling or isolation requirements.

Nexora does not adopt it initially. It would introduce distributed transactions, broader eventual consistency, contract and deployment coordination, more complex local development, and greater observability and incident-response demands before those costs are justified by the initial team or workload.

## Consequences

### Benefits

- Authoritative commerce operations can use clear local transaction boundaries.
- A small team can build, test, deploy, and diagnose the system without premature platform overhead.
- Domain and data ownership remain explicit and enforceable.
- Independently scaling or failure-prone capabilities can be isolated selectively.
- Versioned contracts and owned boundaries preserve an evolution path without promising extraction.

### Costs and risks

- Architecture enforcement is required to prevent an undifferentiated monolith.
- Shared infrastructure can conceal ownership violations if private storage is not protected.
- Selective extraction still requires contract, migration, and operational work.
- Background and provider operations require durable workflows rather than in-process assumptions.

## Governance

- Source ownership follows the approved [Page Relationships and Domain Ownership](../03-product-structure/02-page-relationships-and-ownership.md).
- Domain and deployment boundaries are different decisions and must not be conflated.
- Every consequential operation identifies its authority, transaction or workflow owner, idempotency behavior, failure semantics, and observable outcome.
- Architecture checks must enforce allowed dependencies and prevent private cross-module storage access.
- A new independent deployment requires an explicit boundary review.
- A material change to the default authoritative-core strategy or independent-deployment threshold requires a superseding ADR.

## References

- [ADR-0008: Modular Authoritative Core and Selective Deployment Boundaries](../adrs/ADR-0008-modular-authoritative-core.md)
- [Global Product Architecture](../02-information-architecture/01-global-architecture.md)
- [Page Relationships and Domain Ownership](../03-product-structure/02-page-relationships-and-ownership.md)
- [Roles and Permissions](../03-product-structure/07-roles-and-permissions.md)
- [Error, Empty, Loading, Offline, and Degraded States](../03-product-structure/08-error-empty-and-degraded-states.md)
- [Scalability Guidelines](../03-product-structure/09-scalability-guidelines.md)
- [Design System Architecture](../04-design-system/01-system-architecture.md)
