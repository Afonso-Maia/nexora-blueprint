# Localization and Brazilian Commerce Formatting

**Status:** Approved

## Decision

Use Brazilian Portuguese (`pt-BR`) as the primary and only launch locale, with:

- Typed message catalogs using ICU MessageFormat semantics
- `Intl` standards for number, currency, date, time, list, plural, and relative formatting
- Canonical structured values separated from display
- IANA time zones
- ISO currency codes and exact money
- E.164 telephone storage
- Governed Brazilian address and postal-code schemas
- Server and client locale parity
- Explicit fallback and missing-translation behavior

Do not embed customer-facing prose in business logic, persist localized numeric strings as authority, infer locale from sensitive traits, or launch another market by translating text alone.

## Locale negotiation

Priority:

1. Explicit customer preference when supported
2. Authenticated profile preference
3. Valid locale cookie
4. Request language
5. `pt-BR`

Only supported values are accepted. Admin defaults to `pt-BR` and can later use a separately governed workforce preference.

`<html lang="pt-BR">` and document metadata remain correct on server render and navigation.

## URL strategy

Launch URLs do not require a locale prefix because only `pt-BR` is approved.

A second locale or market requires a routing, canonical URL, indexing, content ownership, Legal, Catalog, Search, payment, Fulfillment, Support, and migration decision before introduction.

## Message catalogs

Messages use stable semantic keys grouped by owning domain and contract.

Each entry includes:

- Key
- Brazilian Portuguese source
- Typed variables
- Plural and select behavior
- Context and description
- Owner
- Lifecycle
- Rich-text allowance

Keys do not encode the Portuguese sentence. Business enums map to message keys at presentation boundaries.

## ICU semantics

Use plural, select, number, date, and time placeholders rather than string concatenation.

- Variables are typed.
- Rich content uses allowlisted semantic elements.
- Raw HTML translations are prohibited.
- Missing variables fail validation.
- Unknown enum values use explicit safe fallback.

Customer names, Product names, identifiers, and source content remain escaped.

## Catalog build

Catalogs are:

- Version controlled for product UI
- Schema validated
- Type generated for application use
- Checked for missing and unused keys
- Checked for placeholder parity
- Bundled by route or feature where useful
- Available to server and client rendering

CMS-owned content uses its own governed version and localization lifecycle but the same formatting and fallback contracts.

## Fallback

For launch:

- `pt-BR` is required.
- A missing critical message blocks build or release.
- A missing optional message uses an explicit generic `pt-BR` recovery message and emits diagnostics.
- Message keys are never shown to customers.
- English developer text never leaks into production.

Source facts do not fall back to a different market's content.

## Money

Persist:

- Exact amount
- ISO currency
- Component and rounding context

Format with `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })` or the equivalent server contract.

- Never parse formatted money for calculation.
- Never use binary floating point.
- Conditional, prior, installment, estimated, stale, and unavailable price states retain labels.
- Negative and zero values follow domain meaning, not generic formatting.
- Non-breaking spacing cannot harm screen-reader output or wrapping.

## Numbers and measurements

Store canonical typed values and units. Format decimal comma, grouping, precision, and unit through registered Attribute or domain rules.

User input:

- Accepts governed Brazilian formats.
- Normalizes explicitly.
- Shows the normalized result when consequential.
- Rejects ambiguous decimal interpretation.

Technical identifiers such as model numbers, versions, sockets, and standards are not localized as ordinary numbers.

## Dates and times

Store instants in UTC and relevant IANA zone.

Distinguish:

- Instant
- Local date
- Local time
- Zoned date-time
- Date range
- Duration
- Business deadline

Format through `Intl.DateTimeFormat` with explicit zone and purpose. Never rely on server-local or browser-local defaults for obligations, schedules, promotions, Orders, or provider events.

Use absolute date/time for consequential commitments. Relative time can supplement it.

## Brazilian time zones

Brazil spans multiple IANA zones. Use the source-owned destination, operation, or policy zone where relevant.

`America/Sao_Paulo` can be a configured business default but is never a universal conversion rule.

