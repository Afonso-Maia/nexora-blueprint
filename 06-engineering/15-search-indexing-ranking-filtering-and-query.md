# Search Indexing, Ranking, Filtering, and Query Architecture

**Status:** Approved

## Purpose

This document defines the implementation architecture for Universal Search, Category Discovery, suggestions, operational search, indexing, query interpretation, ranking, filtering, sorting, pagination, freshness, relevance governance, and degraded behavior.

It preserves the approved search-first architecture, hybrid taxonomy, attribute-driven filtering, visible intent, separated result groups, and authoritative-source boundaries.

## Decision

Use an independently deployed Search capability backed initially by a managed **OpenSearch** cluster.

The architecture uses:

- Source-owned versioned search documents
- Event-driven incremental indexing plus recurring source reconciliation
- Immutable versioned indexes and aliases for atomic promotion
- Lexical BM25 retrieval as the launch baseline
- Governed Brazilian Portuguese analyzers, synonyms, typo handling, and exact technical-identifier matching
- Attribute-identifier-based filters and aggregations
- A versioned query plan and ranking profile per search surface
- Opaque `search_after` continuation bound to a point-in-time result context where stable continuation is required
- Explicit freshness, partial-result, correction, and zero-result semantics
- Offline relevance evaluation and guarded online experiments
- Semantic or hybrid retrieval only after evidence demonstrates benefit

OpenSearch is derived infrastructure, never product, taxonomy, price, inventory, permission, Compatibility, or merchandising truth.

## Viable approaches considered

### Managed OpenSearch

OpenSearch provides mature full-text retrieval, field weighting, aggregations, exact and range filtering, analyzers, aliases, point-in-time search, relevance tooling, and an optional path to vector and hybrid retrieval.

It is approved because Nexora needs governed technical search, dynamic facets, heterogeneous result groups, operational diagnostics, and future relevance experimentation beyond straightforward database lookup.

### Managed Typesense

Typesense provides strong typo-tolerant product search, filtering, faceting, and vector support with a smaller operational surface. It is genuinely viable for an initial retailer.

It is not selected because Nexora's Blueprint calls for deeper analyzer control, multi-stage relevance governance, heterogeneous separated search groups, detailed diagnostic evaluation, and a broader long-term query architecture. Its simpler model is an advantage, but less aligned with the planned portfolio depth.

### PostgreSQL full-text search

PostgreSQL can support lexical search, dictionaries, ranking, and basic faceting while reducing infrastructure.

It remains an emergency or early-development substitute, but is not the production direction because complex aggregations, typo behavior, relevance experimentation, index isolation, and independent query scaling would compete with authoritative commerce workloads.

## Capability boundaries

The Search runtime contains:

- Public search query API
- Category Discovery query API
- Suggestion API
- Permission-filtered operational search API
- Indexing consumers and rebuild workers
- Query planner
- Ranking-profile executor
- Filter and facet planner
- Search configuration registry
- Relevance evaluation tooling
- Search telemetry and diagnostics

It does not:

- Mutate source records
- Define taxonomy or Attribute semantics
- Decide authoritative price, availability, Compatibility, eligibility, or permissions
- Make an AI interpretation permanent
- Own Product, content, Build, case, promotion, or customer identity
- Authorize opening a protected result or executing an action

## Source contracts

Every indexed document type declares:

- Stable document type and identifier
- Owning source
- Source aggregate and published revision
- Search schema version
- Eligible audience and authorization class
- Searchable fields and analyzer
- Exact identifiers and aliases
- Filterable and sortable fields
- Display projection fields
- Ranking signals and their owners
- Publication and lifecycle eligibility
- Freshness target and maximum tolerated lag
- Tombstone and rebuild behavior
- Zero-result and partial-result behavior

The source produces the document or a versioned projection contract. Search does not query source tables or construct Catalog facts from unrelated events.

## Index families

Use separate index families when document shape, access, lifecycle, scaling, or query behavior differs materially.

Initial logical families are:

- Public Products
- Public Categories and Brands
- Public Collections, Promotions, and Buying Guides
- Public Support content
- Customer-private continuity types only when approved
- Workforce operational search types
- Search suggestions and governed query resources

