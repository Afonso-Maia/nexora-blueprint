# Page-Level Information Hierarchy

**Status:** Approved in part — hierarchy contract approved; archetype specifications and page mapping pending

## Purpose

This document defines how approved pages prioritize information, actions, constraints, evidence, continuation, and recovery. It turns the [Page Inventory](01-page-inventory.md) and [relationship graph](02-page-relationships-and-ownership.md) into a wireframing contract without prescribing a fixed visual layout.

## Decision

Nexora uses a **layered semantic hierarchy contract** with governed page archetypes.

Every page follows the same priority logic, while its primary archetype adapts emphasis and arrangement to the user’s goal. Responsive layouts may reposition regions but cannot change their semantic priority, hide critical state, or place optional guidance above deterministic facts and required controls.

## Hierarchy layers

| Priority | Layer | Requirement |
| --- | --- | --- |
| 1 | Identity and state | Establish the destination or object, current status, scope, and relevant user-applied context |
| 2 | Primary outcome | Make the page’s main goal and required primary action unambiguous |
| 3 | Critical constraints | Surface price, availability, compatibility, eligibility, permissions, warnings, and other action-changing facts before commitment |
| 4 | Decision or work area | Provide the results, configuration, transaction, content, or operational controls required to achieve the goal |
| 5 | Evidence and detail | Expose specifications, rationale, history, policy, provenance, and audit context progressively |
| 6 | Secondary continuation | Offer related tasks, relevant products or content, optional AI, and next-step continuation without competing with the primary outcome |
| 7 | Recovery and governance | Provide help, error recovery, legal context, ownership, and audit information appropriate to the page |

The numbered layers express priority, not a mandatory vertical sequence. A persistent workspace may show Layers 1–4 concurrently. A legal document may make evidence and governance the main body. A recovery page may elevate Layer 7 because recovery is its primary outcome.

## Approved archetypes

Every page will map to exactly one primary archetype:

1. **Hub**
2. **Results/List**
3. **Detail**
4. **Workspace**
5. **Transaction**
6. **Content/Document**
7. **Recovery**
8. **Admin Queue**
9. **Admin Resource Workspace**

Embedded experience units inherit the host page’s archetype and hierarchy. They do not establish a competing page hierarchy.

## Archetype specification contract

Each archetype specification is enforceable and must define:

- Required regions
- Optional regions
- Prohibited patterns
- Hierarchy-layer emphasis
- Primary-action behavior
- Status and critical-constraint placement
- Responsive transformation
- Accessibility obligations
- Representative approved pages

Wireframes may choose visual composition, density, components, and breakpoint mechanics only after satisfying the semantic contract.

A required region may be compact, progressive, sticky, or conditionally rendered when its underlying data is not applicable. It cannot be omitted when applicable. An optional region must still obey hierarchy and cannot displace required content.

Prohibited patterns are architectural constraints, not stylistic preferences. They prevent a page from changing its approved purpose, obscuring consequential facts, fragmenting a destination into unnecessary routes, or elevating promotional and AI content over the primary outcome.

Archetypes will be specified in three review groups:

1. Customer discovery: Hub, Results/List, and Detail
2. Task completion: Workspace, Transaction, Content/Document, and Recovery
3. Operations: Admin Queue and Admin Resource Workspace

## Global hierarchy rules

1. The primary goal remains visible or readily recoverable throughout the page.
2. Critical warnings and eligibility changes appear before the action they affect.
3. User-applied query, filter, intent, comparison, build, Cart, and case context is visible and modifiable where relevant.
4. Deterministic product, price, inventory, compatibility, policy, and permission facts outrank AI guidance.
5. AI remains optional and does not displace primary controls.
6. Supporting recommendations and merchandising never obscure the fast path.
7. Progressive disclosure hides depth, not consequential facts.
8. Responsive rearrangement preserves reading order, focus order, relationships, and action meaning.
9. Empty, loading, error, offline, and degraded states preserve the host page’s goal and hierarchy.
10. Admin pages show status, permission scope, validation, impact, approval, and audit context before consequential mutation.
11. Legal or policy references appear at the point of consequence and remain accessible as authoritative documents.
12. Secondary continuation cannot look more prominent than the primary outcome merely because it is promotional or personalized.

