# Administrative Dashboard Information Architecture

**Status:** Approved in part — navigation model approved; detailed behavior pending

## Purpose

This document defines how authorized workforce users navigate Nexora operations, find governed resources, move between related workspaces, and act within permission boundaries.

It builds on the approved [Page Inventory](01-page-inventory.md), [relationships and ownership](02-page-relationships-and-ownership.md), [Information Hierarchy](03-information-hierarchy.md), [Account Architecture](04-account-architecture.md), and [Support Center Architecture](05-support-center-architecture.md).

## Decision

Nexora uses **stable capability-based Admin navigation**.

The Admin shell is organized around durable operational capabilities rather than organizational charts, individual job titles, or temporary assignments. Personal queues, saved views, recent objects, and alerts augment this structure without replacing it.

## Primary Admin navigation

The conceptual navigation is:

1. **Overview**
2. **Catalog**
   - Products
   - Categories
   - Brands
   - Attribute Definitions
   - Compatibility Rules
3. **Commerce Operations**
   - Inventory
   - Pricing
   - Orders
4. **Customers and Support**
   - Customers
   - Support Queue
5. **Content and Growth**
   - Collections
   - Promotions
   - Content Library
   - Search Governance
   - Review Moderation
6. **Access and Governance**
   - Workforce Users
   - Roles
   - Audit Log
   - Operational Settings
7. **Insights**
   - Reports and Analytics

These are navigation groups, not additional canonical pages. Each listed destination uses its approved inventory entry.

## Navigation stability

Section names, resource ownership, and canonical routes remain stable across workforce roles. Permissions adapt what a user may discover and do; they do not create a different information architecture for every team.

1. Users see navigation destinations they are authorized to discover.
2. Counts, badges, summaries, and alerts follow the same permission and data-scope rules as their destinations.
3. A hidden destination is not an authorization control; every route and operation independently enforces access.
4. Direct links preserve a safe intended destination through authentication or step-up when eligible.
5. Revoked or insufficient access produces a non-disclosing boundary and safe return path.
6. A user with partial field access can reach an eligible workspace without receiving restricted values in navigation labels, previews, search, or counts.
7. Temporary assignments can add queues or saved views without renaming or relocating the canonical capability.

Exact roles, permissions, field restrictions, approvals, and segregation-of-duties rules remain governed by the later Roles and Permissions architecture.

## Object-centered transitions

Admin collection and queue pages lead to durable object workspaces. Related resources use explicit contextual links, including:

- Product to Category, Brand, Attributes, Compatibility, Inventory, Pricing, Reviews, and customer-facing preview
- Order to Customer, payment, fulfillment, Support Case, and audit context
- Customer to eligible Orders and Support Cases
- Content or promotion to governed products, collections, publication state, and preview
- Workforce user or role to permitted access and audit context

Contextual links do not duplicate source records or transfer ownership. The destination identifies its owning capability and rechecks authorization, resource scope, current state, and permitted actions.

Cross-domain navigation preserves a safe origin and relevant object reference when useful. Returning may restore eligible list filters, saved view, selection, or scroll context. It never replays a mutation or carries sensitive values in URLs.

## Operational discovery

Admin operational search, saved views, recents, and alerts are permission-filtered discovery mechanisms.

- Operational search returns only resource types, records, fields, and actions the user may discover.
- Result grouping communicates the owning capability.
- Saved views retain governed filters and presentation, not access rights.
- Recent-resource history excludes or redacts objects after access changes.
- Alerts link to the authoritative queue or workspace and cannot grant access or preserve stale action eligibility.
- Shared URLs identify the resource or governed view; recipients independently resolve their permitted representation.

Public customer Universal Search does not index Admin destinations or operational records.

## Responsive continuity

Compact and mobile Admin layouts preserve the same conceptual groups and canonical destinations. Navigation may collapse into a drawer or switcher, while workspace controls progressively disclose according to the approved Admin archetype contracts.

High-density, comparison-heavy, or bulk operations may require a guarded larger-workspace mode as approved in the Information Hierarchy. The user receives a clear explanation and safe continuation path; the underlying resource does not move to a different IA.

## Governance rules

