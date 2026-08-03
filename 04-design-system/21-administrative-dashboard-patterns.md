# Administrative Dashboard Patterns

**Status:** Approved

## Purpose

This document defines Operations Overview, worklists, queues, saved views, selection, bulk actions, exports, resource workspaces, staged changes, approval, execution, audit, permission presentation, operational Search, and responsive continuity.

## Decision

Nexora Admin uses **object-centered, permission-aware work patterns**.

Shared worklists support finding and selecting permitted objects. Resource Workspaces separate authoritative state from staged change, validation, impact, approval, execution, and immutable applied history. Risk and density—not role-specific page duplication—govern presentation.

## Operations Overview

Priority:

1. Critical exceptions
2. Customer or operational obligations
3. Work awaiting the user
4. Approvals and scheduled execution
5. Service degradation
6. Trend context

Modules expose:

- Name and owning capability
- Permitted scope
- Count freshness
- Highest-priority items
- Primary destination
- Loading, partial, unavailable, and empty

Counts use the same permission scope as destinations. Overview does not expose inaccessible totals.

## Worklist

Required regions:

- List or queue identity
- Scope and freshness
- Search
- Filters and sort
- Saved view
- Columns or item summary
- Selection state
- Result count
- Pagination or governed incremental loading
- Empty and partial-result recovery

Collection and queue modes share components but retain distinct semantics: collections emphasize entities; queues emphasize priority, ownership, and obligation.

## Row or item

Displays:

- Stable object identity
- Primary status
- Decisive fields
- Assignment or owner where relevant
- Due or risk context
- Permission-limited values
- Open workspace
- Safe bounded fast action where approved

Fast actions cannot bypass review, assurance, segregation, or source enforcement.

## Columns

- Use governed field definitions.
- Preserve label, unit, and source meaning.
- Expose sort and filter availability.
- Distinguish hidden, unavailable, unknown, redacted, and empty.
- Avoid horizontally freezing so many columns that content becomes unusable.
- Support a card/list alternative only when relationships remain truthful.

## Saved View

Stores:

- Filters
- Sort
- Visible columns
- Density
- Queue or collection mode
- Declared scope

Opening resolves current permissions and schema. Invalid criteria receive repair. Sharing never transfers access or reveals the creator’s hidden counts.

## Selection

Selection Bar exposes:

- Selected count
- Explicit versus all-matching scope
- Exclusions
- Eligibility
- Available actions
- Clear

Selection persists only within a safe bounded context. Hidden, newly restricted, or stale records are re-evaluated before action.

## Bulk action

Lifecycle:

`Select → Choose action → Validate scope → Review impact → Confirm or request approval → Accept operation → Inspect outcome`

Bulk Review includes:

- Action
- Eligible, ineligible, and unknown counts
- Representative or complete affected objects
- Field changes
- Risk
- Approval and execution requirements
- Partial-result policy

Bulk operations produce per-object outcomes. Partial success is not represented as complete success.

## Export

Export:

- Names dataset, fields, filters, scope, and time.
- Rechecks Export capability and field scope.
- Uses asynchronous acceptance where necessary.
- Provides expiration and secure retrieval.
- Records audit correlation.
- Never includes hidden fields through derived or cached data.

## Resource Workspace hierarchy

1. Object identity, status, scope, and freshness
2. Current authoritative summary
3. Required work or primary action
4. Editable fields and staged change
5. Validation
6. Preview and impact
7. Approval and execution
8. History, provenance, and audit
9. Recovery

## Authoritative versus staged

- Current values remain visibly distinct from proposed values.
- Dirty fields are identified.
- Source updates produce a comparison, not silent overwrite.
- Read-only state preserves historical contribution.
- Draft state does not imply approval or application.

## Change envelope

Contains:

- Target objects
- Proposed mutations
- Reason
- Author
- Created and updated time
- Source version
- Validation
- Impact
- Required approvals
- Execution mode
- Correlation
- Lifecycle state

## Validation

Validation groups:

- Field and schema
- Domain rule
- Relationship and Compatibility
- Permission and scope
- Segregation
- Operational readiness
- Unknown or unavailable dependency

Errors link to affected fields or objects. Unknown dependency fails safely.

## Preview and impact

Preview shows:

- Before and after
- Affected related objects
- Customer or operational consequence
- Compatibility, price, inventory, content, or access impact
- Scheduled timing
- Rollback or correction boundary

