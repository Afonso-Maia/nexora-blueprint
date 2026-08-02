# Scalability Guidelines

**Status:** Approved

## Purpose

This document defines how Nexora's Product Structure Architecture grows in catalog breadth, traffic, content, operations, workforce, providers, and feature complexity without fragmenting navigation, ownership, customer state, or governance.

It does not select implementation infrastructure. It establishes product, information, data-contract, and operational invariants that later system design must preserve.

## Decision

Nexora scales through **governed configuration, reusable templates, typed durable objects, stable ownership, and versioned contracts**.

Growth does not justify duplicate customer pages, parallel taxonomies, independent status models, role-specific Admin trees, or silent ownership transfer.

## Scalability dimensions

Every material change evaluates its impact across:

- Product and category breadth
- Governed attributes and filters
- Search corpus and query volume
- Pricing, inventory, order, and fulfillment volume
- Customer accounts and persistent work
- PC Builds and compatibility evaluations
- Support content, cases, evidence, and providers
- Promotions, collections, and editorial content
- Workforce users, roles, scopes, and approvals
- Reports, exports, audit, and retention
- Traffic peaks, campaigns, launches, and incidents
- Responsive, accessible, localized, and regional presentation

Brazil remains the approved target market. These guidelines support regional service, availability, and operational variation inside that scope without implying approved international expansion.

## Architectural invariants

The following remain true at every scale:

1. Search is global, persistent, and the primary discovery interaction.
2. Products retain exactly one canonical category.
3. Collections never replace categories.
4. Brands remain a parallel dimension.
5. Filters derive from governed attributes.
6. Compatibility has one deterministic shared authority.
7. AI consumes governed sources and cannot create competing taxonomy, eligibility, status, or permission truth.
8. Every page and durable object has one accountable owner.
9. Customer-facing workspaces summarize source-owned state without copying authority.
10. Historical commerce, consent, case, and audit facts are not silently rewritten.
11. Permission, field, and scope enforcement remains source-owned and deny-by-default.
12. Host-owned states preserve useful context; route-level recovery remains exceptional.

A proposal that breaks an invariant requires explicit impact review and, where cross-cutting or expensive to reverse, a superseding ADR.

## Page and template growth

### New-page threshold

A new canonical page is justified only when the experience requires a distinct:

- Durable user goal
- URL or deep-link identity
- Ownership boundary
- Access model
- Information hierarchy
- Lifecycle
- Search behavior
- Recovery boundary

Variation in category, product type, case type, content type, role, campaign, provider, or device does not by itself justify a new page.

### Prefer extension

Scale existing templates through:

- Governed schema and metadata
- Optional typed modules
- Category-specific attributes
- Case-type workflow modules
- Permission-aware workspace regions
- Versioned content and policy references
- Responsive presentation contracts

Optional modules declare applicability, owner, required data, state behavior, permissions, and fallback. They cannot rearrange the page's primary goal or violate its archetype contract.

### Inventory governance

Every new or materially changed destination updates:

- Canonical ID and page inventory metadata
- Relationship graph
- Ownership ledger
- Archetype mapping
- Required states
- Search and indexing behavior
- Access and shell
- Lifecycle and delivery horizon

No feature creates an undocumented route and later treats traffic as proof that the page belongs in the architecture.

## Taxonomy and catalog scale

### Category governance

Category growth preserves:

- One canonical category per product
- Stable category identifiers
- Governed parent-child relationships
- Explicit category lifecycle
- Product reassignment impact analysis
- Attribute eligibility and discovery metadata

New top-level categories require an ADR. Deep hierarchy is not automatically better; categories must remain customer-understandable and operationally governed.

### Attribute scale

Attribute definitions declare:

- Stable identifier and owner
- Value type, unit, and normalization
- Applicable categories
- Filter and comparison behavior
- Search contribution
- Compatibility use
- Localization and display rules
- Lifecycle, migration, and deprecation

Free-form supplier or content values do not enter governed filtering, comparison, or compatibility without normalization.

### Collections and merchandising

Collections and promotions scale independently from canonical taxonomy. They declare eligibility, schedule, ranking input, ownership, and expiry.

Expired merchandising cannot leave orphaned navigation, hidden taxonomy dependencies, or permanent ranking influence.

### Product lifecycle

Discontinued, replaced, unavailable, embargoed, or retired products retain stable identity and governed successor relationships where appropriate.

Retirement removes ineligible discovery and purchase behavior without destroying order, Support, build, policy, or audit references.

## Search and filtering scale

### Federated indexing

Universal Search preserves separated groups for Products, Categories, Brands, Collections, Buying Guides, PC Builds, Support content, and Promotions.

- Products rank first by default for commercial queries.
- New indexed types declare ownership, result contract, ranking role, access, freshness, and zero-result behavior.
- Personal and operational results remain separate from public results.
- Index lag is visible where it affects decisions.
- Source authorization is rechecked at result open and action time.