1. Admin Platform owns the shared shell, navigation system, operational discovery, and cross-workspace continuity.
2. Each destination and resource retains the owner recorded in the ownership ledger.
3. Organizational restructuring alone does not rename or relocate canonical capabilities.
4. New navigation groups require a durable capability distinction, not merely a new team.
5. Cross-domain summaries cite source state and do not become parallel records.
6. Counts and previews never expose restricted object existence or sensitive field values.
7. Permission changes take effect across navigation, search, recents, saved views, deep links, and active workspaces.
8. AI may help locate or summarize permitted operational context but cannot expand discovery or action scope.

## Exception-and-work Operations Overview

ADM-001 Operations Overview is an actionable operational hub rather than a KPI-first executive dashboard. It aggregates permission-filtered conditions and routes the user to the authoritative queue or workspace where work occurs.

### Priority order

Applicable modules follow this deterministic order:

1. Security, compliance, or platform-critical action
2. Customer-impacting order, payment, delivery, or Support exception
3. Breached or at-risk operational obligation
4. Inventory, pricing, catalog, compatibility, or publication blocker
5. Pending approval or review
6. Scheduled work and expiring configuration
7. Trends and health summaries

Within a tier, governed severity, due expectation, customer impact, assignment, and recency determine order. Permission and data scope filter eligibility before prioritization.

### Module contract

Every Overview module declares:

- Authoritative source domain and source timestamp
- Personal, team, or organization scope
- Severity and prioritization reason
- Affected object count or explicitly unavailable count
- Responsible capability
- Primary queue or workspace destination
- Permitted primary action
- Stale, partial, restricted, or degraded state

Counts and summaries use the same scope as their destination. A module cannot imply access to restricted objects or include inaccessible records in a visible total.

### Scope and personalization

Personalization may use:

- Current permissions and data scope
- Accepted assignments
- Saved operational scope
- Recent eligible work
- Explicitly followed queues

Personalization cannot hide a critical governed obligation that the user is accountable for. Personal, team, and organization scopes are visibly distinguished, and switching scope does not grant broader access.

The Overview omits empty optional modules. A user with no assigned work receives stable capability navigation, eligible followed queues, and useful setup guidance rather than fabricated urgency or additional vanity metrics.

### Actions and dismissal

Overview supports inspection, acknowledgement where governed, and continuation to the owning destination. Complex editing, bulk mutation, approval, exception handling, and case work occur in their queue or resource workspace.

Only genuinely optional items can be dismissed. Acknowledging or hiding an Overview presentation does not resolve, satisfy, approve, or cancel the underlying source condition.

Critical and required items remain until their authoritative owner reports resolution, expiry, reassignment, or supersession.

### Analytics boundary

Compact trends may provide operational context after actionable work. Exploratory, historical, comparative, and executive analysis remains owned by ADM-033 Reports and Analytics.

Overview does not create parallel metric definitions. Each displayed measure identifies its source, scope, and freshness, and links to governed analysis when available.

### Degraded behavior

If a source is delayed or unavailable:

- The module identifies stale, partial, or unavailable status.
- Missing data is never presented as zero.
- Confirmed prior state includes an as-of timestamp.
- Unaffected modules remain usable.
- The Overview does not fill missing operational content with marketing, generic charts, or AI estimates.

AI may summarize permitted modules and explain prioritization, but it cannot assign severity, dismiss obligations, change scope, or execute the linked action.

## Shared governed worklist contract

Admin collection and queue pages use one interaction contract with domain-specific schemas, urgency rules, filters, and actions.

### Collection and queue modes

- **Collection:** supports finding, inspecting, comparing, and managing durable resources such as products, categories, customers, promotions, or workforce users.
- **Queue:** supports processing actionable work ordered by governed urgency, assignment, obligation, exception, or review state.

A page may expose a queue-oriented saved view over a collection, but the view does not change the underlying resource type or ownership. Priority order appears only when its governing rule and scope are visible.

### Shared capabilities

Eligible worklists support:

- Permission-filtered search
- Governed filters, grouping, and sort
- Explicit personal, team, or organization scope
- Result count with source freshness
- Saved views
- Column and presentation preferences
- Stable object selection
- Authorized export
- Governed single-item and bulk actions

