# Navigation Components

**Status:** Approved

## Purpose

This document specifies global, local, responsive, Account, Support, authentication, workspace, and Admin navigation components.

## Decision

Nexora uses **task-prioritized, scope-aware navigation**.

The customer shell preserves Universal Search as the primary interaction, one Categories mega menu, and a compact set of high-value destinations and utilities. Support and Admin retain their approved information scope rather than becoming variants of customer navigation.

## Global customer header

Required regions:

1. Nexora identity and Home target
2. Universal Search entry
3. Primary destinations: Home, Categories, Deals, PC Builder, Support
4. Utilities: AI, Account, Wishlist, Compare, Cart
5. Service or restriction status when it changes a task

Rules:

- Search receives the strongest persistent discovery emphasis.
- Categories is the only mega-menu trigger.
- Utility indicators expose meaningful count or state without promotional animation.
- Cart, Compare, and Wishlist retain accessible names with counts.
- AI is labelled and never opens automatically.
- Authentication state changes utility presentation without rearranging the entire hierarchy.

## Categories mega menu

The mega menu:

- Represents the governed top-level taxonomy.
- Uses category groups and bounded supporting links.
- Supports keyboard entry, directional navigation where appropriate, Escape, and focus return.
- Does not show every attribute, brand, collection, or campaign.
- Keeps merchandising visually secondary to category discovery.
- Does not become a separate mobile taxonomy.

## Responsive customer navigation

At constrained capacity:

- Brand, Search, Account, and Cart remain directly reachable.
- Primary destinations move into one labelled navigation drawer or sheet.
- Active utility state remains visible.
- Search does not become a small unlabeled icon when a meaningful field can fit.
- Opening navigation preserves page scroll and focus context.
- Closing returns focus to the trigger.

The responsive shell preserves conceptual order even when placement changes.

## Navigation link

Navigation Link supports:

- Destination and optional supporting description
- Current-page or current-section state
- Optional icon
- Permission, authentication, or availability gate
- Compact and comfortable presentation

Current state is programmatic and does not rely on color. A hidden destination does not leave an unexplained focus or separator gap.

## Breadcrumbs

Breadcrumbs show stable location within a hierarchy, not click history.

Use for:

- Category and collection context
- Product and content hierarchy
- Support article context
- Admin resource hierarchy where meaningful

Rules:

- Home may be visually compact but remains named accessibly.
- The current page is identified and not linked to itself.
- Long paths prioritize meaningful ancestors and provide accessible overflow.
- Breadcrumbs do not replace Back when returning to preserved task context.

## Back and return context

Back returns to the prior task state when that context is meaningful, such as filtered results, Comparison, a build, a Support case, or an Admin worklist.

The component distinguishes:

- Browser or history back
- Return to preserved source context
- Navigate to a stable parent

Labels name the destination when ambiguity exists.

## Tabs

Tabs organize peer panels within one canonical destination.

- One tab is active.
- Keyboard behavior follows the chosen activation model.
- Deep links may identify a stable tab when approved.
- Tab switching does not discard work.
- Critical status is visible even when its detail panel is inactive.
- Tabs do not fragment an approved single-page Checkout or workspace into route-based steps.

## Subnavigation and section navigation

Use section navigation for stable peer destinations inside Account, Support, content, or Admin capability groups.

It:

- Names its scope.
- Shows current destination.
- Collapses to a labelled switcher or drawer.
- Preserves task-prioritized order.
- Avoids nested more than necessary for comprehension.

## Pagination

Pagination exposes:

- Current position
- Total pages or result range when known
- Previous and next
- Direct page access when useful
- Loading and unavailable behavior

Changing page preserves filters, sorting, and focus context. Infinite loading cannot replace pagination when position, return, or completion matters.

## Step indicator

Step indicators are used only for genuine ordered dependencies such as verification or governed case initiation.

They are not used to turn PC Builder into a wizard or split Unified Checkout into separate routes.

The indicator exposes:

- Current step
- Completed and available steps
- Error or blocked step
- Whether prior steps can be revisited

## Account navigation

Account navigation prioritizes:

1. Current orders and required action
2. Active Support cases
3. Saved builds and decision continuity
4. Wishlist
5. Addresses and payment methods
6. Notifications
7. Settings and privacy

