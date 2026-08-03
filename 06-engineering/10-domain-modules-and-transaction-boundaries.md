# Domain Modules and Transaction Boundaries

**Status:** Approved

## Purpose

This document maps approved product authority into implementation modules, aggregates, application services, transactions, cross-module collaboration, provider ports, and extraction triggers.

It defines logical and data ownership inside the modular authoritative core. A module is not automatically a package, database, process, team, or independently deployed service.

## Decision

Organize Nexora around **ledger-aligned authoritative modules with owner-led transaction boundaries**.

Use three implementation classifications:

1. **Authoritative domain modules** — own durable business facts, rules, lifecycle, and mutations
2. **Composition and governance modules** — own governed configuration, projections, or cross-surface continuity without absorbing source records
3. **Platform capabilities and adapters** — provide technical mechanisms or isolate external systems without owning commerce truth

Each durable object and consequential operation has one authoritative module. Cross-module collaboration uses public queries, commands, events, or workflows. Direct cross-module storage access is prohibited.

A transaction has one accountable owner. Multi-module atomic participation is exceptional, uses public module contracts, and is recorded in a transaction-boundary register.

## Module contract

Each module declares:

- Name and approved source authority
- Purpose and non-goals
- Owned aggregates and identifiers
- Invariants and lifecycle
- Public queries and commands
- Transaction boundary
- Domain and integration events
- Consumed contracts
- Provider ports
- Authorization enforcement points
- Data classification and retention
- Idempotency, concurrency, and reconciliation
- Failure and degraded behavior
- Operational diagnostics
- Extraction triggers

Modules expose behavior and owned representations. They do not expose mutable persistence entities.

## Authoritative domain modules

### Catalog

Owns:

- Product identity and lifecycle
- Canonical category assignment
- Category hierarchy
- Brand identity and relationships
- Attribute definitions, units, values, applicability, and versions
- Product specifications and governed compatibility-input facts
- Publication state for catalog records
- Product media references and their intended role

Primary aggregates:

- Product
- Category
- Brand
- Attribute Definition

Catalog does not own price, inventory, reviews, Compatibility rules, merchandising membership, Search ranking, or media binary processing.

Attribute and taxonomy changes expose impact to Discovery, Compatibility, Marketing, and existing products before approval.

### Compatibility

Owns:

- Deterministic relationship and rule semantics
- Rule sets, rule versions, tests, activation, and rollback
- Evaluation and explanation contracts
- Compatibility severity and hard-block meaning
- Rule coverage and diagnostic evidence

Primary aggregates:

- Compatibility Rule Set
- Compatibility Rule Version
- Activation Record

Evaluations may be computed values or retained evidence according to later policy. Catalog owns input facts; Compatibility rejects missing, unsupported, or stale input explicitly.

PC Builder, Product Detail, Comparison, Cart, Checkout, Support, Admin, and AI consume Compatibility but cannot override hard incompatibility.

### Pricing

Owns:

- Authoritative sell prices
- Price books or equivalent applicability
- Price schedules and effective periods
- Pricing rules and precedence
- Price calculation and quote explanation
- Price history required for governance
- Financing presentation inputs owned by Nexora

Primary aggregates:

- Price Assignment
- Price Rule
- Price Schedule

Pricing does not own product identity, promotion editorial definition, inventory, payment authorization, Cart, or order lifecycle.

Marketing-owned promotions may propose commercial effects; Pricing owns the authoritative price effect and calculation contract.

### Inventory

Owns:

- Stock positions
- Inventory locations or logical pools
- Availability calculation
- Reservations and releases
- Adjustments and reason taxonomy
- Source precedence and reconciliation
- Inventory freshness and confidence

Primary aggregates:

- Stock Position
- Inventory Reservation
- Inventory Adjustment

Inventory does not own Cart lines, order lifecycle, fulfillment state, or product facts.

Reservations use explicit expiry, idempotency, ownership, and reconciliation. A displayed availability projection is not a reservation.

### Purchase

Owns:

- Cart identity, lines, merge, expiry, and lifecycle
- Checkout composition and progress
- Order intent
- Authoritative order identity and lifecycle
- Order commercial snapshots and action eligibility
- Customer and guest order access relationships within Purchase scope
- Order-level cancellation, return, and remedy coordination where approved

Primary aggregates:

- Cart
- Checkout Session
- Order