Adding content volume cannot turn the results page into an undifferentiated feed.

### Filter growth

Filters retain the hierarchy:

1. Quick Filters
2. Core Filters
3. Category Filters
4. Compatibility Filters
5. AI Filters

New filters require measurable decision value, governed attributes, represented active-result values, and a removal or deprecation path.

AI-generated intent may configure visible filters and ranking but cannot create hidden permanent filters or a parallel attribute model.

### Query and result state

Large result sets use stable query semantics, deterministic grouping, and continuation or pagination appropriate to the surface. Counts disclose freshness and partial coverage.

Saved queries and views store configuration, not copied result authority.

## Compatibility and PC Builder scale

Compatibility scales through versioned facts, rules, evaluations, and explanations owned by the shared Compatibility domain.

Every rule declares:

- Inputs and governed attribute versions
- Affected categories and component relationships
- Severity
- Explanation
- Test cases
- Activation and rollback
- Effective version
- Audit history

Rule volume does not justify a second Builder-specific compatibility model.

PC Builds remain durable objects across create, save, resume, duplicate, share, purchase, and upgrade. Build history references the compatibility and product facts applicable to its evaluation while current purchase actions revalidate against current authoritative state.

Hard incompatibilities remain non-overridable. Warnings retain explicit rationale and override provenance.

## Account and customer scale

Account remains a federated continuity hub.

- Dashboard modules aggregate source-owned state and degrade independently.
- Large histories use governed filtering, continuation, and archival without losing durable references.
- Current preferences remain separate from historical order, invoice, delivery, consent, and case facts.
- Guest-order claiming stays explicit, verified, idempotent, and non-duplicating.
- Account restriction evaluates capabilities rather than forcing whole-account lockout.
- Privacy requests remain durable orchestrated objects across participating domains.

Aggregation failure never fills the Account with additional merchandising.

## Support scale

### Content

Support Articles scale through structured intent, applicability, references, review, version, and localization metadata.

Search indexes only eligible published content. Material source changes flag dependent articles for review, and retired content uses governed successors or retirement explanations.

### Cases

All case types use the shared envelope and lifecycle. New case types extend modules and valid workflows rather than creating a new customer detail page.

Lifecycle, responsibility, obligations, escalation, evidence, provider work, and linked operational state remain separate dimensions.

Queues scale through governed priority, assignment, saved views, and obligations. Transfer does not reset service history.

### External providers

Provider growth uses organization-bound, case-linked work packages with attributable participants, minimum data, expiry, synchronization state, and a Nexora accountable owner.

Provider-specific terminology maps to customer-understandable state without overwriting provider source events or creating provider-specific customer IA.

## Administrative Dashboard scale

Admin navigation remains capability-based. New teams and organizational changes use roles, scopes, queues, and saved views instead of cloned page trees.

### Worklists

Large resource collections and queues preserve:

- Stable resource identifiers
- Governed filters and sort
- Explicit query scope
- Permission-consistent counts
- Safe continuation
- Selection semantics
- Asynchronous export and bulk operations

“All results” remains a query-bound selection with execution-time revalidation.

### Workspaces and changes

Resource workspaces scale through typed sections and change envelopes. High-volume edits use governed bulk operations rather than bypassing validation, preview, approval, execution, and item-level outcomes.

Concurrent work uses baseline revisions and explicit conflict handling. Locks and presence indicators may assist but do not replace revision checks.

### Reporting and audit

Operational Overview remains action-oriented. Historical and exploratory scale belongs to Reports and Analytics.

Audit growth preserves correlation, source and ingestion times, retention policy, field sensitivity, and append-only correction. Aggregation or archival cannot remove required provenance.

## Authorization scale

Growth in people, providers, automation, and domains uses:

- Stable role families
- Complete typed scopes
- Non-composable grants
- Deny-overrides evaluation
- Event-driven and periodic review
- Expiring delegation and JIT access
- Action-specific segregation
- Bounded break-glass packs

Role proliferation is a governance failure signal. New roles require durable job purpose; temporary work uses scoped time-bound access.

Authorization policy and hierarchy changes require simulation and effective-access impact analysis before activation.

Non-human identities require active accountable ownership and cannot use broad shared credentials.

## Data and contract evolution

### Stable identity

Products, categories, attributes, builds, orders, customers, cases, content, policies, providers, roles, grants, operations, and audit records use stable opaque identifiers.

Human-readable slugs and labels may change without becoming authoritative identity.

### Versioning

Version the contracts whose historical meaning or concurrent interpretation matters, including:

- Taxonomy and attribute definitions
- Compatibility rules and evaluations
- Prices, promotions, and publication revisions
- Legal and Support content
- Role, scope, denial, risk, and segregation policies
- Workflow and status mappings
- External-provider mappings

