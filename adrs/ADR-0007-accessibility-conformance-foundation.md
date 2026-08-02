# ADR-0007: Accessibility Conformance Foundation

- **Status:** Accepted
- **Date:** 2026-08-02

## Context

Nexora spans discovery, technical comparison, transactions, post-purchase activity, Support, authentication, PC Builder, and high-consequence Admin operations. Component-level accessibility guidance without one conformance boundary would leave page composition, dynamic state, responsive behavior, and third-party integration inconsistent.

The target must be explicit before component and pattern specifications are approved.

## Decision

Adopt WCAG 2.2 Level AA as the minimum product-wide conformance target.

Apply enhanced internal requirements to focus appearance, effective target size, critical commerce and operational facts, authentication, and high-consequence work. Accessibility stewardship has blocking review authority.

Conformance covers all approved pages, archetypes, themes, densities, responsive states, host-owned system states, and primary Brazilian Portuguese content.

Automated checks are necessary but insufficient. Critical journeys require manual keyboard, assistive-technology, zoom, reflow, contrast, motion, and user validation before production readiness.

## Consequences

### Benefits

- One testable baseline governs all products.
- Critical tasks receive proportional safeguards.
- Accessibility requirements attach to components and page composition.
- Responsive and Admin specialization cannot become accessibility exceptions.

### Costs and risks

- Manual testing requires sustained expertise and representative environments.
- Complex workspaces need extensive keyboard and screen-reader design.
- Third-party integrations may need alternative paths.
- Enhanced internal requirements exceed minimum AA in selected areas.

## Governance

- Blocker and High accessibility defects prevent approval for affected supported use.
- Exceptions require impact, equivalent path, owner, remediation date, and Accessibility approval.
- Disclosure does not make an avoidable barrier acceptable.
- Applicable legal requirements may add obligations but cannot lower the baseline.
- A material change to WCAG version, target level, scope, or blocking authority requires a superseding ADR.

## References

- [Accessibility Foundations](../04-design-system/10-accessibility-foundations.md)
- [Design System Mission and Governance](../04-design-system/02-mission-principles-and-governance.md)
- [Page-Level Information Hierarchy](../03-product-structure/03-information-hierarchy.md)
- [Error, Empty, Loading, Offline, and Degraded States](../03-product-structure/08-error-empty-and-degraded-states.md)
