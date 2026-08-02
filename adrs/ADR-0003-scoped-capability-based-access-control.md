# ADR-0003: Scoped Capability-Based Access Control

- **Status:** Accepted
- **Date:** 2026-08-02

## Context

Nexora's Administrative Dashboard spans catalog, compatibility, inventory, pricing, orders, customers, Support, content, access governance, audit, and reporting. The approved Admin IA separates discovery, fields, editing, transitions, approval, execution, export, and administration.

Static global roles cannot safely express category-limited catalog work, queue-scoped Support, amount-limited financial approval, field-level privacy restrictions, temporary delegation, external-provider work packages, non-human automation, or segregation of duties without proliferating near-duplicate roles.

The authorization model is cross-cutting and expensive to reverse. It must support stable Admin navigation while allowing precise enforcement by authoritative source domains.

## Decision

Adopt **scoped capability-based role-based access control**.

Roles are versioned bundles used to assign capabilities consistently. Authorization enforcement evaluates:

`Subject + capability + resource scope + field scope + conditions + assurance`

The foundational capability verbs are Discover, Read, Create, Edit, Transition, Approve, Execute, Export, and Administer.

Access is denied by default. Source services enforce permissions. UI adaptation, navigation visibility, search filtering, and disabled controls do not constitute enforcement.

Segregation constraints may deny an operation even when its individual capabilities are granted. Temporary, delegated, external-provider, service, automation, and AI-assisted access must be attributable, scoped, time-bounded where applicable, and auditable.

## Consequences

### Benefits

- Stable capability-based Admin navigation can serve many roles without duplicating pages.
- Resource, field, queue, amount, category, provider, and task scope can be expressed directly.
- Approval and execution remain separable.
- Temporary and external access can be bounded without inventing permanent global roles.
- Search, exports, previews, AI summaries, and actions can consume one authorization contract.
- Segregation of duties can evaluate effective access across roles and delegations.

### Costs and risks

- Permission policy and evaluation are more complex than static global RBAC.
- Role and capability governance require versioning, impact analysis, testing, and access review.
- Source domains must implement consistent enforcement instead of relying on the Admin shell.
- Field-level and derived-data restrictions require disciplined treatment across indexes, logs, exports, caches, and AI context.
- Scope combination and conflict precedence require explicit later decisions.

## Governance

- New capabilities declare resource, field, scope, conditions, assurance, risk, denial behavior, and audit requirements.
- Role changes do not erase the historical meaning of prior assignments.
- Source services deny access when required authorization context is absent, invalid, stale, or unavailable.
- Non-human subjects require an accountable owner and may not use shared workforce identities.
- A later material change to the authorization model, enforcement unit, or deny-by-default posture requires a superseding ADR.

## References

- [Roles and Permissions](../03-product-structure/07-roles-and-permissions.md)
- [Administrative Dashboard IA](../03-product-structure/06-administrative-dashboard-ia.md)
- [Page Relationships and Domain Ownership](../03-product-structure/02-page-relationships-and-ownership.md)
- [Support Center Architecture](../03-product-structure/05-support-center-architecture.md)
