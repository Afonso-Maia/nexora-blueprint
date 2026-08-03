# Catalog and Taxonomy Architecture

**Status:** Approved

## Purpose

This document defines the engineering model for product identity, sellable variants, categories, brands, governed attributes, publication, supplier ingestion, provenance, lifecycle, read models, and downstream change propagation.

It implements the approved [Product Taxonomy](../02-information-architecture/04-taxonomy.md) and [Filtering](../02-information-architecture/06-filtering.md) without moving price, inventory, Compatibility rules, merchandising, ranking, reviews, or media processing into Catalog.

## Decision

Use one authoritative, versioned Catalog module with:

- Stable Product, Variant, Category, Brand, and Attribute Definition identities
- Exactly one canonical category per Product
- Typed and unit-aware governed attributes
- Immutable published Catalog revisions
- Separate mutable drafts and published read models
- Explicit impact analysis, approval, activation, rollback, and migration
- Quarantined supplier ingestion followed by governed normalization
- Provenance at the field and value level
- Transactional Catalog change recording plus outbox events
- Rebuildable downstream projections for storefront, Search, Compatibility, PC Builder, Admin, Support, Marketing, and AI

The initial Catalog remains part of the authoritative modular core and uses its private PostgreSQL schema. It is not an independently deployed product-information service.

## Viable approaches considered

### Governed relational Catalog with published revisions

Products and taxonomy use typed relational aggregates, versioned definitions, controlled JSON only for bounded staging or extension, and immutable published revisions.

This is approved because category membership, variant uniqueness, attribute type safety, governance, historical references, and downstream impact require strong constraints and transactions.

### Flexible document-first product records

Each product could store a supplier-shaped document with dynamic fields and allow downstream systems to interpret it.

This is operationally quick for ingestion but would make filtering, comparison, Compatibility, migrations, and provenance inconsistent. It is not approved as Catalog authority. Raw documents remain permitted only in bounded ingestion staging with retention and schema controls.

## Ownership boundaries

### Catalog owns

- Product identity, naming, descriptive facts, and lifecycle
- Product-to-variant structure
- Canonical category assignment
- Category hierarchy and lifecycle
- Brand identity, aliases, and governed relationships
- Attribute definitions, versions, data types, units, allowed values, applicability, and Catalog display metadata
- Product and variant attribute values
- Governed Compatibility-input facts
- Catalog publication state and published revisions
- Product media references and intended semantic roles
- Supplier-to-Catalog source mappings and normalization provenance
- Product successor, replacement, and supersession relationships

### Other owners retain

- Pricing owns authoritative sell price, price rules, and quotes.
- Inventory owns stock, reservations, and availability.
- Compatibility owns deterministic rules, evaluation, severity, and explanations.
- Marketing owns collections, campaigns, merchandising membership, and editorial promotion.
- Discovery owns Search query behavior, filter ordering and decision-value policy, ranking, suggestions, and index operation.
- Reviews owns customer review records and moderation.
- Purchase owns Cart, Checkout, and orders.
- Media processing owns binary validation, transformation, and derivative generation.
- Legal owns regulated policy meaning and required disclosures.
- AI consumes published governed facts and cannot write Catalog truth.

Catalog can expose references and joined experience projections but does not absorb these authorities.

## Core model

### Product

A Product is the stable customer-understandable product family or model.

It contains:

- Stable internal identifier
- Human-facing reference
- Brand reference
- Exactly one canonical category reference
- Product type within the governed category model
- Localized name, short description, and factual content references
- Lifecycle and publication state
- Attribute-value set
- Variant identities
- Media-role references
- Provenance and revision
- Successor or replacement relationships

A Product identity survives price changes, stock changes, content corrections, discontinuation, and URL slug changes.

### Variant

A Variant is a distinct selectable sellable configuration under one Product when customer choice or fulfillment identity differs, such as color, capacity, memory configuration, or regional model.

It contains:

- Stable internal identifier
- Owning Product
- Merchant SKU or other governed operational reference
- Variant-defining attribute values
- Variant-specific factual overrides explicitly allowed by the definition
- Lifecycle and publication eligibility
- External source mappings