Each domain defines which capabilities apply. Omitting an unsafe capability is preferable to presenting an action that cannot be governed reliably.

### Saved views

A saved view stores:

- Owning resource or queue type
- Filter, grouping, and sort configuration
- Presentation preferences
- Requested scope
- Owner and sharing policy
- Version and last validation state

It stores neither copied result data nor authorization.

Opening or sharing a view resolves current permitted records and fields. Invalid filters, renamed governed values, unavailable sources, and lost access receive an explicit repair or reduced-scope state. A shared view never reveals its creator's inaccessible counts, selections, or results to another user.

### Selection

Selection uses stable resource identifiers and declares its scope:

- Visible-page selection
- Explicit item selection across pages
- All current results matching a governed query

“All results” records the query, scope, and validation timestamp rather than relying on a visual checkbox. If material membership or eligibility changes before commitment, the user must inspect the refreshed scope or explicitly accept the governed change behavior.

Changing filters, saved views, or resource scope never silently carries an incompatible selection. Restricted or deleted objects are removed without exposing protected details.

### Bulk-action lifecycle

Bulk actions follow:

`Select scope → Validate → Preview consequences → Confirm → Execute → Report outcome`

- **Select scope:** identifies resources and query scope.
- **Validate:** rechecks permission, resource state, dependencies, conflicts, and action eligibility.
- **Preview consequences:** summarizes eligible, ineligible, warning, approval-required, and unknown items.
- **Confirm:** names the action, target scope, consequence, assurance, and approval behavior.
- **Execute:** applies the governed operation with item-level idempotency and auditability.
- **Report outcome:** separates success, failure, skipped, pending, and indeterminate items with safe follow-up.

Validation is repeated at execution. Preview does not reserve eligibility or freeze mutable source state unless the action explicitly uses a governed snapshot.

### Partial results and recovery

A bulk operation declares whether it is:

- Independently item-addressable
- Transactional for a governed group
- Approval-batched
- Asynchronous

The interface does not imply all-or-nothing behavior unless the owning operation guarantees it. Successful items are not rolled back merely to simplify presentation, and failed items are never reported as changed.

Retry targets only eligible unconfirmed or failed items and uses the operation's idempotency contract. Pending work remains inspectable after navigation, session interruption, or handoff.

### Export

Exports use the current governed query and field permissions. Before generation, the user sees scope, included fields, sensitivity, expected format, and applicable assurance.

Large or sensitive exports may be asynchronous, approval-gated, time-limited, watermarked, or prohibited. Export artifacts do not preserve access after their governed expiry and never include fields hidden from the initiating user.

### Governance rules

1. Admin Platform owns the shared worklist, saved-view, selection, and outcome interaction contracts.
2. Source domains own resource fields, filter semantics, priority inputs, eligibility, and mutations.
3. Counts, previews, selection, export, and execution apply the same authorization and data scope.
4. Saved views and shared links never carry the creator's authority.
5. Bulk execution records actor, scope, action, validation, approval, result, and correlation reference.
6. High-risk actions may require reduced batch size, step-up assurance, approval, or single-resource execution.
7. Some actions may prohibit bulk execution entirely.
8. AI may help construct a view or explain outcomes but cannot expand scope, select hidden records, confirm, approve, or execute.

## Governed resource workspace

Admin Resource Workspaces separate current authoritative state from proposed change. The shared workspace contract adapts to the owning domain's fields, lifecycle, risks, and permitted actions.

### Information hierarchy

Applicable workspace regions appear in this order:

1. Resource identity, owner, lifecycle, and current status
2. Primary permitted actions and outstanding obligations
3. Editable domain sections or operational modules
4. Validation, warnings, and blocking issues
5. Relationships and downstream impact
6. Preview or consequence comparison
7. Approval, scheduling, execution, or publication state
8. Audit and revision history

Restricted fields, actions, and relationships are omitted or safely redacted according to permission policy. Their absence cannot be interpreted as an empty authoritative value.

### Change envelope

An applicable proposed change records:

- Resource and baseline revision
- Author and collaborators
- Requested field or operation scope
- Draft values and supporting rationale
- Validation results and source timestamps
- Downstream impact
- Required assurance and approvals
- Schedule or effective condition
- Current change state
- Execution and audit correlation

