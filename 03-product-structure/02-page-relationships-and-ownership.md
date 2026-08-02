# Page Relationships and Domain Ownership

**Status:** Approved in part — model approved; graph and ownership ledger pending

## Purpose

This document defines the canonical relationship graph and ownership ledger for the approved [Page Inventory](01-page-inventory.md). It exists to expose broken handoffs, navigation dead ends, duplicated authority, unsafe recovery, and unclear operational responsibility before wireframing.

Journey maps remain validation views. They do not replace the canonical graph because pages and relationships may participate in multiple journeys or sit outside Tier 1 customer journeys.

## Decision

Nexora uses a **typed, directed relationship graph** with a companion **ownership ledger**.

Each graph edge declares a source page, relationship type, target page, trigger or condition, context carried, and expected recovery. Each page has exactly one accountable page domain while authoritative data, mutation, approval, and escalation responsibilities remain explicit and may belong to different domains.

## Relationship types

| Type | Meaning |
| --- | --- |
| `leads-to` | Ordinary navigation or continuation to another destination |
| `creates` | Creates a durable object, order, build, conversation, or case |
| `resumes` | Returns to persisted or safely recoverable state |
| `converts-to` | Converts one durable commercial object into another |
| `manages` | An authorized Admin workspace governs an entity |
| `references` | Displays authoritative data without taking ownership |
| `supports` | Provides optional contextual guidance |
| `recovers-to` | Provides a safe recovery destination after interruption or failure |

Relationship types describe architectural intent, not a particular visual control. A link, button, notification, redirect, contextual panel, or system transition may implement an edge later.

## Edge record

Every consequential edge records:

| Field | Requirement |
| --- | --- |
| Edge ID | Stable identifier independent of labels and routes |
| Source | Approved Page Inventory ID |
| Type | One approved relationship type |
| Target | Approved Page Inventory ID |
| Trigger | User or system condition that activates the relationship |
| Context carried | Minimum meaningful state passed or referenced |
| Context exclusions | Sensitive or irrelevant state that must not cross the boundary |
| Access transition | Authentication, verification, or permission consequence |
| Failure behavior | Host-owned recovery when the transition cannot complete |
| Status | Proposed, Approved, Superseded, or Deprecated |

Embedded experience units do not become graph nodes. Their consequential transitions are recorded against the host page.

## Ownership ledger

Every page records:

| Field | Requirement |
| --- | --- |
| Page ID | Approved Page Inventory ID |
| Accountable page domain | One domain accountable for the destination and its user outcome |
| Supporting domains | Capabilities required to deliver the page |
| Authoritative data owner | Domain or service owning each consequential data object |
| Mutation authority | Domain responsible for validating and applying changes |
| Approval authority | Required owner for governed or high-risk changes |
| Escalation owner | Domain responsible when normal processing cannot complete |
| Provisional dependencies | Responsibilities awaiting later Phase 2B decisions |

Page accountability does not transfer ownership of referenced data. For example:

- Customer Account owns the Order Detail customer experience, while Purchase owns the order record.
- Support owns the Support Case experience and case record, while referenced orders and products remain owned by Purchase and Catalog.
- Admin workspaces govern authoritative resources through their owning services rather than storing parallel copies.
- AI consumes authoritative data and owns neither catalog facts nor deterministic compatibility.

## Governance rules

1. Every page has at least one valid inbound relationship or a documented deep-link-only justification.
2. Every consequential action has a target, completion outcome, and safe recovery.
3. One edge is recorded once even when multiple journeys use it.
4. Context transfer is minimal, visible when user intent is affected, and subject to the target’s access checks.
5. Authentication and authorization are re-evaluated at the target; graph edges never grant access.
6. `references` never implies mutation or ownership.
7. `supports` remains optional and cannot block the host page’s fast path.
8. `recovers-to` cannot bypass authentication, authorization, or consequential-action safeguards.
9. Admin and customer surfaces reference the same durable objects through authoritative services.
10. New relationship types require explicit approval and an update to this model.

## Validation criteria

The completed graph and ledger must demonstrate:

- No accidental navigation dead ends
- Valid entry and exit paths for every product surface
- Preserved context across Search, Comparison, PC Builder, Cart, Checkout, Orders, and Support
- Safe guest-to-customer and customer-to-workforce boundaries
- No duplicate ownership across Account, Purchase, Support, Catalog, Marketing, AI, and Admin
- Explicit mutation and approval authority for consequential Admin actions
- Recovery paths that preserve intent without duplicating transactions
- Coverage of customer, operational, legal, authentication, and system destinations

## Next decision

Populate and review the relationship graph and ownership ledger using the approved Page Inventory. Unresolved responsibilities must be marked `Provisional` rather than inferred as approved.

