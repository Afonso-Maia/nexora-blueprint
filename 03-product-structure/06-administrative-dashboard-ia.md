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

## Provisional dependencies

The following remain pending:

- Resource workspace editing, validation, approval, and publication model
- Cross-domain order, customer, and Support operations
- Admin search, command, and recent-work behavior
- Audit and high-risk action presentation
- Exact roles, permissions, and segregation of duties
- Admin degraded and continuity behavior

## Next decision

Define the resource workspace editing, validation, approval, and publication model, followed by cross-domain operations and governance behavior.
