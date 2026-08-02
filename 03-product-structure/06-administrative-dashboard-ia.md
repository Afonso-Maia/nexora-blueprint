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

## Federated operational search

The Admin shell provides one permission-filtered entry to operational discovery. Search federates eligible indexes and source lookups without creating a competing resource store.

### Search scope

Search may return permitted:

- Resources and their workspaces
- Queues and saved views
- Reports
- Configuration destinations
- Draft changes and approval work
- Asynchronous operations and reconciliation tasks

Results are grouped by owning capability. Every result declares its resource type, permitted identifying fields, relevant current status, scope, and source freshness.

Search does not return an object merely because the user could navigate to its capability. Object discoverability, field visibility, and action permission are evaluated separately.

### Query and result behavior

Users can search across eligible capabilities or apply a visible capability, resource-type, status, owner, or identifier scope. Query interpretation never hides the active scope.

1. Exact governed identifiers receive deterministic handling before fuzzy matching.
2. Sensitive fields participate only when the user's purpose and permission allow them.
3. Snippets, highlights, suggestions, and zero-result guidance follow the same field restrictions as the destination.
4. Counts exclude inaccessible objects and do not reveal restricted existence through totals or facets.
5. Opening a result rechecks current authorization and object state.
6. Personal and public operational scopes remain clearly separated where both exist.

Index lag is exposed with source freshness. An indexed result cannot preserve stale action eligibility. Where authorized, direct source lookup may confirm an exact identifier without broadening search disclosure.

### Constrained command launcher

The related command launcher supports:

- Navigation to a permitted destination
- Opening a permitted resource, queue, saved view, report, draft, or operation
- Starting a permitted draft or governed workflow
- Applying local presentation or navigation preferences
- Invoking approved non-consequential utilities

It cannot directly execute a consequential mutation.

Refunds, replacements, publication, pricing changes, inventory adjustments, access grants, bulk actions, deletion, customer communications, case decisions, and similar actions open their governed workspace or action gateway. Validation, consequence preview, assurance, approval, and confirmation remain intact.

Commands are labeled by owning capability and target scope. Keyboard acceleration cannot bypass focus, confirmation, or accessibility requirements.

### Natural-language and AI assistance

Natural-language interpretation or AI may:

- Reformulate a query
- Suggest a capability or resource type
- Construct a visible draft filter or saved view
- Navigate to an eligible destination
- Explain why a result or command is unavailable

The interpreted scope remains inspectable and editable. AI cannot search inaccessible fields, infer hidden object existence, select concealed records, execute a mutation, approve work, or broaden permissions.

### Recent work

Recent work stores references to eligible:

- Resource and case destinations
- Saved views and queues
- Draft changes
- Approvals
- Asynchronous operations and reconciliation tasks

It does not copy sensitive resource content into an independent history. Each entry records its type, owning capability, safe display label, last access time, and applicable continuation reference.

Permission or resource-state changes are applied when recents render and open. Ineligible entries are removed or safely redacted without exposing why a protected object exists. Users can clear eligible personal history according to policy.

Recents never imply assignment, approval, ownership, or current action eligibility.

### Shared links and return context

Shared Admin links carry stable resource or governed-view references and safe origin context. They never carry the sender's permission, selected sensitive fields, action confirmation, or executable command.

Recipients resolve their own permitted representation. Invalid or inaccessible links return to the nearest safe capability destination without disclosing protected object details.

### Degraded behavior

If one index or source is unavailable:

- Affected scope is identified.
- Unaffected capabilities remain searchable.
- Stale results include an as-of time.
- Results are not silently omitted and presented as complete.
- Commands dependent on unavailable validation route to a safe blocked or retry state.
- Recent eligible direct destinations remain usable when their source can authorize access.

### Governance rules

1. Admin Platform owns the shared search, launcher, recents, and return-context interaction.
2. Source domains own indexable fields, discoverability, source lookup, eligibility, and actions.
3. Search visibility, field visibility, and action permission are independent checks.
4. Recents, saved views, suggestions, and shared links never preserve another user or earlier session's authority.
5. Query and command telemetry follows sensitive-data and workforce-monitoring policy.
6. Consequential actions always leave the launcher for their governed confirmation surface.
7. Permission revocation applies to index results, cached suggestions, recents, direct links, and open destinations.
8. Search and launcher behavior is keyboard- and assistive-technology accessible.

## Risk-tiered Admin actions

Every Admin action has a governed risk class based on consequence, scope, sensitivity, reversibility, and abuse potential.

### Risk classes

