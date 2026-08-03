# Localization and Brazilian Commerce Validation

**Status:** Approved

## Decision

Brazilian Portuguese is tested as a typed product contract. Structured commerce values are validated independently from their localized presentation, and legal or policy values remain controlled inputs.

## Content and message evidence

- Every user-facing string uses a governed key and typed variables.
- ICU plural, select, gender where approved, interpolation, and escaping are valid.
- Missing, unknown, invalid, and fallback content produces explicit safe behavior.
- Long labels, names, addresses, technical attributes, errors, and dynamic states fit supported layouts.
- Grammar, terminology, tone, capitalization, abbreviations, search synonyms, and assistive names receive human review where meaning is material.
- Customer content, internal workforce terms, provider text, and legal text retain their approved ownership.

## Structured Brazilian values

Tests cover:

- BRL exact arithmetic and display;
- percentage, installment, discount, tax, fee, refund, and total relationships;
- CPF/CNPJ, CEP, telephone, state, municipality, street, number, complement, and recipient structures according to controlled policy;
- dates, times, durations, time zones, daylight/clock boundaries, and server-time authority;
- units, decimal/group separators, dimensions, electrical and technical values; and
- delivery, pickup, invoice, warranty, return, consent, and accessibility-statement content versions.

Formatting never becomes the stored authoritative value. Tests do not invent validation policy that the Blueprint reserves for Legal or implementation registers.

## Search and catalog language

Representative datasets include accents, unaccented input, common Brazilian terms, model identifiers, abbreviations, misspellings, unit expressions, synonyms, category vocabulary, and technical attributes. Normalization cannot collapse distinct governed facts.

## Locale boundaries

pt-BR is the complete primary locale. Pseudo-locales test expansion, missing keys, bidirectional assumptions, and hard-coded text but do not imply another market is supported. Future locales require their own market, legal, catalog, and operational decisions.

## Rejected alternative

Screenshot review of translated strings is rejected as the primary method. Typed keys, structured-value properties, semantic assertions, content review, and representative journeys provide distinct necessary evidence.

## References

- [Content and Localization](../04-design-system/23-content-and-localization.md)
- [Localization Engineering](../06-engineering/29-localization-and-brazilian-commerce-formatting.md)
- [ADR-0034](../adrs/ADR-0034-portuguese-first-typed-localization.md)
