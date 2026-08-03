# Content and Localization

**Status:** Approved

## Purpose

This document defines interface voice, Brazilian Portuguese behavior, naming, labels, technical language, numbers, currency, dates, units, warnings, errors, AI attribution, expansion, fallback, and content ownership.

## Decision

Nexora uses **Brazilian Portuguese-first, source-owned interface content**.

Content is specified with components and patterns rather than added after layout. Technical accuracy and action consequence outrank promotional tone. Future locale or market expansion remains unapproved and cannot create duplicate page trees or silent policy fallback.

## Voice

Nexora is:

- Precise
- Calm
- Direct
- Technically competent
- Helpful without interruption
- Confident without unsupported certainty

Nexora avoids:

- Hype and superlatives without evidence
- Gamer slang
- Artificial urgency
- Blame
- Anthropomorphic AI
- Internal operational jargon in customer content
- Vague recovery

## Writing principles

1. Lead with the fact or action.
2. Name the affected object.
3. Explain consequence before detail.
4. Use one term per concept.
5. Keep deterministic fact separate from recommendation.
6. State uncertainty and freshness.
7. Make warnings actionable.
8. Preserve source authority.
9. Use progressive disclosure for technical depth.
10. Write for translation and expansion even when pt-BR is primary.

## Interface naming

- Page titles name destinations or durable objects.
- Section titles name content or work.
- Buttons use verbs.
- Links name destinations.
- Statuses use source-owned terms translated into customer or operator language.
- Field labels name the requested value, not an instruction.
- Empty and error states name the affected scope.

Generic “OK,” “Submit,” “Manage,” and “Continue” are replaced when the action or destination would be ambiguous.

## Capitalization

- Sentence case is default for titles, headings, labels, controls, and statuses.
- Product and manufacturer capitalization follows governed source data.
- Established abbreviations retain approved form.
- All caps is not used for emphasis.
- English-style Title Case is not mechanically applied to Portuguese.

## Customer and operator language

Customer content uses task language and explains necessary technical terms.

Admin content may use domain terminology when:

- The term is governed.
- The user needs it for the task.
- Abbreviations are expanded or documented.
- Internal status does not replace customer-relevant consequence.

## Action labels

Patterns:

- `Ver produto`
- `Adicionar ao carrinho`
- `Comparar`
- `Salvar configuração`
- `Revisar alterações`
- `Solicitar aprovação`
- `Fazer pedido`

These examples establish grammatical direction, not final production copy for every component.

Actions name destructive scope, such as removing an address or closing an account. Labels do not promise success before confirmation.

## Status content

A status label:

- Names current truth.
- Avoids verbs implying completed mutation when pending.
- Includes scope when several objects differ.
- Uses explanation for unknown, stale, partial, or indeterminate.

Customer and Admin labels may differ while referring to the same source state, provided the mapping is governed and not misleading.

## Error and recovery content

Structure:

1. What could not be completed
2. What remains safe or preserved
3. What the user can do
4. Reference or Support path when useful

Avoid:

- “Algo deu errado” without scope or recovery
- Error codes as the main message
- Blaming invalid users
- Promising retry success
- Exposing credentials, permission reasoning, or restricted existence

## Warning content

Warnings state:

- Condition
- Consequence
- Affected object
- Whether action is blocked or overridable
- Resolution

Hard incompatibility is never phrased as a suggestion. Overridable warnings name the trade-off.

## Recommendation content

Recommendations include:

- Recommended option
- Reason
- Evidence
- Confidence
- Trade-off
- Condition favoring another choice
- Provenance

“Best” requires named criteria. Personalized, sponsored, editorial, deterministic, and AI recommendations remain distinguishable.

## AI content

AI is labelled as Nexora AI or another approved explicit identity.

AI content:

- Uses first-person sparingly and does not claim emotion or consciousness.
- Names current context.
- Distinguishes suggestion from fact.
- Avoids hidden action.
- Offers correction and clear.
- Does not expose chain-of-thought.
- Provides concise rationale, evidence, uncertainty, and source boundaries.

Streaming output can be paused and does not generate excessive live announcements.

## Brazilian Portuguese

Portuguese for Brazil is the authoritative primary locale for interface validation.

Requirements:

- Correct diacritics and punctuation
- Natural Brazilian vocabulary
- Gender and number agreement
- Respectful second-person phrasing without forced informality
- Consistent technical terms
- Manufacturer model names preserved
- Search synonyms include common Brazilian terms and abbreviations

