# Phase 4 — Engineering Architecture and Implementation Planning

**Status:** In progress

Phase 4 defines the implementation architecture and engineering contracts needed to build Nexora without redefining approved product, domain, state, permission, accessibility, or Design System semantics.

It may establish testability, architectural quality gates, and deployment design, but detailed quality strategy and delivery sequencing remain in the later Testing and Delivery Roadmap phases. Production implementation is outside this phase unless explicitly authorized.

## Approved decisions

1. [System Shape and Deployment Boundary](01-system-shape-and-deployment-boundary.md) — approved; modular authoritative core with selective independent deployment
2. [Mission, Principles, Scope, and Governance](02-mission-principles-scope-and-governance.md) — approved; architecture-led governance with evidence-based completion gates
3. [Repository and Application Organization](03-repository-and-application-organization.md) — approved; governed monorepo with independently buildable projects and enforced boundaries
4. [System Context and Runtime Topology](04-system-context-and-runtime-topology.md) — approved; trust-segmented customer, Admin, core, worker, Search, and AI runtime roles
5. [Frontend Architecture](05-frontend-architecture.md) — approved; TypeScript, React, and Next.js App Router with server-first composition
6. [Design System Implementation Architecture](06-design-system-implementation-architecture.md) — approved; DTCG tokens, generated CSS contracts, layered CSS Modules, governed React packages, and isolated reference compositions
7. [Rendering and Navigation Strategy](07-rendering-and-navigation-strategy.md) — approved; explicit mixed rendering, governed caching, canonical URL state, and accessible navigation continuity
8. [State Ownership and Restoration](08-state-ownership-and-restoration.md) — approved; single-owner state classes, bounded client projections, explicit operations, and conflict-safe restoration
9. [API and Backend-for-Frontend Strategy](09-api-and-bff-strategy.md) — approved; co-deployed experience BFFs, private OpenAPI HTTP contracts, typed problems, and explicit operations
10. [Domain Modules and Transaction Boundaries](10-domain-modules-and-transaction-boundaries.md) — approved; ledger-aligned authorities, owner-led transactions, governed collaboration, and extraction triggers
11. [Data Ownership, Storage, and Migration](11-data-ownership-storage-and-migration.md) — approved; PostgreSQL schema isolation, UUIDv7 identity, explicit consistency, online migrations, and recoverable lifecycle
12. [Identity, Sessions, Authentication, and Assurance](12-identity-sessions-authentication-and-assurance.md) — approved; managed standards-based identity, opaque BFF sessions, passkeys, separated workforce access, and source-owned assurance enforcement
13. [Authorization and Policy Enforcement](13-authorization-and-policy-enforcement.md) — approved; source-enforced hybrid authorization with a shared deterministic kernel, versioned policy projections, and fail-closed consequential decisions
14. [Catalog and Taxonomy Architecture](14-catalog-and-taxonomy-architecture.md) — approved; stable product and variant identity, typed governed attributes, immutable published revisions, quarantined ingestion, and rebuildable projections
15. [Search Indexing, Ranking, Filtering, and Query](15-search-indexing-ranking-filtering-and-query.md) — approved; managed OpenSearch, source-versioned indexes, Brazilian Portuguese lexical retrieval, governed facets and ranking, and evidence-gated semantic search

## Architectural inputs

Phase 4 consumes rather than redefines:

- The approved [Information Discovery Architecture](../02-information-architecture/README.md)
- The complete [Page Inventory](../03-product-structure/01-page-inventory.md), [relationship and ownership model](../03-product-structure/02-page-relationships-and-ownership.md), and [information hierarchy](../03-product-structure/03-information-hierarchy.md)
- The approved [Roles and Permissions](../03-product-structure/07-roles-and-permissions.md), [system-state architecture](../03-product-structure/08-error-empty-and-degraded-states.md), and [Scalability Guidelines](../03-product-structure/09-scalability-guidelines.md)
- The approved [Design System architecture](../04-design-system/01-system-architecture.md), [accessibility foundation](../04-design-system/10-accessibility-foundations.md), [page templates](../04-design-system/25-page-templates.md), and complete [page-to-system mapping](../04-design-system/26-page-to-system-mapping.md)

No language, framework, database, cloud, queue, or hosting provider is approved by the initial architecture decision.
