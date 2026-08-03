# ADR-0012: Design System Implementation Foundation

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora must implement its approved six Design System layers, three token tiers, themes, densities, accessibility foundation, patterns, and nine page templates without importing a competing visual system or creating runtime styling overhead.

Viable approaches included:

1. DTCG tokens, generated CSS custom properties, static layered CSS, owned React packages, and selective headless accessibility dependencies
2. A utility-first styling system as the primary application API
3. Runtime CSS-in-JS with prop-driven component styling
4. A comprehensive external visual component library

## Decision

Use DTCG 2025.10 JSON as the canonical machine token source and Style Dictionary as the governed transformation engine.

Generate CSS custom properties and typed metadata. Implement styling with standards-based CSS, cascade layers, and CSS Modules. Runtime CSS-in-JS is not part of the core Design System.

Implement owned TypeScript and React packages aligned to Tokens, Foundations, Primitives, Components, Patterns, and Page templates. Preserve public entry points and acyclic dependency direction.

Use React Aria Components and hooks selectively behind Nexora-owned component APIs for complex accessible interaction. Applications do not import React Aria directly.

Use Storybook with supported Next.js integration for isolated documentation, reference compositions, and validation. The Product Blueprint remains authoritative.

Use coordinated semantic versions and a shared Design System release train with package-level change records, immutable release identity, migration guidance, and consumer-impact validation.

## Consequences

### Benefits

- Tokens remain portable and vendor-neutral.
- Themes and density resolve efficiently through semantic CSS variables.
- Static CSS aligns with Server Components, streaming, CSP, and performance goals.
- Nexora controls its visual and behavioral APIs.
- Mature headless interaction behavior reduces avoidable accessibility risk.
- Reference compositions can be tested independently and in real Next.js routes.

### Costs and risks

- Nexora wrappers still require expert accessibility validation.
- Token generation and cascade ordering require build enforcement.
- Coordinated releases need consumer-impact automation.
- DTCG extensions and third-party dependencies require version governance.

## Governance

- DTCG files are the sole editable machine token source.
- Generated artifacts cannot drift or be edited manually.
- Applications consume semantic or approved component tokens, not reference tokens.
- React Aria, Lucide, and other substrates remain behind owned entry points.
- Storybook does not supersede Blueprint semantics.
- A material change to token format, styling model, accessibility substrate, layer boundaries, or release contract requires a superseding ADR.

## References

- [Design System Implementation Architecture](../06-engineering/06-design-system-implementation-architecture.md)
- [DTCG Design Tokens Format Module 2025.10](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/)
- [Style Dictionary DTCG support](https://styledictionary.com/reference/config/)
- [React Aria](https://react-spectrum.adobe.com/react-aria/getting-started.html)
- [Storybook for Next.js](https://storybook.js.org/docs/get-started/frameworks/nextjs)
- [Design System Architecture](../04-design-system/01-system-architecture.md)
- [Design Token Architecture](../04-design-system/03-design-token-architecture.md)
- [Component Lifecycle and Quality](../04-design-system/24-component-lifecycle-and-quality.md)
- [ADR-0004: Layered Design System Architecture](ADR-0004-layered-design-system-architecture.md)
- [ADR-0005: Semantic Design Token Architecture](ADR-0005-semantic-design-token-architecture.md)
- [ADR-0007: Accessibility Conformance Foundation](ADR-0007-accessibility-conformance-foundation.md)
