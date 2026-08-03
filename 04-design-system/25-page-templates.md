# Page Templates

**Status:** Approved

## Purpose

This document defines the Design System realization of the nine approved page archetypes.

It converts semantic hierarchy into composition regions, shared component families, responsive transformations, density behavior, and validation without creating new canonical pages.

## Decision

Nexora uses **one governed page template for each approved archetype**:

1. Hub
2. Results/List
3. Detail
4. Workspace
5. Transaction
6. Content/Document
7. Recovery
8. Admin Queue
9. Admin Resource Workspace

Page templates are composition contracts, not fixed wireframes. Domain modules may fill approved slots only when they preserve the page’s purpose, source ownership, hierarchy, and state obligations.

## Shared template frame

Every template identifies:

- Product shell
- Page identity
- Primary archetype
- Semantic region order
- Primary outcome
- Critical constraints
- Main work or content
- Secondary continuation
- Host-owned state boundary
- Responsive transformation
- Accessibility landmarks and focus entry

The shell supplies global navigation and utilities. The template supplies page-level composition.

## Shared region tokens

Conceptual regions:

- `template.identity`
- `template.primary`
- `template.constraints`
- `template.main`
- `template.evidence`
- `template.continuation`
- `template.recovery`

Regions correspond to the approved seven semantic hierarchy layers. They do not require a fixed vertical order when concurrent workspace presentation is necessary.

## Hub template

### Required composition

- Identity and current context
- Primary task entry
- Active obligation or meaningful continuation
- Prioritized destination groups
- Recovery and help

### Component families

- Global or scoped Search entry
- Continuation Card
- Obligation Card
- Destination Group
- Collection or Recommendation Module
- Service Status

### Rules

- One primary task receives highest emphasis.
- Active customer or operational obligations precede generic modules.
- Search precedes merchandising on Home.
- Recommendations and campaigns occupy bounded secondary slots.
- Equal-priority module mosaics are prohibited.

### Responsive

Primary task and current obligation remain first. Destination groups collapse semantically; the template does not become an unstructured menu.

## Results/List template

### Required composition

- Query, category, collection, or list identity
- Count and freshness
- Active filters, intent, and sort
- Results
- Selection or bulk state
- Zero-result and invalid-state recovery

### Component families

- Search Result Header
- Filter Group and Drawer
- Active Filter Chips
- Intent Summary
- Sort
- Product Card or governed Row
- Pagination
- Selection Bar
- Saved View

### Rules

- One result set serves guided and expert paths.
- Recommendations remain separate from results.
- Filter and selection state remain visible.
- Failed count does not become zero.
- Infinite loading requires position and recovery.

### Responsive

Filters may move to a drawer while chips, count, sort, and selection remain outside. Result identity and focus restoration persist.

## Detail template

### Required composition

- Object identity and status
- Primary summary
- Critical facts and constraints
- Primary action
- Evidence and detail
- Lifecycle context
- Support and recovery

### Component families

- Product or Object Identity
- Media Gallery
- Price, Inventory, Compatibility, and Status
- Primary Action Group
- Specification Group
- Timeline
- Related Object Summary
- Recommendation Module

### Rules

- Action-changing facts precede the action.
- Related content does not outrank object truth.
- AI summaries cannot replace evidence.
- Stale data is explicit.

### Responsive

Identity, status, constraints, and action remain conceptually grouped. Sticky actions resolve current variant and eligibility.

## Workspace template

### Required composition

- Persistent object identity, owner, save state, and status
- Main canvas
- Critical constraints and validation
- Consequence summary
- Contextual panels
- Save, share, convert, or complete
- Conflict and recovery

### Component families

- Workspace Header
- Panel Navigation
- Selection or Configuration Canvas
- Constraint Summary
- Save State
- Conflict Resolver
- AI Copilot
- Persistent Action Region

### Rules

- Non-linear work persists across panels.
- Hard constraints remain globally visible.
- AI cannot replace deterministic validation.
- Panel switching does not reset work.
- Silent overwrite is prohibited.

### Responsive

Secondary panels become drawers or tabs. Active object, save state, blocking constraints, and consequence summary persist. Guarded larger-workspace continuation is permitted only by approved risk/density rules.

## Transaction template

### Required composition

- Transaction identity and state
- Items or scope
- Required inputs and modules
- Totals, eligibility, permission, and warnings
- Review
- Commit action
- Pending, failure, and completion

### Component families

- Form Group
- Transaction Summary
- Price and Total
- Consent
- Error Summary
- Commit Action
- Pending Operation
- Confirmation

### Rules

- Commitment binds to exact reviewed state.
- Optional paid additions require explicit consent.
- Recoverable failures preserve valid inputs.
- Confirmation follows authoritative creation.
- Unified Checkout remains one page.

### Responsive

Summary and commit remain associated with the reviewed state. Keyboard and validation cannot obscure input. Route steps are not introduced.

