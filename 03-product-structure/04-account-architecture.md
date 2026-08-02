# Account and Post-Purchase Architecture

**Status:** Approved in part — federated continuity model approved; detailed behavior pending

## Purpose

This document defines how authenticated customers manage identity, preferences, persistent commerce context, orders, and post-purchase continuity without duplicating the ownership or interfaces of Comparison, PC Builder, AI, and Support.

It builds on the approved [Page Inventory](01-page-inventory.md), [relationships and ownership](02-page-relationships-and-ownership.md), and [Information Hierarchy](03-information-hierarchy.md).

## Decision

Nexora uses a **federated continuity account**.

Account is the trusted home for customer identity, preferences, order access, and meaningful continuation. It summarizes and links source-owned objects across the ecosystem but does not absorb their workspaces or create parallel copies.

## Account-owned pages

Account owns the page experience for:

- ACC-001 Account Dashboard
- ACC-002 Orders
- ACC-003 Order Detail
- ACC-004 Wishlist
- ACC-005 Addresses
- ACC-006 Payment Methods
- ACC-007 Notifications
- ACC-008 Account Settings

The Customer domain owns these experiences. Referenced order, payment, delivery, Support, build, product, and notification-event data retains its authoritative owner as defined in the ownership ledger.

## Federated capabilities

Account provides prominent continuation links to:

- EVA-002 Comparison Workspace
- PCB-003 Saved Builds and PCB-002 Engineering Workspace
- SUP-006 My Support Cases and SUP-007 Support Case Detail
- AIS-001 AI Assistant Conversation

These capabilities retain their approved owning domain, shell, archetype, access checks, and lifecycle. Account links to them without embedding duplicate Account-owned versions.

AI conversation history remains inside the Assistant Conversation template. Comparison remains a global utility rather than permanent Account navigation.

## Account navigation

The conceptual Account navigation is:

1. **Overview**
2. **Orders**
3. **Wishlist**
4. **PC Builds**
5. **Support Cases**
6. **Preferences**
   - Addresses
   - Payment Methods
   - Notifications
   - Account Settings

`Preferences` is a navigation group, not a page.

PC Builds and Support Cases are cross-surface links. Their placement in Account navigation communicates continuity and does not transfer ownership.

## Governance rules

1. Account Dashboard summarizes source-owned objects without copying their authority.
2. Cross-surface navigation preserves identity and minimum meaningful context.
3. Every target independently rechecks authentication, authorization, object ownership, and current state.
4. Current orders, active cases, and resumable builds outrank general settings.
5. Account navigation reflects customer tasks rather than internal service boundaries.
6. Compare remains globally accessible and does not become a duplicate Account page.
7. AI history remains in the dedicated Assistant.
8. Historical order facts are immutable from preference-management pages.
9. Customer profile changes cannot alter historical order, invoice, case, or consent records silently.
10. Mobile preserves the same conceptual groups and high-priority continuation paths.

## Shell transitions

Cross-surface links make the destination clear before or at transition. The target uses its approved shell:

- Account pages use the Storefront Account shell.
- Comparison uses the Decision Workspace.
- PC Builder uses the Engineering Workspace.
- Support cases use the Support shell.
- AI conversations use the AI Workspace.

Returning to Account restores relevant navigation and safe continuation context without carrying sensitive workspace data in URLs.

## Account Dashboard prioritization

Account Dashboard is a **state-driven continuation hub**. It does not use a fixed collection of equally weighted modules.

Applicable modules follow this priority:

1. Account or security action required
2. Order, payment, delivery, return, warranty, or Support exception
3. Active orders and shipments
4. Active Support cases
5. Resumable Cart, Comparison, or PC Build
6. Wishlist and recently viewed continuity
7. Relevant recommendations
8. Preferences and general management

Within the same tier, governed urgency and recency determine order.

### Priority governance

- Priority is deterministic and explainable, not AI-controlled.
- Source domains own status, urgency, eligibility, and resolution facts.
- Dashboard summarizes an item; the target page owns its action.
- Marketing and recommendations cannot outrank active customer obligations or resumable owned work.
- Critical items remain until resolved, expired, or superseded.
- Dismissal is available only for genuinely optional items.
- Empty modules are omitted or reduced to useful first-use guidance.
- Duplicate events from several sources resolve into one clear continuation when they represent the same underlying object.
- A stale or unavailable source is identified rather than silently presented as current.

### Fallback behavior

If personalization or aggregation is unavailable, Dashboard prioritizes:

1. Known account or security requirements
2. Available active-order and case summaries
3. Stable navigation to Orders, Wishlist, PC Builds, Support Cases, and Preferences

It does not fill missing owned state with additional merchandising.

### Responsive behavior

Mobile preserves the same priority order. Critical status and primary continuation remain ahead of recommendations and Preferences. Lower-priority modules may collapse, but their priority cannot be raised merely because they fit a compact presentation.

## Composite order-state model

Order Detail coordinates several independently authoritative state dimensions rather than flattening an order into one status.

### Order lifecycle

Owned by Purchase:

- Placed
- Processing
- Fulfilled
- Cancelled
- Closed

### Payment state

Owned by Payments:

- Pending
- Authorized
- Paid
- Failed
- Partially refunded
- Refunded

### Fulfillment state

Owned by Delivery or Fulfillment for each shipment or delivery group:

- Preparing
- Shipped
- Delivered
- Exception
- Returned

### Case state

