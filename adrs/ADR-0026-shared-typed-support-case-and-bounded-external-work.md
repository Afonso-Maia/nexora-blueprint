# ADR-0026: Shared Typed Support Case and Bounded External Work

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora Support must coordinate general help, returns, refunds, warranties, repairs, communication, evidence, service expectations, and external providers without duplicating customer workspaces or claiming outcomes owned by Purchase, Payments, Fulfillment, Inventory, Catalog, Compatibility, Identity, or Legal.

Viable approaches included:

1. One relational Case envelope with typed extensions, append-only timeline, explicit obligations, source Remedy Requests, and bounded external Work Packages
2. Independent case systems by remedy type
3. An external ticketing platform as authoritative Case state

## Decision

Use one authoritative Support module and shared relational Support Case envelope for all approved Case Types.

Add type-specific behavior through registered versioned typed extensions, not separate customer-facing Case systems or free-form operational fields.

Keep lifecycle, responsibility, assignment, escalation, Obligation, communication delivery, Evidence review, provider work, and linked-source state separate.

Use an append-only attributed customer timeline. Store customer Messages and workforce Internal Notes as mechanically distinct types.

Store Evidence bytes in private object storage through direct quarantined upload, content validation, malware scanning, immutable versions, field-scoped access, and governed retention.

Support coordinates source-owned operations through durable Remedy Requests. It cannot write source outcomes.

External providers participate only through purpose-bound, expiring Work Packages using attributable identities, minimum fields, registered updates, revocation, and reconciliation. Nexora retains one accountable Support owner for coordinated work.

## Consequences

### Benefits

- Customers receive one persistent Support workspace.
- Typed extensions preserve specialist workflow integrity.
- Communication, evidence, and decisions remain attributable.
- Service obligations and provider work are explicit and measurable.
- Specialist sources retain outcome authority.

### Costs and risks

- The Support model and tooling are substantial.
- Evidence and provider integration increase security scope.
- Remedy workflows can be eventually consistent.
- Channel association and external updates need quarantine and reconciliation.

## Governance

- New Case Types extend the shared envelope and do not create a new canonical page.
- Free-form fields cannot control lifecycle, routing, permission, remedy, or obligation.
- Customer Messages and Internal Notes remain separate.
- Evidence receipt never implies evidentiary acceptance.
- Provider completion never resolves a Case or approves a remedy automatically.
- A material change to Case authority, shared envelope, timeline, Evidence custody, remedy execution, or provider scope requires a superseding ADR.

## References

- [Support Cases, Communication, Evidence, and External Work](../06-engineering/20-support-cases-communication-evidence-and-external-work.md)
- [Support Center Architecture](../03-product-structure/05-support-center-architecture.md)
- [ADR-0016: Domain Modules](ADR-0016-domain-modules.md)
- [ADR-0019: Source-Enforced Authorization](ADR-0019-source-enforced-hybrid-authorization.md)