The general lifecycle is:

`Draft → Validate → Submit → Approve → Schedule or Apply/Publish`

Domains may omit inapplicable stages but cannot bypass a required stage. Rejection or withdrawal preserves the proposal and rationale under the governing retention policy.

### Commit modes

Every mutation declares one of these modes:

- **Immediate governed change:** a low-risk, reversible change validates and applies without a separate approval stage.
- **Staged revision:** a coordinated content, catalog, taxonomy, compatibility, pricing, promotion, access, or configuration change remains separate until approved and applied or published.
- **Scheduled change:** an approved revision becomes effective at a governed time or condition.
- **Append-only operation:** an order, payment, inventory, Support, security, or other consequential event records a new operation rather than rewriting historical facts.

Mode is defined by the owning domain and risk policy, not chosen opportunistically by the operator.

### Validation

Validation is layered:

1. Field format and required values
2. Resource-level consistency
3. Governed relationship integrity
4. Cross-domain dependency and impact
5. Permission, assurance, and approval requirements
6. Execution-time current-state validation

Results distinguish blockers, warnings, informational findings, unavailable checks, and stale checks. A warning requires an allowed disposition; an unavailable required check blocks commitment.

Cross-domain validation may report a required dependent change or route to its owning workspace. It cannot silently mutate another domain's resource.

### Preview and impact

Where a change affects customers, discovery, compatibility, price, policy, access, or operations, the workspace provides an applicable preview or before-and-after consequence comparison.

Preview identifies:

- Proposed revision
- Data and policy versions
- Intended audience or scope
- Known unavailable dependencies
- Difference from current authoritative state

A preview is visibly non-live and does not prove that execution will succeed. Permission and state are rechecked when the change is committed.

### Approval and execution

Submission freezes the reviewable proposal or creates an explicit new revision when further editing is allowed. Approval records reviewer, scope, decision, rationale, and conditions.

Approval does not:

- Bypass current validation
- Grant execution permission
- Extend beyond the reviewed scope
- Remain valid after a material proposal change
- Guarantee an external or asynchronous outcome

Execution reports confirmed, pending, failed, superseded, and indeterminate outcomes. Asynchronous work retains a durable correlation reference and safe continuation.

### Concurrency and conflict

Drafts and operations target a known baseline revision. If authoritative state changes materially:

- Non-conflicting changes may be rebased with an explicit comparison.
- Conflicting values require review and resolution.
- Stale validation and approval are invalidated according to policy.
- Silent last-write-wins behavior is prohibited.

Presence indicators or edit locks may reduce collisions but do not replace revision checks.

### History and rollback

Applied and published history is immutable. Corrections and rollback create a new governed change referencing the prior version and explaining the reason and expected effect.

Rollback is not assumed safe or complete. The owning domain revalidates current dependencies, irreversible side effects, customer commitments, and later changes before offering it.

### Governance rules

1. Source domains own field meaning, lifecycle, validation, commit mode, eligibility, and mutation.
2. Admin Platform owns the shared workspace, change-envelope, comparison, and outcome interaction contracts.
3. Approvals and execution permissions are evaluated separately.
4. Customer-facing preview uses the same governed data model as the target surface where practical.
5. Historical operational events are corrected through new events, not destructive edits.
6. Every consequential change records actor, scope, baseline, validation, approval, execution, and outcome.
7. Session interruption preserves eligible drafts but never assumes an unconfirmed commit.
8. AI may propose or explain a draft but cannot submit, approve, schedule, publish, execute, or resolve conflicts.

## Coordinated cross-domain operations

ADM-017 Order Workspace, ADM-019 Customer Workspace, and ADM-021 Support Case Workspace coordinate related context without becoming shared mutable owners of every contributing record.

### Order Workspace

Order Workspace presents eligible:

- Order lifecycle, items, totals, and historical events
- Payment and refund state
- Fulfillment, shipment, and delivery state
- Customer and verified contact context
- Invoice and tax-document references
- Compatibility or PC Build context
- Linked Support cases, remedies, and operational obligations