DST and historical rules come from maintained time-zone data. Tests cover boundary and provider mismatches.

## Addresses

Use a structured Brazilian address model with fields such as:

- Recipient
- Postal code
- Street
- Number
- Complement
- Neighborhood
- Municipality
- State
- Country
- Delivery instructions when permitted

Exact required fields and validation belong to Customer and Fulfillment policy.

- Preserve customer-entered address.
- Offer provider normalization separately.
- Do not silently replace.
- Store country as a stable code.
- State uses governed identifier.
- Number can be non-numeric or absent under policy.
- Complement remains optional and bounded.

Historical Order address snapshots do not change with Address Book edits.

## CEP

Store CEP as a string of governed digits, preserving leading zero. Presentation can use `00000-000`.

Formatting does not prove deliverability. Fulfillment validates service and normalization.

## Telephone

Store normalized E.164 plus verification and purpose metadata. Display through a Brazilian national format when applicable.

- Country code is explicit.
- Input accepts safe punctuation.
- Extension is separate.
- SMS capability is not inferred.
- Recycled-number and verification policy remains Identity or Notifications authority.

## Personal and business identifiers

CPF, CNPJ, state registration, fiscal, or equivalent identifiers are introduced only by an approved business and Legal requirement.

If collected:

- Store normalized canonical value separately from display
- Validate checksum as format, not identity proof
- Classify and restrict
- Mask by context
- Avoid logs, URLs, Search, analytics, and AI
- Apply retention and purpose limitation

Engineering does not invent which identifier Checkout or invoices require.

## Names

- Preserve accents, spacing, and customer-selected form.
- Do not assume first/last-name structure where unnecessary.
- Search normalization does not rewrite authoritative name.
- Sorting rules are explicit.
- Uppercasing is not data normalization.

## Search

Brazilian Portuguese Search:

- Retains exact and accent-insensitive paths
- Protects technical identifiers
- Uses governed synonyms
- Keeps query and applied correction visible

AI and Search do not translate Catalog facts into a parallel taxonomy.

## Content expansion

Components support:

- Longer Portuguese technical terms
- Plurals
- Product names
- Currency
- Status and responsibility phrases
- Provider messages

Do not truncate decisive facts or rely on fixed text height. Abbreviations require established meaning and accessible names.

## Backend contracts

APIs return structured values and stable codes, not preformatted strings, except owned immutable content renditions.

The BFF localizes:

- Labels
- General errors
- Dates and numbers
- Composite status
- Presentation-specific explanations

Source domains supply customer-safe reason codes and structured variables. Source-owned Legal, Compatibility, provider, or notification renditions retain their owner and version.

## Errors

Errors in Portuguese:

- State what happened
- Identify the affected task
- Preserve safe input
- Offer recovery
- Avoid internal jargon
- Avoid disclosure

Provider raw error text is never customer content.

## Email, notification, and documents

Every rendition records locale and template/content version. Formatting is deterministic at generation time.

Plain-text alternatives, accessible HTML, line wrapping, and time-zone context are required.

Generated documents preserve the exact business snapshot and Legal version used; later locale changes do not rewrite history.

## Testing

- Catalog schema and key completeness
- Placeholder and rich-tag parity
- Server/client hydration parity
- Money and exact component totals
- Decimal comma and ambiguous input
- CEP, phone, address, and optional fields
- Time zones, range, midnight, leap date, and provider timestamps
- Plural categories and long content
- Search accents and technical identifiers
- Screen reader pronunciation and visual reflow
- Missing and unknown enum fallback

Use fixed locale and time zone in deterministic tests.

## Consequences

Portuguese-first typed localization prevents formatting logic from scattering and keeps future expansion possible. It requires message governance and does not imply another market is inexpensive.

## References

- [Content and Localization](../04-design-system/23-content-and-localization.md)
- [Catalog Architecture](14-catalog-and-taxonomy-architecture.md)
- [ADR-0034: Portuguese-First Typed Localization](../adrs/ADR-0034-portuguese-first-typed-localization.md)