Pricing, Inventory, Purchase, and Fulfillment reference the stable sellable Variant identity. A Product with no customer-visible choice still has an explicit sellable identity rather than making downstream systems infer one.

Variant attributes cannot contradict Product facts silently. The Attribute Definition declares whether a value is product-level, variant-level, or eligible for an explicit variant override.

### Category

A Category is a stable node in the canonical customer taxonomy.

It contains:

- Stable identifier
- Parent identifier or approved top-level status
- Localized name and slug
- Lifecycle
- Eligible Product and Variant attribute definitions
- Discovery orientation metadata
- Comparison and specification-group references
- Hierarchy and definition revision
- Redirect or successor metadata

The hierarchy is a directed acyclic tree for canonical assignment. Each non-top-level category has exactly one canonical parent. Alternate browsing relationships belong to collections, navigation, related-category, or Discovery configuration and do not create multiple canonical parents.

The approved initial top-level categories remain unchanged. Creating, merging, or materially redefining a top-level category requires Blueprint governance and an ADR.

### Brand

A Brand has stable identity independent of spelling, supplier representation, or URL slug.

It contains canonical naming, localized public content references, aliases, lifecycle, source mappings, and merge or successor evidence. A Brand does not become a category parent.

Brand merges preserve old identifiers as governed aliases or successors and trigger impact analysis for products, URLs, Search, filters, content, orders, Support, and reporting.

### Attribute Definition

An Attribute Definition is a reusable semantic contract, not a display label.

It declares:

- Stable identifier and version
- Canonical semantic name
- Value type
- Cardinality and nullability
- Canonical unit and compatible display units
- Precision, scale, bounds, and normalization
- Enumerated values or controlled vocabulary where applicable
- Product-level, variant-level, or override placement
- Applicable categories
- Comparison and specification behavior
- Candidate filtering and Search contribution metadata
- Compatibility-input classification
- Localization keys and formatting rules
- Validation and migration behavior
- Lifecycle and deprecation successor

Supported value families initially include text, integer, exact decimal, boolean, controlled enumeration, measurement, date, and stable reference. Complex structures require a registered schema rather than arbitrary nested JSON.

Free-form supplier values cannot become governed filter, comparison, or Compatibility facts until normalized into an active definition version.

## Attribute values

Every governed value stores:

- Attribute definition identifier and version
- Owning Product or Variant
- Typed canonical value
- Canonical unit where relevant
- Provenance
- Validation status
- Effective Catalog revision

Display strings are derived through localization and formatting. They are not authoritative values.

Unknown, not applicable, not supplied, pending verification, and intentionally withheld are distinct states. Empty strings and sentinel numbers are prohibited.

Multi-value attributes preserve set semantics and stable controlled-value identifiers. Ordering is stored only when the attribute definition declares it meaningful.

## Units and normalization

Measurements store a canonical exact value and unit from the governed definition. Supplier input converts through versioned normalization rules with recorded source value and transformation.

- Binary floating point is prohibited for governed measurements.
- Unit conversion and rounding are deterministic and versioned.
- Brazilian Portuguese display follows the localization architecture.
- A display-unit change does not rewrite the canonical fact.
- A semantic unit change that alters meaning requires a new definition version and migration.

Normalization dictionaries map supplier values, abbreviations, spelling, and legacy codes to governed values. Ambiguous mappings enter review rather than choosing silently.

## Category applicability

Categories determine eligible attributes. Applicability is resolved into an explicit versioned category schema.

Inheritance from parent categories may reduce administration, but activation materializes the effective set so behavior is inspectable and reproducible. A child can add, narrow, or explicitly suppress an inherited attribute only through a validated rule.

Each effective entry declares:

- Required, recommended, or optional completeness
- Product or Variant placement
- Comparison group and order
- Candidate filter role
- Compatibility criticality
- Publication requirement

The active result set determines useful filter values at query time. Catalog eligibility alone does not force a filter to appear.

## Product and variant invariants