| Class | Typical characteristics | Applicable controls |
| --- | --- | --- |
| Routine | Narrow, low-impact, readily reversible | Clear action label, current-state validation, outcome feedback, and audit where policy requires |
| Significant | Material customer or operational effect | Consequence preview, required reason, explicit confirmation, and stronger audit context |
| High | Financial, pricing, inventory, publication, privacy, access, or broad-scope effect | Recent or step-up authentication, evidence, reduced batch scope, independent approval or scheduled execution where governed |
| Critical | Irreversible, systemic, exceptional, or segregation-of-duties-sensitive effect | Strongest assurance, independent authorization, bounded execution plan, recovery or compensation plan, and explicit monitoring |

The source domain and Governance define the class. Operators, UI clients, workflow automation, and AI cannot lower it.

Risk may increase because of amount, object count, customer impact, data sensitivity, current incident state, unusual timing, or other governed context. A higher contextual class applies without changing the action's normal baseline policy.

### Proportional safeguards

Depending on risk, an action may require:

- Before-and-after or consequence preview
- Required reason, evidence, and policy basis
- Recent or step-up authentication
- Reduced batch size or single-resource execution
- Independent approval
- Delayed, scheduled, or monitored execution
- Customer, stakeholder, or security notification
- Recovery, rollback, or compensation plan
- Narrowly justified typed confirmation

The confirmation surface names the exact action, target objects, scope, affected customers or systems, effective time, and reversibility. Generic “Are you sure?” prompts are insufficient for consequential actions.

Routine work does not receive unnecessary repeated confirmation. Avoiding confirmation fatigue cannot remove required validation, audit, approval, or outcome reporting.

### Approval and execution separation

Approval and execution are independent authorizations:

1. The approval applies only to the reviewed proposal, scope, risk, and conditions.
2. Material change invalidates or requires renewal of approval.
3. The executor must independently retain permission and assurance at commitment.
4. An approver does not automatically become the executor.
5. A requestor cannot approve their own work where segregation policy prohibits it.
6. Approval does not guarantee successful or synchronous execution.

Exact role assignments, approval thresholds, and segregation constraints remain governed by the later Roles and Permissions architecture.

## Correlated audit history

ADM-032 Audit Log presents permission-filtered, append-only records correlated across:

`Request → Validation → Approval → Execution → Outcome → Reconciliation or correction`

### Audit record contract

Applicable records include:

- Attributable human, service, provider, or AI-assisted actor
- Actor role, permission scope, delegation, and assurance at the time
- Owning domain and action type
- Target resource, field, item, amount, and batch scope
- Request reason, evidence, and policy basis
- Baseline and source-state references
- Validation and consequence-preview result
- Approval decision, conditions, and approver
- Execution idempotency and correlation references
- Timestamp and effective time
- Confirmed, pending, failed, skipped, superseded, or indeterminate outcome
- Before-and-after revision or event references where applicable
- Reconciliation, correction, compensation, or rollback links

Sensitive values may be protected or referenced rather than copied into the general audit record. Redaction follows policy and cannot erase the existence, actor, target class, action, outcome, or required provenance of a governed event.

### Audit presentation

Audit Log supports authorized filtering by actor, capability, action, target, risk class, outcome, time, approval, and correlation reference.

- Summary rows remain factual and avoid interpreting an event as successful when its outcome is pending or unknown.
- Correlated detail reconstructs the action chain without merging distinct source events.
- Source and ingestion timestamps remain separate.
- Delayed ingestion is identified.
- Corrections add linked records and never rewrite earlier events.
- Export follows the governed worklist export and sensitive-data rules.

Resource workspaces may show a scoped audit projection. ADM-032 remains the cross-capability audit destination and does not become the authoritative owner of source-domain facts.

### Failed and incomplete actions

Validation failures, denied approvals, rejected step-up, execution failures, timeouts, partial bulk results, and indeterminate downstream outcomes are audited according to policy. Audit is not limited to successful mutations.

An audit event is evidence that an action was requested or observed; it is not proof that every downstream effect completed. Operational status remains owned by the executing domain.

### AI and automation

AI-assisted drafts and summaries retain attribution to the assistance and the human or service actor that accepted consequential use. Automated actions identify the automation identity, triggering policy or event, delegated scope, and accountable owner.

AI and automation cannot alter audit history, approve their own expanded authority, or classify an outcome as confirmed without authoritative evidence.

### Governance rules

