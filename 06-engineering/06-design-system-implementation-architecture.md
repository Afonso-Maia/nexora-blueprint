# Design System Implementation Architecture

**Status:** Approved

## Purpose

This document translates the approved six-layer Design System and three-tier token model into an implementation architecture for the Customer and Administrative Experience applications.

It defines canonical sources, generated outputs, package boundaries, styling, component APIs, accessibility dependencies, documentation, testing, versioning, and release behavior. It does not change any approved token semantic, component behavior, pattern, page template, accessibility requirement, or content contract.

## Decision

Implement the Design System with:

- DTCG 2025.10 JSON as the canonical machine-readable token format
- Style Dictionary as the governed token transformation engine
- CSS custom properties as the primary runtime token output
- Standards-based CSS, cascade layers, and CSS Modules for component and application styling
- React and TypeScript packages aligned to the approved Design System layers
- React Aria Components and hooks as a selectively wrapped accessibility and interaction substrate
- Storybook with its Next.js integration as the isolated implementation catalog and reference-composition environment
- Automated contract, interaction, visual, accessibility, theme, density, responsive, and localization validation

Do not use runtime CSS-in-JS for the core Design System. Do not adopt an external visual component library or theme as Nexora's component source.

## Source hierarchy

The source hierarchy is:

1. Product Blueprint Markdown — semantic and behavioral authority
2. DTCG token source — machine-readable token authority
3. React and CSS source — implementation of approved primitives, components, patterns, and templates
4. Generated token and documentation artifacts — reproducible outputs
5. Application compositions — consumers and governed domain extensions

Figma or another design tool may consume and contribute through governed synchronization, but it cannot silently become the token, component, state, or accessibility source of truth.

Generated files include a source identifier and generation version and cannot be edited manually.

## Package architecture

Use independently buildable workspace packages with explicit public entry points:

```text
design-system
├── tokens
├── foundations
├── primitives
├── components
├── patterns
├── templates
├── icons
├── testing
└── documentation
```

The exact filesystem names follow repository tooling, but the responsibility boundaries are required.

### Tokens

Owns DTCG sources, validation, resolution, generated CSS custom properties, TypeScript metadata, token documentation data, and change reports.

### Foundations

Owns browser normalization, font declarations, global semantic element defaults, cascade-layer order, theme and density activation, focus foundation, reduced-motion behavior, and other approved global rules.

Foundations cannot contain page-specific layout, domain behavior, or broad element styling that changes native semantics unexpectedly.

### Primitives

Implements approved structural, surface, content, interaction, and internal-state primitives. Primitive APIs remain minimal and cannot acquire domain workflow.

### Components

Implements shared controls and content units with approved states, accessibility behavior, responsive behavior, content rules, and theme parity.

### Patterns

Implements recurring cross-product and domain pattern composition. A pattern may depend on components and lower layers but cannot own authoritative facts or operation outcomes.

### Templates

Implements the nine approved page-template composition contracts. Templates accept owned regions and state mappings; they do not create routes or canonical pages.

### Icons

Owns the approved Lucide dependency, Nexora icon wrapper, custom icon registry, accessibility metadata, sizing, stroke, directionality, and version governance.

Applications do not import Lucide directly. Custom icons require the approved distinct-meaning and lifecycle review.

### Testing

Owns test renderers, theme and locale matrices, interaction helpers, accessibility assertions, stable fixtures, and contract suites intended for Design System consumers.

It cannot expose production internals or encourage tests coupled to private DOM details.

### Documentation

Owns Storybook configuration, stories, reference compositions, implementation status, usage guidance, and generated token/component metadata.

Storybook is a validation and discovery surface, not a production runtime dependency or the authoritative product specification.

## Dependency direction

Dependencies follow:

`Tokens → Foundations → Primitives → Components → Patterns → Templates`

This notation describes allowed upward consumption: a higher layer may consume lower layers; lower layers cannot import higher layers.

Additional rules:

- Icons may be consumed from Primitives upward.
- Testing may consume public entry points from every layer.
- Documentation may consume public entry points and testing fixtures.
- Domain extensions may consume shared layers but do not enter shared packages automatically.
- Applications may compose Templates, Patterns, Components, and lower layers through public entry points.
- No Design System package imports application routes, BFF contracts, domain persistence, or provider SDKs.
- Cycles and private cross-package imports fail architecture validation.

Package grouping for release efficiency cannot erase these logical dependency and ownership boundaries.

