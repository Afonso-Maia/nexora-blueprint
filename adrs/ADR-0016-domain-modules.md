# ADR-0016: Ledger-Aligned Domain Modules and Owner-Led Transactions

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora has explicit page, fact, mutation, approval, and escalation ownership across commerce, customer, Support, Admin, Identity, Compatibility, and platform capabilities. Engineering must translate those boundaries without creating a service for every noun or one shared commerce model.

Viable approaches included:

1. Ledger-aligned modules inside the authoritative core
2. One broad Commerce module
3. Services aligned to every major business noun or UI area

## Decision

Implement ledger-aligned authoritative modules, composition and governance modules, and platform capabilities with explicit public contracts and private storage.

Each durable object and consequential operation has one authoritative module. Purchase remains authoritative for Cart, Checkout composition, and orders. Specialist Payments and Fulfillment state remains separate. Catalog owns compatibility inputs; Compatibility owns rules and evaluation. Marketing owns promotion definition, Pricing owns price effects, Purchase owns Cart and Checkout application, and Inventory owns availability.

One module owns each transaction by default. Exceptional multi-module local transactions require a true atomic invariant, public contracts, acyclic dependencies, integration tests, and a transaction-boundary register.

Remote providers and independently deployed capabilities do not participate in local database transactions. Their work uses durable workflows, explicit outcomes, idempotency, and reconciliation.

Direct cross-module storage access and provider SDKs inside domain logic are prohibited.

## Consequences

### Benefits

- Approved authority is enforceable in implementation.
- Critical transactions can remain local without flattening domains.
- Composition, Search, AI, Admin, Audit, and Analytics remain derived.
- Provider failure is isolated behind owned ports.
- Future extraction has explicit prerequisites.

### Costs and risks

- The module map requires stewardship beyond current team boundaries.
- Some customer journeys cross many contracts.
- Exceptional cross-module transactions need governance.
- Aggregate boundaries may need refinement as workflows become concrete.

## Governance

- A page, noun, code size, or team preference does not justify a module or service.
- Ownership transfer returns to Blueprint governance.
- Cross-module transactions are registered and reviewed.
- Extraction requires stable contracts, independent data and operations, and measurable benefit.
- A material change to module authority, transaction defaults, or extraction threshold requires a superseding ADR.

## References

- [Domain Modules and Transaction Boundaries](../06-engineering/10-domain-modules-and-transaction-boundaries.md)
- [Page Relationships and Domain Ownership](../03-product-structure/02-page-relationships-and-ownership.md)
- [ADR-0002: Shared Compatibility Domain](ADR-0002-shared-compatibility-domain.md)
- [ADR-0003: Scoped Capability-Based Access Control](ADR-0003-scoped-capability-based-access-control.md)
- [ADR-0008: Modular Authoritative Core and Selective Deployment Boundaries](ADR-0008-modular-authoritative-core.md)
