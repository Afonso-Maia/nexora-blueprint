# Publication Governance and Decision Rights

**Status:** Approved

## Decision

Use federated source ownership with one Publication Steward. Source owners retain authority over meaning, status, and approval; the steward owns publication architecture, metadata schemas, navigation rules, generated views, and release evidence. Contributors may improve presentation but cannot change approved truth through publication configuration.

Changes follow [Contributing](../CONTRIBUTING.md). Cross-cutting or expensive-to-reverse choices require an ADR; local reversible presentation choices require review by the steward and affected source owner. Conflicts return to the owning Blueprint phase. Exceptions are written, scoped, owned, time-bounded, linked to affected routes, and reviewed before expiry.

Provider, version, domain, date, analytics, retention, capacity, and service-level values remain controlled until their selection evidence is approved. A preview or installed dependency does not approve a controlled value.

## Validation

- Every publishable section and generated view has an accountable owner.
- Status or authority changes require source-owner approval.
- CI rejects unknown owners, statuses, expired exceptions, and publication metadata that conflicts with source content.

## References

- [Phase 7 Framing and Publication Architecture](01-framing-and-publication-architecture.md)
- [Product Decisions](../product-decisions/README.md)
