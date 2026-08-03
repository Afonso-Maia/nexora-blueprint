# Account and Post-Purchase Patterns

**Status:** Approved

## Purpose

This document defines Account Dashboard prioritization, lists, Order Detail, tracking, returns, saved objects, preferences, notifications, assurance, restrictions, privacy requests, and guest continuity.

## Decision

Nexora presents Account as a **federated continuity surface with obligation-first prioritization**.

Account components summarize source-owned objects and route to their canonical destinations. They do not copy lifecycle authority from Orders, Support, PC Builder, Comparison, Notifications, Identity, or Privacy.

## Account Dashboard

Priority order:

1. Required customer action
2. Active order exception or near-term delivery
3. Active Support obligation
4. Account restriction or security issue
5. Saved build or decision continuation
6. Wishlist and recent activity
7. Preferences and general settings

Modules declare source, freshness, destination, and degraded behavior. A failed source does not show an empty state.

## Continuation card

Anatomy:

- Object identity
- Current state
- Next action
- Relevant timestamp
- Owning destination
- Freshness or unavailable state

The card does not execute consequential source actions directly unless explicitly approved as a safe fast path.

## Orders list

Order Row exposes:

- Order reference and date
- Current composite customer-facing status
- Total
- Key items
- Current required action
- Delivery or pickup context
- Open Order Detail

Filters use customer-relevant status and time, not internal operational states.

## Order Detail

Hierarchy:

1. Order identity and composite status
2. Current action or obligation
3. Shipment, pickup, payment, and Support summaries
4. Items and totals
5. Timeline
6. Documents and policy references
7. Returns, cancellation, invoice, or Support actions when eligible

Separate source statuses remain visible where their distinction changes the next action.

## Status timeline

- Shows confirmed events and expected next events.
- Distinguishes estimate, completion, exception, and correction.
- Uses exact dates where consequential.
- Does not infer delivery from carrier motion or payment from UI submission.
- Provides a structured non-visual reading order.

## Post-purchase action card

Used for return, cancellation, warranty, invoice, delivery correction, or Support.

It names:

- Action
- Eligibility
- Deadline or policy reference
- Affected item or shipment
- Required assurance
- Source destination
- Unavailable reason

## Guest order access

Guest access uses:

- Explicit order reference
- Secure verification
- Non-disclosing errors
- Bounded verified session
- Permanent Account claim offer when eligible

Claiming is explicit, verified, idempotent, and does not duplicate the order.

## Wishlist

Wishlist supports:

- Product identity and variant
- Current price and inventory
- Changed or unavailable product
- Move to Compare
- Add to Cart after validation
- Remove

Wishlist metadata remains private and does not travel into public Product Detail or Comparison unnecessarily.

## Addresses and payment methods

Object cards show:

- Label and safe summary
- Default state
- Eligibility or issue
- Edit/remove
- In-use or removal-blocked reason

Payment credentials remain tokenized and masked. Removal or default changes use assurance proportional to risk.

## Notifications

Notification Item exposes:

- Source event
- Category
- Read state
- Timestamp
- Safe destination
- Delivery or interaction state only when relevant

The notification center does not become source truth. Opening a notification rechecks object access and state.

## Account settings

Settings group:

- Profile
- Communication preferences
- Theme and density where applicable
- Security
- Privacy
- Account lifecycle

Immediate preferences show saved/failure status. High-risk changes use reauthentication, review, and explicit commitment.

## Assurance

Assurance Prompt appears at the protected action and includes:

- Why verification is required
- Current task and preserved context
- Approved verification methods supplied by Identity
- Cancel and safe return
- Failure and recovery

It does not reveal internal risk signals.

## Restrictions

Restriction Banner or Inline Restriction:

- Names the affected capability
- Preserves unaffected obligations
- Explains available recovery
- Links to Support or verification
- Avoids exposing security internals

A global locked-account page is not used when Order or Support continuity can remain safely available.

## Privacy request

Privacy Request Card and Detail show:

- Request type
- Scope
- Verification
- Lifecycle
- Current obligation
- Expected timing
- Delivery or completion
- Blocked or legally retained data where policy permits explanation

Account closure remains a durable governed workflow rather than an immediate destructive toggle.

## Responsive behavior

- Current obligation precedes general navigation.
- Order and case identity remain visible.
- Timelines become stacked without losing event relationships.
- Secondary modules collapse after required action.
- Cross-surface return context persists.

## Accessibility

- Dashboard priority matches reading and focus order.
- Status is textual and programmatic.
- Timelines have list or table semantics.
- Masked data remains understandable.
- Verification and restrictions preserve focus and task context.
- Notification read state is not color-only.

## States

Required patterns cover:

- No orders, Wishlist, methods, notifications, or saved activity
- Partial dashboard sources
- Order state changed
- Guest verification failed or expired
- Payment method expired or provider unavailable
- Restriction, assurance, and session interruption
- Privacy request pending, blocked, completed, or failed

## Governance

1. Account owns continuity and preference presentation.
2. Source domains own object state and actions.
3. Dashboard priority is deterministic and explainable.
4. Guest continuity does not force Account creation.
5. Notifications never grant object access.

## Validation

Test new, active, post-purchase, restricted, guest, and closure contexts across themes, responsive layouts, keyboard, assistive technology, partial sources, stale links, and cross-surface restoration.

## Consequences

### Benefits

- Customers see obligations before generic modules.
- Source ownership remains intact.
- Guest and restricted users retain safe continuity.
- Post-purchase state is understandable without one false status.

### Costs and risks

- Dashboard composition depends on several sources.
- Composite status requires careful explanation.
- Safe restoration needs cross-surface coordination.

## Next decision

Define Support and authentication patterns.