Account links route to source-owned pages and do not imply Account owns their data.

At constrained capacity, current obligations appear before the full destination list.

## Support navigation

Support navigation prioritizes:

1. Search and issue intent
2. Current obligation or active case
3. Common self-service tasks
4. Articles and policies
5. Contact and case continuation

Support context remains editable. Navigation distinguishes self-service, case activity, and authoritative policy references.

## Authentication shell navigation

Authentication uses a minimal shell:

- Nexora identity
- Current authentication goal
- Safe alternate path
- Support and legal access
- Validated return destination

Customer merchandising, Cart pressure, and unrelated utilities do not compete with identity tasks.

## Workspace navigation

Comparison, AI, and PC Builder use local workspace navigation that:

- Preserves persistent object identity and save state.
- Switches panels without route proliferation.
- Keeps critical constraints globally visible.
- Restores the active panel and selection.
- Exposes a safe exit or return destination.

## Admin primary navigation

Admin navigation is capability-based and stable:

- Overview
- Catalog and Compatibility
- Inventory and Pricing
- Orders
- Customers and Support
- Content and Search Governance
- Access and Audit
- Reports and Settings

Presentation:

- Shows only discoverable permitted capability groups.
- Does not expose restricted counts or objects.
- Keeps stable order across roles.
- Explains a lost or temporarily unavailable destination safely.
- Separates operational search from customer Universal Search.

## Admin local navigation

Admin Resource Workspaces may use tabs or section links for:

- Summary
- Editable fields
- Staged changes
- Validation and impact
- Approval and execution
- History and audit references

Permission-limited tabs may be absent or disabled-with-reason according to non-disclosure policy. Their presentation never constitutes enforcement.

## Command launcher boundary

The Admin command launcher:

- Finds permitted destinations and constrained commands.
- Names capability and scope.
- Requires further review for consequential work.
- Cannot directly execute a mutation, approval, export, or permission change.

It is not a universal navigation replacement.

## Utility indicators

Counts for Cart, Compare, Wishlist, notifications, cases, and Admin work:

- Reflect the destination’s visible scope.
- Avoid revealing restricted existence.
- Use bounded display for large counts where exactness is not useful.
- Announce meaningful updates without interrupting work.
- Do not pulse continuously.

## Loading, error, and permission states

- Navigation loading preserves stable available destinations.
- Partial source failure does not erase unrelated navigation.
- A failed count becomes unavailable, not zero.
- Permission changes remove unsafe actions and provide the nearest safe destination.
- Offline navigation remains available for cached safe destinations and labels unavailable actions.
- Route failure retains global recovery unless the shell itself cannot load.

## Accessibility

- Navigation regions have unique names.
- Skip access bypasses repeated shell content.
- Current page and expanded state are programmatic.
- Drawers, mega menus, tabs, and switchers follow established keyboard models.
- Focus is restored after temporary navigation layers.
- Visible and accessible names align.
- Touch targets follow the system minimum.
- Zoom and reflow do not hide Search, Cart, current task, or recovery.

## Governance

1. New top-level destinations require existing IA governance.
2. New navigation components require a distinct semantic model.
3. Domain owners provide destination and state semantics; Design System owns shared interaction.
4. Admin visibility follows capability discovery and non-disclosure rules.
5. Navigation cannot grant authorization or create a new page boundary.

## Validation

Validate:

- Anonymous, guest, customer, restricted customer, workforce, and provider contexts
- Light/dark and comfortable/compact
- Constrained through data-wide layouts
- Keyboard, touch, screen reader, zoom, and reflow
- Long Portuguese labels and counts
- Loading, partial, offline, unavailable, denied, and permission-change states
- Search-first emphasis and Categories-only mega menu
- Return-context restoration from every Tier 1 journey

## Consequences

### Benefits

- Navigation remains compact as content grows.
- Product scopes stay distinct but behavior is consistent.
- Responsive layouts preserve task priority.
- Admin navigation adapts without role-specific page trees.

### Costs and risks

- Preserved return context requires reliable state coordination.
- Permission-safe navigation needs source-aware loading and degradation.
- Mega menu and composite widgets require substantial keyboard testing.

## Next decision

Define Universal Search, suggestion, result, filtering, sorting, selection, and zero-result components.