- Every published Product has exactly one active canonical category.
- Every published Variant belongs to one Product.
- Every sellable reference resolves to one active or historically retained Variant.
- Variant-defining combinations are unique within a Product.
- Required attributes for the effective category schema are present or have an explicitly permitted incomplete state.
- Attribute values conform to the referenced definition version.
- A published Product references only eligible Brand, Category, Attribute, and media-role records.
- Products cannot become purchasable through Catalog state alone.
- Discontinued and retired records preserve historical references.
- Replacement relationships are explicit and acyclic.

Database constraints enforce local structural invariants. Domain validation enforces semantic and cross-aggregate rules.

## Draft and publication model

Mutable work occurs in a draft separate from the currently published revision.

The workflow is:

`Draft → Validate → Impact analysis → Review → Approve → Publish → Observe`

A rejected or withdrawn draft does not alter the published representation.

Publication:

1. Revalidates permissions, assurance, segregation, draft revision, references, and source facts.
2. Creates an immutable Catalog revision.
3. Atomically switches the Catalog record's published pointer.
4. Records an outbox change with changed fields and affected downstream contracts.
5. Returns the committed revision and propagation state.

Publication success means Catalog committed the revision; it does not falsely claim Search, cache, Compatibility projections, or storefront rendering have refreshed.

Rollback republishes a known valid prior representation as a new revision. It does not delete history or move a pointer invisibly.

Minor corrections and bulk changes use the same validation and publication contracts. Bulk operation does not bypass per-record invariants.

## Versioning semantics

Distinguish:

- Aggregate revision for optimistic concurrency
- Published Catalog revision for customer-facing facts
- Attribute Definition version for semantic interpretation
- Category schema version for effective applicability
- Normalization rule version for ingestion provenance
- Projection version for downstream freshness

A breaking Attribute Definition change creates a new version. Breaking changes include value-type, semantic meaning, canonical unit, controlled-value identity, cardinality, or Compatibility interpretation changes.

Label, help text, or non-semantic display-order changes may remain compatible when governance confirms no consumer meaning changes.

Historical published Products retain the definition versions needed to interpret them. Migrations are explicit and do not reinterpret old order, build, Support, or audit evidence silently.

## Taxonomy changes

### Move

Moving a Category validates:

- No cycle
- No top-level governance violation
- Product and child-category effects
- Effective attribute schema changes
- URL and navigation successors
- Search and filter impact
- Compatibility coverage
- Marketing and content references
- Active drafts and scheduled publication

### Merge

A merge names one surviving Category or Brand identity, maps predecessors, defines Product reassignment, preserves redirects and historical references, and publishes reconciliation evidence.

### Split

A split creates new stable categories and an explicit governed classification plan. Products are not reassigned by a hidden heuristic. Ambiguous products remain in a visible migration queue.

### Retirement

Retirement is blocked while unresolved published assignments or required references remain unless the approved plan supplies successors and disposition.

Slugs are mutable presentation identifiers. Prior public slugs produce governed permanent redirects when safe; ambiguous or restricted Admin references use explicit recovery rather than guessing.

## Impact analysis

Before activation, Catalog calculates a versioned impact report covering:

- Products and Variants requiring migration
- Required-value completeness
- Search documents, filters, facets, and URLs
- Comparison tables and specification groups
- Compatibility rules and PC Builder inputs
- Marketing collections and content
- Purchase, order, Wishlist, Support, and notification references
- Admin saved views, exports, and scheduled work
- AI grounding schemas and evaluation fixtures
- Localization and accessibility content

Each affected owner returns acknowledged, blocking, warning, or not-applicable status through a governed contract. Catalog owns the change decision but cannot override a genuine downstream invariant owned by Compatibility, Purchase, Legal, Security, or another authority.

Impact counts declare source revision and freshness. Stale counts are not presented as exact.

## Supplier and source ingestion

External feeds, spreadsheets, and provider APIs enter an isolated ingestion pipeline:

`Receive → Authenticate → Quarantine → Parse → Map → Normalize → Validate → Match → Review or propose → Publish`

Raw source records:

- Are untrusted
- Have provider, feed, schema, receipt, checksum, and retention metadata
- Are size and content bounded
- Cannot directly update published Catalog records
- Cannot define new categories, attributes, units, brands, or controlled values

Matching uses explicit provider mappings and governed identifiers. Fuzzy matching can propose a candidate but cannot merge or overwrite Product identity autonomously.

