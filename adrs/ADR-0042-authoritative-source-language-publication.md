# ADR-0042: Authoritative Source-Language Publication

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

The Blueprint source is currently written in English, while Nexora’s approved product contract is Brazilian Portuguese-first. Publication must not imply that documentation language changes product localization, and a small team cannot safely maintain an incomplete mirrored translation as equivalent authority.

## Decision

Publish each Blueprint document in its authoritative repository source language, currently English. Preserve approved Brazilian Portuguese product terminology, examples, formatting, and semantics and clearly explain that documentation language does not alter the pt-BR-first product contract.

Do not create a partial authoritative Portuguese mirror. A reviewed Portuguese orientation summary or terminology aid may link to English canonical sources and state its limited scope. Full bilingual publication requires explicit translated-source ownership, parity validation, route and search architecture, review capacity, and a superseding or amending decision.

Machine translation remains a user-controlled convenience and cannot be indexed or labelled as authoritative Blueprint content.

## Alternative

### Immediate bilingual publication

Translate all source content and maintain language parity from launch. This offers broader Portuguese access but is rejected until the team can prove native review, synchronization, search, route, ownership, and lifecycle capacity across the complete corpus.

## Consequences

- Published authority remains aligned with current repository content.
- Product pt-BR semantics remain visible and protected.
- Portuguese-speaking portfolio orientation can be added without claiming full parity.
- Full bilingual access remains a material future investment rather than an implied feature.

## References

- [Publication-Language Strategy](../09-publication/25-publication-language-strategy.md)
- [Content and Localization](../04-design-system/23-content-and-localization.md)
- [ADR-0034](ADR-0034-portuguese-first-typed-localization.md)
