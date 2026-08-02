# Shape, Borders, Elevation, and Depth

**Status:** Approved

## Purpose

This document defines geometry, structural boundaries, elevation, overlays, and nested-surface behavior across light and dark themes.

## Decision

Nexora uses **restrained architectural depth**.

Moderate radii, thin structural borders, controlled surface steps, and sparse shadows establish grouping and interaction. Large pill shapes, glassmorphism, decorative bevels, metallic gradients, glow, and excessive floating cards are not part of the core system.

## Shape principles

1. Shape communicates grouping and behavior before personality.
2. Similar geometry implies similar interaction.
3. Nested radii decrease with nesting and preserve consistent inset relationships.
4. Pills are reserved for intrinsically compact rounded objects.
5. Borders and elevation never replace headings, spacing, or landmarks.
6. Dark-theme depth uses surfaces and borders rather than invisible shadows.
7. State and focus remain independent from decorative shape.

## Radius scale

| Token | Value | Use |
| --- | ---: | --- |
| `shape.radius.none` | `0` | Flush tables, media edges, or structural joins |
| `shape.radius.xsmall` | `2px` | Small indicators and optical softening |
| `shape.radius.small` | `4px` | Compact tags, code regions, small controls |
| `shape.radius.medium` | `8px` | Default controls and components |
| `shape.radius.large` | `12px` | Cards, panels, and grouped modules |
| `shape.radius.xlarge` | `16px` | Dialogs and major bounded surfaces |
| `shape.radius.round` | `999px` | Avatars, circular controls, status dots, chips |

Default rules:

- Form controls and buttons use `medium`.
- Product and content cards use `large`.
- Dialogs and major overlays use `xlarge`.
- Nested children use the same or a smaller radius than their container.
- Adjacent segmented controls share one outer radius and explicit internal divisions.

Rounded rectangles are not used for every text label. A label becomes a chip or badge only when its object semantics and interaction justify that component.

## Border widths

| Token | Value | Use |
| --- | ---: | --- |
| `shape.border.none` | `0` | Intentionally boundary-free surface |
| `shape.border.hairline` | `1px` | Default structure and dividers |
| `shape.border.strong` | `2px` | Selected, emphasized, or high-contrast boundary |
| `shape.border.emphasis` | `3px` | Rare state or graphic emphasis |

Focus indicators use the accessibility focus contract rather than borrowing a border width and changing layout.

## Border semantics

- Subtle borders separate low-risk internal regions.
- Default borders identify control and component boundaries.
- Strong borders mark selection, current context, or meaningful containment.
- Functional borders supplement informational, positive, cautionary, and critical content.
- Dividers are used only when spacing and grouping are insufficient.
- Disabled, read-only, and unavailable controls retain a perceivable boundary where interaction expectation exists.

Border color follows the [Precision Gold color roles](04-precision-gold-color-and-themes.md). Brand borders cannot make ordinary content appear selected.

## Elevation levels

| Token | Meaning | Typical use |
| --- | --- | --- |
| `elevation.base` | Document plane | Page and ordinary content |
| `elevation.raised` | Locally raised | Cards, sticky controls, dropdown trigger context |
| `elevation.floating` | Temporary floating layer | Menus, popovers, tooltips |
| `elevation.overlay` | Modal task layer | Dialogs and blocking review |
| `elevation.critical` | Highest exceptional layer | System-critical confirmation or recovery |

Elevation is semantic stacking, not merely shadow intensity. Each level declares focus, dismissal, collision, and accessibility behavior.

## Light-theme depth

Light theme combines:

- Warm neutral canvas and white base surfaces
- Subtle or default borders
- Low-opacity neutral shadows
- Small vertical displacement

Conceptual shadow recipes:

| Token | Recipe |
| --- | --- |
| `elevation.shadow.raised` | `0 1px 2px` low-opacity neutral plus boundary |
| `elevation.shadow.floating` | `0 8px 24px` controlled neutral plus boundary |
| `elevation.shadow.overlay` | `0 20px 48px` controlled neutral plus boundary |

Exact platform blur and opacity values may be calibrated in Engineering while preserving perceptual hierarchy and contrast.

## Dark-theme depth

Dark theme uses:

- `surface.canvas → surface.base → surface.raised` steps
- Default or strong borders at overlapping edges
- Restrained shadow only where it remains perceptible
- No bright outer glow

An elevated dark surface must remain distinguishable under low-quality displays and reduced brightness. Shadow alone is insufficient evidence of depth.

## Cards and panels

A card is appropriate when content:

