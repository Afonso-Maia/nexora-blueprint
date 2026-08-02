# Layout, Spacing, Sizing, and Density

**Status:** Approved

## Purpose

This document defines Nexora’s spatial scale, containers, grids, readable measures, control sizes, responsive thresholds, sticky behavior, and comfortable and compact density contracts.

## Decision

Nexora uses a **content-driven responsive layout system** built on a four-point spatial rhythm, bounded fluid gutters, nested containers, and archetype-aware transformations.

Breakpoints represent a layout’s capacity to preserve meaning and safe interaction. They are not device brands. Compact density increases scannability without reducing capabilities, text legibility, target safety, state visibility, or accessibility.

## Spatial scale

| Token | Value | Typical use |
| --- | ---: | --- |
| `space.0` | `0` | Intentional adjacency |
| `space.25` | `2px` | Optical adjustment only |
| `space.50` | `4px` | Tight internal separation |
| `space.100` | `8px` | Related inline items |
| `space.150` | `12px` | Compact control grouping |
| `space.200` | `16px` | Default component inset or gap |
| `space.300` | `24px` | Section-internal grouping |
| `space.400` | `32px` | Major component separation |
| `space.500` | `40px` | Compact section separation |
| `space.600` | `48px` | Standard section separation |
| `space.800` | `64px` | Large section separation |
| `space.1000` | `80px` | Major Hub rhythm |
| `space.1200` | `96px` | Exceptional display composition |

`2px` is limited to optical alignment and thin graphical separation. Interactive spacing uses the four-point rhythm.

## Spatial semantics

- `layout.gap.inline` resolves to `space.100`.
- `layout.gap.control` resolves to `space.150`.
- `layout.gap.component` resolves to `space.200`.
- `layout.gap.region` resolves from `space.300` to `space.400`.
- `layout.gap.section` resolves from `space.500` to `space.800`.
- `layout.inset.control` resolves by control size.
- `layout.inset.component` resolves from `space.150` to `space.300`.
- `layout.inset.page` uses the responsive gutter contract.

Components use semantic gaps rather than selecting arbitrary scale steps. Reducing space cannot erase grouping or make unrelated actions appear connected.

## Page containers

| Token | Maximum measure | Purpose |
| --- | ---: | --- |
| `layout.container.reading` | `720px` | Buying guides, Support, legal, and explanatory content |
| `layout.container.form` | `640px` | Focused authentication and simple forms |
| `layout.container.transaction` | `1200px` | Cart, Checkout, confirmation, and review |
| `layout.container.standard` | `1280px` | Storefront, discovery, Account, and Support |
| `layout.container.wide` | `1440px` | Comparison, PC Builder, and broad operational work |
| `layout.container.data` | `1600px` | Guarded high-density Admin work |

Maximum width does not force every region to fill the container. Nested content uses the narrowest measure appropriate to its task.

## Responsive gutters

| Layout capacity | Page gutter |
| --- | ---: |
| Constrained | `16px` |
| Compact | `24px` |
| Standard | `32px` |
| Wide | `48px` |
| Extra wide | `64px` maximum |

Gutters may resolve fluidly between bounds. Safe-area insets are added where the platform requires them.

## Grid

The default page grid supports 12 logical columns at standard and wider capacities, 8 at compact capacity, and 4 at constrained capacity.

Grid rules:

- Columns express alignment, not mandatory equal-width content.
- Gaps use `16px`, `24px`, or `32px` according to capacity and density.
- Nested grids inherit the parent rhythm but may use fewer columns.
- Results grids use minimum viable card width and available content, not a fixed device count.
- Comparison columns preserve decision relationships before equal widths.
- Admin worklists may scroll horizontally only when the table relationship is essential and an accessible compact alternative is not truthful.
- Visual order cannot contradict reading or focus order.

## Layout thresholds

Canonical threshold names are:

- `constrained` — a single primary column is required
- `compact` — limited supporting columns or drawers are viable
- `standard` — primary and supporting regions can coexist
- `wide` — persistent multi-panel work becomes viable
- `data-wide` — guarded dense comparison or operational work

Exact pixel thresholds are implementation outputs derived from real component fit, user font settings, zoom, and content expansion. No threshold is named mobile, tablet, or desktop.

## Control sizes

| Token | Visual height | Use |
| --- | ---: | --- |
| `size.control.small` | `32px` | Guarded compact desktop controls |
| `size.control.medium` | `40px` | Default secondary and dense controls |
| `size.control.large` | `48px` | Primary forms, search, purchase, and touch-forward actions |
| `size.control.xlarge` | `56px` | Hero search or exceptional primary entry |

Interactive target size is separate from visual size:

- Default minimum target: `44 × 44px`
- Preferred touch target: `48 × 48px`
- Closely spaced targets retain at least `8px` effective separation or an equivalent protected target region.

A visually small icon control still provides the minimum target. Compact density may use `32px` visual controls only with a safe target strategy and non-touch operating context.

## Content sizing

- Body reading measure follows the [Typography](05-typography.md) line-length contract.
- Product cards use bounded media ratios and content-driven height; decisive content is not clipped for row uniformity.
- Form controls fill their logical group rather than the entire wide container.
- Price, stock, Compatibility, totals, and primary actions remain adjacent to the object or commitment they affect.
- Sidebars have bounded measures and cannot compress the primary task below its viable width.
- Tables preserve column meaning through priority, wrapping, pinning, or governed overflow.

