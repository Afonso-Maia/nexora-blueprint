# Page and Template Engineering Mapping

**Status:** Approved

## Purpose

This document proves that all 89 canonical pages and nine approved templates are consumable by the Phase 4 architecture. It adds implementation profiles without changing page identity, archetype, ownership, hierarchy, or Design System mapping.

The canonical page names and pattern families remain in the [Page-to-System Mapping](../04-design-system/26-page-to-system-mapping.md). The identifiers below are the join key.

## Universal engineering contract

Every page receives:

- the approved application shell, semantic navigation, responsive continuity, themes, localization, and host-owned system states;
- server-enforced authorization with permission-aware presentation;
- typed BFF contracts and source-owned domain reads or commands;
- classified caching and restoration behavior;
- WCAG 2.2 AA engineering gates;
- performance budgets, correlated telemetry, privacy controls, and safe degraded behavior;
- versioned contracts and the applicable architecture quality gates.

No page stores authoritative lifecycle state in the browser or treats a BFF, cache, AI output, Search index, Account projection, Admin view, Audit record, or telemetry signal as source truth.

## Template implementation profiles

| Template | Default rendering and state | Engineering emphasis |
| --- | --- | --- |
| Hub | Server-composed public/private read with bounded personalization | Fast orientation, federated continuation, graceful optional-module loss |
| Results/List | Server entry plus URL-owned query/filter state and progressive client refinement | Governed Search/filter semantics, pagination, freshness, empty/error recovery |
| Detail | Canonical server read with variant or resource state in stable URL/contract | Source facts, evidence, availability, safe action handoff |
| Workspace | Server bootstrap plus durable server object and bounded optimistic interaction | Restoration, conflicts, recalculation, explicit save/share/effect outcomes |
| Transaction | No-store private orchestration with durable server operation | Idempotency, validation, assurance, partial failure, authoritative outcome |
| Content/Document | Cacheable governed revision with effective-date metadata | Accessibility, localization, policy authority, safe continuations |
| Recovery | Minimal no-store state with non-disclosing responses | Security, focus management, retry and safe destination |
| Admin Queue | No-store workforce query through Admin BFF and source gateway | Capability filtering, scoped pagination, freshness, exports/bulk work |
| Admin Resource Workspace | No-store source-owned detail and governed command surface | Assurance, concurrency, preview/impact, reason, approval, Audit correlation |

## Complete canonical coverage

Each ID occurs exactly once in this mapping.

| Template | Count | Canonical page IDs |
| --- | ---: | --- |
| Hub | 9 | STF-001, STF-007, ACC-001, PCB-001, SUP-001, SUP-003, SUP-004, LEG-001, ADM-001 |
| Results/List | 13 | STF-002, STF-003, STF-004, STF-005, DSC-001, DSC-002, ACC-002, ACC-004, ACC-005, ACC-006, ACC-007, PCB-003, SUP-006 |
| Detail | 4 | EVA-001, ACC-003, PCB-004, SUP-007 |
| Workspace | 4 | EVA-002, ACC-008, PCB-002, AIS-001 |
| Transaction | 9 | PUR-001, PUR-002, PUR-003, SUP-005, AUT-001, AUT-002, AUT-004, AUT-005, AUT-006 |
| Content/Document | 11 | STF-006, SUP-002, INF-001, LEG-002, LEG-003, LEG-004, LEG-005, LEG-006, LEG-007, LEG-008, LEG-009 |
| Recovery | 6 | AUT-003, SYS-001, SYS-002, SYS-003, SYS-004, SYS-005 |
| Admin Queue | 15 | ADM-002, ADM-004, ADM-006, ADM-008, ADM-010, ADM-012, ADM-014, ADM-016, ADM-018, ADM-020, ADM-022, ADM-024, ADM-026, ADM-029, ADM-030 |
| Admin Resource Workspace | 18 | ADM-003, ADM-005, ADM-007, ADM-009, ADM-011, ADM-013, ADM-015, ADM-017, ADM-019, ADM-021, ADM-023, ADM-025, ADM-027, ADM-028, ADM-031, ADM-032, ADM-033, ADM-034 |
| **Total** | **89** | **All canonical pages** |

## Surface-family routing

| Prefix | Experience/runtime | Principal source modules and projections |
| --- | --- | --- |
| STF | Customer application/BFF | Catalog, Search, Pricing, Inventory, governed content |
| DSC | Customer application/BFF plus Search capability | Search index projection; Catalog/Pricing/Inventory evidence |
| EVA | Customer application/BFF | Catalog, Compatibility, Pricing, Inventory, Comparison state |
| PUR | Customer application/BFF plus core/workers | Purchase, Pricing, Inventory, Payments, Orders |
| ACC | Customer application/BFF | Federated Account composition from Orders, Support, Identity, Purchase, Notifications |
| PCB | Customer application/BFF | PC Builder, Compatibility, Catalog, Pricing, Inventory |
| AIS | Customer application/BFF plus AI orchestration | Governed tools over source-owned evidence; no AI authority |
| SUP | Customer application/BFF | Support with Orders, Identity, Catalog, and provider coordination |
| AUT | Customer application/BFF plus managed identity | Identity/Security and source authorization |
| INF/LEG | Customer application/BFF | Governed content/policy revisions and source continuations |
| SYS | Host application/BFF | Operation-aware state from the initiating host and source outcome |
| ADM | Separate Admin application/BFF | Capability shell and governed gateways to each source owner |

## Consequential action routing

- Product discovery and evaluation read governed projections; Cart and Checkout revalidate source truth.
- Comparison remains one bounded customer workspace; PC Builder remains one durable engineering workspace.
- Checkout is the single purchase orchestrator and Orders becomes lifecycle authority only at the approved commit.
- Account composes federated source objects; it does not copy their lifecycle authority.
- Support owns Case communication and obligations while remedies remain source commands.
- Admin presents capabilities and coordinates work; every source enforces policy and records its outcome.
- AI can propose and explain but cannot silently commit an action.

## Mechanical validation

Validation compares identifiers in this document with the approved Page Inventory and Design System mapping:

1. the sets must be identical;
2. each identifier must appear once in the coverage table;
3. each template count must equal its approved total;
4. the total must equal 89;
5. every template must have an implementation profile;
6. no routing may change approved ownership.

## Consequences

- Wireframes and implementation work can join product, Design System, and engineering contracts by stable page ID.
- Shared template behavior remains visible while source routing stays explicit.
- A future canonical page change requires synchronized validation in Phase 2B, Phase 3, and Phase 4.

## References

- [Page Inventory](../03-product-structure/01-page-inventory.md)
- [Page Relationships and Ownership](../03-product-structure/02-page-relationships-and-ownership.md)
- [Page Templates](../04-design-system/25-page-templates.md)
- [Page-to-System Mapping](../04-design-system/26-page-to-system-mapping.md)
- [Administrative Dashboard Architecture](23-administrative-dashboard-application-architecture.md)
