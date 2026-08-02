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

## Next decision

Specify Workspace, Transaction, Content/Document, Recovery, Admin Queue, and Admin Resource Workspace. Then map all 89 Page Inventory entries to exactly one primary archetype.