Consumers declare supported versions and degraded behavior. A version change cannot silently reinterpret historical records.

### Schema evolution

Schema changes use:

1. Proposed contract and owner
2. Consumer and data impact analysis
3. Backward-compatible transition where practical
4. Migration and validation
5. Observability
6. Deprecation notice
7. Removal criteria
8. Rollback or correction plan

Unknown fields or states never default to an unsafe allowed, eligible, compatible, paid, published, or completed interpretation.

### Ownership and events

Cross-domain events include stable object reference, event type, source version, source timestamp, idempotency or correlation reference, and owner.

Consumers build projections but do not become source truth. Delayed, duplicate, reordered, or conflicting events use explicit reconciliation semantics.

## Lifecycle, retention, and archival

Every durable object declares:

- Creation and activation
- Mutable and immutable fields
- Terminal and non-terminal states
- Retention owner and policy reference
- Archival and retrieval behavior
- Successor or replacement relationships
- Deletion, anonymization, or legal-hold constraints

Archival reduces active operational load without breaking eligible customer history, policy references, audit, Support, or ownership.

Retention periods remain policy data and are not invented by product architecture.

## Capacity and graceful degradation

Every critical capability defines:

- Capacity owner
- Service-level objective and measurement
- Peak and growth assumptions
- Admission, prioritization, and backpressure behavior
- Read and write degradation modes
- Queue or asynchronous continuation
- Recovery and reconciliation
- Customer and operator communication

Exact numeric targets remain implementation and operations policy, but the user-facing contract is architectural.

During pressure:

1. Preserve security, authorization, audit, and confirmed customer obligations.
2. Preserve purchase and post-purchase truth.
3. Preserve deterministic compatibility where required.
4. Defer optional recommendations, AI enrichment, editorial media, and non-critical analytics.
5. Never convert missing data into false availability, price, success, or eligibility.

Fairness and prioritization cannot silently starve older obligations, less common categories, guest users, assistive-technology users, or scoped operational queues.

## Performance and payload governance

Each page and operation defines governed performance budgets for:

- Initial useful content
- Interaction readiness
- Search and filter response
- Validation and compatibility evaluation
- Transaction acknowledgement
- Long-running operation acceptance
- Media and payload size
- Accessibility and assistive-technology behavior

Budgets are measured by surface, device, network condition, and meaningful user task. Exact targets remain implementation policy and may tighten without changing IA.

Progressive disclosure and incremental loading cannot defer the primary action, critical price or stock context, compatibility blocker, required evidence, or current obligation.

## Localization and regional variation

Portuguese for Brazil is the primary approved locale.

Regional tax, fulfillment, financing, service-area, provider, and policy variation uses governed applicability and versioning rather than duplicated page trees.

Missing translation follows the owning content or policy fallback contract and is never silently presented as an authoritative localized version when it is not.

Future locale or market expansion would require explicit product, legal, taxonomy, payment, fulfillment, Support, and governance review. It is not approved by this guideline.

## Responsive and accessibility scale

New modules and resource volume preserve:

- Semantic hierarchy
- Keyboard and assistive-technology access
- Focus and announcement behavior
- Text alternatives and structured relationships
- Non-color status meaning
- Zoom, reflow, and compact presentation
- Safe larger-workspace guards for genuinely high-density Admin tasks

Volume is not a reason to hide critical obligations, collapse explanation, or require pointer-only interaction.

## Change triggers

A scalability review is required when a proposal introduces:

- A new top-level category
- A new canonical page or shell
- A new indexed result type
- A new durable object or lifecycle
- A new source-of-truth domain
- A new compatibility semantic
- A new case family
- A new provider access model
- A new role family or scope type
- A new high-risk operation
- A new market, locale, or policy jurisdiction
- A material order-of-magnitude capacity change
- A new retention or archival class

The review identifies affected documents, owners, contracts, states, permissions, migrations, observability, and ADR need.

## Architecture validation

The Scalability Guidelines pass their Phase 2B topic validation:

- Growth uses existing page templates and typed modules unless the new-page threshold is met.
- Taxonomy, attributes, search, filters, and Compatibility retain one governed model each.
- Account, Support, PC Builder, and Admin scale through durable objects and projections without copying authority.
- Workforce and provider growth uses scoped roles and expiring grants rather than role- or provider-specific page trees.
- State, permission, event, and schema evolution fail safely on unknown or stale inputs.
- Historical records retain stable identity, version context, and provenance.
- Capacity degradation preserves security, commerce truth, customer obligations, and deterministic compatibility ahead of optional enrichment.
- Regional and localization variation does not create ungoverned duplication.
- Growth triggers explicit impact review and ADR evaluation.

No unresolved scalability alternative is recorded as approved.

## Next phase topic

Perform Phase 2B Architecture Validation.
