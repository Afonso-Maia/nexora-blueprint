# Page Relationships and Domain Ownership

**Status:** Approved in part — model and Discovery–Purchase graph approved; remaining graph and ownership ledger pending

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

## Graph granularity

The canonical graph records **consequential relationships**, not every navigational link.

An edge belongs in the graph when the transition does one or more of the following:

- Changes lifecycle stage
- Creates, resumes, or converts a durable object
- Crosses a product surface or accountable domain
- Transfers meaningful context
- Requires authentication, verification, or permission evaluation
- Initiates a consequential action
- Defines recovery from failure
- Connects customer and Admin views of the same authoritative object

Footer links, breadcrumbs, repeated global navigation, and ordinary related-content links remain governed by the Page Inventory, sitemap, navigation architecture, and later wireframes unless they also meet a consequential criterion.

This threshold keeps the graph focused on context, authority, lifecycle, and recovery. A UI link does not automatically require an edge, and the absence of a routine edge does not prohibit ordinary navigation already allowed by the approved page metadata.

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

## Approved relationship graph

### Slice 1 — Discovery, evaluation, and purchase

The following exclusions apply to every edge in this slice:

- No payment credentials, authentication secrets, unnecessary personal data, or internal-only identifiers cross the boundary.
- URL-carried state is limited to non-sensitive, validated references and inspectable discovery state.
- The target revalidates price, promotion eligibility, inventory, compatibility, authentication, and authorization as applicable.

| Edge | Relationship | Trigger | Context carried | Context excluded | Access transition | Failure behavior | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| REL-DP-001 | `STF-001` `leads-to` `DSC-001` | Submit Home search | Query and optional visible intent | Personalization internals | Public; optional customer context is re-evaluated | Remain on Home with actionable search failure or open recoverable Search state | Approved |
| REL-DP-002 | `STF-002` `leads-to` `EVA-001` | Select a deal product | Promotion reference | Assumed eligibility or guaranteed price | Public | Product Detail explains expired, invalid, or changed promotion | Approved |
| REL-DP-003 | `STF-003` `leads-to` `EVA-001` | Select a collection product | Collection reference and result position | Internal merchandising rules | Public | Preserve Collection context and show Product Detail recovery | Approved |
| REL-DP-004 | `STF-004` `leads-to` `EVA-001` | Select a brand product | Brand reference and result position | Internal brand-governance data | Public | Preserve Brand context and show Product Detail recovery | Approved |
| REL-DP-005 | `STF-006` `leads-to` `DSC-002` | Follow guide criteria to products | Guide reference and visible suggested filters | Hidden editorial or AI inference | Public | Category opens without invalid filters and explains omitted criteria | Approved |
| REL-DP-006 | `DSC-001` `leads-to` `EVA-001` | Select a product result | Query, filters, visible intent, and result position | Ranking internals and unrelated result data | Public; optional customer context re-evaluated | Preserve Search state and expose Product Detail recovery | Approved |
| REL-DP-007 | `DSC-002` `leads-to` `EVA-001` | Select a category product | Category, filters, visible intent, and result position | Ranking internals and hidden inference | Public; optional customer context re-evaluated | Preserve Category state and expose Product Detail recovery | Approved |
| REL-DP-008 | `DSC-001` `leads-to` `EVA-002` | Compare selected search results | Product references and Search context | Non-selected results and ranking internals | Public session; authenticated persistence optional | Retain valid products and report invalid comparison members | Approved |
| REL-DP-009 | `DSC-002` `leads-to` `EVA-002` | Compare selected category products | Product references and Category context | Non-selected results and hidden intent | Public session; authenticated persistence optional | Retain valid products and report invalid comparison members | Approved |
| REL-DP-010 | `EVA-001` `leads-to` `EVA-002` | Add product to comparison | Product reference and evaluation origin | Unselected variant or private recommendation internals | Public session; authenticated persistence optional | Remain on Product Detail and preserve existing comparison set | Approved |
| REL-DP-011 | `EVA-002` `leads-to` `EVA-001` | Inspect or select compared product | Product reference and retained comparison set | AI chain-of-thought and unrelated products | Public session; authenticated persistence optional | Preserve Comparison and report unavailable product | Approved |
| REL-DP-012 | `EVA-001` `leads-to` `PUR-001` | Add product to Cart | Product, selected variant, quantity, and offer reference | Stale displayed price and recommendation internals | Public session; authenticated Cart merge optional | Remain on Product Detail with inventory, variant, price, or compatibility correction | Approved |
| REL-DP-013 | `EVA-002` `leads-to` `PUR-001` | Choose compared product for purchase | Product, valid variant, quantity, and offer reference | Other compared products and AI internals | Public session; authenticated Cart merge optional | Preserve Comparison and explain purchase constraint | Approved |
| REL-DP-014 | `PUR-001` `leads-to` `PUR-002` | Proceed to Checkout | Valid Cart reference, items, compatibility summary, eligible promotions, and calculated totals | Payment credentials and unvalidated client totals | Guest or customer; Checkout establishes required assurance | Remain on Cart with item-level correction and no transaction attempt | Approved |
| REL-DP-015 | `PUR-002` `creates` `PUR-003` | Successful idempotent order placement | New order reference and non-sensitive outcome | Payment credentials, fraud signals, and internal transaction details | Transaction-bound guest or customer access | Remain in Checkout with safe retry or pending status until an order exists | Approved |
| REL-DP-016 | `PUR-002` `recovers-to` `PUR-001` | Checkout detects a Cart-level correction | Affected items and reason category | Payment credentials and unrelated checkout data | Preserve guest or customer Cart ownership | Return to Cart with corrections highlighted and no duplicate order | Approved |
| REL-DP-017 | `PUR-003` `resumes` `ACC-003` | Open persistent Order Detail | Order reference | Confirmation token after exchange and sensitive payment data | Authenticated owner or securely verified guest path | Route to verification, Sign In, or safe confirmation recovery without exposing order data | Approved |
| REL-DP-018 | `PUR-003` `leads-to` `STF-001` | Continue shopping after confirmation | Completed-order continuation signal only | Order contents, payment data, and personal data | Public with optional authenticated context | Open Home without order context if continuation data is unavailable | Approved |

### Slice 1 invariants

- Query, filter, intent, comparison, and Cart state remain inspectable and clearable.
- Returning from Product Detail preserves meaningful Search, Category, Collection, Brand, or Comparison context.
- Promotion context never guarantees eligibility or price.
- Failed order creation remains in Checkout with idempotent recovery.
- Order Confirmation is reached only after an order exists.
- Graph edges do not bypass host-owned validation or state handling.

## Next decision

Populate and review consequential relationships in four slices:

1. Account, PC Builder, AI, and Support
2. Authentication, legal, and system recovery
3. Admin management edges and the ownership ledger

Unresolved responsibilities must be marked `Provisional` rather than inferred as approved.
