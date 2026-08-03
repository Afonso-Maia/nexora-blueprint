# Design System Implementation and Adoption

**Status:** Approved

## Decision

Deliver the Design System contract-first and adopt it through real reference compositions, not through an exhaustive component library built in isolation.

1. I0: token pipeline, themes, typography, layout primitives, focus, motion, icons, form semantics, state components, accessibility harness, and contribution path.
2. I1: Hub, Results/List, Detail, and Content/Document reference compositions.
3. I2–I3: Workspace and Transaction compositions, commercial and operation-aware states.
4. I4–I5: private Account, Support, Recovery, and communication patterns.
5. I8: Admin Queue and Admin Resource Workspace compositions, density, bulk, approval, and Audit patterns.

Components become supported only after contract, theme, responsive, localization, accessibility, visual, and integration evidence required by the approved lifecycle. Domain-specific semantics remain with their owners.

Third-party components require accessibility equivalence, token integration, replaceability, ownership, and an exit plan before adoption.

## Gate

An increment cannot duplicate a supported semantic component without an approved exception. The system cannot block an increment merely to complete unrelated inventory.

## References

- [Component Lifecycle and Quality](../04-design-system/24-component-lifecycle-and-quality.md)
- [Page Templates](../04-design-system/25-page-templates.md)
