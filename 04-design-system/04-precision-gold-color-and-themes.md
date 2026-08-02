# Precision Gold Color and Themes

**Status:** Approved

## Purpose

This document translates the approved Precision Gold visual direction into an accessible reference palette, semantic color roles, and equivalent light and dark theme behavior.

It implements the approved [Design Token Architecture](03-design-token-architecture.md). Token names and values are design specifications, not implementation code.

## Decision

Nexora uses a **neutral-led Precision Gold system**.

Warm architectural neutrals carry surfaces, content hierarchy, borders, and most controls. Gold expresses brand identity, focus, selection, premium emphasis, and bounded high-value action moments. Gold is not the default color for every action and never represents warning, success, compatibility, inventory, permission, or operational truth by itself.

Functional information uses independent blue, green, orange, and red families with text, iconography, shape, and programmatic semantics. Light and dark themes resolve the same semantic roles with equivalent hierarchy, capability, and accessibility.

## Color principles

1. Color clarifies hierarchy and state; it does not replace labels or structure.
2. Gold is scarce enough to retain meaning.
3. Deterministic and operational states use functional semantics, not brand inference.
4. Theme parity means equivalent comprehension and capability, not identical values.
5. Text and essential graphical objects meet their applicable contrast requirements.
6. Focus remains visible against every supported adjacent surface.
7. Dynamic imagery receives protective treatment rather than assumed contrast.
8. Large areas remain calm and neutral to preserve product and technical-data legibility.
9. Promotional color cannot outrank the primary task or critical constraint.
10. Unknown, stale, or unavailable state is never displayed as neutral success.

## Reference palette

### Precision Gold

| Token | Value | Intended reference range |
| --- | --- | --- |
| `color.gold.50` | `#FFF9E8` | Subtle warm field |
| `color.gold.100` | `#FCEFC0` | Soft highlight |
| `color.gold.200` | `#F7DD86` | Strong highlight |
| `color.gold.300` | `#EFC34F` | Dark-theme emphasis |
| `color.gold.400` | `#DCA62E` | Dark-theme action and selection |
| `color.gold.500` | `#B8860B` | Core brand gold |
| `color.gold.600` | `#946B08` | Light-theme interactive accent |
| `color.gold.700` | `#705006` | Light-theme text accent |
| `color.gold.800` | `#4D3705` | Strong gold content |
| `color.gold.900` | `#2F2204` | Deep warm field |
| `color.gold.950` | `#1A1202` | Darkest warm field |

Gold uses warm, restrained values rather than neon yellow, metallic gradients, or orange-heavy gamer styling.

### Architectural neutral

| Token | Value |
| --- | --- |
| `color.neutral.0` | `#FFFFFF` |
| `color.neutral.25` | `#FCFBF9` |
| `color.neutral.50` | `#F7F6F3` |
| `color.neutral.100` | `#EEECE7` |
| `color.neutral.200` | `#DDD9D1` |
| `color.neutral.300` | `#C4BFB5` |
| `color.neutral.400` | `#999287` |
| `color.neutral.500` | `#706A61` |
| `color.neutral.600` | `#514C45` |
| `color.neutral.700` | `#39352F` |
| `color.neutral.800` | `#26231F` |
| `color.neutral.900` | `#181614` |
| `color.neutral.950` | `#0E0D0C` |
| `color.neutral.1000` | `#000000` |

The neutral family is slightly warm to support the gold identity without tinting product imagery or making white surfaces appear yellow.

### Functional families

Functional families use governed scales compatible with semantic state roles:

| Family | Core value | Purpose |
| --- | --- | --- |
| Blue | `#2563EB` | Informational state, neutral system guidance, active technical reference |
| Green | `#15803D` | Confirmed positive state and completed eligible outcome |
| Orange | `#C2410C` | Caution, attention, and overridable warning |
| Red | `#B91C1C` | Critical, destructive, invalid, blocked, or failed state |

Supporting light and dark functional values are approved where they appear in the semantic mappings below. Complete implementation scales may interpolate only when the resulting tokens pass the same semantic and accessibility review.

## Light theme

### Surfaces and content