Physical index count is an operational decision. Multiple compatible public supporting types may share an index with an explicit `document_type`; security or lifecycle boundaries cannot be merged for convenience.

Customer-private and workforce documents never share a public alias. Admin query credentials cannot be used by Customer Experience.

Universal Search federates index-family queries through the Search service and returns the approved separated groups. It does not flatten every type into one undifferentiated relevance list.

## Product search document

The public Product document can contain only approved published projections, including:

- Product and eligible Variant identifiers
- Brand and canonical Category identifiers
- Category path identifiers
- Brazilian Portuguese public names and approved aliases
- Governed attribute identifiers and typed values
- Searchable factual text
- Product and Variant publication state
- Current search-eligible price projection
- Current search-eligible inventory or availability projection
- Promotion or collection references supplied by their owner
- Compatibility-filter inputs supplied through governed contracts
- Public popularity, quality, and recency signals
- Media thumbnail reference
- Source revisions and timestamps

Exact price, stock, purchase eligibility, and Compatibility are rechecked with their owner at result open and action time. Search projections support discovery, filtering, and sorting but never commit commerce outcomes.

Restricted cost, supplier, risk, internal quality, unpublished, embargoed, or governance data is excluded from the public document.

## Index schema and mapping

Index mappings are generated from version-controlled search schemas.

- Analyzed text and exact keyword representations are separate fields.
- Stable identifiers use exact keyword fields.
- Governed enumeration facets use controlled-value identifiers.
- Measurements use canonical numeric fields plus stable unit semantics.
- Money uses exact minor-unit sortable fields and currency.
- Dates and times use explicit types.
- Nested structures are used only when their association semantics require them.
- Dynamic mapping is disabled or strictly bounded for governed indexes.
- Unknown fields fail indexing validation rather than mutating production schema.

Field names encode stable semantic contracts, not translated labels. Brazilian Portuguese labels are joined from governed presentation metadata.

## Brazilian Portuguese analysis

Create versioned analyzers for:

- General Brazilian Portuguese product language
- Product names
- Brands
- Categories
- Technical specifications
- Model numbers, SKUs, and exact identifiers
- Support and editorial content

General analysis can use Unicode normalization, lowercasing, Portuguese stop-word handling, stemming, and accent-insensitive matching where relevance evaluation supports them.

Technical search requires protected exact subfields:

- Preserve model punctuation and alphanumeric sequences.
- Do not stem model names, standards, sockets, chipsets, capacities, or SKUs.
- Keep original and normalized forms.
- Apply accent folding as an additional match path rather than destroying exact-form evidence.
- Treat decimal separators, storage units, generation markers, and common technical punctuation through tested token rules.

Examples such as `RTX 5070 Ti`, `Ryzen 7 9800X3D`, `AM5`, `Wi‑Fi 7`, `DDR5-6000`, `65"`, and `1 TB` require dedicated fixtures. Search must not silently turn a nearby model into an exact match.

Analyzer changes create a new index schema version and require reindexing and relevance comparison.

## Query contract

The public query contract accepts only governed parameters:

- Query text
- Search surface
- Canonical Category or collection context
- Visible filter expressions
- Sort identifier
- Visible intent identifier and parameters
- Continuation cursor
- Locale
- Bounded customer context when explicitly permitted
- Experiment assignment

Raw OpenSearch Query DSL is private and never accepted from a browser, Admin saved view, AI, or partner.

The Search service:

1. Validates syntax, size, locale, filter identifiers, values, and sort.
2. Normalizes query text without erasing the original.
3. Identifies exact technical tokens and explicit structured constraints.
4. Resolves a versioned query profile.
5. Builds a bounded internal query plan.
6. Executes with deadlines and resource limits.
7. Maps results, facets, explanations, freshness, and recovery into the public contract.

The response identifies applied spelling correction, synonym, intent, filter, sort, partial coverage, and stale state when these materially affect results.

## Query interpretation

Interpretation is deterministic first.

Approved interpretation tools include:

