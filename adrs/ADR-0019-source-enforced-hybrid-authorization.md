# ADR-0019: Source-Enforced Hybrid Authorization

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

The approved authorization model evaluates subject, capability, resource scope, field scope, conditions, assurance, and segregation with deterministic deny-overrides precedence. Engineering must implement those semantics across the modular core, independent capabilities, BFFs, workers, Search, exports, and AI without copying resource truth into a central policy service or trusting presentation.

Viable approaches included:

1. A shared deterministic authorization kernel invoked by each source owner using current resource facts
2. A central remote policy-decision service for every protected operation
3. Independent authorization logic implemented by each domain

## Decision

Use a source-enforced hybrid authorization architecture.

Roles and Permissions owns versioned roles, complete grants, denials, delegations, scope definitions, mandatory constraints, compilation, and policy distribution. A shared deterministic kernel implements the approved evaluation and precedence semantics.

Each authoritative source module supplies current source-owned resource, lifecycle, relationship, hierarchy, field, and operation facts and performs final enforcement before disclosure or commitment.

The modular core evaluates through in-process public contracts. Independently deployed capabilities consume signed, least-data, versioned policy projections and use direct current checks for critical operations.

Consequential operations re-evaluate current authority. Queue messages, navigation state, action descriptors, cached allows, identity-provider claims, and BFF assertions do not grant resource authority.

The initial architecture does not use a mandatory remote policy service or a general-purpose policy language.

## Consequences

### Benefits

- Resource truth and final enforcement remain with the source owner.
- One kernel provides consistent, testable authorization semantics.
- Core operations do not depend on a remote decision network hop.
- Field restrictions, assurance, segregation, and explicit denial share one model.
- Independent capabilities remain permission consumers rather than authorities.

### Costs and risks

- Source modules must build complete and correct evaluation context.
- Kernel, compiler, schemas, and bundles require compatibility governance.
- Revocation and policy projections require bounded invalidation and reconciliation.
- Distributed extraction can create demand for a remote decision capability later.

## Governance

- Every protected operation declares capability, resource, fields, assurance, denial behavior, and audit requirements.
- One complete grant must independently authorize the operation.
- Source services deny when mandatory current context is missing or unavailable.
- Policy activation requires validation, simulation, independent review, atomic revision, and evidence.
- Presentation can narrow but never widen source decisions.
- A material change to final enforcement ownership, deny precedence, policy execution model, complete-grant behavior, or remote-decision topology requires a superseding ADR.

## References

- [Authorization and Policy Enforcement](../06-engineering/13-authorization-and-policy-enforcement.md)
- [Roles and Permissions](../03-product-structure/07-roles-and-permissions.md)
- [ADR-0003: Scoped Capability-Based Access Control](ADR-0003-scoped-capability-based-access-control.md)
- [ADR-0010: Trust-Segmented Runtime Topology](ADR-0010-trust-segmented-runtime-topology.md)
- [ADR-0018: Managed Identity and Server-Side Sessions](ADR-0018-managed-identity-and-server-side-sessions.md)