| Semantic token | Reference value | Use |
| --- | --- | --- |
| `color.surface.canvas` | `neutral.25` | Application background |
| `color.surface.base` | `neutral.0` | Primary page and component surface |
| `color.surface.raised` | `neutral.0` | Floating or elevated surface |
| `color.surface.sunken` | `neutral.50` | Recessed region and grouped field |
| `color.surface.subtle` | `neutral.100` | Selected-neutral or supporting region |
| `color.surface.inverse` | `neutral.900` | Inverse content region |
| `color.content.strong` | `neutral.900` | Primary heading and critical content |
| `color.content.default` | `neutral.800` | Body and control content |
| `color.content.muted` | `neutral.600` | Supporting content |
| `color.content.subtle` | `neutral.500` | Lowest supported informative text |
| `color.content.inverse` | `neutral.50` | Content on inverse surfaces |
| `color.content.brand` | `gold.700` | Accessible gold text accent |

`color.content.subtle` is not used for required labels, validation, prices, inventory, permissions, or critical constraints.

### Borders and dividers

| Semantic token | Reference value |
| --- | --- |
| `color.border.subtle` | `neutral.100` |
| `color.border.default` | `neutral.200` |
| `color.border.strong` | `neutral.400` |
| `color.border.inverse` | `neutral.600` |
| `color.border.brand` | `gold.600` |

Structural boundaries remain visible without outlining every region. Borders supplement spacing, grouping, surface, and headings rather than carrying hierarchy alone.

### Actions, selection, and focus

| Semantic token | Reference value | Content |
| --- | --- | --- |
| `color.action.primary.surface` | `neutral.900` | `neutral.0` |
| `color.action.primary.hover` | `neutral.800` | `neutral.0` |
| `color.action.primary.pressed` | `neutral.950` | `neutral.0` |
| `color.action.secondary.surface` | `neutral.0` | `neutral.900` |
| `color.action.secondary.border` | `neutral.400` | — |
| `color.action.quiet.content` | `neutral.800` | — |
| `color.action.brand.content` | `gold.700` | — |
| `color.selection.surface` | `gold.50` | `neutral.900` |
| `color.selection.border` | `gold.600` | — |
| `color.focus.ring` | `gold.500` | — |

The default primary action is near-black rather than gold. Gold may become a bounded primary-action surface in signature decision moments only when the exact foreground, adjacent surfaces, state variants, and repeated-page effect are validated. This exception cannot make every call to action gold.

Text links use underlines or another persistent non-color affordance in body content. Gold link content uses `gold.700` or darker on light surfaces.

## Dark theme

### Surfaces and content

| Semantic token | Reference value | Use |
| --- | --- | --- |
| `color.surface.canvas` | `neutral.950` | Application background |
| `color.surface.base` | `neutral.900` | Primary page and component surface |
| `color.surface.raised` | `neutral.800` | Floating or elevated surface |
| `color.surface.sunken` | `neutral.1000` | Recessed region and grouped field |
| `color.surface.subtle` | `neutral.800` | Selected-neutral or supporting region |
| `color.surface.inverse` | `neutral.50` | Inverse content region |
| `color.content.strong` | `neutral.50` | Primary heading and critical content |
| `color.content.default` | `neutral.200` | Body and control content |
| `color.content.muted` | `neutral.300` | Supporting content |
| `color.content.subtle` | `neutral.400` | Lowest supported informative text |
| `color.content.inverse` | `neutral.900` | Content on inverse surfaces |
| `color.content.brand` | `gold.300` | Gold text accent |

Dark surfaces are not pure black by default. `neutral.1000` is reserved for true recess, protective media treatment, and exceptional maximum-depth contexts.

### Borders and dividers

| Semantic token | Reference value |
| --- | --- |
| `color.border.subtle` | `neutral.800` |
| `color.border.default` | `neutral.700` |
| `color.border.strong` | `neutral.500` |
| `color.border.inverse` | `neutral.300` |
| `color.border.brand` | `gold.400` |

### Actions, selection, and focus

| Semantic token | Reference value | Content |
| --- | --- | --- |
| `color.action.primary.surface` | `gold.400` | `neutral.950` |
| `color.action.primary.hover` | `gold.300` | `neutral.950` |
| `color.action.primary.pressed` | `gold.500` | `neutral.950` |
| `color.action.secondary.surface` | `neutral.900` | `neutral.50` |
| `color.action.secondary.border` | `neutral.500` | — |
| `color.action.quiet.content` | `neutral.100` | — |
| `color.action.brand.content` | `gold.300` | — |
| `color.selection.surface` | `gold.950` | `neutral.50` |
| `color.selection.border` | `gold.400` | — |
| `color.focus.ring` | `gold.300` | — |

Gold carries more luminous action emphasis in dark theme because it remains calm against deep neutral surfaces and supports strong dark foreground contrast. This difference preserves equivalent prominence rather than identical color usage.