Purchase coordinates Pricing, Inventory, Payments, Fulfillment, Compatibility, Customer, Notifications, and policy inputs without absorbing their specialist state.

The approved Blueprint uses Purchase—not a separate Orders authority—for order lifecycle. Orders remain an aggregate and capability area within Purchase unless a future governance decision transfers ownership.

### Payments

Owns:

- Nexora payment intent and attempt state
- Payment authorization, capture, void, refund, and failure mapping
- Provider transaction references
- Payment-method token references and payment-specific controls
- Payment and refund reconciliation

Primary aggregates:

- Payment Intent
- Payment Attempt
- Refund
- Payment Instrument Reference

Raw payment credentials and provider vault records remain outside Nexora where provider tokenization permits. Payments does not own Checkout, order lifecycle, financing legal terms, or customer preference labels.

### Fulfillment

The approved documentation uses Delivery or Fulfillment for shipment authority. Engineering standardizes the module name as **Fulfillment**, while retaining Delivery as customer-facing terminology where appropriate.

Owns:

- Fulfillment units and allocation after order creation
- Shipment and package lifecycle
- Carrier mapping and tracking state
- Delivery estimates and delivery outcome
- Partial fulfillment, failed delivery, return logistics, and reconciliation

Primary aggregates:

- Fulfillment
- Shipment
- Return Shipment

Fulfillment does not own inventory positions, Purchase order lifecycle, refund execution, or Support case state.

### Customer

Owns:

- Customer profile
- Customer preferences
- Wishlist
- Address book records
- Customer-to-object continuity relationships
- Account-facing restrictions and explanation within Customer scope
- Unified preference experience

Primary aggregates:

- Customer Profile
- Wishlist
- Address Book
- Customer Preference Set

Customer does not own orders, payments, fulfillment, Support cases, PC builds, AI conversations, or source notification events merely because Account presents them.

### Support

Owns:

- Support routing and triage
- Support content and applicability
- Shared typed case envelope
- Case type and lifecycle
- Participants and visibility
- Case communication association
- Evidence references
- Obligations, service clocks, escalation, and handoff
- Bounded external work packages

Primary aggregates:

- Support Article
- Support Case
- Support Obligation
- External Work Package

Support coordinates Purchase, Payments, Fulfillment, Inventory, Catalog, Compatibility, PC Builder, Legal, repair operations, and providers. It cannot claim their outcomes before authoritative confirmation.

Messaging owns channel delivery state; Support owns case meaning and conversation association.

### PC Builder

Owns:

- Build identity and lifecycle
- Build selections and slot state
- Guest draft claim behavior
- Save, resume, duplicate, archive, share, revoke, and Cart-conversion intent
- Build-specific derived budget and performance presentation

Primary aggregates:

- PC Build
- Build Share

PC Builder does not own product facts, price, inventory, Compatibility rules, or Cart. It records source versions used for a build and refreshes or marks them stale.

### AI Conversation

The AI domain owns conversational continuity while the independently deployed AI Orchestration Runtime owns model and tool execution.

Owns:

- Conversation identity and lifecycle
- Messages and attributable participants
- User-visible provenance references
- Guest and account persistence relationship
- Share, retention, and deletion state
- Consent and approved context boundaries

Primary aggregate:

- AI Conversation

Generated output is not authoritative product, compatibility, price, inventory, eligibility, permission, order, or case state.

### Identity

Owns:

- Customer and workforce identity references
- Authentication methods and credentials
- Sessions and devices
- Verification and recovery contexts
- Assurance state and step-up challenges
- Identity lifecycle, revocation, and anti-enumeration behavior
- Service and automation identity registration

Primary aggregates:

- Identity
- Authentication Method
- Session
- Assurance Challenge
- Recovery Context

Identity does not own source-resource authorization policy or customer profile content beyond identity requirements.

### Roles and Permissions

Owns:

- Capability definitions and verbs
- Role definitions and versions
- Grants, scopes, conditions, field scope, and assurance requirements
- Deny-overrides evaluation semantics
- Delegation and temporary access
- Segregation constraints
- Access review
- Break-glass policy and activation records
- Non-human authorization assignments

Primary aggregates:

- Capability
- Role Version
- Access Grant
- Delegation
- Access Review
- Break-Glass Activation

Source modules own resource facts and enforce decisions. The authorization module supplies governed policy and decision context but cannot infer source relationships independently.

### Reviews

Owns:

- Review identity and content
- Rating values and aggregate derivation
- Moderation lifecycle
- Eligibility evidence reference
- Appeals and moderation audit

Primary aggregates:

- Review
- Moderation Case

Reviews does not own product identity, customer identity, Legal policy, or Support outcomes.

### Marketing

Owns:

- Collections and membership
- Campaigns and editorial merchandising
- Buying guides and company content
- Promotion definition, schedule, targeting intent, and editorial presentation
- Delegated public brand content
- Content review, expiry, and publication within Marketing scope

Primary aggregates:

- Collection
- Campaign
- Buying Guide
- Promotion Definition
- Marketing Content

Marketing does not own canonical taxonomy, product facts, authoritative price effects, purchase eligibility, inventory, or Legal policy.

Promotion collaboration is explicit:

- Marketing owns definition and presentation.
- Pricing owns authoritative price effects.
- Purchase owns Cart and Checkout eligibility and application.
- Inventory owns availability.
- Legal owns applicable policy meaning.

### Legal and Policy

Owns:

- Legal and policy document identity
- Immutable versions
- Applicability and effective periods
- Publication, withdrawal, and successor
- Required specialist approvals
- Legal consent requirements

Primary aggregates:

- Policy Document
- Policy Version
- Consent Requirement

The domain that collects consent owns the acceptance record tied to the Legal version, unless later policy assigns a dedicated consent record owner.

Legal does not own the operational facts described by a policy.

### Notifications

Owns:

- In-app notification record
- Source-event reference
- Recipient and visibility
- Read, archive, and expiry state
- Notification preference projection where assigned
- Link to authoritative destination

Primary aggregate:

- Notification

Source domains own triggering facts. Messaging owns channel delivery. A notification is not proof of source completion and never grants access.

### Messaging

Owns:

- Channel delivery request
- Template rendition used for delivery
- Provider message reference
- Queue, attempt, delivery, bounce, suppression, and failure state
- Channel-level deduplication and reconciliation

Primary aggregates:

- Message Delivery
- Delivery Attempt
- Suppression

Messaging does not own order, case, notification meaning, or source event truth.

### Privacy and Governance

Owns:

- Privacy-request policy and scope
- Request lifecycle and status determination
- Cross-domain collection and deletion coordination
- Completion evidence
- Legal hold and exception coordination within approved policy

Primary aggregate:

- Privacy Request

Source domains own their records and execute approved export, correction, restriction, retention, or deletion obligations. Privacy and Governance cannot rewrite source outcomes directly.

### Audit

Owns:

- Append-only attributable audit entries
- Correlation across request, authorization, approval, execution, and source outcome
- Integrity, retention, access, and export rules for audit evidence

Primary aggregate:

- Audit Entry or append-only Audit Stream

Audit records evidence and observed outcomes. They do not replace authoritative object state, operation state, or provider reconciliation.

## Composition and governance modules

### Discovery Governance

Owns:

- Indexed-type participation policy
- Synonyms, aliases, query rules, and governed ranking configuration
- Search experiments and rollback
- Search diagnostics and freshness policy

The independently deployed Search capability owns index and query runtime operation. Source domains own indexed entities. Discovery Governance does not mutate Catalog, price, inventory, Support, or AI records.

### Admin Platform

Owns:

- Admin shell configuration
- Capability-navigation mapping
- Shared worklist and workspace interaction contracts
- Saved-view definitions
- Safe recent-work references
- Operations Overview composition
- Cross-workspace return context

Admin Platform does not own source resources or preserve authority inside saved views, links, selections, or recents.

### Reporting and Analytics

Owns:

- Metric definitions and versions
- Analytical models and lineage
- Report definitions
- Historical and exploratory projections

Source domains own operational truth. Analytical results declare freshness and cannot authorize or execute source actions.

### Platform Routing and Recovery

Owns:

- Route registry
- Retired-route successors
- Common recovery infrastructure
- Connectivity and local recovery detection
- Safe correlation presentation

Affected source domains own underlying faults and recovery of their capability.

### Platform Operations

Owns:

- Service-state and incident records
- Incident coordination
- Operational health aggregation
- Public service communication workflow

Platform Operations cannot change domain outcomes to resolve an incident cosmetically.

## Platform capabilities and adapters

Platform capabilities include:

- Persistence and migration mechanisms
- Messaging and scheduling
- Object storage and media processing
- Cache infrastructure
- Search engine integration
- AI model-provider integration
- Observability
- Secrets and workload identity
- Feature and configuration delivery
- Rate limiting and abuse protection