## Relationship to page shells

Archetype and shell are independent but coordinated:

- Storefront pages may use Hub, Results/List, Detail, Workspace, Content/Document, or Recovery.
- Focused purchase pages primarily use Transaction.
- PC Builder and AI use Workspace.
- Support uses Hub, Content/Document, Results/List, Detail, or Recovery.
- Authentication uses Transaction or Recovery depending on the goal.
- Admin uses Hub, Admin Queue, Admin Resource Workspace, Content/Document, or Recovery.

The shell determines global navigation and persistent utilities. The archetype determines page-level semantic priority.

## Responsive and accessibility contract

- Semantic headings, landmarks, labels, and relationships remain consistent across breakpoints.
- Visual order must not contradict reading or focus order.
- Sticky or persistent actions cannot cover critical content or recovery.
- Mobile may collapse secondary regions but must not hide active constraints or user-applied state.
- Status cannot rely on color alone.
- Dynamic updates announce meaningful changes without interrupting unrelated work.
- Keyboard and assistive-technology users retain equivalent access to primary and recovery actions.

### Admin responsive specialization

Administrative Dashboard pages provide **responsive operational continuity with guarded specialization**.

Mobile-supported capabilities include:

- Monitoring and status inspection
- Operational search, filtering, and saved-view access
- Assignment and routing
- Messaging and evidence upload
- Approval review
- Emergency suspension or revocation
- Safe, bounded single-record actions

Complex schema editing, compatibility-rule authoring, high-volume bulk changes, role-definition editing, deep audit investigation, pricing simulation, and multi-panel impact analysis may require a supported larger workspace.

The restriction is based on interaction safety and available context, not device identity alone.

When a larger workspace is required:

- The action remains visible with a clear explanation.
- Permission, risk, validation, and impact context remains visible.
- Existing drafts and reviewed context persist during handoff.
- A safe return path is provided.
- Emergency protective actions remain available when they can be implemented safely.
- The page does not present a broken or misleading approximation of the workflow.

Accessibility remains mandatory at every supported viewport. Specialization cannot be used to avoid keyboard, assistive-technology, zoom, reflow, or input requirements.

## Approved archetype specifications

### Hub

**Purpose:** Orient users, prioritize continuation, and route them into high-value tasks.

**Layer emphasis:** Primary task and meaningful continuation elevate Layers 1, 2, and 6. Recovery remains available without competing with the task.

**Required regions:**

1. Identity and current scope
2. Primary task entry
3. Meaningful continuation or active-state summary
4. Prioritized destination groups
5. Relevant recovery and help

**Optional regions:**

- Recommendations
- Editorial context
- Contextual AI
- Announcements with genuine task impact

**Prohibited patterns:**

- Stacked promotional banners
- Equal visual priority for every module
- Search hidden beneath merchandising
- Automatically opened AI
- Dead-end promotional content

**Primary-action behavior:** The highest-value task is explicit and remains available before optional modules. A Hub may have several destinations but only one primary task emphasis per context.

**State and constraint placement:** Active orders, builds, cases, account restrictions, or service conditions appear before generic discovery modules when they materially affect the user.

**Responsive transformation:**

- Preserve the primary task and most relevant continuation above secondary modules.
- Collapse lower-priority groups without changing their meaning.
- Do not turn the Hub into an unstructured mobile menu.

**Accessibility obligations:**

- Destination groups use meaningful headings and landmarks.
- Module reordering preserves semantic and focus order.
- Personalized content changes do not move focus unexpectedly.