Final production copy requires native-language content review.

## Currency and finance

- Currency uses Brazilian Real formatting, such as `R$ 1.234,56`.
- Decimal and thousands separators follow locale.
- Installments name count, installment value, interest condition, and total when required.
- Conditional Pix, boleto, card, or financing pricing names the method.
- Negative values and refunds use explicit sign or wording.
- Rounding follows owning financial policy.

The Design System defines display relationships, not financial calculation.

## Numbers and units

- Decimal separator is comma in localized prose and interface values.
- Units use governed Catalog terminology and spacing.
- Storage, frequency, power, dimensions, refresh rate, and other technical measures remain consistent.
- Product-source notation may be preserved when it is part of a model name.
- Ranges name endpoints and units.
- Unknown is not zero; not applicable is not blank.

## Dates and times

- Use unambiguous localized formats.
- Consequential deadlines include full date and timezone or location context when relevant.
- Relative time supplements exact time.
- Expected dates are labelled estimates.
- Admin audit retains exact timestamps and source timezone context.
- Duration is not presented as a due date.

## Addresses and telephone

Brazilian address components support:

- Postal code
- Street
- Number
- Complement
- Neighborhood
- City
- State
- Country when needed

The system does not assume every address fits one line or has a street number. Telephone fields preserve country and area context without destructive masks.

## Personal names and identity

- Do not assume two-part names.
- Preserve accents, spacing, and source-approved characters.
- Display names are separate from legal or verified identity where applicable.
- Initials are a fallback, not proof.
- Inclusive form options follow Legal, Identity, and privacy policy rather than invention.

## Content length and expansion

Components validate:

- `30–50%` label and message expansion as a design stress condition
- Long product and manufacturer names
- Multi-line button alternatives where permitted
- Long errors and legal references
- Long units and technical values

The percentage is a testing heuristic, not a translation limit. Containers grow, wrap, or recompose before truncating essential content.

## Truncation

Follow the [Typography](05-typography.md) prohibitions.

Essential content is never available only in a hover tooltip. Admin worklists may truncate bounded scan fields only with keyboard- and touch-accessible complete value.

## Fallback

If localized content is missing:

- Product facts may use governed source values with language metadata.
- Legal and policy content must not silently present a different-language version as authoritative.
- Support content discloses fallback and preserves escalation.
- Interface strings fail visibly during validation rather than showing raw keys.
- Mixed language is minimized and marked where required.

Future locales require product, Legal, taxonomy, payment, fulfillment, Support, and governance review.

## Content in states

Every loading, empty, error, offline, and degraded component has:

- Title
- Scope
- Explanation
- Primary recovery
- Alternate path if available
- Accessible announcement

Illustration and icon are optional. Copy remains sufficient without them.

## Ownership

- Design System and Content own shared interface conventions.
- Brand owns tone direction.
- Catalog owns product names, attributes, and terminology.
- Pricing and Finance own monetary truth.
- Compatibility owns deterministic explanations.
- Support owns governed help and case content.
- Identity and Security own safe authentication language.
- Legal owns authoritative policy text.
- Domain owners own lifecycle and operation terms.

Content design does not transfer source ownership.

## Validation

Validate with:

- Native Brazilian Portuguese review
- Realistic product and technical content
- Currency, finance, units, dates, addresses, and identifiers
- Long and short labels
- Screen reader pronunciation and accessible names
- Search synonyms and accents
- Light/dark, responsive, and density combinations
- Missing localization and mixed-language fallback
- AI, recommendation, error, warning, permission, and legal contexts

## Governance

1. New shared terms enter a governed glossary.
2. Component copy declares owner and variable inputs.
3. Domain terms cannot be locally renamed for tone alone.
4. Legal or security wording may constrain content but cannot create inaccessible interaction.
5. Future locale support requires explicit architecture and readiness review.

## Consequences

### Benefits

- Content supports Brazilian commerce from the foundation.
- Technical and operational terms remain consistent.
- Errors and recommendations expose consequence and evidence.
- Layout is tested against real linguistic expansion.

### Costs and risks

- Native-language and domain review require sustained ownership.
- Source terms need mapping across customer and Admin language.
- Future localization requires broader market review.

## Next decision

Define component contribution, specification, testing, versioning, adoption, deprecation, and removal.
