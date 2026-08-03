# Delivery-Increment Mapping to Pages and Templates

**Status:** Approved

## Purpose

This mapping assigns every canonical page exactly once to its primary delivery increment while preserving shared prerequisites, progressive exposure, and the approved page/template ownership.

## Universal delivery contract

Every mapped page consumes the approved Design System, source authority, authorization, host-owned states, responsive semantics, light/dark parity, WCAG 2.2 AA, pt-BR, security/privacy, telemetry, and risk-calibrated evidence. Primary increment does not imply that all page capability appears in one exposure step.

## Complete canonical coverage

| Increment | Count | Canonical page IDs |
| --- | ---: | --- |
| I0 — Delivery Enablement | 11 | AUT-001, AUT-002, AUT-003, AUT-004, AUT-005, AUT-006, SYS-001, SYS-002, SYS-003, SYS-004, SYS-005 |
| I1 — Governed Discovery | 33 | STF-001, STF-002, STF-003, STF-004, STF-005, STF-006, STF-007, DSC-001, DSC-002, INF-001, LEG-001, LEG-002, LEG-003, LEG-004, LEG-005, LEG-006, LEG-007, LEG-008, LEG-009, ADM-002, ADM-003, ADM-004, ADM-005, ADM-006, ADM-007, ADM-008, ADM-009, ADM-022, ADM-023, ADM-026, ADM-027, ADM-028, ADM-029 |
| I2 — Confident Evaluation | 10 | EVA-001, EVA-002, ADM-010, ADM-011, ADM-012, ADM-013, ADM-014, ADM-015, ADM-024, ADM-025 |
| I3 — Safe Purchase | 3 | PUR-001, PUR-002, PUR-003 |
| I4 — Post-Purchase Continuity | 12 | ACC-001, ACC-002, ACC-003, ACC-004, ACC-005, ACC-006, ACC-007, ACC-008, ADM-016, ADM-017, ADM-018, ADM-019 |
| I5 — Support Continuity | 9 | SUP-001, SUP-002, SUP-003, SUP-004, SUP-005, SUP-006, SUP-007, ADM-020, ADM-021 |
| I6 — PC Builder | 4 | PCB-001, PCB-002, PCB-003, PCB-004 |
| I7 — AI Guidance | 1 | AIS-001 |
| I8 — Governed Workforce Operations | 6 | ADM-001, ADM-030, ADM-031, ADM-032, ADM-033, ADM-034 |
| I9 — Launch Readiness and GA | 0 | No new canonical page; validates and exposes the approved capability set |
| **Total** | **89** | **Every approved canonical page exactly once** |

Admin pages are mapped to the source increment that first needs their governed operation. I8 completes the shared workforce control plane and cross-capability operations; it does not postpone source Admin work.

## Nine-template delivery coverage

| Template | First reference delivery | Continuing adoption |
| --- | --- | --- |
| Hub | I1 | I4, I5, I6, I8 |
| Results/List | I1 | I4, I5, I6 |
| Detail | I1/I2 | I4, I5, I6 |
| Workspace | I2 | I4, I6, I7 |
| Transaction | I0 identity recovery, then I3 | I5 and assurance flows |
| Content/Document | I1 | Policy and support revisions |
| Recovery | I0 | Every host increment |
| Admin Queue | I1 source slice | I2, I4, I5, I8 |
| Admin Resource Workspace | I1 source slice | I2, I4, I5, I8 |

All nine templates retain the approved engineering and testing profiles. “First reference” marks initial supported implementation, not exclusive ownership.

## Mechanical controls

- Page IDs must equal the approved inventory set with no omission or duplicate.
- The total must remain 89 and template set nine.
- A page move requires dependency, owner, evidence, launch, and roadmap impact review.
- New or changed canonical pages return to Product Structure governance before roadmap mapping.

## References

- [Page Inventory](../03-product-structure/01-page-inventory.md)
- [Page-to-System Mapping](../04-design-system/26-page-to-system-mapping.md)
- [Engineering Mapping](../06-engineering/36-page-and-template-engineering-mapping.md)
- [Testing Mapping](../07-testing/44-page-and-template-testing-mapping.md)
