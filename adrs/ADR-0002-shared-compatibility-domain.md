# ADR-0002: Shared Compatibility Domain

- **Status:** Accepted
- **Date:** 2026-08-02

## Context

Nexora uses deterministic compatibility across Category Discovery, Product Detail, Comparison, Cart, Checkout, Support, AI context, and the PC Builder Engineering Workspace.

The Page Inventory initially described the Compatibility Rules and Compatibility Rule Workspace as jointly owned by PC Builder and Compatibility. This conflicts with the governance requirement that every page has exactly one accountable domain and risks making a platform-wide commerce capability subordinate to one consuming product.

## Decision

Establish **Compatibility** as a shared product domain.

Compatibility owns:

- The deterministic compatibility relationship model
- Rule semantics and versioning
- Evaluation and explanation contracts
- Rule testing, activation, rollback, and audit
- The Admin Compatibility Rules page
- The Admin Compatibility Rule Workspace

Catalog owns the governed product attributes and facts used as rule inputs.

PC Builder owns build state, the Engineering Workspace, and presentation of compatibility results within the Builder. Other customer and Admin surfaces likewise own their experience while consuming authoritative compatibility evaluations.

AI may explain compatibility output or offer optional guidance, but it cannot create, override, or obscure deterministic compatibility facts.

## Consequences

### Benefits

- One compatibility authority serves every product surface.
- PC Builder remains focused on build workflow and state.
- Rule behavior and explanations remain consistent across discovery, evaluation, purchase, and support.
- Ownership, mutation, approval, escalation, and audit responsibilities can be assigned without joint accountability.

### Costs and risks

- Compatibility requires independent domain stewardship.
- Catalog schema changes and compatibility rules require coordinated impact analysis.
- Consuming surfaces need stable evaluation and explanation contracts.
- Degraded compatibility behavior must be explicit for each host page.

## Governance

- Compatibility rule changes are made through the governed Admin workspaces.
- Catalog input changes must expose compatibility impact before approval.
- Compatibility evaluations remain active where required through Cart and Checkout.
- Hard incompatibilities cannot be overridden by AI or consuming interfaces.
- New compatibility semantics or a change of accountable domain requires a superseding ADR.

## References

- [Product Taxonomy](../02-information-architecture/04-taxonomy.md)
- [PC Builder Architecture](../02-information-architecture/09-pc-builder.md)
- [Page Inventory](../03-product-structure/01-page-inventory.md)
- [Page Relationships and Domain Ownership](../03-product-structure/02-page-relationships-and-ownership.md)