- Exact identifier recognition
- Governed synonym expansion
- Unit and technical-term normalization
- Category and Brand recognition
- Explicit attribute phrase recognition
- Spelling correction
- Prefix completion for suggestions

An interpretation becomes an inspectable query plan. It cannot add a hidden permanent filter or override a user's explicit filter.

AI interpretation may propose visible query text, intent, filters, or ranking context. The user can inspect, modify, and clear it. The deterministic planner validates every proposed Category, Attribute, value, and sort against the governed schema.

## Retrieval

### Lexical baseline

Launch with BM25-based lexical retrieval.

Use field weights that prioritize:

1. Exact Product, Variant, model, SKU, Brand, and controlled-term matches
2. Product name
3. Category and governed aliases
4. High-value attributes
5. Factual short description
6. Lower-priority approved content

Phrase and exact technical matches receive controlled boosts. Repeated marketing text and keyword stuffing do not create authority.

### Typo tolerance

Typo behavior is query- and token-aware.

- Short, numeric, model, SKU, standard, and controlled-value tokens receive little or no fuzziness.
- Natural-language tokens can use bounded edit distance after exact paths.
- Corrections never silently replace an exact valid technical model.
- The response distinguishes corrected, expanded, and original-query results.
- High-risk ambiguous corrections produce suggestions rather than an invisible rewrite.

### Semantic and hybrid retrieval

Semantic retrieval is not required for launch.

It may be introduced when:

- A versioned embedding source and model are approved
- Offline judgments show material gain for defined query classes
- Exact technical and safety-critical queries do not regress
- Filters, permissions, freshness, citations, cost, latency, and fallback are preserved
- Query and document embedding versions are traceable
- Lexical-only fallback remains available

Hybrid weighting is a governed ranking profile, not a model default. AI or vector similarity cannot create product facts, filters, eligibility, or Compatibility.

## Ranking architecture

Ranking is a versioned staged pipeline:

### Stage 1 — eligibility

Hard filters remove documents that are not publishable, discoverable, authorized, in current scope, or compatible with explicit query constraints.

### Stage 2 — retrieval relevance

Calculate lexical relevance and any approved semantic candidate score.

### Stage 3 — governed business signals

Apply bounded source-owned signals such as:

- Availability class
- Price completeness
- Product-data completeness
- Public customer-quality evidence
- Popularity with decay
- Newness where query-relevant
- Delivery or regional eligibility where approved
- Explicit Marketing curation

No signal can resurrect an ineligible document.

### Stage 4 — diversity and tie-breaking

Apply controlled Product/Variant collapse, result diversity, and deterministic tie-breaking by stable identity.

Variants normally collapse under the Product unless the query or filter explicitly targets a distinct selectable configuration.

### Stage 5 — presentation

Generate snippets, highlights, applied interpretation, source revisions, and recovery metadata. Presentation does not change rank.

## Ranking governance

Every ranking profile declares:

- Surface and query class
- Input fields and signals
- Signal owner and freshness
- Weight or ordering
- Eligibility and guardrails
- Expected effect
- Evaluation judgments
- Activation, experiment, rollback, and expiry

Marketing can pin, boost, or suppress only through an explicit governed curation contract with scope, reason, schedule, approval, and disclosure policy. Curation cannot contradict Catalog publication, Legal restriction, Inventory truth, Compatibility hard constraints, or user filters.

Commercial margin is not an undisclosed default relevance substitute. If commercial objectives influence ranking, the signal and customer-interest guardrails require explicit governance and evaluation.

Personalization is optional, bounded, and subordinate to query relevance and explicit customer controls. Sensitive traits, Support data, payment data, and hidden inferred vulnerability are prohibited ranking inputs.

## Filtering and facets

Filters use stable Category, Attribute Definition, controlled-value, Brand, price-range, availability, and Compatibility identifiers.

The hierarchy remains:

1. Quick Filters
2. Core Filters
3. Category Filters
4. Compatibility Filters
5. AI Filters

Catalog's effective Category schema determines eligible governed attributes. Discovery configuration determines decision-value ordering and presentation. The current result set determines useful values.

Rules:

- Hide filters with no decision value.
- Hide values absent from the eligible active result set.
- Preserve selected values even when they become temporarily zero-result, with clear recovery.
- Use exact keyword fields for controlled values.
- Use canonical numeric values for ranges.
- Keep sorting separate from filtering.
- Represent safe filter state in canonical URLs.
- Reject unknown or retired values and report which state was removed.
- Do not infer `unknown` as `false`.
- Compatibility filters call or consume the governed Compatibility model; they are not supplier labels.

Facet counts declare whether exact, bounded, sampled, stale, or partial. Customer-facing critical counts are exact within the returned search snapshot unless a later approved contract visibly permits estimation.

For multi-select facets, the query planner uses defined conjunctive or disjunctive semantics per Attribute. This behavior is schema metadata and cannot vary accidentally by UI.

## Sorting

Approved sort identifiers map to versioned server-owned definitions, for example:

- Relevance
- Price ascending or descending
- Customer rating
- Newest
- Popularity

The exact launched set remains product configuration.

Sort fields declare source, freshness, missing-value placement, deterministic tie-breaker, and compatibility with pagination. Client-supplied field names or scripts are prohibited.

Price sorting uses one governed comparable price projection and currency. It cannot compare incompatible financing text or stale display strings.

## Suggestions

Suggestion groups can include:

- Query completions
- Products
- Categories
- Brands
- Collections and Promotions
- Buying Guides
- Support content
- Recent or saved customer queries when authorized

Products retain first commercial priority for product-seeking queries. Groups remain distinguishable.

Suggestions use a dedicated bounded index or field strategy optimized for prefix latency. They apply publication, permission, sensitive-term, abuse, and popularity controls.

Query-log-derived suggestions pass aggregation thresholds, privacy review, abuse filtering, normalization, and governance before activation. A raw individual query never becomes a public suggestion.

## Universal Search federation

The query service runs a bounded fan-out to eligible index families under one deadline.

It returns:

- Separated result groups
- Per-group status and freshness
- Group-specific continuation
- Applied interpretation
- Overall partial or complete state

A failed Support-content group does not erase valid Product results. A failed Product group cannot be presented as successful Universal Search merely because editorial results exist.

Cross-group ranking determines group priority and limited preview allocation, not a false common score. Each group owns its internal ranking profile.

## Operational search

Admin operational search is a separate protected contract.

- Queries use workforce identity and permission projections.
- Results are filtered by Discover scope before return.
- Index documents contain only fields approved for operational discovery.
- Opening a result reauthorizes current Read access with the source.
- Field snippets, counts, saved views, and exports follow field-level policy.
- Customer-private and operational queries use separate telemetry and retention.

Search cannot use a stale broad permission projection beyond the approved revocation bound. Missing mandatory policy context fails closed.

## Indexing architecture

### Incremental path

1. A source commits its state and outbox record.
2. The event bus delivers a versioned change notification.
3. The indexing worker retrieves or receives the source-owned projection.
4. It validates schema, lifecycle, audience, and source revision.
5. It indexes idempotently using stable document identity and external source version.
6. It records checkpoint and observable lag.

Older or duplicate revisions cannot overwrite newer documents.

Deletion and discoverability-revocation tombstones receive priority over ordinary enrichment. A consumer that cannot interpret an event version stops that partition or item safely and alerts; it does not guess.

### Rebuild path

Each source exposes a paginated snapshot export with a fixed source revision or change watermark.

Rebuild:

1. Creates a new versioned index.
2. Loads and validates the source snapshot.
3. Replays changes after the watermark.
4. Runs count, checksum, schema, sample-query, authorization, and relevance validation.
5. Atomically promotes an alias.
6. Retains the predecessor for bounded rollback.
7. Removes old indexes through retention policy.

The live alias never points to a partially loaded index.

### Reconciliation

Recurring reconciliation compares:

- Source eligible identifiers and revisions
- Indexed identifiers and revisions
- Missing, extra, stale, malformed, and unauthorized documents

Repair is idempotent. Repeated divergence triggers source-contract or consumer investigation rather than endless silent repair.

## Freshness

Each indexed signal has its own source revision and observed time. The document exposes an overall index time but does not hide mixed freshness.

