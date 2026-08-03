# ADR-0008: Modular Authoritative Core and Selective Deployment Boundaries

- **Status:** Accepted
- **Date:** 2026-08-02

## Context

Nexora needs an implementation architecture that preserves explicit source truth, transactional commerce behavior, scoped authorization, partial-failure semantics, and future scalability while remaining practical for a small initial engineering organization.

Two viable directions were evaluated:

1. A modular monolith for the authoritative commerce core, with selective independent deployment where operationally justified
2. Independently deployed services aligned to major commerce and operational domains from the beginning

Distributed services provide strong physical isolation and independent scaling, but introduce distributed consistency, contract coordination, platform operations, local-development, observability, and incident-response costs across critical commerce paths.

## Decision

Adopt a modular authoritative core with the directional system shape:

`Experience applications → BFF and application layer → governed domain modules → platform adapters → infrastructure`

The authoritative commerce core begins as a modular monolith. Modules retain explicit data ownership, transaction boundaries, internal contracts, authorization enforcement, and observable operation outcomes. Co-deployment does not permit shared authority or direct access to another module's private storage.

Search infrastructure, AI orchestration, media processing, notifications, long-running workflow workers, and selected external-provider adapters are candidates for independent deployment. Each requires a separate boundary decision.

A separate deployment must be justified by a durable distinction in data ownership, transaction boundary, scaling profile, reliability or degradation behavior, security boundary, deployment independence, external integration, or team accountability. A product-domain or UI-area name alone does not justify a service.

## Consequences

### Benefits

- Critical commerce transactions remain understandable and locally enforceable.
- Domain contracts and owned data establish boundaries without premature operational distribution.
- The initial team carries a smaller deployment and diagnostics burden.
- Capabilities with distinct scale, safety, latency, provider, or failure profiles can evolve independently.
- Explicit contracts preserve future extraction options without making extraction a goal.

### Costs and risks

- Automated architecture enforcement is necessary to prevent boundary erosion.
- Shared infrastructure may obscure unauthorized coupling.
- Later extraction remains a deliberate migration with contract and operational costs.
- Cross-boundary workflows still require idempotency, reconciliation, and explicit eventual consistency.

## Governance

- Domain authority follows the approved ownership ledger.
- Source modules enforce authorization; BFF and UI adaptation are not enforcement.
- Cross-module storage access is prohibited.
- Consequential operations declare transaction or workflow ownership, idempotency, failure semantics, and correlation.
- Independently deployed capabilities cannot become competing sources of domain truth.
- A material change to the default deployment strategy or boundary threshold requires a superseding ADR.

## References

- [System Shape and Deployment Boundary](../06-engineering/01-system-shape-and-deployment-boundary.md)
- [Page Relationships and Domain Ownership](../03-product-structure/02-page-relationships-and-ownership.md)
- [Roles and Permissions](../03-product-structure/07-roles-and-permissions.md)
- [Scalability Guidelines](../03-product-structure/09-scalability-guidelines.md)
- [ADR-0002: Shared Compatibility Domain](ADR-0002-shared-compatibility-domain.md)
- [ADR-0003: Scoped Capability-Based Access Control](ADR-0003-scoped-capability-based-access-control.md)
