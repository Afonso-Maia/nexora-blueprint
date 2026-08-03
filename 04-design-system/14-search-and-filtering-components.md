# Search and Filtering Components

**Status:** Approved

## Purpose

This document specifies Universal Search entry, suggestions, result identity, filters, intent, sorting, selection, pagination, saved views, and recovery.

## Decision

Nexora uses **one visible query-and-refinement state** across Universal Search and Category Discovery.

Search suggestions and results group authoritative content types without blending them. Intent may configure ranking and filters only when its effects are visible, modifiable, and clearable. AI remains an optional follow-up and cannot replace deterministic Search, taxonomy, attributes, or Compatibility.

## Search field

Anatomy:

1. Persistent Search identity or accessible label
2. Query input
3. Submit action
4. Clear action when populated
5. Optional recent or voice/image affordance only if later approved
6. Suggestion panel relationship
7. Loading and availability state

Rules:

- Global Search remains prominent in the customer header.
- Submission is always available; suggestions are optional acceleration.
- Enter submits the current query unless an explicitly selected suggestion is active.
- Clearing removes the current query deliberately and does not erase unrelated saved history without confirmation.
- Search failure preserves the query.

## Suggestion panel

Suggestions may include:

- Products
- Categories
- Brands
- Collections
- Buying guides
- PC builds
- Support articles and FAQs
- Promotions
- Recent and trending queries

Products rank first for commercial queries by default. Types use visible group labels and consistent result anatomy.

Each suggestion exposes:

- Primary label
- Type
- Relevant supporting context
- Availability or restriction when necessary
- Why it appears when based on recent, trending, sponsored, personalized, or AI-assisted context

Sponsored content, if introduced, is explicitly labelled.

## Suggestion interaction

- Input retains focus while arrow keys move the active option.
- Active option is programmatically identified.
- Escape closes suggestions without clearing the query.
- Tab follows established field behavior and does not trap users.
- Pointer and keyboard selection produce the same destination or query.
- Updates do not announce every keystroke.
- Partial-source failure preserves available groups and names unavailable groups only when useful.

## Search result identity

The result header exposes:

- Query
- Result count or bounded count state
- Active filters
- Visible intent
- Sort
- Spelling or query interpretation
- Partial, stale, or degraded scope

Corrected spelling never conceals the submitted query. Users can search the original interpretation.

## Result type grouping

The primary Search Results page uses products as the main commercial result set and bounded supporting groups for other content types.

Supporting groups:

- Use their own headings and result anatomy.
- Do not interrupt product scanning repeatedly.
- Link to stable destinations.
- Remain distinguishable from recommendations.

Search does not create mixed cards whose content type can only be inferred visually.

## Product result card

Search and category product cards expose:

- Product identity and variant context
- Factual media
- Current price and relevant prior-price context
- Inventory state
- Rating and review count when available
- Decisive category attributes
- Compatibility state only when authoritative and contextually relevant
- Compare, Wishlist, and Cart actions where eligible
- Promotion or recommendation provenance

Unavailable fields do not collapse into false zero, neutral, or compatibility success.

## Filter hierarchy

Filters appear in this order:

1. Quick Filters
2. Core Filters
3. Category Filters
4. Compatibility Filters
5. AI-assisted Filters

The order may omit inapplicable levels but cannot invert their priority.

## Filter group

Filter Group contains:

- Governed label
- Applicable values and result counts when reliable
- Selected state
- Optional internal search for long bounded value sets
- Clear group action
- Loading, partial, invalid, and unavailable state

Values absent from the current result set are hidden unless retaining a selected zero-result value is necessary for recovery. Disabled and absent remain distinct.

## Filter control types

- Checkbox list for multi-select discrete values
- Radio or single-select for exclusive values
- Range for numeric bounds with direct entry
- Boolean toggle or checkbox for explicit yes/no attributes
- Compatibility selector bound to an authoritative context
- Hierarchical selector only when taxonomy relationships matter

Free-form tags do not replace governed attributes.

## Active filter chip

Active filters remain visible outside drawers and collapsed panels.

Each chip:

- Names attribute and value when value alone is ambiguous.
- Is individually removable.
- Exposes source when AI or intent applied it.
- Preserves focus after removal.
- Does not use color as the only selected cue.

“Clear all” names the affected state and does not clear the query unless explicitly scoped to query and refinements.

## Intent summary

Intent Summary shows:

