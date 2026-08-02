# Typography

**Status:** Approved

## Purpose

This document defines Nexora’s typeface strategy, typographic roles, responsive behavior, technical-data treatment, Brazilian Portuguese support, accessibility constraints, and loading resilience.

It translates Precision Gold into a calm, precise reading and data system without introducing decorative typography that competes with product truth.

## Decision

Nexora uses **Inter Variable as its single primary interface and content family**.

Display, heading, body, label, and data roles use the same family with governed size, weight, line height, tracking, and numeric features. A platform monospace stack is reserved for identifiers, codes, hashes, and other content whose character-by-character distinction is part of the task.

Nexora does not use a separate editorial or display family in the core system. Brand distinction comes from hierarchy, composition, spacing, color, imagery, and precise typographic control rather than a competing typeface.

This cross-cutting decision is recorded in [ADR-0006](../adrs/ADR-0006-unified-variable-typography.md).

## Typeface source and license

Inter is an open-source variable font distributed under the SIL Open Font License 1.1. The authoritative source is the [official Inter project](https://github.com/rsms/inter), with its [license](https://github.com/rsms/inter/blob/master/LICENSE.txt) retained in downstream font distribution.

Phase 3 approves the family and required typographic behavior. Engineering will determine the self-hosting, subsetting, preload, caching, and static-fallback implementation.

## Typographic principles

1. Hierarchy is explicit before it is expressive.
2. Type roles describe semantic purpose, not page-specific appearance.
3. Body text remains comfortable at default browser settings.
4. Technical and financial data align without making ordinary prose monospaced.
5. Weight, size, position, and content work together; color alone does not create hierarchy.
6. Responsive typography preserves meaning and reading order.
7. Text scaling, zoom, reflow, localization expansion, and fallback fonts are normal supported conditions.
8. Truncation never conceals a critical constraint, operation outcome, or required action.
9. Uppercase is used sparingly and never for paragraphs or warnings.
10. Typography remains equivalent across light and dark themes.

## Font stacks

### Primary sans

Canonical family:

`Inter Variable`

Conceptual fallback order:

`Inter Variable → Inter → system UI sans-serif → generic sans-serif`

Fallback faces must preserve clear Latin diacritics, distinguish common ambiguous characters, and remain legible for commerce and technical data.

### Monospace

Conceptual fallback order:

`platform UI monospace → generic monospace`

Monospace is permitted for:

- Order, case, build, audit, and correlation identifiers
- Serial numbers, SKUs, hashes, tokens, and exact technical codes
- Code-like configuration or rule expressions
- Fixed-format diagnostic values where character alignment matters

Monospace is not the default for:

- Prices
- Specification tables
- Quantities
- Dates and times
- Statuses
- Form labels
- Navigation
- General Admin data

Those uses remain in Inter with the appropriate numeric features.

## Reference type tokens

The type reference scale is:

| Token | Size | Line height | Typical source |
| --- | ---: | ---: | --- |
| `type.size.100` | `12px / 0.75rem` | — | Caption and compact metadata |
| `type.size.200` | `14px / 0.875rem` | — | Small body, label, and data |
| `type.size.300` | `16px / 1rem` | — | Default body and control |
| `type.size.400` | `18px / 1.125rem` | — | Large body and small heading |
| `type.size.500` | `20px / 1.25rem` | — | Section heading |
| `type.size.600` | `24px / 1.5rem` | — | Medium heading |
| `type.size.700` | `28px / 1.75rem` | — | Large heading |
| `type.size.800` | `32px / 2rem` | — | Page heading |
| `type.size.900` | `40px / 2.5rem` | — | Medium display |
| `type.size.1000` | `48px / 3rem` | — | Large display |

| Token | Value |
| --- | ---: |
| `type.line.100` | `16px / 1rem` |
| `type.line.200` | `18px / 1.125rem` |
| `type.line.300` | `20px / 1.25rem` |
| `type.line.400` | `24px / 1.5rem` |
| `type.line.500` | `26px / 1.625rem` |
| `type.line.600` | `28px / 1.75rem` |
| `type.line.700` | `32px / 2rem` |
| `type.line.800` | `36px / 2.25rem` |
| `type.line.900` | `40px / 2.5rem` |
| `type.line.1000` | `48px / 3rem` |
| `type.line.1100` | `56px / 3.5rem` |

Pixel values document the intended default rendering relationship. Relative units are the canonical scalable representation.

## Semantic type roles

### Display

| Token | Size / line | Weight | Tracking | Use |
| --- | --- | ---: | ---: | --- |
| `type.display.large` | `48 / 56` | `650` | `-0.025em` | Restrained high-emphasis Hub or campaign statement |
| `type.display.medium` | `40 / 48` | `650` | `-0.020em` | Major Hub or editorial statement |

Display roles are optional. They do not replace the semantic page heading, dominate search, or appear in dense transactional, Support, authentication, or Admin work.

### Heading

| Token | Size / line | Weight | Tracking | Use |
| --- | --- | ---: | ---: | --- |
| `type.heading.xlarge` | `32 / 40` | `650` | `-0.015em` | Primary page or object heading |
| `type.heading.large` | `28 / 36` | `650` | `-0.012em` | Major page region |
| `type.heading.medium` | `24 / 32` | `600` | `-0.008em` | Section heading |
| `type.heading.small` | `20 / 28` | `600` | `-0.004em` | Subsection or grouped module |
| `type.heading.xsmall` | `18 / 26` | `600` | `0` | Compact region heading |

Visual role does not determine document heading level. Semantic heading order follows content structure even when a different visual role is required.

### Body

| Token | Size / line | Weight | Tracking | Use |
| --- | --- | ---: | ---: | --- |
| `type.body.large` | `18 / 28` | `400` | `0` | Lead or comfortable reading |
| `type.body.medium` | `16 / 24` | `400` | `0` | Default interface and content body |
| `type.body.small` | `14 / 20` | `400` | `0` | Supporting interface content |

`type.body.medium` is the default. Small body text cannot carry the only expression of critical eligibility, compatibility, price, permission, validation, or recovery.

### Label

| Token | Size / line | Weight | Tracking | Use |
| --- | --- | ---: | ---: | --- |
| `type.label.large` | `16 / 20` | `550` | `0` | Prominent control or field label |
| `type.label.medium` | `14 / 18` | `550` | `0.005em` | Default control, tab, and compact label |
| `type.label.small` | `12 / 16` | `550` | `0.010em` | Bounded metadata label |

Labels use sentence case. Letter spacing remains restrained; broad tracking does not substitute for hierarchy.

### Data

| Token | Size / line | Weight | Tracking | Numeric behavior | Use |
| --- | --- | ---: | ---: | --- | --- |
| `type.data.large` | `20 / 28` | `600` | `-0.005em` | Tabular when compared | Price, total, or key technical value |
| `type.data.medium` | `16 / 24` | `550` | `0` | Contextual | Default commerce and technical data |
| `type.data.small` | `14 / 20` | `550` | `0` | Tabular in columns | Dense list, table, and summary data |

Data roles do not imply status or authority. Content, labels, source state, and component behavior establish meaning.

### Caption

| Token | Size / line | Weight | Tracking | Use |
| --- | --- | ---: | ---: | --- |
| `type.caption` | `12 / 16` | `450` | `0.005em` | Non-critical caption, source, timestamp, or helper metadata |

Caption text is not used for required terms, errors, primary evidence, or the only explanation of an action consequence.

## Weight system

Approved recurring weights are:

- `400` — reading and general content
- `450` — captions requiring slightly stronger rendering
- `550` — labels and structured data
- `600` — headings and emphasized data
- `650` — display and major headings
- `700` — rare strong emphasis, not a default heading weight

The variable font supports precise weights, but arbitrary per-component weight values are prohibited. Synthetic bold and synthetic italic are not accepted substitutes.

Italic is reserved for conventional editorial emphasis, cited titles, or domain content that requires it. Status, instructions, and warnings do not rely on italic styling.

## Numeric behavior

### Proportional numerals

Use proportional numerals in prose, headings, navigation, buttons, and isolated values when alignment is not part of the task.

### Tabular numerals

Use tabular numerals for:

- Price and total columns
- Comparison matrices
- Inventory and quantity columns
- Timers, service clocks, and aligned timestamps
- Admin worklists and reports
- Repeated metrics where vertical comparison matters

Tabular numerals do not require a monospace family.

### Fractions, units, and signs

- Currency, percent, minus, decimal, multiplication, and unit relationships remain visually attached to their values.
- Negative and changed values use an explicit sign or label; color is supplementary.
- Fractions use typographic features only when they remain clear and correctly announced.
- Model names, storage capacities, refresh rates, power, physical dimensions, and other technical units follow governed localization and Catalog terminology.

### Ambiguous characters

Identifiers must make `0/O`, `1/l/I`, and similar characters distinguishable through the selected face, monospace use, grouping, or copy affordance. Visual styling cannot alter the authoritative identifier.

## Price typography

A price presentation distinguishes:

- Current authoritative price
- Unit or installment context
- Prior price when applicable
- Discount explanation
- Financing eligibility or conditions
- Tax or fee context where required

The currency symbol and decimal portion may be visually subordinate but remain readable and programmatically associated. Superscript is not used to conceal decimals or terms.

Promotional styling cannot make an expired, conditional, estimated, or unavailable price appear authoritative.

## Technical specifications

Specifications use:

- Clear label-value relationships
- Consistent units and term ownership
- Tabular numerals where comparison benefits
- Wrapping rather than destructive truncation
- Group headings and progressive disclosure
- Sufficient row spacing and alignment

Long model names and technical values may wrap across lines. A fixed-height card or table row cannot clip decisive content.

## Line length and paragraph rhythm

- General reading measure targets approximately `45–75` characters per line.
- Dense Support or Admin explanatory content targets approximately `45–70` characters.
- Short labels, values, and controls use content-appropriate width rather than paragraph measure.
- Legal and Support documents preserve navigable headings, lists, tables, and references.
- Paragraph spacing distinguishes thoughts without creating banner-like vertical gaps.
- Fully justified text is prohibited.
- Centered body paragraphs are limited to short, bounded recovery or confirmation content.

## Case, punctuation, and emphasis

- Sentence case is the default for headings, labels, buttons, navigation, and statuses.
- Title Case is not applied mechanically to Brazilian Portuguese.
- All caps is limited to established abbreviations, short governed identifiers, or compact metadata where letterforms and pronunciation remain clear.
- Underlining is reserved primarily for links and conventional text interaction.
- Bold emphasis remains local and sparse; entire warning paragraphs do not become bold.
- Ellipsis indicates an action that opens a required follow-up choice only when the interaction convention is consistently applied.

## Brazilian Portuguese behavior

Portuguese for Brazil is the primary locale. Typography must support:

- Complete Portuguese diacritics and punctuation
- Sentence-case capitalization
- Local currency, number, date, time, measurement, and installment formats
- Longer translated labels and grammatical inflection
- Product and technical terminology governed by Catalog and Content
- Mixed Portuguese and manufacturer model names without forced transformation

Line breaking cannot separate a value from a short unit when that would impair comprehension. Text containers are designed for expansion rather than calibrated to an English placeholder.

Missing glyphs, diacritics, or localized weights fail validation. A fallback font cannot silently change the meaning or visibility of technical characters.

## Responsive typography

Nexora uses **bounded role adaptation**, not proportional shrinking of the entire type system.

- Body, label, data, and caption roles remain stable across supported viewports.
- Display roles may step down by one display or heading role when space requires it.
- `heading.xlarge` may resolve to `heading.large` in compact compositions when semantic prominence remains intact.
- Headings wrap before they truncate.
- Line length and surrounding layout determine transformations, not device brand.
- Dense content changes composition or disclosure before reducing essential text.
- Compact density does not globally reduce type sizes.

Controls that accept text use at least `16px` text in touch contexts where a smaller size would trigger unwanted browser zoom or impair entry.

Typography cannot be used to hide secondary-but-required content on mobile. Active filters, totals, compatibility, validation, permission limits, and recovery remain legible.

## Accessibility

Typography supports WCAG 2.2 AA foundations and the approved semantic hierarchy.

Requirements include:

- User text scaling without loss of content or functionality
- Reflow without two-dimensional scrolling except for approved essential data structures
- Zoom support without clipped controls, overlays, or sticky actions
- Text contrast according to the [color system](04-precision-gold-color-and-themes.md)
- No text embedded in images when live text can express it
- Accessible names that match visible control language
- Semantic headings independent of visual role
- Error and status text associated with the affected object or control
- No reliance on font style, weight, size, or case alone to convey state

At `200%` text scaling and browser zoom, components may recompose, wrap, expand, or move supporting regions. They cannot remove the primary task, active constraints, or recovery.

## Truncation and overflow

Truncation is allowed only when:

- The complete value is available through an accessible adjacent disclosure or detail view.
- The truncated content is not required to distinguish the current object or action.
- Repeated rows need bounded scanning and another governed identifier remains visible.
- Keyboard, touch, and assistive-technology users can obtain the complete content.

Truncation is prohibited for:

- Primary page and object identity when ambiguity would result
- Price and total
- Validation and error messages
- Compatibility blockers
- Inventory and eligibility changes
- Permission explanations
- Transaction terms
- Current Support obligation
- Destructive-action scope

Tooltips are not the sole recovery for essential truncated text.

## Font loading and resilience

Font loading must preserve immediate access to meaningful text.

The later implementation must:

- Prefer self-hosted, versioned font assets.
- Include the required Latin Extended glyph coverage for Brazilian Portuguese.
- Retain the font license and version provenance.
- Provide a metric-compatible or carefully tuned system fallback.
- Avoid invisible text while waiting for the web font.
- Minimize layout shift when the primary font replaces the fallback.
- Avoid downloading unused scripts, weights, or styles.
- Support variable fonts with approved static fallbacks where required.
- Preserve form entry, transaction, recovery, and Admin operation access when font assets fail.

Font failure may reduce visual fidelity but cannot hide icons with no text alternative, collapse layout, change data alignment meaning, or prevent task completion.

## Theme behavior

Type family, role, size, weight, line height, and hierarchy remain the same across light and dark themes.

Theme-specific adjustments are limited to approved color tokens and rendering treatments. Dark theme does not use thinner text weights to appear elegant, and light theme does not use low-contrast gray to appear minimal.

## Validation

Typography validation covers:

- Portuguese pangrams, diacritics, punctuation, and realistic commerce content
- Product names, SKUs, serials, technical units, and long manufacturer strings
- Prices, installment terms, totals, discounts, and negative values
- All semantic roles in light and dark themes
- All supported weights without synthesis
- Proportional and tabular numeric behavior
- Fallback rendering and font-load failure
- Text scaling, zoom, and reflow
- Comfortable and compact density
- Narrow and wide layout compositions
- Long labels, validation, warnings, and translated content
- Heading semantics and assistive-technology navigation
- Truncation prohibitions and complete-content recovery

Representative validation must include Search results, Product Detail, Comparison, Checkout, Order Detail, Support Case Detail, PC Builder, an Admin Queue, an Admin Resource Workspace, authentication, and route-level recovery.

## Governance

1. New type roles require a recurring semantic need and Design System review.
2. Page-specific font sizes and weights are prohibited when an approved role applies.
3. Domain teams may govern terminology and content structure but not create parallel type scales.
4. A new font family requires Brand, Accessibility, Content, performance, licensing, fallback, localization, and cross-product impact review.
5. Font files and versions are governed dependencies; silent upstream replacement is prohibited.
6. A material change to the unified-family strategy requires a superseding ADR.

## Consequences

### Benefits

- One family produces calm continuity across customer and operational products.
- Variable weights support precise hierarchy without multiple unrelated faces.
- Inter’s interface orientation and broad Latin support suit Portuguese commerce and technical data.
- Tabular features handle comparison and Admin density without pervasive monospace.
- Fallback and loading rules preserve task access.

### Costs and risks

- A widely used interface family provides less novelty than a bespoke display pairing.
- Brand distinction depends more heavily on composition and disciplined detail.
- Variable-font delivery requires later Engineering validation and fallbacks.
- Fine-grained weights need governance to prevent arbitrary use.

## Next decision

Define spacing, sizing, grids, responsive layout, content measure, control dimensions, and density behavior.
