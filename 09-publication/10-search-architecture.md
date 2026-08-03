# Search Architecture

**Status:** Approved

## Decision

Use a build-generated, privacy-preserving local search index as the default architecture. Index authoritative rendered text, headings, stable IDs, status, phase, document type, and controlled metadata. Prefer Starlight’s supported local-search integration or a mechanically equivalent static index; a hosted search provider requires a later justified controlled selection.

Rank exact stable identifiers, ADR numbers, page IDs, titles, and headings above body matches. Brazilian Portuguese diacritics and exact technical tokens must work. Result excerpts are non-authoritative and link to the matching canonical heading.

Exclude only generated duplicates, navigation chrome, explicitly private build data, and records with an approved exclusion reason. Do not transmit queries to a third party by default or retain individual queries.

When search is unavailable, preserve navigation and expose a clear recovery path to generated indexes.

## Validation

Maintain representative queries for phase names, ADRs, page IDs, templates, capabilities, Portuguese terms, and controlled-value language. Test completeness, keyboard operation, announcements, relevance, deep links, empty results, and unavailable-search recovery.

## References

- [Information Discovery Search](../02-information-architecture/05-search.md)
- [Search Analytics and Publication Privacy](38-search-analytics-and-publication-privacy.md)
- [ADR-0041](../adrs/ADR-0041-local-private-documentation-search.md)
