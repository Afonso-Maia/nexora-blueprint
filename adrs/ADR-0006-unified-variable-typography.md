# ADR-0006: Unified Variable Typography

- **Status:** Accepted
- **Date:** 2026-08-02

## Context

Nexora typography must serve premium storefront content, Brazilian Portuguese, technical specifications, product comparison, transactions, Support, PC Builder, and dense permission-aware Admin work.

A dual-family system could create stronger editorial distinction but would add loading, fallback, localization, hierarchy, and governance complexity. A unified family can produce consistent product behavior if its roles and numeric features are explicit.

Typeface choice is cross-cutting and costly to reverse after components, templates, and implementation depend on its metrics.

## Decision

Use Inter Variable as Nexora’s single primary interface and content family.

Display, heading, body, label, caption, and data roles use governed size, line height, weight, tracking, and numeric behavior. A platform monospace stack is reserved for identifiers and exact code-like values.

The core Design System does not use a separate editorial or display family. Body, label, data, and caption sizes remain stable across responsive layouts; large display and heading roles may use bounded role adaptation.

Font loading must preserve meaningful text, Brazilian Portuguese glyph coverage, fallback access, and layout stability.

## Consequences

### Benefits

- One family creates continuity across customer and Admin products.
- Variable weights support controlled hierarchy.
- Tabular numerals support prices, comparison, and operational data without pervasive monospace.
- Loading and fallback behavior are simpler than a dual-family system.
- Brand distinction can remain calm and composition-led.

### Costs and risks

- The system gains less novelty from typography alone.
- Precision depends on disciplined roles and layout.
- Variable-font delivery and fallback metrics require later Engineering validation.
- Arbitrary intermediate weights could proliferate without governance.

## Governance

- Approved semantic roles replace page-specific type values.
- Synthetic weights and styles are prohibited.
- A new font family requires licensing, language, accessibility, loading, fallback, and cross-product review.
- Font versions are governed dependencies.
- A material change to the unified-family strategy requires a superseding ADR.

## References

- [Typography](../04-design-system/05-typography.md)
- [Design Token Architecture](../04-design-system/03-design-token-architecture.md)
- [Precision Gold Color and Themes](../04-design-system/04-precision-gold-color-and-themes.md)
- [Page-Level Information Hierarchy](../03-product-structure/03-information-hierarchy.md)
