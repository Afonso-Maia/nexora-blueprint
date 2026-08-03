# Administrative Dashboard Application Architecture

**Status:** Approved

## Purpose

This document defines the protected Admin application shell, capability navigation, worklists, Resource Workspaces, source gateways, drafts, bulk operations, approvals, exports, settings, responsive behavior, and failure isolation.

## Decision

Build Admin as a separate Next.js application and trust zone using the shared frontend and Design System foundations.

Use:

- Separate workforce ingress, identity client, session store, cookies, CSP, telemetry, and deployment
- One capability-adaptive Admin shell
- Server-first route composition through the Admin BFF
- Purpose-built source-domain Admin contracts
- URL-owned worklist query state and source-owned saved views
- Resource Workspaces composed from independently authorized panels
- Durable source operations for consequential actions
- Governed change envelopes for draft, review, approval, activation, and rollback
- Explicit selection snapshots for bulk work and exports
- Admin Platform-owned shared tooling without shared business authority

Do not build one Admin service with direct database access, role-specific applications, client-side authorization, or generic CRUD over domain tables.

## Application boundary

Admin is physically and logically separate from Customer Experience.

- Customer credentials and sessions are rejected.
- Workforce authentication is phishing resistant.
- All routes default to no public indexing and no shared caching.
- Network policy allows only the Admin BFF and approved platform endpoints.
- Browser access to domain APIs, databases, providers, queues, and object stores is prohibited.

## Admin Platform ownership

Admin Platform owns:

- Shell and capability navigation
- Cross-domain composition
- Shared worklist, selection, action, approval, export, and settings tooling
- Operational route and panel registry
- Common saved-view framework
- Admin-specific diagnostics presentation

Each source domain owns resource data, lifecycle, capabilities, validation, drafts, operations, approvals, and outcomes.

## Capability registry

Every Admin route and panel registers:

- Stable route and resource type
- Owning source
- Discover and Read capabilities
- Field sets
- Available actions
- Assurance and device requirements
- Responsive support level
- Source contract version
- Failure and successor behavior

Navigation is generated from current Discover projections. Route entry and every source call reauthorize.

## Route modules

Feature-oriented route modules contain:

- Server route composition
- Source contract adapters
- View-model schema
- Client interaction islands
- Accessible loading and error states
- Route metadata
- Contract and integration fixtures

Business policy, SQL, provider SDKs, and arbitrary authorization checks remain outside the application.

## Worklists

A worklist query contains:

- Resource type
- Governed filters and sort
- Saved-view reference
- Cursor
- Field projection
- Freshness requirement

Safe query state is represented in the URL. Filter names map to registered server definitions; raw source query languages are prohibited.

The source returns permission-filtered rows, counts, available facets, actions, freshness, and opaque continuation.

## Saved views

Saved views store query configuration, columns, density, and optional notification criteria—not copied results or authority.

They have:

- Owner or governed team scope
- Source and schema version
- Field classification
- Migration behavior
- Expiry and deletion

A shared view cannot broaden recipient access. Opening resolves current source permissions and current results.

## Selection

Selection is explicit and source-versioned.

- Page-local selection names row identifiers and versions.
- Select-all uses a server Selection Snapshot bound to query, authorization scope, exclusion set, source watermark, and expiry.
- Changing filter, sort, scope, permission, or snapshot invalidates or visibly narrows selection.
- Restricted or changed resources are removed without disclosing hidden details.

A visible count never implies every matching resource is selected.

## Resource Workspace

One canonical Workspace composes:

- Resource identity and lifecycle
- Current obligations and next action
- Source-owned panels
- Related-resource summaries
- Timeline and audit links
- Draft or staged change
- Available actions

Each panel declares source, permission, field set, freshness, loading, error, and responsive behavior. A failed panel does not erase the resource.

Related objects open their canonical Workspace. Admin does not embed mutable copies.

## Change envelope

Governed authoring uses a source-owned Change Envelope:

- Target and base revision
- Proposed typed changes
- Author and purpose
- Impact analysis
- Validation
- Required reviewers
- Approval evidence
- Schedule
- Execution Operation
- Rollback or successor

Lifecycle:

`Draft → Validate → Submit → Review → Approve → Schedule or execute → Observe → Supersede`

Sources can define narrower states. Admin Platform supplies reusable presentation but cannot approve or execute.

## Approval

Approval binds to:

- Exact change digest
- Target scope
- Policy and source versions
- Approver independence
- Assurance
- Expiry

Material change invalidates approval. Approve and Execute remain distinct capabilities.

## Actions

Every action descriptor identifies capability, scope, consequence, required reason, assurance, approval, idempotency, current availability, and destination.