1. Source domains own action consequence, reversibility, and authoritative outcome.
2. Security and Governance own assurance, risk, retention, and audit policy.
3. Admin Platform owns shared risk presentation, confirmation, correlation, and Audit Log experience.
4. Failed, denied, partial, and indeterminate work receives appropriate audit coverage.
5. Permission to perform an action does not imply permission to inspect every audit field about it.
6. Audit access and export are themselves auditable high-risk capabilities.
7. Corrections, reconciliation, and rollback create new linked events.
8. Degraded audit ingestion blocks an action when policy requires confirmed audit durability before execution.

## Capability contract boundary

Admin IA defines the permission-aware presentation contract for every destination and operation. The later Roles and Permissions architecture defines which subjects receive capabilities, under which scopes and conditions.

### Capability declaration

Every governed Admin operation declares:

- Owning resource type and target scope
- Required capability: discover, read, create, edit, transition, approve, execute, export, or administer
- Field-level read and write requirements
- Data scope
- Contextual conditions
- Required assurance
- Required independent approval
- Risk class
- Denial, restriction, and recovery behavior

A route or workspace can require several declarations for different fields, sections, relationships, and actions. Access to the page shell does not imply access to every region.

### Permission-aware presentation states

An Admin surface may resolve to:

- **Full eligible access:** permitted fields and actions are available.
- **Read-only access:** the resource is visible but mutation is unavailable.
- **Field-restricted access:** eligible fields render while restricted fields are omitted or safely redacted.
- **Action-restricted access:** the resource is visible while one or more actions are unavailable.
- **Approval-required action:** the user may request or prepare work but cannot independently approve or execute it.
- **Safely unavailable:** access is denied without exposing protected object existence, fields, or policy detail.

An omitted or redacted field is not presented as empty, false, zero, or absent in the authoritative record.

Disabled controls appear only when the user may know the capability exists and an explanation provides a valid next step. Otherwise the control is omitted. Explanations distinguish missing permission, required assurance, required approval, incompatible state, and unavailable dependency only to the degree disclosure policy permits.

### Enforcement boundary

Navigation visibility, search filtering, result redaction, disabled controls, and confirmation surfaces are usability and disclosure controls. They are not authorization enforcement.

The authoritative source service rechecks:

- Actor and attributable session
- Capability and field access
- Resource and data scope
- Current contextual conditions
- Assurance and approval
- Risk and segregation requirements
- Current object state and action eligibility

Every request uses deny-by-default behavior when required authorization context is absent, invalid, stale, or unavailable.

### Permission change during work

Permission and scope changes apply to:

- Open navigation and workspaces
- Search, suggestions, recents, and shared links
- Saved views and result counts
- Current selections
- Drafts and proposed changes
- Pending approvals
- Exports and export artifacts
- Asynchronous and scheduled operations

Losing execution authority does not silently delete a draft or historical contribution. Policy determines whether it becomes read-only, transfers through a governed handoff, remains visible in reduced scope, or becomes inaccessible. The former user cannot commit, approve, export, or recover restricted content through cached state.

Previously approved or scheduled work is re-evaluated according to its execution policy. Revocation does not automatically cancel or preserve it.

### Roles and Permissions ownership

The later Roles and Permissions architecture will define:

- Human, service, provider, and automation subjects
- Role and capability composition
- Resource, field, organizational, regional, and case scope
- Delegation and temporary access
- Approval thresholds
- Segregation of duties
- Break-glass or emergency access
- Access review, expiry, revocation, and offboarding

Those decisions must map to this capability contract rather than redefining the Admin page hierarchy or creating role-specific copies of pages.

### AI and delegated tools

AI and automation operate only through an attributable subject and explicitly delegated capability, scope, duration, and purpose.

They cannot:

- Inherit broader service access merely because an integration possesses it
- Reveal a restricted result through summaries, counts, suggestions, or errors
- Lower assurance, approval, risk, or segregation requirements
- Turn a draft suggestion into execution without the governed human or service authorization
- Retain usable access after delegation expiry or revocation

### Governance rules

1. Admin IA owns permission-aware presentation states and recovery behavior.
2. Roles and Permissions owns subject-to-capability assignment, scope, delegation, and segregation policy.
3. Source domains enforce resource, field, and action authorization.
4. Admin Platform consistently consumes permission decisions across every discovery and workspace surface.
5. Discover, read, mutate, approve, execute, export, and administer are distinct capabilities.
6. Permission-denial responses follow non-disclosure policy.
7. Authorization decisions and high-risk denials are auditable according to policy.
8. New Admin capabilities declare their resource, field, scope, assurance, approval, and risk contract before release.

## Provisional dependencies

The following remain pending:

- Admin degraded and continuity behavior

## Next decision

Define Admin degraded, interruption, and responsive continuity behavior, then validate the complete Administrative Dashboard IA.