Purchase owns the Order Workspace and order lifecycle. Payments, Delivery or Fulfillment, Customer, Compatibility, PC Builder, Support, and other domains retain authority for their records and actions.

Historical order, invoice, payment, delivery, tax, and consent facts are append-only or corrected through their owning domain's governed operation. They are not directly overwritten from the Order Workspace.

### Customer Workspace

Customer Workspace presents eligible:

- Customer identity and governed profile
- Account assurance, restriction, and lifecycle state
- Current preferences with historical boundaries
- Orders, Support cases, communication state, and privacy requests
- Relevant risk or verification requirements
- Auditable customer-service history

Customer owns current profile and Account-facing records within its scope. Customer Workspace is not a universal mutable master record.

Changing a current name, address, contact factor, or preference does not rewrite historical orders, invoices, deliveries, payments, Support evidence, consent, or communication events. Access to sensitive identity, risk, payment, and privacy context remains purpose- and field-restricted.

### Support Case Workspace

Support Case Workspace implements the approved Support case architecture for authorized operators. It coordinates:

- Shared case envelope and typed workflow
- Customer-visible timeline and separate internal notes
- Evidence and review outcomes
- Lifecycle, responsibility, escalation, and obligations
- External work packages
- Linked order, payment, fulfillment, product, and customer context
- Governed action gateways and case audit history

Support owns the case and coordination. It cannot infer or approve a refund, replacement, warranty, payment change, inventory movement, or delivery outcome merely because that operation is linked to the case.

### Domain-owned action gateway

A consequential action initiated from a coordinated workspace opens an owning-domain gateway that declares:

- Owning domain and authoritative operation
- Target object, item, amount, and scope
- Current eligibility and source-state timestamp
- Required reason, evidence, and policy basis
- Required assurance, permissions, and approvals
- Customer and downstream consequence preview
- Idempotency and execution contract
- Confirmed, pending, failed, superseded, or indeterminate outcome behavior
- Audit and orchestration correlation

The gateway can appear contextually inside the initiating workspace, but its ownership and boundary remain explicit. It rechecks authorization, state, eligibility, approval, and restrictions at commitment.

### Durable multi-step orchestration

Cross-domain remedies that require several operations use a durable orchestration record. Examples include a replacement requiring return logistics, inventory reservation, new fulfillment, and customer notification, or an approved return leading to inspection and refund processing.

Every orchestration records:

- Requested customer or operational outcome
- Participating operations and authoritative owners
- Dependency order and compensation rules where valid
- Current state of each step
- Overall confirmed, partial, pending, failed, or indeterminate state
- Accountable coordinator
- Customer communication requirement
- Recovery and reconciliation path

The interface never claims atomic completion unless the participating systems guarantee it. Confirmed steps remain visible when another step fails. Compensation is an explicit governed operation and is not assumed to reverse irreversible customer, financial, delivery, or external-provider effects.

### Failure and retry

Unknown or timed-out execution remains indeterminate until reconciled. Operators cannot blindly retry an operation that may have succeeded.

Retry uses the original idempotency and correlation contract or starts a clearly linked new operation when the owner requires it. Manual reconciliation records source evidence, actor, reason, and effect without rewriting the original response.

### Governance rules

1. Source domains own facts, eligibility, operations, and outcomes.
2. Admin Platform owns coordinated presentation, gateway framing, and safe cross-workspace continuity.
3. Coordinated views label source, freshness, restrictions, and unavailable context.
4. Permission to view a related record does not imply permission to act on it.
5. Approval of a Support case outcome does not automatically approve a linked financial or fulfillment operation.
6. Customer communication reflects confirmed outcomes and honest pending dependencies.
7. Cross-domain operations preserve historical records and use append-only corrections where required.
8. AI may summarize permitted context or draft a proposed orchestration, but cannot invoke gateways, approve steps, reconcile outcomes, or expand scope.

## Provisional dependencies

The following remain pending:

- Admin search, command, and recent-work behavior
- Audit and high-risk action presentation
- Exact roles, permissions, and segregation of duties
- Admin degraded and continuity behavior

## Next decision

Define Admin search, command, and recent-work behavior, followed by audit, high-risk actions, permissions, and degraded behavior.