**Representative pages:** STF-001 Home, STF-002 Deals Hub, ACC-001 Account Dashboard, PCB-001 PC Builder Start, SUP-001 Support Center, LEG-001 Legal and Policies Hub, and ADM-001 Operations Overview.

### Results/List

**Purpose:** Find, refine, assess, and select entities from a governed result set.

**Layer emphasis:** Scope and active state precede the result area. Selection and batch actions become critical constraints while active.

**Required regions:**

1. Query, category, collection, or list identity
2. Result count and current state
3. Visible active filters, intent, and sorting
4. Result area with consistent entity summaries
5. Selection or bulk-action context when active
6. Zero-result and invalid-state recovery

**Optional regions:**

- Quick Filters
- Saved views
- Comparison controls
- Buying guidance
- Contextual AI
- Export or governed bulk actions in Admin contexts

**Prohibited patterns:**

- Separate result grids for guided and expert users
- Hidden intent effects
- Filters with no decision value
- Infinite loading without position and recovery support
- Recommendations presented as indistinguishable results
- Destructive bulk action without review

**Primary-action behavior:** Refinement and entity selection remain the primary interaction. Batch actions appear only after explicit selection and expose scope before execution.

**State and constraint placement:** Applied filters, intent, selection count, permission limits, stale data, and partial-result failures remain adjacent to the results or controlling action.

**Responsive transformation:**

- Filters may move into a drawer, but active state remains visible outside it.
- Sorting and result count remain discoverable.
- Selection state persists while inspecting an item.
- Focus returns predictably after filter or result updates.

**Accessibility obligations:**

- Result updates are announced without replacing focus.
- Entity summaries use consistent names and action order.
- Loading and pagination expose position, progress, and completion.
- Bulk selection is operable without pointer-only interaction.

**Representative pages:** DSC-001 Universal Search Results, DSC-002 Category Discovery, STF-003 Collection, STF-004 Brand, STF-005 Buying Guides Hub, ACC-002 Orders, ACC-004 Wishlist, PCB-003 Saved Builds, and SUP-006 My Support Cases.

### Detail

**Purpose:** Understand one durable object and take the next valid action.

**Layer emphasis:** Identity, state, primary outcome, and critical constraints precede evidence, secondary continuation, and related content.

**Required regions:**

1. Object identity and status
2. Primary summary
3. Critical price, availability, compatibility, eligibility, or permission constraints
4. Primary action and immediate alternatives
5. Evidence and progressively disclosed detail
6. Related lifecycle context
7. Support and recovery

**Optional regions:**

- Media
- Reviews
- History or timeline
- Related products or content
- Comparison entry
- Contextual AI
- Share, save, or print

**Prohibited patterns:**

- Primary action shown before consequential constraints
- Status hidden in decorative presentation
- AI summaries replacing authoritative facts
- Related products outranking object information
- Specifications, reviews, tracking, or case history fragmented into unnecessary routes
- Silent presentation of stale data

**Primary-action behavior:** The action reflects current object state, variant, eligibility, access, and constraints. A changed constraint updates or disables the action with an explanation.

**State and constraint placement:** Status and action-changing facts remain near the summary and primary action. Historical detail cannot substitute for current state.

**Responsive transformation:**

- Identity, status, constraints, and primary action remain together conceptually.
- Sticky actions reflect the current variant, eligibility, and state.
- Deep detail may collapse, but warnings and active context may not.
- Timelines and comparisons retain accessible reading order.

**Accessibility obligations:**

- Object status is programmatically associated with identity.
- Media has equivalent alternatives.
- Disclosure controls expose state and relationships.
- Dynamic price, stock, compatibility, or case changes are announced appropriately.

**Representative pages:** EVA-001 Product Detail, ACC-003 Order Detail, PCB-004 Shared Build, SUP-007 Support Case Detail, and other approved durable-object destinations that are not active workspaces.

