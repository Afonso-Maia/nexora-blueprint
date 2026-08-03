# Search Relevance and Index Validation

**Status:** Approved

## Decision

Search uses versioned Brazilian Portuguese judgment sets, deterministic query invariants, index-projection reconciliation, offline evaluation, and bounded online evidence. Relevance is not reduced to zero-result rate or click-through rate.

## Evidence

- Canonical, synonym, accented/unaccented, misspelled, model/SKU, category, attribute, unit, and long-tail queries
- Exact-match and identifier protections; governed lexical ranking and tie behavior
- Facet values/counts, filter combination, pagination, sort, clearability, and URL restoration
- Product/category visibility, publication, eligibility, price/inventory freshness labels, and no restricted/unpublished leakage
- Index mapping/settings compatibility, source revision, watermark, alias promotion, rollback, rebuild, and reconciliation
- No-result, partial-index, stale, unavailable, and Search-outage recovery
- Keyboard, screen-reader, mobile, content, and performance behavior

Judgments record intent, eligible corpus revision, relevant results with grades, prohibited results, critical facts, assessor, and rationale. Catalog and Search owners review material changes.

Metrics include recall/precision-oriented ranking measures, critical-query pass rate, facet correctness, freshness lag, zero-result classification, latency, and regression by query segment. Business metrics inform but never authorize deceptive ranking.

Semantic retrieval remains evidence-gated and cannot displace lexical exactness, governed filters, or source facts.

## References

- [Search Architecture](../06-engineering/15-search-indexing-ranking-filtering-and-query.md)
- [Information Discovery Search](../02-information-architecture/05-search.md)