Adapters isolate:

- Payment and financing providers
- Carriers and fulfillment providers
- Repair providers
- Identity providers
- Email, SMS, push, and communication providers
- Media and malware-scanning providers
- AI model and retrieval providers
- Analytics and consent providers

Capabilities and adapters implement owned ports. They cannot contain domain policy that has no authoritative module owner.

## Aggregate rules

An aggregate:

- Protects invariants that must hold within one transaction.
- Has one owning module and stable identity.
- Exposes commands rather than unrestricted setters.
- Emits facts after accepted state change.
- Does not contain another module's mutable aggregate.
- References external aggregates by opaque identifier and recorded version where needed.

Not every database table is an aggregate. Read models, join projections, event records, audit entries, and provider mappings may use different persistence patterns.

Avoid aggregates so large that unrelated changes contend, and avoid tiny aggregates that require distributed coordination for one invariant.

## Application services

Application services:

- Accept validated intent and identity context.
- Load owned aggregates.
- Invoke domain behavior.
- Coordinate public module contracts.
- Persist through an owned transaction.
- Record durable publication intent.
- Return authoritative outcomes or operation references.

They do not:

- Contain duplicated domain rules.
- Mutate another module's storage.
- Trust BFF-calculated permission or price.
- Hold open transactions across remote provider calls.
- Publish events before source commit.

## Transaction boundaries

### Default

One authoritative module owns one local transaction.

Examples:

- Catalog publishes a Product version.
- Customer changes Wishlist membership.
- Support transitions a Case.
- PC Builder saves a Build.
- Roles and Permissions creates a Grant.

### Owner-led local collaboration

Because modules co-deploy, an owner may invoke another module's public command inside one local transaction only when:

- One user-visible invariant truly requires atomicity.
- Both modules support the transaction explicitly.
- Lock order and failure behavior are defined.
- No remote provider participates.
- The dependency is acyclic.
- Architecture tests and integration tests cover it.
- The transaction-boundary register records owner, participants, invariant, timeout, and extraction consequence.

This is exceptional, not a convenience for avoiding workflow design.

### Workflow

Use a durable workflow when:

- A provider or independent runtime participates.
- Work may outlive the request.
- Compensation or correction is possible.
- Partial effect must be observed.
- Retry, timeout, or manual intervention is expected.
- Atomicity is not technically or operationally credible.

Checkout and order creation receive a dedicated later decision before their final boundary is registered.

## Cross-module collaboration

Use, in preference order:

1. **Owned query** for current facts
2. **Application coordination** for one request use case
3. **Owned command** for another module's mutation
4. **Domain event** for same-boundary reaction
5. **Integration event** for independently deployable consumers
6. **Durable workflow** for multi-step consequential coordination

A module cannot subscribe to an event and treat delayed derived state as current command authorization when a source query is required.

## Event ownership

The source module owns event meaning and schema.

Events include:

- Stable event identity
- Source aggregate identity and version
- Occurrence and publication time
- Correlation and causation
- Schema version
- Data classification
- Minimal facts required by consumers

Consumers own their reaction, retries, and projection. They cannot reinterpret the event as broader authority.

Detailed event, queue, ordering, and delivery architecture follows a later decision.

## Provider ports

Provider ports use Nexora domain language and expose:

- Requested capability
- Stable Nexora intent identity
- Provider-independent input
- Accepted, rejected, pending, failed, or indeterminate result
- Provider reference isolated in adapter metadata
- Retry and reconciliation operations

Adapters:

- Authenticate provider traffic.
- Map statuses without leaking provider lifecycle into domain models.
- Enforce timeout, rate, idempotency, callback, and signature behavior.
- Persist enough mapping for reconciliation.
- Redact provider secrets and sensitive payloads.

A provider SDK does not enter domain modules.

## Dependency direction

Allowed:

- BFFs → application contracts
- Application services → owned aggregates and public module ports
- Domain modules → narrowly governed foundations and owned ports
- Adapters → ports and public schemas
- Projections → source events and authorized queries

Prohibited:

- Domain module → BFF or frontend
- Domain module → provider SDK
- Source module → another module's persistence
- Audit, Search, AI, Admin, or Analytics → source mutation by projection
- Circular command dependencies

When two modules require mutual synchronous commands, the boundary or workflow is unresolved and must be redesigned.