### Workspace

**Purpose:** Support persistent, non-linear decision-making or configuration.

**Layer emphasis:** The working canvas, critical constraints, and consequence summary remain concurrently understandable. State persistence is part of identity.

**Required regions:**

1. Workspace identity, ownership, save state, and status
2. Primary working canvas
3. Critical constraints and validation
4. Persistent summary of consequences
5. Contextual tools and supporting panels
6. Save, resume, share, convert, or complete actions
7. Conflict and recovery handling

**Optional regions:**

- AI Copilot
- History
- Collaboration controls if later approved
- Performance or scenario views
- Share controls

**Prohibited patterns:**

- Routed wizard after initialization
- Hidden hard incompatibilities
- AI replacing deterministic validation
- Lost work when switching panels
- Sequential completion without a genuine dependency
- Silent overwrite of concurrent changes

**Primary-action behavior:** Save, convert, or complete actions reflect the latest validated state and disclose their effect on the persistent object.

**State and constraint placement:** Blocking constraints stay adjacent to affected work and are summarized globally. Unsaved, stale, conflicting, or read-only state remains visible.

**Responsive transformation:**

- Preserve the active object, critical summary, and blocking constraints.
- Secondary panels may become drawers or tabs.
- Switching panels cannot reset selection or scroll context unexpectedly.
- Persistent actions reflect the latest validated state.

**Accessibility obligations:**

- Panel relationships and active state are programmatically exposed.
- Validation links to the affected control or object.
- Dynamic recalculation is announced without overwhelming the user.
- Keyboard operation supports the complete non-linear workflow.

**Representative pages:** EVA-002 Comparison Workspace, PCB-002 Engineering Workspace, and AIS-001 AI Assistant Conversation.

### Transaction

**Purpose:** Complete a consequential, validated action with informed consent.

**Layer emphasis:** Scope, constraints, totals, terms, and review precede commitment. Pending and completion states are authoritative.

**Required regions:**

1. Transaction identity and current state
2. Items, scope, or action summary
3. Consequential modules and required inputs
4. Price, totals, eligibility, permissions, and warnings
5. Review and confirmation
6. Primary commit action
7. Failure, pending, and completion handling

**Optional regions:**

- Financing
- Warranty
- Promotion entry
- Contextual AI
- Save and resume where safe

**Prohibited patterns:**

- Surprise costs or terms at commitment
- Preselected optional paid additions without explicit consent
- Confirmation before the authoritative object exists
- Automatic retry of payment or another consequential mutation
- Lost valid inputs after a recoverable failure
- Unified Checkout split into route-based steps

**Primary-action behavior:** The commit action is bound to the exact reviewed state, prevents duplicate submission, and changes clearly when validation or terms change.

**State and constraint placement:** Totals, eligibility, terms, validation, and pending state appear before or adjacent to commitment. Errors remain associated with their source module.

**Responsive transformation:**

- Summary and total remain accessible while editing modules.
- The commit action stays associated with the exact reviewed state.
- Keyboard appearance and validation cannot hide the affected field.
- Back navigation preserves valid work without duplicating submission.

**Accessibility obligations:**

- Error summaries link to invalid fields.
- Required inputs and consent are explicit.
- Pending submission communicates progress and blocks duplicate activation.
- Completion and failure receive focus at the appropriate heading.

**Representative pages:** PUR-001 Cart, PUR-002 Unified Checkout, PUR-003 Order Confirmation, and focused Authentication destinations whose primary goal is a consequential identity action.

### Content/Document

**Purpose:** Communicate governed information with clear authority and useful continuation.

**Layer emphasis:** Purpose, authority, version, and structured content precede related tasks and commercial continuation.

**Required regions:**

1. Title, content type, owner, and publication status
2. Summary or purpose
3. Effective date or version where applicable
4. Structured body with navigable sections
5. Authoritative references
6. Relevant next action or related task
7. Feedback, correction, or escalation path