## Token source format

Author tokens using the stable Design Tokens Community Group 2025.10 format:

- `$value` identifies a token value.
- `$type` declares or inherits the governed token type.
- `$description` records concise implementation-facing intent.
- Aliases preserve the reference → semantic → component chain.
- `$deprecated` records lifecycle state where applicable.
- Governed `$extensions` carry Nexora metadata not represented by the standard.

Nexora extensions may include:

- Stable token identifier
- Owner
- Lifecycle status
- Tier
- Supported themes and densities
- Accessibility constraints
- Consumers
- Replacement and removal metadata

Extensions cannot redefine standard DTCG meaning or store mutable business, market, locale, or operational policy.

## Token tiers and resolution

### Reference tokens

Reference tokens contain context-free scales and source values. They generate diagnostic metadata and, where necessary, non-public CSS variables for internal resolution.

Applications and components do not consume reference tokens directly without an approved exception.

### Semantic tokens

Semantic tokens are the default CSS and component consumption contract. They resolve roles for content, surface, border, action, status, focus, layout, motion, typography, and other approved semantics.

Stable semantic token names are public API. A semantic rename, removal, or reinterpretation is breaking.

### Component tokens

Component tokens exist only where a durable component contract cannot be expressed cleanly through semantic tokens and supported properties.

Component-token proliferation is measured. A new component token requires owner, consumers, modes, accessibility constraints, and justification.

## Token transformation

Use Style Dictionary to:

- Validate DTCG structure and types
- Resolve aliases and detect missing or cyclic references
- Apply reviewed platform transformations
- Generate deterministic CSS custom-property files
- Generate typed token-name and metadata artifacts
- Generate documentation data
- Produce change classification and consumer-impact inputs

Custom transforms are small, versioned, tested, and limited to format translation. They cannot invent semantic names or values absent from the canonical source.

Generation runs in local validation and CI. Committed generated artifacts, if required for package consumption, must exactly match canonical source. Drift fails validation.

## Runtime token outputs

Generate CSS custom properties for:

- Base semantic defaults
- Light theme
- Dark theme
- Comfortable density
- Compact density
- Reduced-motion or other approved preference behavior where tokenized
- Governed component-token scopes

Theme and density selectors are stable, documented application contracts. Theme activation occurs before visible paint where possible to prevent incorrect-theme flashes.

Theme files override semantic aliases, not component source values independently. Light and dark parity validation compares semantic roles and supported component states rather than literal value equality.

Locale, market, permission, lifecycle, business policy, price, inventory, and Compatibility are never token modes.

## Styling architecture

Use:

- Global foundation CSS for reset, fonts, root semantics, themes, density, and cascade order
- CSS custom properties for token consumption
- CSS Modules for scoped component, pattern, template, and application styles
- Standards-based selectors and data attributes for explicit states
- Container queries and media queries according to approved responsive semantics
- CSS logical properties for direction- and writing-mode-safe layout

Define a stable cascade-layer order such as:

`reset → foundations → tokens → primitives → components → patterns → templates → application → approved overrides`

The final names are implementation metadata, but the order is governed and tested.

### Prohibited styling behavior

- Raw values when an approved token exists
- Application selectors reaching into private component DOM
- Unscoped specificity escalation
- `!important` except reviewed accessibility, user-preference, or third-party containment cases
- Page-level theme reinterpretation
- Runtime-generated styles for static token-resolvable presentation
- Class names that encode authoritative domain state without typed component props
- Viewport-only responsive behavior when component-container semantics are required

### Utility classes

A small governed set of semantic structural utilities may exist for exceptional composition. Nexora does not adopt a general visual utility framework as the Design System API.

Utilities cannot bypass primitives, tokens, responsive contracts, or accessibility review.

## Component implementation

Components use TypeScript with strict public props and runtime validation where untrusted or serialized data crosses a boundary.

Every public component defines:

- Semantic purpose and approved layer
- DOM and accessible-name contract
- Supported content and composition
- Controlled and uncontrolled state behavior where applicable
- Events expressed as user intent rather than DOM mechanics
- Loading, pending, disabled, read-only, invalid, stale, conflict, and completion behavior where applicable
- Theme, density, responsive, localization, and content-extreme behavior
- Focus, keyboard, pointer, touch, and assistive-technology behavior
- Server and Client Component compatibility
- Performance and bundle implications
- Version and lifecycle status

### Native-first rule