## Content/Document template

### Required composition

- Title, type, owner, and publication status
- Purpose or summary
- Effective date or version
- Structured body
- Authoritative references
- Relevant continuation
- Feedback or escalation

### Component families

- Document Header
- Table of Contents
- Structured Rich Content
- Policy Metadata
- Reference List
- Feedback and Escalation
- Prior Version

### Rules

- Authority and freshness precede affected content.
- Promotional interruption is prohibited.
- AI content cannot appear authoritative.
- Broken references expose recovery.

### Responsive

Readable measure, heading hierarchy, anchor offset, tables, technical media, and version access remain usable.

## Recovery template

### Required composition

- Plain-language condition
- Impact and preserved state
- Primary recovery
- Alternate destination or help
- Retry limitation
- Safe reference

### Component families

- State Heading
- Preserved Context
- Recovery Action Group
- Search or Sign-in
- Service Status
- Support Reference

### Rules

- Recovery is the primary outcome.
- Consequential operations never auto-retry.
- Technical and permission internals remain hidden.
- Usable host context is not discarded.

### Responsive

Condition and recovery remain immediately visible. Cached and current content are distinguishable.

## Admin Queue template

### Required composition

- Queue identity, owner, scope, and freshness
- Actionable health
- Search, filters, saved view, and sort
- Worklist
- Selection and bulk actions
- Priority, assignment, obligation, or risk
- Workspace handoff
- Partial-data recovery

### Component families

- Queue Header
- Operational Search
- Saved View
- Governed Worklist
- Selection Bar
- Bulk Review
- Export
- Assignment and Obligation

### Rules

- Counts and rows use permitted scope.
- Bulk action requires exact review.
- Role-specific duplicate queues are prohibited.
- Stale and partial state remain visible.

### Responsive and density

Comfortable and compact are supported. Monitoring and bounded actions remain available; unsafe broad operations use guarded continuation with persisted selection and filters.

## Admin Resource Workspace template

### Required composition

- Resource identity, owner, lifecycle, version
- Permission scope
- Authoritative summary
- Validation, conflicts, dependencies, and impact
- Editing or action area
- Preview or simulation
- Approval, schedule, and execution
- History and audit
- Mutation and recovery

### Component families

- Resource Header
- Current/Proposed Comparison
- Change Envelope
- Validation Summary
- Impact Preview
- Approval Card
- Execution Status
- Audit Timeline
- Conflict Resolver

### Rules

- Current and proposed state remain distinct.
- Source services own mutation.
- Segregation and approval cannot be bypassed.
- Audit is immutable presentation.
- AI-generated changes require the same validation and approval.

### Responsive and density

Inspection, approval review, evidence, messaging, and emergency protection remain supported. Complex authoring or impact analysis may use guarded larger-workspace continuation with preserved draft and scope.

## Domain module boundary

A domain module may:

- Fill an approved required or optional region.
- Add domain-specific state and evidence.
- Reuse shared components with a governed extension.

It cannot:

- Reorder semantic priority.
- Create a new page identity.
- Move source authority into the template.
- Hide applicable required regions.
- Introduce a new permission or lifecycle model.
- Use optional AI or merchandising to displace primary work.

## Template states

Every template supports:

- Initial and incremental loading
- Relevant empty and zero-result
- Partial and degraded sources
- Validation and eligibility
- Stale and conflict
- Authentication and permission interruption
- Offline
- Pending, failed, indeterminate, and completion where operations exist

State uses the [System-State Components](22-system-state-components.md) within the host boundary.

## Accessibility

Every template declares:

- Page title and primary heading
- Landmarks
- Skip and focus entry
- Semantic source order
- Dynamic announcements
- Sticky and overlay focus behavior
- Zoom, reflow, and text scaling
- Keyboard access
- Structured alternatives for tables, diagrams, and timelines

## Validation

A page-template use passes when:

- Its Page Inventory purpose and owner remain intact.
- All archetype required regions are satisfied.
- Optional regions preserve hierarchy.
- Prohibited patterns are absent.
- States, themes, density, responsive behavior, accessibility, and pt-BR content are covered.
- Source-domain facts and actions remain attributable.

## Governance

1. The Design System Council owns templates.
2. Page owners choose applicable modules within their template.
3. Archetype changes return to Product Structure governance.
4. A page requiring another primary template triggers architecture review.
5. Template variants require durable composition or behavior differences, not page styling.

## Consequences

### Benefits

- Nine templates cover all canonical pages without one-off design.
- Semantic hierarchy becomes directly wireframeable.
- Domain variation remains possible inside governed regions.
- Responsive and accessibility obligations attach at page level.

### Costs and risks

- Template validation requires complete page mapping.
- Domain modules need disciplined slot selection.
- Complex pages require careful concurrent region composition.

## Next decision

Map all 89 Page Inventory entries to their template, required pattern families, and Design System extension needs.