**Optional regions:**

- Table of contents
- Media
- Related products
- Printable view
- Prior-version access
- Localization selector

**Prohibited patterns:**

- Promotional interruption of legal or Support content
- Missing owner or effective date on policies
- AI-generated text presented as authoritative content
- Related products outranking the document purpose
- Silent replacement of a versioned document
- Broken references without recovery

**Primary-action behavior:** Continuation follows the document’s purpose, such as applying criteria, beginning a governed Support task, managing a right, or viewing an authoritative reference.

**State and constraint placement:** Owner, status, effective date, supersession, missing localization, and stale references appear before affected content or actions.

**Responsive transformation:**

- Preserve heading hierarchy and readable measure.
- Tables and technical content remain operable without losing relationships.
- Anchor navigation accounts for persistent headers.
- Prior versions and authority metadata remain accessible.

**Accessibility obligations:**

- Heading levels reflect document structure.
- Tables identify headers and relationships.
- Media has equivalent alternatives.
- Anchor and prior-version navigation is keyboard operable.

**Representative pages:** STF-006 Buying Guide, SUP-002 Support Article, INF-001 About Nexora, and LEG-002 through LEG-009 policy pages.

### Recovery

**Purpose:** Explain an interruption and help users return safely to a valid goal.

**Layer emphasis:** The condition, preserved state, and primary recovery action become Layers 1–3. Technical detail remains secondary.

**Required regions:**

1. Plain-language condition
2. Impact and what remains preserved
3. Primary safe recovery action
4. Alternative destination or help
5. Retry limitations
6. Non-sensitive Support or correlation reference when useful

**Optional regions:**

- Search
- Available cached context
- Service-impact information
- Sign-in or verification
- Contact Support

**Prohibited patterns:**

- Exposed internal errors or permission rules
- User-blaming language
- Dead ends
- Automatic retry of consequential actions
- Claims that data is preserved when uncertain
- Unverified restoration estimates
- Generic recovery that discards usable host context

**Primary-action behavior:** Recovery is safe, specific, and does not repeat a consequential mutation. Retry communicates scope and limitations.

**State and constraint placement:** Preserved, stale, lost, pending, and inaccessible state is explicit before recovery selection.

**Responsive transformation:**

- The primary recovery action remains immediately visible.
- Copy stays concise at narrow widths.
- Available cached context is distinguishable from current data.
- Reconnection or retry feedback is announced without focus loss.

**Accessibility obligations:**

- The condition heading receives appropriate focus after routing.
- Recovery actions use descriptive labels.
- Status updates are announced without repeated interruption.
- Correlation references are selectable and understandable without revealing internals.

**Representative pages:** SYS-001 Not Found, SYS-002 Access Denied, SYS-003 Unexpected Error, SYS-004 Service Unavailable, SYS-005 Offline, AUT-003 Account Recovery, and expired verification or recovery states within their host page.

### Admin Queue

**Purpose:** Find, prioritize, route, and act on operational work safely.

**Layer emphasis:** Permission scope, actionable exceptions, freshness, selection state, and risk precede aggregate reporting and secondary insight.

**Required regions:**

1. Queue identity, ownership, and permission scope
2. Actionable health or exception summary
3. Filters, saved view, sorting, and freshness
4. Consistent record list
5. Selection and authorized bulk-action state
6. Priority, assignment, service-level, or risk context
7. Detail-workspace handoff
8. Partial-data and recovery state

**Optional regions:**

- Actionable charts
- Exports
- Saved views
- Queue assignment
- Scheduled work
- Density controls

**Prohibited patterns:**

- Vanity metrics without operational continuation
- Counts that include unauthorized records
- Destructive bulk action without scope review
- Hidden active filters or stale-data state
- Separate copies of a queue for each role
- Silent automated assignment
- Export that bypasses record or field permissions