Freshness classes distinguish:

- Catalog publication
- Price
- Inventory and availability
- Promotion and collection membership
- Review aggregates
- Permission projection
- Compatibility-filter inputs

The query response reports decision-relevant stale or partial conditions. Exact thresholds belong to later performance and operations policy.

Source changes that remove access, publication, legal eligibility, or purchase safety use the fastest invalidation path and direct source checks where required.

## Pagination and result stability

Use opaque signed cursors containing only server-readable query-plan identity, index alias generation, sort values, stable tie-breaker, point-in-time reference when used, and expiry.

- Use `search_after`, not deep offset pagination.
- Stable continuation uses a bounded point-in-time context.
- A cursor cannot change query, filters, sort, locale, identity context, or experiment.
- Expired or invalid cursors return explicit restart guidance.
- Result updates between fresh queries are expected and disclose current state.

The cursor is not an authorization token and contains no raw sensitive query data.

## Caching

Cache only normalized safe query plans and public responses under bounded keys that include index generation, ranking profile, locale, query, filters, sort, and experiment.

Do not shared-cache:

- Customer-private results
- Workforce results
- Permission-filtered counts
- Sensitive queries
- Point-in-time cursor pages outside their owned context

Index alias promotion and critical source invalidation evict or naturally bypass old generations. Cache cannot extend a document beyond its discovery eligibility.

## Zero-result and recovery behavior

The service distinguishes:

- No lexical or semantic candidates
- Candidates removed by filters
- Invalid or retired filters
- Category mismatch
- Spelling ambiguity
- Partial index coverage
- Required Product index unavailable
- Protected results omitted

Recovery can:

- Suggest a spelling without silently forcing it
- Remove one visible invalid constraint
- Offer related governed Categories or Brands
- Show which filters caused zero results
- Preserve the original query
- Offer PC Builder, Buying Guide, Support, or AI help when contextually appropriate

Search never claims no product exists when the Product index is unavailable or materially stale.

## Degraded behavior

- If suggestions fail, submitted search remains available.
- If semantic retrieval fails, use the approved lexical profile and report no semantic effect.
- If one Universal Search group fails, return explicit partial groups when Product-critical behavior remains truthful.
- If facets time out, results may return with a filter-unavailable state; active filter semantics remain visible.
- If fresh price or inventory projections are unavailable, omit or mark those facets and sorts rather than use unbounded stale values.
- If Search is unavailable, Category and Product direct routes, navigation, Cart, Account, Support, and other non-search fast paths remain available as their dependencies allow.
- Search does not fall back to an unbounded PostgreSQL query on the authoritative primary during an outage.

## Security, privacy, and abuse controls

- Only Search workers can write indexes.
- Query clients use separate least-privilege identities by surface.
- Public APIs enforce query length, clause, wildcard, regex, aggregation, pagination, and timeout limits.
- Raw engine APIs and scripts are private.
- Queries and indexed text are untrusted for highlighting and rendering.
- Highlight output is escaped and uses controlled markup.
- Search logs apply minimization, pseudonymization, retention, and access policy.
- Sensitive, low-frequency, or identifying queries are excluded from public analytics and suggestions.
- Bots, scraping, enumeration, expensive aggregations, and query amplification receive rate and resource controls.

## Relevance evaluation

Maintain versioned Brazilian Portuguese query sets covering:

- Exact Product and model lookup
- Category exploration
- Attribute and specification queries
- Natural-language needs
- Misspellings
- Units and abbreviations
- Ambiguous brands and models
- Compatibility-seeking queries
- No-result and unsafe-correction cases
- Support and mixed-intent queries

Judgments record relevance grade, intent, expected group, critical exact matches, unacceptable results, and rationale.

Offline gates include:

- Exact-match preservation
- NDCG and reciprocal-rank measures at governed cutoffs
- Zero-result rate
- Filter and facet correctness
- Unsafe correction and model-confusion rate
- Latency and timeout distribution
- Result diversity
- Segment and accessibility impact

Online experiments require:

- Hypothesis and owner
- Eligible traffic and exclusions
- Stable assignment
- Primary and guardrail metrics
- Minimum evidence and maximum duration
- No-regression thresholds for exact technical queries
- Kill switch and rollback
- Privacy review

Clicks and conversion are behavioral signals, not automatic relevance truth. Position bias, availability, price, campaign, and selection effects must be considered.

## Configuration lifecycle

Analyzers, schemas, synonyms, query profiles, ranking profiles, curations, filter definitions, and experiment configurations are version-controlled or governed versioned data.

The lifecycle is:

`Draft → Validate → Offline evaluate → Review → Approve → Shadow or experiment → Activate → Observe → Retire`

Synonyms are directional where meaning requires it. A synonym cannot equate distinct technical models merely because users co-query them.

Activation records exact index, analyzer, schema, query, ranking, curation, and experiment versions. Rollback is atomic by alias or profile activation.

## Observability

Measure by surface and profile:

- Query volume and latency
- Timeouts and rejected complexity
- Zero-result and filter-zero rates
- Suggestion latency and acceptance
- Exact model success
- Correction, synonym, and intent application
- Facet latency and partial counts
- Indexing throughput, lag, failures, and dead-letter state
- Source-to-index revision skew
- Rebuild and alias-promotion status
- Permission-projection age and revocation lag
- Cache effectiveness
- Search-to-source stale-result correction
- Experiment exposure and guardrails

Trace query plan, index generation, profile, source revisions, and downstream open correlation without logging prohibited personal content.

## Quality gates

Before release:

- Contract-test every indexed type against its owner.
- Prove older events cannot overwrite newer documents.
- Rebuild every index from source snapshots and reconcile it.
- Verify alias promotion and rollback without partial exposure.
- Test Brazilian Portuguese analyzers, accents, exact models, punctuation, units, synonyms, and typo boundaries.
- Verify every governed filter, multi-select rule, range, missing state, and facet count.
- Verify deterministic sorting and cursor continuation.
- Test Product/Variant collapse and explicit Variant queries.
- Exercise stale price, stale inventory, removed Product, permission revocation, partial group, facet timeout, and full Search outage states.
- Prove public, customer-private, and workforce index and telemetry separation.
- Run relevance judgments and critical exact-match guardrails for every ranking change.
- Test keyboard, screen reader, focus, announcements, zoom, mobile filters, result updates, and reduced-motion behavior through the Search Design System contracts.

## Consequences

### Benefits

- Search can scale and degrade independently from commerce authority.
- OpenSearch supports the required lexical, faceting, analyzer, and relevance depth.
- Stable source and schema versions make index state explainable and rebuildable.
- Lexical-first launch limits premature AI complexity.
- Governed filters and visible interpretation preserve user control.

### Costs and risks

- OpenSearch adds a distributed stateful platform and specialist operational knowledge.
- Source projections and mixed-freshness signals require disciplined contracts.
- Relevance quality needs continuous judgments and governance.
- Dynamic facets and federated groups require resource budgets.
- Semantic retrieval can introduce cost and nondeterminism if adopted without gates.

## References

- [Search Architecture](../02-information-architecture/05-search.md)
- [Filtering](../02-information-architecture/06-filtering.md)
- [Product Taxonomy](../02-information-architecture/04-taxonomy.md)
- [Search and Filtering Components](../04-design-system/14-search-and-filtering-components.md)
- [System Context and Runtime Topology](04-system-context-and-runtime-topology.md)
- [Catalog and Taxonomy Architecture](14-catalog-and-taxonomy-architecture.md)
- [Authorization and Policy Enforcement](13-authorization-and-policy-enforcement.md)
- [ADR-0001: Search-First Information Architecture](../adrs/ADR-0001-search-first-information-architecture.md)
- [ADR-0021: Managed OpenSearch and Lexical-First Retrieval](../adrs/ADR-0021-managed-opensearch-and-lexical-first-retrieval.md)
- [OpenSearch keyword search](https://docs.opensearch.org/latest/search-plugins/keyword-search/)
- [OpenSearch faceted search](https://docs.opensearch.org/latest/tutorials/faceted-search/)
- [OpenSearch hybrid search](https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/index/)