## Extraction triggers

A module or capability becomes an independent runtime only when evidence shows a durable distinction in:

- Data or compliance isolation
- Transaction independence
- Scaling and resource profile
- Reliability or degradation
- Security boundary
- Provider isolation
- Release independence
- Team accountability

Extraction additionally requires:

- Stable public contracts
- No direct storage dependency
- Explicit consistency and freshness
- Event and workflow reliability
- Independent migration and rollback
- Workload identity and authorization
- Observability and operational owner
- Local-development and incident plan

Domain importance or code size alone is insufficient.

## Initial extraction posture

| Capability | Initial posture |
| --- | --- |
| Catalog, Compatibility, Pricing, Inventory, Purchase, Payments, Fulfillment, Customer, Support, PC Builder, Identity, Roles and Permissions, Reviews, Marketing, Legal, Notifications records, Privacy, Audit | Co-deployed authoritative core modules |
| Search query and indexing | Independently deployed capability consuming source contracts |
| AI orchestration | Independently deployed capability; AI conversation authority remains governed |
| Core background work | Separate worker process, same module ownership |
| Media processing | Worker capability; extraction when resource or security evidence requires |
| Messaging delivery | Worker capability with independent scaling option |
| Provider adapters | Co-deployed or worker-isolated initially; extract per provider risk and availability |
| Analytics | Derived pipeline or capability; never source authority |

The table does not prescribe one database or schema topology; that follows the data architecture decision.

## Rejected alternatives

### Service per business noun

Turning Catalog, Orders, Cart, Checkout, Wishlist, Returns, Promotions, and every Admin area into separate services would mistake vocabulary for deployment justification and introduce distributed invariants prematurely.

### One commerce module

A single broad Commerce module would simplify transactions but erase approved ownership, make authorization and change impact unclear, and allow internal models to become shared mutable state.

### Shared data model

A canonical enterprise entity model appears to reduce duplication but couples modules to one representation and obscures which domain may change a fact.

## Validation

This decision:

- Preserves the complete ownership ledger.
- Keeps Purchase authoritative for Cart, Checkout, and orders.
- Keeps Catalog inputs separate from Compatibility rules.
- Preserves Marketing, Pricing, Purchase, and Inventory promotion responsibilities.
- Keeps Account, Support, Admin, Search, AI, Notifications, Audit, and Analytics from absorbing source truth.
- Provides credible local transactions without unrestricted cross-module mutation.
- Supports future extraction without promising service proliferation.

## Consequences

### Benefits

- Domain authority becomes enforceable in code and data access.
- Transactions remain local where credible.
- Provider and asynchronous failure cannot silently alter source models.
- Each module has clear extraction evidence and contracts.
- Admin and customer composition remain subordinate to source ownership.

### Costs and risks

- The module map is broader than the initial team structure and needs pragmatic stewardship.
- Promotion, notification, privacy, and operational coordination cross several owners.
- Exceptional cross-module transactions require a maintained register.
- Incorrect aggregate sizing could create contention or excessive workflow.

## Governance

- New modules require a durable authority or platform responsibility, not a page name.
- Ownership transfers require Blueprint review and ADR evaluation.
- Cross-module transactions require explicit registration.
- Direct cross-module storage access is prohibited.
- Provider adapters cannot become lifecycle authority.
- A material change to the module map, transaction default, or extraction threshold requires a superseding ADR.

## References

- [ADR-0016: Ledger-Aligned Domain Modules and Owner-Led Transactions](../adrs/ADR-0016-domain-modules.md)
- [Page Relationships and Domain Ownership](../03-product-structure/02-page-relationships-and-ownership.md)
- [Account and Post-Purchase Architecture](../03-product-structure/04-account-architecture.md)
- [Support Center Architecture](../03-product-structure/05-support-center-architecture.md)
- [Administrative Dashboard Information Architecture](../03-product-structure/06-administrative-dashboard-ia.md)
- [Roles and Permissions](../03-product-structure/07-roles-and-permissions.md)
- [System Shape and Deployment Boundary](01-system-shape-and-deployment-boundary.md)
- [Repository and Application Organization](03-repository-and-application-organization.md)
- [API and Backend-for-Frontend Strategy](09-api-and-bff-strategy.md)

## Next decision

Define data ownership, physical storage topology, schema boundaries, identifiers, consistency, migrations, retention, archival, backups, and deletion propagation.