**Primary-action behavior:** Actions operate on an explicit, permission-filtered selection. Scope, consequences, validation, and required approval appear before execution.

**State and constraint placement:** Permission scope, active filters, freshness, selection count, partial data, assignment, service level, and risk remain visible around the list and action bar.

**Responsive transformation:**

- Mobile preserves monitoring, filtering, assignment, messaging, and safe bounded actions.
- Bulk actions expose exact scope before execution.
- High-volume or multi-record impact analysis may require a larger workspace.
- Selection and draft filters survive the handoff.

**Accessibility obligations:**

- Tables and lists expose headers, sort state, selection, and row actions.
- Updates do not move focus unexpectedly.
- Bulk selection and review are fully keyboard operable.
- Charts have equivalent actionable summaries.

**Representative pages:** ADM-002 Products, ADM-004 Categories, ADM-012 Inventory, ADM-014 Pricing, ADM-016 Orders, ADM-018 Customers, ADM-020 Support Queue, ADM-022 Collections, ADM-024 Promotions, ADM-026 Content Library, ADM-029 Review Moderation, and ADM-030 Workforce Users.

### Admin Resource Workspace

**Purpose:** Understand, validate, govern, and audit one durable resource or configuration.

**Layer emphasis:** Resource state, permission scope, validation, impact, and approval precede mutation. Audit context remains available but does not crowd out active work.

**Required regions:**

1. Resource identity, owner, lifecycle state, and version
2. Permission scope and read-only restrictions
3. Operational summary
4. Validation, conflicts, dependencies, and impact
5. Governed editing or action area
6. Preview, test, or simulation when applicable
7. Approval, schedule, and publication state
8. Audit context and history
9. Primary mutation and safe recovery

**Optional regions:**

- Comments or review notes
- Version comparison
- Rollback
- Related-resource panels
- Customer-facing preview
- Export
- AI assistance that cannot authorize changes

**Prohibited patterns:**

- Direct mutation that bypasses the authoritative service
- Self-approval where segregation of duties applies
- Hidden downstream impact
- Silent concurrent overwrite
- Editable or deletable audit history
- Customer data shown without operational purpose
- AI-generated changes activated without validation and approval
- Unsafe narrow-screen approximation of a complex workflow

**Primary-action behavior:** The mutation identifies the exact object, version, scope, impact, reason, and approval state. It fails atomically and leaves a recoverable draft when possible.

**State and constraint placement:** Lifecycle, permission, validation, conflicts, dependencies, concurrent state, and downstream impact remain visible before mutation.

**Responsive transformation:**

- Mobile supports inspection, approval review, evidence, messaging, and emergency protective actions.
- Complex authoring, simulation, schema work, role editing, or impact analysis may require a larger workspace.
- Draft, validation, and reviewed context persist across handoff.
- Restricted actions remain visible with a reason and safe continuation.

**Accessibility obligations:**

- Editing regions, validation summaries, and audit context use explicit landmarks.
- Errors link to affected fields or modules.
- Version and approval changes are announced.
- Complex diagrams, matrices, and previews have equivalent structured representations.

**Representative pages:** ADM-003 Product Workspace, ADM-005 Category Workspace, ADM-007 Brand Workspace, ADM-009 Attribute Workspace, ADM-011 Compatibility Rule Workspace, ADM-013 Inventory Item Workspace, ADM-015 Pricing Rule Workspace, ADM-017 Order Workspace, ADM-019 Customer Workspace, ADM-021 Support Case Workspace, ADM-023 Collection Workspace, ADM-025 Promotion Workspace, ADM-027 Content Workspace, ADM-028 Search Governance, ADM-031 Role Workspace, ADM-032 Audit Log, ADM-033 Reports and Analytics, and ADM-034 Operational Settings.

## Next decision

Map all 89 Page Inventory entries to exactly one primary archetype and validate every mapping against page purpose, shell, constraints, and required states.
