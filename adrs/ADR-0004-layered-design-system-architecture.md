# ADR-0004: Layered Design System Architecture

- **Status:** Accepted
- **Date:** 2026-08-02

## Context

Nexora needs a design-system specification that supports high-fidelity design and later implementation across 89 approved pages, nine page archetypes, customer and operational products, light and dark themes, responsive layouts, and host-owned system states.

A visual library without explicit layers would make the boundaries between principles, reusable values, accessible building blocks, recurring workflows, and page composition ambiguous. It could also encourage one-off page designs or components that flatten distinct product semantics.

The model must reuse Phase 2B architecture without redefining canonical pages, ownership, lifecycle, permissions, taxonomy, Compatibility authority, or operational truth.

## Decision

Adopt the following design-system dependency and governance model:

`Foundations → Tokens → Primitives → Components → Patterns → Page templates`

The layers establish shared nomenclature, responsibility, and traceability:

- Foundations govern brand, accessibility, interaction, responsive semantics, content, localization, themes, and system policy.
- Tokens encode named reusable design decisions.
- Primitives provide minimal governed layout, content, and interaction behavior.
- Components compose reusable controls and content units.
- Patterns coordinate recurring tasks, decisions, workflows, and states.
- Page templates realize the nine approved archetype contracts for the canonical Page Inventory.

The model is not a requirement to create an artifact at every layer for every decision.

A separate primitive, component, pattern, or template variant requires a durable semantic, behavioral, accessibility, state, content, responsive, testing, ownership, or governance distinction. Cosmetic differences normally use tokens, supported properties, or documented variants.

Page templates do not create canonical pages. They consume approved page identity, hierarchy, relationships, states, access, lifecycle, and ownership.

## Consequences

### Benefits

- Shared vocabulary connects foundational intent to page composition.
- Accessibility, themes, responsive behavior, and system states can be governed across every layer.
- The nine archetypes become the upper compositional boundary for all 89 pages.
- Reuse remains compatible with distinct domain semantics and source authority.
- Contribution, testing, versioning, and deprecation can be scoped to the correct layer.

### Costs and risks

- Classification and dependency management add governance overhead.
- Excessive abstraction may produce unnecessary system artifacts.
- Teams may confuse page templates with canonical page definitions.
- Widely consumed lower-layer changes require cross-surface impact analysis.

## Governance

- Every artifact declares one primary layer and its consumers.
- New artifacts pass the approved separate-asset threshold.
- Higher layers cannot silently override lower-layer contracts.
- Visual reuse cannot flatten distinct semantic, accessibility, operation, or recovery states.
- Page-template validation covers all approved Page Inventory entries and archetypes.
- Cross-cutting or expensive-to-reverse changes require ADR evaluation.
- A material change to the layer model, page-template boundary, or separate-asset threshold requires a superseding ADR.

## References

- [Design System Architecture](../04-design-system/01-system-architecture.md)
- [Page Inventory](../03-product-structure/01-page-inventory.md)
- [Page-Level Information Hierarchy](../03-product-structure/03-information-hierarchy.md)
- [Error, Empty, Loading, Offline, and Degraded States](../03-product-structure/08-error-empty-and-degraded-states.md)
- [Scalability Guidelines](../03-product-structure/09-scalability-guidelines.md)
