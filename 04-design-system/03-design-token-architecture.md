# Design Token Architecture

**Status:** Approved

## Purpose

This document defines how Nexora names, organizes, resolves, consumes, validates, versions, and deprecates design tokens.

It establishes the token contract before exact Precision Gold color, typography, spacing, layout, shape, elevation, and motion values are approved.

## Decision

Nexora uses a **three-tier alias architecture**:

`Reference tokens → Semantic tokens → Component tokens`

Products and components consume semantic tokens by default. Component tokens exist only when a durable component-level contract cannot be expressed clearly through semantic tokens and supported properties.

Theme and density are explicit modes. Responsive behavior consumes governed layout semantics and component transformation rules; it is not modeled as arbitrary per-breakpoint token substitution.

This cross-cutting decision is recorded in [ADR-0005](../adrs/ADR-0005-semantic-design-token-architecture.md).

## Token principles

1. Names express purpose before appearance.
2. Semantic meaning remains stable across light and dark themes.
3. Raw values do not appear in component or pattern specifications when an approved token exists.
4. Theme differences do not change information hierarchy, action meaning, or state severity.
5. Density changes spacing and presentation, not capability or accessibility.
6. Component tokens are an exception layer, not a parallel styling vocabulary.
7. Tokens do not encode page IDs, campaigns, temporary content, or business policy.
8. Accessibility constraints participate in token approval and validation.
9. Token changes are evaluated through their consumer graph.
10. Unknown or missing tokens fail visibly during design and development workflows; they do not silently resolve to an unsafe fallback.

## Tier 1 — Reference tokens

Reference tokens hold context-free source values and scales.

Examples of reference families include:

- Color palette steps
- Font families and weight values
- Type-size and line-height scales
- Spacing and sizing scales
- Border widths and radii
- Shadow ingredients
- Duration and easing curves
- Opacity values
- Layout measures

Reference names describe the value family and position, not usage. A conceptual form is:

`{category}.{family}.{step}`

Examples:

- `color.gold.500`
- `space.300`
- `type.size.400`
- `radius.200`
- `motion.duration.200`

These examples define naming shape only; they do not approve exact families, steps, or values.

Reference tokens:

- May be shared by several semantic roles.
- May differ by platform representation while preserving the governed value.
- Are not consumed directly by pages, patterns, or product components.
- Cannot carry business meaning such as available, compatible, approved, or discounted.

## Tier 2 — Semantic tokens

Semantic tokens express stable interface roles and are the default consumption contract.

The conceptual form is:

`{category}.{role}.{prominence-or-state}.{modifier}`

Only applicable segments are used. Names remain concise and avoid duplicating context already established by the category.

Primary semantic families include:

- `color.surface.*`
- `color.content.*`
- `color.border.*`
- `color.action.*`
- `color.status.*`
- `color.focus.*`
- `type.display.*`
- `type.heading.*`
- `type.body.*`
- `type.label.*`
- `type.data.*`
- `space.*`
- `size.control.*`
- `size.target.*`
- `layout.*`
- `shape.*`
- `elevation.*`
- `motion.*`
- `opacity.*`

Semantic tokens alias reference tokens or, when necessary, a governed composite value.

### Semantic role rules

- Surface roles describe structural depth and grouping, not specific pages.
- Content roles describe reading hierarchy and interaction state.
- Action roles distinguish primary, secondary, quiet, destructive, and disabled behavior without relying on color alone.
- Status roles represent informational, positive, cautionary, critical, and neutral communication. Domain status meaning remains in components and content.
- Focus roles remain perceptible across themes, surfaces, and status colors.
- Data roles support aligned technical and financial information without creating a separate decorative type system.
- Layout roles describe content measure, gutters, regions, grids, and safe spacing.
- Motion roles describe feedback purpose rather than named visual effects.

Semantic tokens cannot imply authoritative operation truth. A “positive” token supports presentation; the host component determines whether an operation actually succeeded.

## Tier 3 — Component tokens

Component tokens scope a durable styling contract to one governed component.

The conceptual form is:

`component.{component-name}.{part}.{property}.{state}`

Only necessary segments are used.

A component token is justified when:

- The value participates in the component’s recognizable and reusable contract.
- Several internal parts or states require coordinated resolution.
- Repeated semantic-token composition would be ambiguous or fragile.
- A theme or density mode requires component-specific mapping.
- The token has known consumers and an accountable owner.

A component token is not justified by:

- A one-off page composition
- Temporary merchandising
- A single mockup adjustment
- An unsupported visual variant
- Avoidance of an existing semantic role
- Business or domain data that belongs in content or configuration

Component tokens alias semantic tokens by default. Direct reference-token aliases require Design System review and a documented reason.

## Modes

### Theme

The approved theme modes are:

- `light`
- `dark`

Both themes provide equivalent hierarchy, capability, status distinction, focus visibility, contrast, imagery treatment, elevation comprehension, and reduced-motion compatibility.

The semantic token name does not include the theme. Resolution supplies the appropriate value for the active theme.

Theme is not a proxy for brand, accessibility, device, time of day, or customer segment. User or system preference behavior will be specified with theme foundations.

### Density

The system supports:

- `comfortable` — default customer and general-purpose presentation
- `compact` — guarded operational and data-dense presentation

Compact density is primarily available to approved Admin and genuinely dense workspace contexts. It cannot:

- Reduce pointer or touch targets below the accessibility contract
- Remove labels, status, constraints, or recovery
- Change permission or action availability
- Become the only accessible way to complete a task
- Apply merely because the viewport is narrow

