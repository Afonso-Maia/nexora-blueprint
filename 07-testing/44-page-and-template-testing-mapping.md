# Page and Template Testing Mapping

**Status:** Approved

## Purpose

This document proves that all 89 canonical pages and nine approved templates consume the Phase 5 strategy without changing page identity, archetype, ownership, or implementation routing.

## Universal page evidence

Every page receives applicable:

- semantic component/template, light/dark, responsive, density, pt-BR, keyboard, focus, screen-reader, zoom/reflow, reduced-motion, and forced-color evidence;
- authentication, authorization, privacy, non-disclosure, source freshness, and telemetry checks;
- loading, empty, validation, unavailable, partial, stale, offline, conflict, pending, indeterminate, confirmed, and recovery states;
- API/BFF/source contract and applicable module evidence;
- browser/device/network coverage by the versioned support register; and
- traceability to owner, risk, requirements, tests, defects, and release evidence.

Page presence does not require one browser journey per page.

## Template evidence profiles

| Template | Primary evidence emphasis |
| --- | --- |
| Hub | Federated/partial composition, prioritization, optional-module loss, continuation |
| Results/List | Query/filter URL state, ranking/facets, pagination, selection, no-result/stale recovery |
| Detail | Canonical identity, source evidence, partial facts, action eligibility and handoff |
| Workspace | Durable revision, restoration, conflict, recalculation, save/share/effect outcome |
| Transaction | Validation, assurance, idempotency, ambiguity, commitment, receipt and recovery |
| Content/Document | Revision/effective date, localization, accessibility, media and policy authority |
| Recovery | Non-disclosure, focus, safe destination, retry safety and no dead end |
| Admin Queue | Capability/scope, freshness, pagination, selection, bulk/export and empty work |
| Admin Resource Workspace | Field restriction, baseline conflict, reason, impact, approval, assurance and Audit |

## Complete canonical coverage

Each page ID appears exactly once.

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

## Surface-specific evidence

| Surface | Required specialization |
| --- | --- |
| Storefront/Discovery/Evaluation | Search, taxonomy, filters, product facts, Comparison, price/inventory freshness, Compatibility |
| Purchase | Cart persistence, unified Checkout, payment ambiguity, commercial snapshot, at-most-one Order |
| Account | Federated source versions, guest claim, assurance, restrictions, privacy and notification continuity |
| PC Builder/AI | Durable Builds, recalculation, deterministic Compatibility, grounding, provenance, safety and optionality |
| Support | Content applicability, self-service, typed Cases, evidence, obligations, remedies and provider work |
| Authentication | Enumeration resistance, session/assurance lifecycle, recovery and validated continuation |
| Informational/Legal | Governed revision, effective dates, localization, accessibility and source continuations |
| System/Utility | Host-owned operation truth, non-disclosure, offline/degraded recovery and safe retry |
| Admin | Capability/scope/field restriction, assurance, approval, bulk/export, source effect and Audit |

## Mechanical validation

Validation compares this table with the approved Page Inventory, Design System mapping, and Engineering mapping:

1. identifier sets are identical;
2. every identifier occurs once;
3. template counts match;
4. total equals 89;
5. all nine templates have evidence profiles; and
6. no mapping changes owner, archetype, pattern, or runtime.

## References

- [Page Inventory](../03-product-structure/01-page-inventory.md)
- [Page-to-System Mapping](../04-design-system/26-page-to-system-mapping.md)
- [Engineering Mapping](../06-engineering/36-page-and-template-engineering-mapping.md)