## Functional status mappings

### Light theme

| Role | Surface | Content and icon | Border |
| --- | --- | --- | --- |
| Informational | `#EFF6FF` | `#1E40AF` | `#93C5FD` |
| Positive | `#F0FDF4` | `#166534` | `#86EFAC` |
| Cautionary | `#FFF7ED` | `#9A3412` | `#FDBA74` |
| Critical | `#FEF2F2` | `#991B1B` | `#FCA5A5` |
| Neutral | `neutral.50` | `neutral.700` | `neutral.300` |

### Dark theme

| Role | Surface | Content and icon | Border |
| --- | --- | --- | --- |
| Informational | `#172554` | `#BFDBFE` | `#3B82F6` |
| Positive | `#052E16` | `#BBF7D0` | `#22C55E` |
| Cautionary | `#431407` | `#FED7AA` | `#F97316` |
| Critical | `#450A0A` | `#FECACA` | `#EF4444` |
| Neutral | `neutral.800` | `neutral.200` | `neutral.600` |

The functional role is presentation-level. Components provide the specific domain label, icon, state semantics, action effect, and programmatic announcement.

### State restrictions

- Green is used only for confirmed positive or completed eligible outcomes.
- Orange represents attention or an overridable warning; it does not represent a hard incompatibility.
- Red represents destructive action, invalid input, blocked constraint, failure, or critical condition according to the host state.
- Blue represents information, not AI by default. AI receives an explicit label and provenance rather than an exclusive color claim.
- Gold never substitutes for a functional state.
- Gray or muted treatment cannot make an actionable denied, stale, unknown, or failed state appear harmless.

## Commerce and technical semantics

### Price and promotion

Default price uses strong content color. A valid discount may use critical or promotional emphasis only with an explicit current price, prior price when applicable, and textual discount context.

Red is not used merely to make an ordinary price look urgent. Gold may frame a premium offer or selected financing option but does not prove eligibility, savings, or availability.

### Inventory

Inventory states combine text and, where useful, iconography:

- Confirmed available may use positive presentation.
- Limited stock uses cautionary presentation only when the threshold is authoritative.
- Unavailable uses critical or strong neutral presentation according to action consequence.
- Unknown or stale inventory uses neutral or cautionary presentation with explicit uncertainty.

### Compatibility

- Compatible uses confirmed positive presentation.
- Warning uses cautionary presentation and may be overridable only when the Compatibility contract allows it.
- Hard incompatibility uses critical presentation and cannot be overridden.
- Unknown, stale, or degraded evaluation remains distinct from compatible and incompatible.

AI explanations use their own labeled container and cannot recolor or obscure deterministic Compatibility output.

### Permissions and operational state

Permission-aware presentation distinguishes unavailable, disabled-with-reason, read-only, denied, and concealed states through content and behavior. Color never implies authorization and cannot replace source-service enforcement.

Pending, accepted, completed, failed, partial, and indeterminate operations retain distinct labels and iconography. Positive color appears only after authoritative confirmation.

## Data visualization

Charts and technical visualizations:

- Use a theme-tested categorical and sequential palette derived from functional and supporting hues.
- Reserve red, orange, green, and gold when their interface meanings are active in the same context.
- Pair color with labels, direct values, patterns, line styles, shapes, or accessible descriptions.
- Keep series identity stable across theme changes.
- Do not encode permission-restricted or unavailable data as zero.
- Provide tabular or textual access to decision-relevant values.

Exact chart series are deferred until data-visualization components are specified. Ad hoc rainbow palettes are prohibited.

## Imagery and media

Product photography and editorial images are not inverted, hue-rotated, or darkened globally in dark theme.

The system provides:

- Neutral image stages that preserve product color
- Protective scrims or solid text regions over dynamic media
- Theme-specific logo and line-art assets where necessary
- Visible media boundaries on surfaces of similar color
- Accessible alternative text or equivalent descriptions
- Reduced glare without concealing product details

Gold gradients, metallic textures, glow, and reflective effects are not default brand devices. A restrained gradient may be proposed for a bounded campaign or signature moment only when content contrast, motion, and hierarchy remain compliant.

## Elevation and overlays

Light theme may combine subtle shadow, border, and surface contrast. Dark theme relies more on surface steps and borders because shadow alone is often imperceptible.

Modal and blocking overlays:

- Preserve enough background context to communicate layering.
- Do not reduce foreground contrast.
- Trap focus only when the interaction is truly modal.
- Never use translucency to expose restricted content.