Density may resolve spacing, control presentation, row height, and information arrangement. Text legibility, target safety, focus visibility, and semantic grouping remain protected.

### Accessibility preferences

Reduced motion, increased contrast needs, text scaling, zoom, reflow, and input modality are behavioral or user-agent conditions, not a single token mode.

Relevant semantic tokens and components must respond to those conditions explicitly. A future first-class contrast theme would require a separate approved decision and complete parity validation.

### Locale and market

Locale and market are not token modes. Brazilian Portuguese, currency, units, date and number formatting, content expansion, policy applicability, and regional facts remain content, localization, or domain contracts.

## Responsive token behavior

Nexora does not create unrelated small, medium, and large visual systems.

Responsive specifications use:

- Stable semantic tokens where meaning is unchanged
- Governed fluid or bounded layout values where appropriate
- Explicit component and pattern transformations
- Archetype-specific responsive contracts
- Content-driven layout thresholds rather than device-brand assumptions

Tokens may define layout boundaries, gutters, readable measures, grid behavior, and control dimensions. Breakpoints are named for layout need rather than device class.

A responsive change cannot:

- Reverse semantic priority
- Hide active constraints or user-applied state
- Change a primary action’s meaning
- Replace an accessible interaction with a pointer-only one
- Convert a supported workflow into a broken approximation

## Token domains and ownership

| Token domain | Accountable stewardship | Required review |
| --- | --- | --- |
| Brand color and expression | Design System with Brand | Accessibility |
| Functional color and status | Design System | Accessibility, affected domains |
| Typography | Design System | Brand, Accessibility, Content |
| Spacing, sizing, and layout | Design System | Accessibility, Engineering |
| Shape, border, elevation, and depth | Design System | Brand, Accessibility |
| Motion | Design System | Accessibility, Engineering |
| Component tokens | Component owner | Design System, Accessibility |

Domain owners define the semantics of product, order, case, compatibility, inventory, permission, and operational states. They do not create independent color or spacing vocabularies for those states.

## Consumption rules

1. Page templates and patterns consume semantic and approved component tokens.
2. Primitives consume semantic tokens and may expose constrained properties.
3. Components consume semantic tokens first and component tokens only when justified.
4. Arbitrary raw values require an approved exception during specification and must not become undocumented precedent.
5. Consumers cannot reinterpret a semantic token name locally.
6. A token does not authorize unsupported component states or combinations.
7. Status presentation combines token, icon or shape where appropriate, text, and programmatic semantics.
8. Text placed over dynamic imagery uses a governed protective treatment rather than assuming image contrast.

## Naming governance

Token names use lowercase dot-separated segments in documentation. Platform transforms may adapt syntax without changing the canonical name.

Names must:

- Describe stable purpose
- Avoid visual-value words at semantic and component tiers
- Avoid page, campaign, team, or implementation-framework names
- Avoid directional language when a logical alternative is required for future writing modes
- Use one approved term for each concept
- Remain understandable without inspecting the resolved value

Renaming a consumed token is a coordinated or breaking change even when the value is unchanged.

## Versioning and lifecycle

Every token declares:

- Canonical name
- Tier and category
- Description
- Value or alias by supported mode
- Owner
- Status
- Known consumers
- Accessibility constraints
- Introduction and deprecation metadata

Token lifecycle uses:

`Proposed → Approved → Deprecated → Removed`

Superseded tokens retain a traceable replacement. Deprecated aliases may remain during a migration window, but new consumers use the replacement.

### Change classification

- A reference-value adjustment is coordinated when it changes one or more semantic outcomes.
- A semantic value adjustment is coordinated and requires theme, accessibility, and representative consumer validation.
- A semantic rename, removal, or meaning change is breaking.
- Adding a compatible component token is non-breaking only when it does not reinterpret existing behavior.
- Changing a component token that alters state distinction, focus, layout safety, or action prominence is coordinated or breaking.

## Validation

Token validation covers:

- Canonical name uniqueness
- Alias resolution without cycles
- No unresolved references
- Complete light and dark resolution
- Supported density resolution
- Contrast and non-color state distinction
- Focus visibility
- Text scaling, zoom, and reflow implications
- Representative primitive, component, pattern, and archetype consumers
- Dynamic imagery and mixed-surface contexts
- Deprecated-token consumer tracking
- Diff review for changed resolved values

Exact contrast targets and test conditions will be specified in Accessibility Foundations. Token approval cannot proceed when a known supported use fails its applicable requirement.

## Protected boundaries

Tokens may change presentation but cannot:

- Reorder the approved information hierarchy
- Turn AI output into deterministic fact
- Conceal active filters, compatibility, permission, price, inventory, or operation state
- Create domain authority
- Encode customer eligibility or business policy
- Define a new canonical page or product taxonomy
- Make light and dark themes semantically unequal

## Consequences

### Benefits

- Precision Gold can evolve without coupling components to raw palette values.
- Light and dark themes share stable semantic roles.
- Component-specific needs remain possible without creating an uncontrolled token vocabulary.
- Consumer tracking makes cross-surface change impact visible.
- Accessibility and density behavior are governed at the value-contract level.

### Costs and risks

- Alias resolution and consumer tracking require disciplined tooling later.
- Poor semantic naming would spread ambiguity broadly.
- Component tokens could proliferate without the exception threshold.
- Responsive behavior requires component specifications in addition to tokens.

## Next decision

Define the Precision Gold color system, functional color roles, light and dark theme mappings, contrast behavior, and color-use constraints within this token architecture.