Use native HTML elements and browser behavior whenever they satisfy the approved semantics. A wrapper cannot replace a native link, button, form, heading, label, table, list, or disclosure merely for styling consistency.

### React Aria boundary

React Aria Components and hooks may provide behavior for complex controls such as comboboxes, listboxes, selection, overlays, menus, tabs, grids, date interactions, and focus coordination.

Nexora wraps the required behavior behind its own component API and styles. Applications do not import React Aria directly without an approved Design System extension.

Use React Aria Components first when their DOM and behavior satisfy the approved contract. Drop to hooks only when documented control is required. Forking or reimplementing behavior requires accessibility and lifecycle review.

React Aria is an implementation dependency, not the source of Nexora visual design, content, state taxonomy, or product behavior.

### Composition

Prefer explicit slots and semantic children over broad prop matrices. Variants require durable semantic or behavioral distinction.

Polymorphic element APIs are not provided by default because they can invalidate semantics and typing. Where element substitution is necessary, the API constrains valid semantic equivalents.

Refs are exposed only for legitimate focus, measurement, or integration needs. Consumers cannot use refs to mutate private component structure.

## Server and Client Components

Presentational primitives and components remain Server Component compatible when they need no browser interaction.

Interactive components declare the smallest possible Client Component boundary. A package-level client directive that moves unrelated components into the browser is prohibited.

Server-compatible entry points cannot import browser-only dependencies. Build validation identifies accidental client-boundary expansion and tracks bundle impact.

Storybook coverage does not prove Server Component compatibility; representative Next.js route compositions validate server and streaming behavior.

## Patterns and templates

Patterns map source facts and operation states through typed inputs. They do not fetch arbitrary data, authorize actions, or execute domain mutations internally.

Templates define regions, hierarchy, responsive transformations, and state placement. Applications supply:

- Canonical page identity
- Route and metadata
- Source-owned view models
- Permission-aware regions
- Host-owned state mapping
- Domain actions and operation correlations

Patterns and templates may provide optional orchestration helpers for interface state, but authoritative workflow remains behind application contracts.

## Documentation and reference compositions

Use Storybook with the supported Next.js integration for:

- Primitive, component, pattern, and template documentation
- Interactive state and prop exploration
- Theme, density, locale, viewport, input, and permission scenarios
- Reference compositions
- Visual and interaction regression inputs
- Accessibility checks
- Deprecation and migration guidance

Every published artifact includes:

- Purpose, status, owner, package, and import path
- Approved and prohibited uses
- Content and composition guidance
- State matrix
- Accessibility and keyboard behavior
- Responsive, theme, density, and localization behavior
- Examples using Brazilian Portuguese
- Dependencies, version, replacement, and known limitations

Stories use deterministic fixtures and provider adapters. They do not connect to production systems or contain real customer, workforce, payment, Support, or operational data.

The Blueprint remains authoritative when Storybook and Markdown conflict.

## Testing architecture

### Token tests

- DTCG conformance
- Type validity
- Alias resolution and cycle detection
- Tier and naming rules
- Required metadata
- Theme and density completeness
- Contrast and other computable accessibility constraints
- Deterministic output and drift
- Breaking-change classification

### Component tests

- Public prop and composition contracts
- Native semantics and accessible naming
- Keyboard, pointer, touch, focus, and announcement behavior
- Controlled and uncontrolled state
- Host-state distinctions
- Theme and density parity
- Responsive and content extremes
- Brazilian Portuguese and fallback
- Reduced motion and high-contrast behavior
- Server rendering and hydration

### Pattern and template tests

- Required, optional, and prohibited regions
- Source-state mapping
- Permission-aware composition
- Operation pending, completion, indeterminate, and recovery
- Responsive semantic continuity
- Representative Page Inventory mappings

### Visual validation

Visual baselines cover approved themes, densities, breakpoints or containers, state combinations, and reference compositions. Visual difference approval cannot waive semantic or accessibility failures.

Automated accessibility checks are required but remain insufficient; manual validation follows the approved accessibility foundation.

## Versioning and release

Design System projects use coordinated semantic versions and a shared release train while allowing package-level change records.

- Patch: compatible correction with no contract change
- Minor: backward-compatible addition or supported extension
- Major: removal, reinterpretation, incompatible DOM or behavior, token semantic change, or required consumer migration

Monorepo applications may consume workspace packages during development, but every release has an immutable package and generated-artifact identity.

Changes include:

- Change classification
- Affected layers and consumers
- Migration guidance
- Accessibility and visual evidence
- Deprecation or removal timeline
- Rollback or correction approach

Widely consumed token, primitive, or component changes require impact validation across customer and Admin reference compositions before release.

## Dependency policy

React Aria, Storybook, Style Dictionary, Lucide, and other Design System dependencies are pinned, reviewed, monitored, and isolated behind owned contracts where they affect consumers.

A dependency must:

- Support the approved React, Next.js, TypeScript, SSR, and browser baseline
- Meet accessibility and localization requirements
- Expose compatible licensing and maintenance posture
- Avoid mandatory runtime styling or visual semantics that conflict with Precision Gold
- Support CSP and server/client boundaries
- Have a documented upgrade, substitution, or removal path

No dependency is exempt from Nexora testing because it claims accessibility or framework compatibility.

## Rejected alternatives

### Tailwind as the Design System API

Tailwind is viable for rapid composition and compile-time utility generation. It is not selected as Nexora's core Design System contract because semantic tokens, layer-owned component APIs, consumer impact, and controlled application escape hatches are better expressed through generated custom properties and scoped component CSS.

### Runtime CSS-in-JS

Runtime CSS-in-JS supports colocated dynamic styling and rich prop-driven variants. It is not selected because the server-first architecture benefits from static CSS delivery, minimal client runtime, predictable streaming, CSP simplicity, and framework-independent token outputs.

### External visual component library

A comprehensive visual library could accelerate implementation. It would import another system's token, density, DOM, accessibility, and behavior assumptions and make Precision Gold parity and approved state semantics harder to govern.

### Custom accessibility primitives only

Building every complex interaction internally gives maximum control but creates unnecessary keyboard, focus, internationalization, device, and assistive-technology risk. Selective React Aria use preserves Nexora APIs while using a mature behavior substrate.

## Validation

This decision:

- Implements the approved six-layer and three-tier architectures without flattening them.
- Provides one canonical token source with deterministic web outputs.
- Preserves light and dark themes and comfortable and compact density.
- Supports Server and Client Components without runtime styling dependency.
- Protects native semantics and WCAG 2.2 AA obligations.
- Keeps Storybook subordinate to the Blueprint.
- Supports all nine page templates and 89 page mappings.
- Establishes version, migration, deprecation, and consumer-impact behavior.

## Consequences

### Benefits

- Vendor-neutral token source reduces design-tool and build-tool lock-in.
- CSS custom properties provide efficient runtime themes and density.
- Static scoped CSS aligns with server-first rendering and CSP.
- React Aria reduces complex interaction risk without defining Nexora visuals.
- Storybook provides isolated, repeatable reference compositions.

### Costs and risks

- Custom Nexora wrappers still require accessibility expertise and manual validation.
- Coordinated package releases require consumer-impact automation.
- CSS cascade layers and package CSS ordering need strict build validation.
- Token metadata extensions require governance and migration when the DTCG standard evolves.

## Governance

- Blueprint semantics precede implementation-tool behavior.
- DTCG files are the only editable machine token source.
- Generated outputs cannot be modified independently.
- Applications do not import React Aria, Lucide, or token reference values directly.
- New component tokens and shared artifacts pass their approved thresholds.
- A material change to token format, styling model, accessibility substrate, package layering, or release contract requires a superseding ADR.

## References

- [ADR-0012: Design System Implementation Foundation](../adrs/ADR-0012-design-system-implementation-foundation.md)
- [DTCG Design Tokens Format Module 2025.10](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/)
- [Style Dictionary DTCG support](https://styledictionary.com/reference/config/)
- [React Aria](https://react-spectrum.adobe.com/react-aria/getting-started.html)
- [Storybook for Next.js](https://storybook.js.org/docs/get-started/frameworks/nextjs)
- [Next.js CSS-in-JS guidance](https://nextjs.org/docs/app/guides/css-in-js)
- [Design System Architecture](../04-design-system/01-system-architecture.md)
- [Design Token Architecture](../04-design-system/03-design-token-architecture.md)
- [Accessibility Foundations](../04-design-system/10-accessibility-foundations.md)
- [Component Lifecycle and Quality](../04-design-system/24-component-lifecycle-and-quality.md)
- [Frontend Architecture](05-frontend-architecture.md)

## Next decision

Define rendering and navigation strategy by page and data class, including static generation, dynamic server rendering, streaming, client interaction, caching, URL state, metadata, indexing, redirects, and route recovery.