Opacity is not used to make required text, active constraints, or enabled controls appear disabled.

## Theme selection and persistence

The theme control offers:

- System
- Light
- Dark

On first use, Nexora follows the system preference. An explicit user selection overrides the system choice and persists locally. For authenticated customers, the preference may synchronize through Account settings while the current device applies the local selection immediately.

Theme behavior must:

- Apply before meaningful content renders when technically possible.
- Avoid a misleading flash of the opposite theme.
- Preserve focus, scroll position, open panels, drafts, and operation state.
- Announce the changed preference when initiated by the user.
- Re-evaluate system preference only while System is selected.
- Remain available without requiring authentication.
- Fail to a complete supported theme rather than a partially resolved mixture.

Admin and customer products share the same semantic theme model. A product may have a distinct shell composition but not an independent color language.

## Contrast and non-color requirements

The system targets WCAG 2.2 AA as the minimum foundation:

- Normal text: at least `4.5:1`
- Large text: at least `3:1`
- Essential graphical objects, control boundaries, and state indicators: at least `3:1` against adjacent colors
- Focus indicators: perceptible across their complete perimeter or equivalent visible area, with at least the applicable contrast

Enhanced contrast is preferred for body text and critical commerce or operational facts where it does not damage hierarchy.

Disabled controls remain identifiable and discoverable when their reason matters. Their status is not communicated only through reduced opacity, and required explanations retain readable contrast.

Color is always supplemented for:

- Status and severity
- Required and invalid fields
- Selection
- Links within prose
- Price change
- Compatibility
- Inventory
- Permission and assurance
- Chart series
- Focus and current navigation

## Theme parity validation

Every shared primitive, component, pattern, and page template is validated in both themes for:

- Semantic token resolution without missing aliases
- Text and non-text contrast
- Focus and selection visibility
- Hover, pressed, active, disabled, read-only, and loading states
- Informational, positive, cautionary, critical, and neutral states
- Product imagery and dynamic media
- Elevation and overlapping surfaces
- Form autofill and browser-controlled states
- Data visualization and technical diagrams
- Reduced motion, zoom, text scaling, and high-contrast user settings
- Screenshot or resolved-token regression against unintended drift

Theme parity requires equivalent task completion and comprehension. A component is not approved when one theme has an ambiguous state, missing boundary, concealed focus, or lower-capability presentation.

## Governance

1. New semantic color roles require Design System and Accessibility approval.
2. Domain teams consume shared functional roles and cannot create independent status palettes.
3. New reference colors require named consumers and theme impact analysis.
4. Gold usage is reviewed for scarcity, meaning, contrast, and competition with functional state.
5. Marketing variation remains bounded and cannot alter shell, transaction, Support, authentication, or Admin state semantics.
6. Changes validate known consumers in both themes.
7. Color values may evolve through the coordinated token lifecycle without a new ADR when semantic roles and protected boundaries remain unchanged.

A separate ADR is not required for this decision because it implements the accepted [semantic token architecture](../adrs/ADR-0005-semantic-design-token-architecture.md) and preserves the previously approved Precision Gold direction. A material change from neutral-led Precision Gold, theme parity, or independent functional state colors requires ADR evaluation.

## Consequences

### Benefits

- Large surfaces remain calm, premium, and suitable for technical comparison.
- Gold retains recognizable brand value without becoming promotional noise.
- Status, compatibility, inventory, and permission semantics remain distinguishable.
- Light and dark themes share one stable semantic contract.
- Product photography remains visually trustworthy.

### Costs and risks

- Selective gold use requires governance to resist accent proliferation.
- Dark-theme elevation requires more than shadow substitution.
- Functional and data-visualization colors require complete theme testing.
- Marketing artwork needs bounded integration rather than unrestricted brand color.

## Validation

Representative specified pairs meet or exceed their applicable targets, including:

- Light primary content on canvas: greater than `17:1`
- Light muted content on base: greater than `8:1`
- Light gold text accent on base: greater than `7:1`
- Light focus gold against base: greater than `3:1`
- Dark primary content on canvas: greater than `17:1`
- Dark gold primary action content: greater than `8:1`
- Light functional-state text on its surface: greater than `6.8:1`
- Dark functional-state text on its surface: greater than `10:1`

Final component validation uses the actual adjacent colors, text size, weight, state, and rendering context rather than relying on palette-pair calculations alone.

## Next decision

Define the typography system, font strategy, type roles, technical-data treatment, responsive scaling, localization behavior, and loading resilience.
