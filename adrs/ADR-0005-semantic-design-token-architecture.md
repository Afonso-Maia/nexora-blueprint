# ADR-0005: Semantic Design Token Architecture

- **Status:** Accepted
- **Date:** 2026-08-02

## Context

Nexora needs reusable design decisions across customer and operational products, light and dark themes, comfortable and compact density, nine page archetypes, and 89 approved pages.

A flat value catalog would be easy to begin but would couple consumers to visual choices. An unrestricted token hierarchy would create ambiguous naming, component-level duplication, and unsafe local reinterpretation.

## Decision

Adopt a three-tier token architecture:

`Reference tokens → Semantic tokens → Component tokens`

- Reference tokens contain context-free source values and scales.
- Semantic tokens express stable interface roles and are the default consumption contract.
- Component tokens exist only for durable component-level contracts that semantic tokens and supported properties cannot express clearly.

Light and dark are explicit theme modes. Comfortable and compact are explicit density modes. Compact density cannot reduce accessibility or capability.

Responsive behavior uses governed layout semantics and explicit component, pattern, and archetype transformations rather than arbitrary per-breakpoint styling systems.

Components and pages do not consume raw reference tokens by default. Locale, market, business policy, and authoritative domain state are not token modes.

## Consequences

### Benefits

- Visual values can evolve without renaming stable semantic roles.
- Theme parity is validated through one semantic contract.
- Component-specific needs remain governed.
- Cross-surface impact can be traced through aliases and consumers.
- Accessibility constraints can be tested at each resolution layer.

### Costs and risks

- Alias management and consumer tracking require later tooling.
- Semantic names require careful governance.
- Component tokens may proliferate if their threshold is not enforced.
- Responsive behavior cannot be specified through tokens alone.

## Governance

- Token names express stable purpose before appearance.
- Semantic and component tokens alias governed lower tiers.
- Raw values require an explicit exception when an approved token exists.
- Every token declares owner, status, modes, consumers, and accessibility constraints.
- Alias cycles and unresolved references are invalid.
- Semantic rename, removal, or reinterpretation is a breaking change.
- A material change to the tier model, mode model, or consumption boundary requires a superseding ADR.

## References

- [Design System Architecture](../04-design-system/01-system-architecture.md)
- [Mission, Principles, and Governance](../04-design-system/02-mission-principles-and-governance.md)
- [Design Token Architecture](../04-design-system/03-design-token-architecture.md)
- [Page-Level Information Hierarchy](../03-product-structure/03-information-hierarchy.md)