Consequential action flow:

1. Load current source facts.
2. Present scope and consequence.
3. Collect typed reason and confirmation.
4. Satisfy step-up or approval.
5. Submit one idempotent command.
6. Show Pending, completed, rejected, conflicted, or Indeterminate.
7. Reconcile and refresh.

Disabled controls appear only when disclosure and recovery are useful; otherwise they are omitted.

## Bulk operations

Bulk work uses a durable Operation:

- Selection Snapshot
- Action and parameters
- Per-item authorization
- Dry-run or impact result
- Limits
- Confirmation and approval
- Progress and item outcomes
- Cancellation policy
- Reconciliation

Bulk work is not one unbounded database transaction. Source invariants apply to every item. Partial completion remains explicit and retry targets only unresolved eligible items.

## Exports

Export is a separate source capability.

The export request binds:

- Selection Snapshot or governed report
- Field set
- Purpose
- Format
- Classification
- Retention and expiry
- Approval and watermark policy

Workers reauthorize or consume a narrow execution grant. Output is encrypted private object storage with a short-lived download capability. Files never enter email as unrestricted attachments.

## Admin search

Operational Search uses the separate protected Search indexes and Discover scope. Results expose only authorized snippets. Opening performs current source authorization.

Search cannot become a cross-domain data export or bypass field policy.

## Settings

Admin Platform owns the Settings registry and editing framework. Each setting declares a source owner, schema, risk tier, environment scope, default, validation, schedule, rollback, secrets policy, and consumers.

Settings with domain behavior are stored and enforced by their owner. A generic key-value database is not policy authority.

## Audit presentation

Admin links actions to append-only Audit evidence and source timelines. It cannot edit Audit entries.

Audit views are field-restricted, paginated, purpose-bound, and protected from spreadsheet-formula and export injection.

## Responsive behavior

Mobile preserves:

- Monitoring
- Search and filtering
- Assignment and communication
- Approval review
- Safe bounded actions

Complex schema authoring, deep audit, large bulk impact, Compatibility rules, Pricing simulation, and access administration can require a guarded larger workspace. The route remains canonical and explains the requirement.

No pointer-only interaction, mandatory drag, or desktop-only approval is allowed.

## State and caching

- URL owns safe worklist state.
- Source owns records and operations.
- Client owns temporary selection and form interaction.
- Change Envelope owns durable drafts.
- Private BFF caches are short, subject- and permission-bound.
- Current permissions, lifecycle, actions, approval, and consequential outcomes are not served from stale shared cache.
- Losing permission makes open panels read-only or unavailable and clears protected client projections.

## Security

- No shared customer/workforce sessions.
- Strict CSP and frame controls.
- CSRF, origin, and anti-replay controls.
- Reauthentication for high-risk actions.
- Field minimization and masking by default.
- Clipboard, print, download, and export policy by field.
- No workforce impersonation.
- Provider access occurs through external Work Packages, not general Admin.
- Production break-glass is visible, bounded, expiring, monitored, and reviewed.

## Observability

Measure route and panel latency, authorization denial, stale projections, worklist query cost, selection invalidation, draft conflict, approval delay, operation outcomes, bulk item failures, export lifecycle, and source degradation.

Trace actual actor, delegation, source contract, decision, change digest, Operation, and outcome.

## Quality gates

- Prove every route, panel, field, action, selection, export, and search result is source authorized.
- Test permission loss while open and during queued work.
- Test stale ETags, approval invalidation, duplicate activation, bulk partial failure, and Indeterminate outcomes.
- Test formula injection, unsafe file names, export expiry, and restricted fields.
- Test each page at keyboard, screen reader, zoom, high contrast, compact density, and supported mobile behavior.
- Architecture tests prohibit direct storage, provider, raw Search DSL, and role-name checks.

## Consequences

### Benefits

- One coherent Admin application serves many capability combinations.
- Source domains retain authority.
- Shared tooling reduces duplicated high-risk workflows.
- Bulk and export work is durable and auditable.

### Costs and risks

- Panel composition and permission freshness are complex.
- Shared tooling must remain configurable without becoming generic CRUD.
- Responsive support needs explicit task boundaries.

## References

- [Administrative Dashboard IA](../03-product-structure/06-administrative-dashboard-ia.md)
- [Administrative Dashboard Patterns](../04-design-system/21-administrative-dashboard-patterns.md)
- [Authorization and Policy Enforcement](13-authorization-and-policy-enforcement.md)
- [Frontend Architecture](05-frontend-architecture.md)
- [ADR-0029: Separate Capability-Adaptive Admin Application](../adrs/ADR-0029-separate-capability-adaptive-admin-application.md)