## Responsive transformations

### General sequence

When capacity decreases:

1. Reduce outer whitespace within approved bounds.
2. Reflow columns while preserving semantic order.
3. Move supporting regions into labeled tabs, drawers, or disclosures.
4. Keep active state and critical constraints visible outside collapsed regions.
5. Make primary and recovery actions readily recoverable.
6. Use guarded larger-workspace continuation only when truthful safe operation is impossible.

The system does not first shrink text, targets, or decisive content.

### Multi-panel workspaces

Comparison, PC Builder, AI, and Admin workspaces:

- Preserve workspace identity, save or operation state, and critical constraints.
- Allow secondary panels to become drawers or tabs.
- Persist active object, selection, scroll context, and drafts across panel changes.
- Keep blocking validation globally summarized and locally associated.
- Avoid nested horizontal and vertical scrolling traps.

### Results and filters

- Filters may move to a drawer.
- Active filters, count, and sorting remain visible outside the drawer.
- Result updates preserve or deliberately restore focus.
- Selection state remains visible when a batch or compare action is active.

### Transactions

- Summary and total remain accessible while modules reflow.
- Sticky commit actions reflect the exact current reviewed state.
- Keyboard and validation do not cover the affected field.
- Back navigation preserves valid inputs without duplicating submission.

## Sticky and fixed regions

Sticky behavior is permitted for:

- Global or local navigation where it improves orientation
- Active filter and result controls
- Comparison identity
- Workspace consequence summaries
- Transaction totals and commit actions
- Current Admin selection or operation state

Sticky regions must:

- Respect zoom, safe areas, and on-screen keyboards.
- Never cover focused controls, validation, warnings, or recovery.
- Avoid stacking into excessive viewport occupation.
- Provide equivalent access when stickiness is unavailable.
- Preserve source order and landmarks.

Fixed promotional overlays and automatically expanded AI panels are prohibited.

## Density

### Comfortable

Comfortable is the default across customer experiences and general-purpose Admin work.

It uses:

- Default component insets and row spacing
- Medium or large controls according to task
- Visible labels and supportive descriptions
- Progressive technical detail
- Generous separation around transactions and warnings

### Compact

Compact is available for approved Admin queues, data tables, comparison-heavy work, and other genuinely dense tasks.

Compact may:

- Reduce component insets and row height
- Use small-body and small-data roles
- Tighten repeated column gaps
- Increase visible records
- Condense secondary descriptions into accessible disclosure

Compact cannot:

- Remove labels, actions, status, validation, scope, or recovery
- Reduce text below approved roles
- Reduce effective targets below the accessibility contract
- Change permissions or operation availability
- Convert touch-first workflows into unsafe small controls
- Apply automatically because the viewport is narrow

Users may choose density where supported. A product may set an appropriate default, but the semantic component remains the same.

## Spacing in states

- Loading placeholders preserve the expected layout without fabricating content.
- Empty states occupy the affected region, not an arbitrary full-page minimum height.
- Validation space appears near its source without causing critical controls to jump unpredictably.
- Partial failures preserve successful regions and their established alignment.
- Banners use bounded content width and do not introduce a second page grid.
- Recovery actions remain grouped with their explanation.

## Accessibility

- Layout supports zoom and text scaling without loss of content or function.
- Reflow avoids two-dimensional scrolling except for essential tables, diagrams, timelines, and workspaces with an accessible alternative or guarded mode.
- Focus order follows semantic reading order.
- Landmarks and headings survive visual recomposition.
- Pointer target safety is independent of visible control size.
- Drag layouts provide non-drag alternatives.
- Sticky elements do not obscure focus.
- Orientation is not locked unless an essential approved task requires it.

## Governance

1. New spacing or sizing values require a recurring gap not expressible by the approved scale.
2. Page-specific breakpoints are allowed only when derived from a documented component or archetype fit failure.
3. New maximum containers require an approved archetype or task-density need.
4. Compact density requires representative keyboard, touch, zoom, and reflow validation.
5. A one-off layout cannot redefine semantic priority or create a canonical page.
6. Larger-workspace guards follow the approved Phase 2B risk and density boundary.

## Validation

Layout validation covers:

- All nine archetypes
- All approved container types
- Portuguese content expansion and long technical values
- Light and dark themes
- Comfortable and compact density
- Keyboard, touch, pointer, and assistive technology
- Text scaling, zoom, reflow, safe areas, and on-screen keyboards
- Loading, empty, partial, error, offline, and conflict states
- Sticky-region collision and focus visibility
- Comparison, Checkout, PC Builder, and high-density Admin stress cases

## Consequences

### Benefits

- The system adapts to content and task safety rather than device assumptions.
- A shared rhythm connects premium whitespace with dense operational work.
- Semantic continuity survives narrow layouts.
- Density scales information without creating separate products.

### Costs and risks

- Exact thresholds require implementation measurement rather than fixed device presets.
- Multi-panel components need deliberate transformation specifications.
- Compact density creates additional validation combinations.
- Guarded data-wide work needs safe continuation behavior.

## Next decision

Define shape, borders, elevation, overlays, and depth semantics.