Simulation is labelled and cannot be presented as applied truth.

## Approval

Approval Card exposes:

- Requested action
- Author and requester
- Scope
- Evidence and reason
- Risk and thresholds
- Required independent duty
- Prior approvals
- Expiry
- Approve, reject, request changes

Self-approval is unavailable where segregation forbids it. UI visibility does not enforce the rule.

## Execution

Execution:

- Requires current capability, assurance, scope, validation, and approvals.
- Binds to the reviewed change version.
- Uses explicit confirmation proportional to risk.
- Produces accepted, pending, partial, completed, failed, or indeterminate outcome.
- Supports safe retry only through idempotency and source rules.

## Audit presentation

Audit Event shows:

- Actor and subject class
- Action
- Target and scope
- Time
- Outcome
- Correlation
- Source
- Reason and approval references
- Redaction

Audit is append-only presentation and does not replace current source state. AI summaries cannot conceal events or become evidence.

## Order, Customer, and Support coordination

Cross-domain Workspace panels:

- Present source-owned summaries.
- Launch domain-owned actions through governed gateways.
- Show multi-step orchestration and partial outcomes.
- Preserve correlation.
- Avoid copying editable source fields into an ungoverned shared form.

## Operational Search and command

- Search returns permitted objects and fields.
- Recent work resolves current access.
- Commands name capability and target scope.
- Consequential work opens review or Workspace context.
- Natural-language interpretation remains inspectable.
- AI cannot execute, approve, export, or broaden scope.

## Permission presentation

States:

- Discoverable and actionable
- Discoverable but read-only
- Discoverable with disabled action and reason
- Temporarily unavailable
- Hidden by non-disclosure
- Permission changed during work

Presentation consumes the complete authorization decision. It does not reconstruct permissions from role labels.

## Responsive continuity

Supported compact work:

- Monitoring
- Search and filtering
- Assignment and routing
- Messaging and evidence
- Approval review
- Emergency suspension or revocation
- Safe bounded single-record action

Guarded larger-workspace tasks may include schema authoring, complex Compatibility rules, large bulk changes, role editing, deep audit, pricing simulation, and multi-panel impact analysis.

The guard:

- Explains why
- Preserves draft and scope
- Retains permission and risk context
- Offers safe continuation and return
- Keeps emergency protection available when safe

## Density

Comfortable is default. Compact may increase worklist visibility and reduce insets, but:

- Target safety remains.
- Labels and state remain.
- Row actions do not become icon-only when ambiguous.
- Selection and permission scope remain visible.
- Compact is user-selectable where supported.

## States and recovery

Patterns cover:

- Empty queue
- No permitted results
- Partial sources
- Stale row
- Selection changed
- Concurrency conflict
- Validation unavailable
- Approval expired
- Permission lost
- Accepted asynchronous work
- Partial, failed, and indeterminate execution
- Offline read and blocked mutation

## Accessibility

- Worklists expose headers, row identity, position, sort, and selection.
- Virtualization preserves semantics and focus.
- Bulk scope is textual.
- Workspace tabs and panels follow logical navigation.
- Before/after and audit data have structured alternatives.
- Keyboard users can complete supported workflows.
- Guarded large-workspace mode cannot excuse inaccessible implementation.

## Governance

1. Admin Platform owns shared shell, worklist, workspace, and continuity behavior.
2. Source domains own facts and mutations.
3. Roles and Permissions owns authorization semantics.
4. Audit owns authoritative audit records.
5. Design System owns shared component and pattern contracts.
6. New fast actions declare risk, scope, enforcement, audit, and recovery.

## Validation

Test all 34 Admin pages through representative Queue and Resource Workspace compositions, role/scope combinations, field restrictions, bulk action outcomes, approval/segregation, permission change, offline/degraded states, themes, densities, responsive guards, keyboard, assistive technology, zoom, and Portuguese operational content.

## Consequences

### Benefits

- One work model serves many domains and roles.
- Staged work remains distinct from authoritative truth.
- Risk, permission, approval, and audit remain visible.
- Responsive continuity preserves safe urgent work.

### Costs and risks

- Permission and state combinations are extensive.
- Shared worklists need strong field and schema governance.
- High-density accessible work requires careful implementation.

## Next decision

Define loading, empty, error, offline, degraded, conflict, pending, and recovery components.