Repeated ingestion is idempotent by provider, source record, source version, and content identity. Corrections create traceable proposals.

Malware scanning and media validation occur before any referenced asset becomes eligible for processing or publication.

## Provenance and confidence

Each material fact can record:

- Source type and stable source reference
- Observed or supplied time
- Import and normalization operation
- Original bounded value or evidence reference
- Normalization rule version
- Human reviewer or automated process identity
- Verification status
- Superseded fact reference

Provenance does not make an external assertion authoritative by itself. Catalog publication establishes Nexora's governed fact.

Confidence can prioritize review but cannot weaken required validation or be shown as factual certainty without an approved presentation contract.

## Public read models

Catalog publishes purpose-built immutable projections rather than exposing draft aggregates or mutable persistence entities.

Initial projections include:

- Product identity and summary
- Product Detail facts
- Variant selection model
- Specification groups
- Comparison facts
- Category orientation and effective schema
- Brand identity
- Search indexing document
- Compatibility fact input
- PC Builder candidate facts
- Support product reference
- Admin worklist summary

Each projection declares:

- Owner and schema version
- Source Catalog revision
- Included and omitted fields
- Localization behavior
- Publication and lifecycle eligibility
- Freshness and rebuild contract
- Authorization classification

Pricing, Inventory, Reviews, Marketing, and Compatibility are composed at their owning application boundary. Catalog projections do not cache those values as Catalog truth.

## Events and downstream propagation

Catalog records source state and an outbox message in the same transaction.

Events describe committed facts such as:

- Product revision published
- Product lifecycle changed
- Variant changed
- Canonical category assignment changed
- Category schema activated
- Attribute definition activated or deprecated
- Brand merged
- Catalog record retired

Events carry stable identifiers, old and new revisions, changed-field classes, occurred time, schema version, correlation, and causation. Sensitive draft values and complete Product documents are not broadcast by default.

Consumers process idempotently, checkpoint revisions, expose lag, and reconcile against source snapshots. Event order is defined per aggregate; consumers must not infer global order.

## Consumer behavior

### Storefront and BFFs

Serve only published eligible revisions. If a composed dependency is unavailable, preserve Catalog facts and expose the approved partial price, inventory, review, Compatibility, or recommendation state.

### Search and filtering

Search indexes published Catalog documents. Facets use stable Attribute and controlled-value identifiers, not labels. Search reports index revision and partial coverage. Invalid or retired URL filter values are omitted with visible recovery.

### Compatibility and PC Builder

Compatibility consumes versioned governed facts. It rejects missing, unsupported, or stale critical inputs explicitly. Catalog never stores a supplier claim as a deterministic Compatibility outcome.

### Purchase and historical records

At commitment, Purchase uses current Catalog eligibility and records the immutable product/variant description snapshot required for order history. Historical order display does not change merely because Catalog content later changes.

### AI

AI receives published, provenance-aware Catalog projections with stable citations and revision. It cannot publish, normalize, infer permanent attribute values, or create taxonomy.

## Lifecycle and continuity

Catalog lifecycle is distinct from price, stock, purchasability, and discoverability.

At minimum, records distinguish draft, published, unpublished, discontinued, and retired semantics through governed transitions. Exact operational reasons and eligibility rules are versioned policy.

- Unpublished removes the current public Catalog representation without deleting history.
- Discontinued prevents new normal sell eligibility according to Purchase policy while preserving Product Detail and successor guidance where approved.
- Retired removes active operational use after dependencies are resolved but preserves durable references.
- Embargoed content is protected by publication time and authorization, not merely hidden navigation.

Deleted source data is not used when retention, order, Support, safety, recall, or audit obligations require a historical reference. Privacy-sensitive supplier contacts remain outside public Catalog projections.

## Concurrency and operations

Draft edits use strong ETags and field-aware conflict presentation.

- A stale draft cannot overwrite newer work.
- Locking can coordinate high-contention review but is not correctness authority.
- Publication and bulk operations use durable operation identities.
- Large migrations and imports are resumable, checkpointed, cancelable where safe, and reconcilable.
- Partial bulk outcomes identify each record without implying atomic success.

