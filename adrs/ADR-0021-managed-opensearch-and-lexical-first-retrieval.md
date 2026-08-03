# ADR-0021: Managed OpenSearch and Lexical-First Retrieval

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora requires premium Brazilian Portuguese product search, exact technical-model lookup, dynamic attribute filtering, separated Universal Search groups, operational search, governed ranking, visible query interpretation, and an eventual path to semantic retrieval. Search must scale and degrade independently without becoming commerce truth.

Viable approaches included:

1. Managed OpenSearch with governed source projections and lexical-first retrieval
2. Managed Typesense
3. PostgreSQL full-text search on or alongside the authoritative database

## Decision

Use an independently deployed Search capability backed initially by managed OpenSearch.

Use source-owned, versioned documents; event-driven indexing; recurring reconciliation; immutable versioned indexes; and alias-based atomic promotion.

Launch with BM25 lexical retrieval, purpose-specific Brazilian Portuguese analyzers, protected exact technical fields, governed synonyms and typo behavior, and stable identifier-based filtering and facets.

Query and ranking behavior is expressed through versioned server-owned profiles. Source eligibility is a hard filter. Ranking may use bounded governed signals but cannot replace source facts or user constraints.

Semantic or hybrid retrieval is deferred until offline judgments and guarded experiments prove material benefit without regressing exact technical search, filtering, latency, privacy, explainability, or lexical fallback.

OpenSearch remains derived state. Source services recheck authoritative access, price, inventory, Compatibility, and action eligibility.

## Consequences

### Benefits

- Mature analyzers, BM25 retrieval, aggregations, and relevance tooling fit Nexora's scope.
- Search can scale and fail independently.
- Source-versioned indexes are rebuildable and auditable.
- Lexical-first launch avoids premature semantic complexity.
- A later hybrid path exists without making it the baseline.

### Costs and risks

- OpenSearch adds a stateful distributed platform.
- Index and source freshness require reconciliation.
- Query and aggregation flexibility requires strict resource limits.
- Relevance quality needs ongoing judgments and experiment governance.

## Governance

- Raw engine APIs and Query DSL remain private.
- Every indexed type has one source owner, schema, audience, freshness, and rebuild contract.
- Ranking and curation cannot override source eligibility or explicit user filters.
- Analyzer, schema, and breaking mapping changes require reindexing and evaluation.
- Semantic retrieval requires the documented adoption gate.
- A material change to engine, source-document ownership, lexical baseline, indexing topology, or ranking authority requires a superseding ADR.

## References

- [Search Indexing, Ranking, Filtering, and Query Architecture](../06-engineering/15-search-indexing-ranking-filtering-and-query.md)
- [Search Architecture](../02-information-architecture/05-search.md)
- [Filtering](../02-information-architecture/06-filtering.md)
- [ADR-0001: Search-First Information Architecture](ADR-0001-search-first-information-architecture.md)
- [ADR-0020: Governed Versioned Catalog](ADR-0020-governed-versioned-catalog.md)
- [OpenSearch keyword search](https://docs.opensearch.org/latest/search-plugins/keyword-search/)
- [OpenSearch faceted search](https://docs.opensearch.org/latest/tutorials/faceted-search/)