- Recognized goal
- Applied ranking or filters
- Source: user selection, natural-language interpretation, saved view, or AI
- Modify and clear actions
- Unapplied or ambiguous criteria

Guided and Expert discovery converge on the same result grid and visible filter state.

## Compatibility filter

Compatibility filters consume the shared Compatibility domain:

- Current reference product or build is named.
- Evaluating, compatible, warning, incompatible, unknown, and stale remain distinct.
- Hard incompatibilities cannot be reclassified by the filter component.
- Loss of Compatibility service does not show an unfiltered set as compatible.

## Range filter

- Shows minimum, maximum, units, and current selected range.
- Direct inputs and slider remain synchronized.
- Slider is never the only input method.
- Result data determines useful bounds without silently changing user selection.
- Invalid or stale ranges provide repair.

## Sort

Sort remains independent from filtering.

Options declare their criterion, such as relevance, price, rating, or newest. “Recommended” requires an explanation of relevant factors and is distinguishable from sponsored placement.

Sort changes:

- Preserve query, filters, intent, and selection.
- Announce settled result order and count.
- Restore focus predictably.

## Result count and scope

Count states include:

- Exact
- Bounded or estimated
- Updating
- Partial
- Unavailable

A failed source never becomes zero. Permission-filtered Admin counts use only the viewer’s permitted scope.

## Selection bar

Selection Bar supports Comparison and governed Admin bulk work.

It exposes:

- Selected count
- Scope
- Eligible and rejected selections
- Primary next action
- Clear selection
- Persistence and limit

Selection cannot silently include hidden, inaccessible, or stale records.

## Saved filters and views

Customer saved filters preserve eligible query and refinement context. Admin Saved Views additionally preserve governed columns, sort, and scope.

Opening a saved state:

- Resolves current taxonomy, attributes, permissions, and availability.
- Explains invalid or renamed criteria.
- Never reveals the creator’s inaccessible counts or results.
- Offers repair, reduced-scope continuation, or deletion.

## Zero-result recovery

No Results is distinct from loading, failure, and ineligible items.

Recovery order:

1. Restate query and active criteria.
2. Identify invalid or overly restrictive criteria when determinable.
3. Offer individual criterion removal.
4. Suggest spelling, category, or related governed query.
5. Offer optional AI follow-up.
6. Preserve the user’s original state.

Recommendations do not masquerade as results.

## Responsive behavior

- Search identity and query remain visible.
- Filters may move to a drawer.
- Active filter chips, count, and sort remain outside.
- Result cards use governed minimum width and content-driven height.
- Selection persists while inspecting an item.
- Horizontal filter carousels do not hide active state or keyboard access.

## Accessibility

- Combobox/listbox semantics follow the selected established pattern.
- Result updates announce count without moving focus.
- Filters use native controls where possible.
- Range offers direct numeric input.
- Active filters have visible and programmatic selected state.
- Result landmarks and headings support rapid navigation.
- Loading and pagination expose position and completion.

## Admin operational search boundary

Admin Search:

- Queries permitted operational objects and fields.
- Separates search from commands.
- Filters results through current capability and field scope.
- Excludes public Search ranking and customer history.
- Does not reveal hidden objects through counts, facets, suggestions, or recent work.

## Validation

Test:

- Known-item, broad, natural-language, misspelled, empty, and unsupported queries
- All result types and partial-source failures
- Filter hierarchy, large value sets, ranges, and invalid saved states
- Compatibility available, stale, and unavailable
- Keyboard, touch, screen reader, voice, zoom, and reflow
- Portuguese accents, synonyms, units, and long labels
- Light/dark and comfortable/compact
- 100,000+ product-scale behavior without visual or semantic degradation

## Governance

1. New indexed content types declare result anatomy and ranking role.
2. New filters derive from governed attributes or explicit approved context.
3. AI criteria remain labelled and removable.
4. Search components cannot own taxonomy, Compatibility, ranking policy, or permission.
5. Sponsored presentation requires disclosure and separate governance.

## Consequences

### Benefits

- One visible state connects guided and expert discovery.
- Users can inspect every applied effect.
- Search scales across content types without blending authority.
- Zero-result recovery preserves control.

### Costs and risks

- Mixed source health requires partial-result semantics.
- Large filter sets need attribute governance and performance.
- Natural-language interpretation needs clear uncertainty handling.

## Next decision

Define product, price, inventory, promotion, review, specification, variant, and merchandising components.