## Degraded behavior

- If draft infrastructure is unavailable, the current published revision continues serving.
- If Catalog reads fail, consumers may use an unexpired published projection only under its cache contract and must identify staleness where decision-relevant.
- Publication fails closed if impact, validation, authorization, or source commit cannot complete.
- Projection lag does not roll back the authoritative revision; it produces pending or partial propagation state.
- Missing price, inventory, review, Compatibility, or recommendation data does not cause Catalog to invent a substitute.
- Missing required Catalog facts block affected purchase or Compatibility operations according to their source policy.

## Security and authorization

Separate capabilities apply to:

- Discovering drafts
- Reading public and restricted fields
- Editing identity, content, classification, attributes, or media references
- Proposing taxonomy and Attribute Definition changes
- Reviewing and approving
- Publishing
- Bulk transition
- Exporting
- Administering normalization mappings

Attribute schema authority is distinct from ordinary Product editing. Authors cannot approve their own governed change where segregation policy prohibits it.

Supplier payloads, HTML, URLs, file metadata, and localized content are untrusted and sanitized at their output context. Embargoed, cost-sensitive, supplier-sensitive, and internal governance fields do not enter public projections, Search, AI context, or logs.

## Observability

Measure:

- Draft-to-publication lead time and rejection categories
- Attribute completeness and validation failures
- Unmapped and ambiguous supplier values
- Duplicate and identity-match proposals
- Publication success and downstream propagation lag
- Projection rebuild progress
- Search and Compatibility revision skew
- Category and Attribute Definition migration status
- Stale public projection use
- Bulk-operation and reconciliation outcomes

Diagnostics correlate source ingestion, draft, review, publication, event, and consumer revision without logging unrestricted Product payloads.

## Quality gates

Before release:

- Prove exactly one canonical category for every published Product.
- Prove category acyclicity, stable identity, and top-level ADR enforcement.
- Contract-test every Attribute value family, unit conversion, null state, controlled value, and definition version.
- Test Product/Variant uniqueness, override rules, lifecycle, successors, and historical references.
- Validate supplier quarantine, idempotency, provenance, ambiguous matching, and malformed content.
- Simulate taxonomy and schema impact across Search, filtering, Compatibility, PC Builder, Purchase, Marketing, Support, Admin, and AI.
- Verify publication atomicity and transactional outbox behavior.
- Rebuild every projection from authoritative Catalog revisions and compare checksums or invariants.
- Test stale, partial, unavailable, invalid filter, retired Product, redirect, and propagation-pending states.
- Verify authorization and field restrictions across drafts, previews, exports, Search, and AI.
- Test Brazilian Portuguese labels, units, long content, screen readers, keyboard operation, zoom, and responsive Admin workflows.

## Consequences

### Benefits

- One governed product model serves every experience.
- Typed attributes support trustworthy filtering, comparison, and Compatibility.
- Immutable revisions make publication, rollback, provenance, and historical interpretation explicit.
- Supplier variability is absorbed before it reaches customer-facing truth.
- Downstream systems can rebuild without accessing Catalog tables.

### Costs and risks

- Attribute and taxonomy governance requires migration tooling and cross-owner impact analysis.
- Draft and published models add storage and workflow complexity.
- Supplier normalization creates ongoing operational work.
- Projection lag must be visible and reconciled.
- Product-versus-Variant modeling requires disciplined onboarding rules.

## References

- [Product Taxonomy](../02-information-architecture/04-taxonomy.md)
- [Filtering](../02-information-architecture/06-filtering.md)
- [Scalability Guidelines](../03-product-structure/09-scalability-guidelines.md)
- [Domain Modules and Transaction Boundaries](10-domain-modules-and-transaction-boundaries.md)
- [Data Ownership, Storage, and Migration](11-data-ownership-storage-and-migration.md)
- [Authorization and Policy Enforcement](13-authorization-and-policy-enforcement.md)
- [ADR-0002: Shared Compatibility Domain](../adrs/ADR-0002-shared-compatibility-domain.md)
- [ADR-0020: Governed Versioned Catalog](../adrs/ADR-0020-governed-versioned-catalog.md)