Returns, refunds, warranties, repairs, and general Support remain linked typed cases owned by Support. A case does not overwrite the order, payment, or fulfillment state.

### Customer-facing summary

Order Detail derives a concise summary from the authoritative dimensions. Examples include:

- Payment required
- Preparing 2 items
- Partially shipped
- Delivery exception
- Delivered — return in progress

The summary is deterministic and explainable. It never becomes a new source of truth.

The most urgent actionable condition leads. Users can inspect the underlying dimensions, partial states, timestamps, and historical events. A later summary does not erase earlier events.

### Action eligibility

Cancel, track, invoice, return, warranty, and Contact Support actions are evaluated against the current authoritative dimensions.

Every action declares:

- Eligible object or item scope
- Current eligibility
- Responsible domain
- Consequence
- Required assurance
- Pending or conflicting operation
- Reason when unavailable

Eligibility is rechecked at action start and commitment. A stale button or prior notification cannot grant eligibility.

### Governance rules

1. Purchase owns order lifecycle.
2. Payments owns payment state.
3. Delivery or Fulfillment owns shipment state.
4. Support owns case state.
5. Customer owns the Order Detail experience but not these records.
6. Partial shipment, cancellation, refund, return, and exception states remain explicit.
7. Dashboard, Notifications, and Support reference the same authoritative dimensions.
8. No customer-facing label implies a completed payment, delivery, refund, or remedy before its owner confirms it.

## Verified guest-order access and claim

Guest customers can complete post-purchase tasks without being forced to create an Account. Guest-order access uses a secure, expiring context established through verification of a governed contact factor associated with the order.

An order number alone is never sufficient. Before verification, Nexora does not disclose whether an order exists or expose order, customer, payment, delivery, or Support data.

### Guest access

A verified guest may receive the minimum scope needed to:

- View the applicable order and fulfillment status
- Track eligible shipments
- Access invoices or other eligible order documents
- Start or resume eligible return, warranty, or Support tasks
- Contact Support with the verified order context

The access context is short-lived, single-purpose where practical, and restricted to the verified order and requested task. Sensitive actions may require stronger or renewed verification.

### Permanent Account claim

Attaching a guest order permanently to an Account requires:

1. Authentication or Account creation
2. Verification of control over a governed order contact factor
3. Explicit customer confirmation of the claim
4. Duplicate, conflict, and existing-attachment checks
5. A recorded, idempotent outcome

Successful claiming makes the same order available in Orders and eligible Dashboard summaries. It does not create a duplicate order or parallel history.

### Conflict and integrity rules

1. Matching an Account email address, phone number, or profile attribute never claims an order automatically.
2. If the order is already attached to another Account, the flow returns a secure conflict outcome and does not reveal that Account or reassign the order.
3. Support agents cannot bypass proof of control or silently transfer an order between Accounts.
4. A claim changes access association only. It never changes historical customer, invoice, delivery, payment, tax, or consent facts.
5. Declining Account creation or permanent attachment does not remove verified guest access to eligible post-purchase tasks.
6. Claim requests and outcomes are auditable without exposing verification secrets.
7. Repeated successful requests resolve to the existing attachment; repeated conflicting requests cannot create additional associations.
8. Every destination independently rechecks current authorization and action eligibility.

## Risk-tiered preference assurance

Account management uses assurance proportional to the consequence of the requested action. Every mutable preference or identity action declares a governed assurance tier; interface placement alone never determines its protection.

### Tier 1 — Routine

A valid authenticated session is sufficient for low-risk, readily reversible changes such as:

- Notification-channel and topic preferences
- Non-sensitive personalization preferences
- Interface preferences

### Tier 2 — Sensitive

Recent authentication or targeted verification is required for changes that can redirect customer communication, fulfillment, or future commerce behavior, including:

- Adding or editing saved addresses
- Changing personal or governed contact information
- Selecting a default payment method
- Other changes with comparable fraud or privacy impact

### Tier 3 — Critical

Step-up authentication, explicit confirmation, and an audit record are required for high-impact identity, financial, privacy, or lifecycle actions, including:

- Adding or removing payment instruments
- Changing credentials or authentication factors
- Requesting a privacy export
- Initiating Account closure

Recovery safeguards, customer notification, cooling periods, or delayed execution apply where the later lifecycle or regulatory decision requires them.

### Assurance governance

1. Authentication owns session recency, verification methods, and step-up assurance.
2. Customer owns the preference-management experience and communicates why additional assurance is required.
3. Payments owns payment-instrument validation, tokenization, storage, and payment-specific controls.
4. Purchase owns checkout-specific address and contact snapshots.
5. Current preferences do not rewrite historical orders, invoices, deliveries, Support cases, or consent records.
6. A source domain may require a higher tier because of current risk, account restriction, or action context; no consumer may lower the governed minimum.
7. Assurance is rechecked when the change is committed, not inferred from an earlier page visit.
8. Failed or abandoned verification preserves the current value and provides a safe recovery path.
9. Sensitive values and verification evidence are not exposed in URLs, analytics, or general-purpose logs.
10. Tier assignments are governed policy and must be reviewed when a capability's consequences change.

## Provisional dependencies

The following remain pending:

- Account restriction and recovery behavior
- Notification categories, retention, and preferences
- Privacy requests, export, closure, and retention
- Mobile navigation interaction details

## Next decision

Define Account restriction and recovery behavior, followed by notifications, privacy requests, and Account lifecycle controls.
