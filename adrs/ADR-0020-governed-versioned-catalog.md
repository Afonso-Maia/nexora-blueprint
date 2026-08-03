# ADR-0020: Governed Versioned Catalog

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora's storefront, Search, filtering, comparison, Compatibility, PC Builder, Purchase, Support, Admin, and AI require one stable product and taxonomy model. Supplier data is heterogeneous, while filters and deterministic Compatibility require typed, versioned facts and explicit provenance.

Viable approaches included:

1. A governed relational Catalog with separate drafts, immutable published revisions, and rebuildable projections
2. Flexible document-first product records interpreted independently by downstream consumers
3. Independent Catalog models for storefront, Search, PC Builder, and operations

## Decision

Use one authoritative governed Catalog module in the modular core and its private PostgreSQL schema.

Model stable Product, Variant, Category, Brand, and Attribute Definition identities. Every Product has exactly one canonical category. Pricing, Inventory, Compatibility, Marketing, Reviews, Search, and media processing remain separate authorities.

Use typed, unit-aware, versioned attributes. Supplier records enter quarantine and normalization and cannot directly define or update governed public facts.

Keep mutable drafts separate from immutable published revisions. Publication atomically activates a Catalog revision and records an outbox event. Downstream consumers use purpose-built, versioned, rebuildable projections rather than Catalog tables or supplier documents.

Breaking taxonomy and attribute changes require impact analysis, migration, approval, propagation evidence, and preserved historical interpretation. New top-level categories continue to require an ADR.

## Consequences

### Benefits

- One stable model serves every approved product surface.
- Typed attributes support reliable filtering, comparison, and Compatibility.
- Publication and rollback are explicit and auditable.
- Supplier variation cannot silently redefine Nexora truth.
- Historical orders, builds, cases, and audit evidence remain interpretable.

### Costs and risks

- Draft, revision, migration, and projection tooling require investment.
- Taxonomy changes need cross-domain impact coordination.
- Supplier normalization creates an operational review queue.
- Downstream projection lag requires visible state and reconciliation.

## Governance

- Catalog owns product and governed attribute facts, not adjacent commerce authorities.
- Stable identifiers outlive labels, slugs, providers, and lifecycle changes.
- Free-form values cannot enter filters, comparison, or Compatibility without normalization.
- Published revisions are immutable; rollback creates a new publication.
- Consumers cannot read Catalog persistence directly.
- A material change to Catalog authority, Product/Variant identity, canonical category rules, attribute semantics, or publication model requires a superseding ADR.

## References

- [Catalog and Taxonomy Architecture](../06-engineering/14-catalog-and-taxonomy-architecture.md)
- [Product Taxonomy](../02-information-architecture/04-taxonomy.md)
- [Filtering](../02-information-architecture/06-filtering.md)
- [ADR-0002: Shared Compatibility Domain](ADR-0002-shared-compatibility-domain.md)
- [ADR-0017: PostgreSQL Modular Data Authority](ADR-0017-postgresql-data-authority.md)

