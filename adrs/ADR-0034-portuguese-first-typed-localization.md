# ADR-0034: Portuguese-First Typed Localization

- **Status:** Accepted
- **Date:** 2026-08-03

## Decision

Launch with `pt-BR` using typed message catalogs, ICU MessageFormat semantics, JavaScript `Intl`, exact structured values, IANA time zones, E.164 phone storage, and governed Brazilian address formats.

Do not prefix URLs for a single launch locale. A second locale or market requires an explicit routing and product architecture decision.

## Consequences

Formatting and content stay consistent and testable, but every feature must provide typed Portuguese messages and structured values.

## References

- [Localization and Brazilian Commerce Formatting](../06-engineering/29-localization-and-brazilian-commerce-formatting.md)
- [Content and Localization](../04-design-system/23-content-and-localization.md)