- Represents one selectable or actionable entity
- Needs a reusable bounded summary
- Participates in a repeated collection
- Requires independent state or interaction

A panel is appropriate when a region:

- Groups related controls or evidence
- Has its own heading and state
- Participates in a workspace arrangement

Cards and panels are not wrappers for every section. Excessive nesting creates false object boundaries and is prohibited.

Interactive cards:

- Expose one clear primary target.
- Keep nested actions individually operable.
- Do not place interactive descendants inside one invalid universal control.
- Show hover only where hover exists and focus equivalently.
- Preserve visible selected, unavailable, and loading states.

## Overlays

### Popover

Use for contextual, non-blocking controls related to a trigger. It closes through an explicit choice, Escape, or safe outside interaction and returns focus to the trigger.

### Tooltip

Use for brief supplementary explanation, never essential instructions or the only full value. It supports hover and keyboard focus and does not contain consequential actions.

### Dialog

Use for a bounded decision or input that requires temporary focus. It has a labelled title, deliberate initial focus, contained keyboard navigation, Escape behavior appropriate to risk, and focus restoration.

### Drawer

Use for supporting navigation, filters, or workspace panels when layout capacity cannot show them concurrently. A drawer does not become an unrelated route or conceal active constraints outside itself.

### Blocking overlay

Use only when background interaction would be unsafe. The overlay cannot expose restricted background content through transparency.

## Scrims

| Token | Light theme | Dark theme |
| --- | --- | --- |
| `color.scrim.standard` | Neutral black at controlled medium opacity | Neutral black at stronger controlled opacity |
| `color.scrim.media` | Content-tested protective gradient or solid region | Content-tested protective gradient or solid region |

Scrims:

- Preserve foreground contrast.
- Retain enough context to explain layering.
- Do not create a decorative frosted-glass language.
- Respect reduced transparency or contrast settings where available.

## Joined and segmented geometry

- Joined controls share boundaries without double borders.
- Segments have equal interaction affordance unless one is explicitly primary.
- Selected segments use content, state, and border—not shape change alone.
- Split buttons separate the default action from alternate-action disclosure.
- Table and worklist rows remain structurally aligned; each cell is not independently card-shaped.

## Focus and state

- Focus rings render outside or within geometry without changing component size.
- Error borders do not erase focus rings.
- Selected, focused, hovered, pressed, and dragged states remain distinguishable in combination.
- Loading does not remove the object boundary when spatial stability matters.
- Skeleton geometry approximates structure without fabricating exact content.

## Responsive and density behavior

- Radii do not scale proportionally with viewport width.
- Full-bleed constrained layouts may remove an outer radius when a surface meets the viewport edge.
- Compact density reduces insets, not semantic borders or focus visibility.
- Dialogs may become constrained full-height sheets while preserving title, actions, and focus behavior.
- Floating multi-panel arrangements may become in-flow tabs or drawers.

## Accessibility

- Essential control boundaries meet applicable non-text contrast.
- Focus indicators remain visible against adjacent surfaces and state borders.
- Shape is never the only cue for state, selection, or action.
- Overlays preserve logical focus, reading order, magnification, and dismissal.
- Transparency cannot impair content contrast.
- Hit targets follow the [layout sizing contract](06-layout-spacing-sizing-and-density.md).

## Governance

1. New radii, borders, or elevation levels require a recurring semantic need.
2. Domain teams cannot create independent shadow or card languages.
3. Glass, glow, metallic, or campaign depth treatments require bounded review and cannot enter transactions, Support, authentication, or Admin semantics.
4. Overlay choice follows interaction and risk, not desired visual drama.
5. Stacking levels are centrally governed; arbitrary escalation is prohibited.

## Validation

Validate:

- Every elevation level in light and dark themes
- Focus combined with validation and selection
- Nested surfaces and radii
- Dialog, drawer, popover, and tooltip keyboard behavior
- Zoom, reflow, safe areas, and on-screen keyboards
- Reduced transparency and high-contrast settings
- Dense tables, cards, transactions, and multi-panel workspaces
- Loading, empty, disabled, stale, partial, and denied states

## Consequences

### Benefits

- Restrained depth supports premium calm and technical clarity.
- Geometry communicates reusable behavior.
- Dark theme remains structurally legible.
- Overlay semantics prevent arbitrary floating interfaces.

### Costs and risks

- Sparse shadow requires disciplined surface and border mapping.
- Nested systems need review to avoid card proliferation.
- Platform shadow recipes require later calibration.

## Next decision

Define iconography and imagery semantics, construction, sourcing, media treatment, and accessibility.
