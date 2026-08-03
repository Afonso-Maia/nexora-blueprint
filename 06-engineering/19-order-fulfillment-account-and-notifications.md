# Order, Fulfillment, Account, and Notification Continuity

**Status:** Approved

## Purpose

This document defines post-creation Order lifecycle, fulfillment units and shipments, customer-facing Order composition, cancellation coordination, Account projections, guest continuity, notifications, channel delivery, timelines, provider integration, and degraded behavior.

It implements the approved federated Account architecture: Account is the continuity experience, not a second system of record for Orders, Payments, Fulfillment, Support, PC Builds, or Notifications.

## Decision

Use:

- Purchase-owned Order lifecycle and immutable Order creation snapshots
- Fulfillment-owned fulfillment units, shipments, carrier integration, and delivery outcomes
- Payments-owned payment lifecycle
- Support-owned persistent return, warranty, repair, refund-coordination, and service cases
- Source-composed Order Detail and source-owned action eligibility
- Rebuildable obligation-first Account projections
- Notifications-owned in-app records derived from source events
- Messaging-owned channel delivery, provider attempts, suppression, and reconciliation
- Durable source workflows for cancellation and other cross-domain transitions
- Versioned event, summary, timeline, and destination contracts

No composite Account status, notification, delivery message, search index, analytics row, or Admin view becomes lifecycle authority.

## Viable approaches considered

### Federated source composition with bounded projections

Order Detail and Account compose current source-owned summaries, while rebuildable projections support lists, Dashboard priority, notifications, and operational efficiency.

This is approved because it preserves clear ownership and current action eligibility without forcing every page to fan out to every source or copying all post-purchase state into Customer.

### Account-owned consolidated post-purchase record

Customer could copy Order, payment, shipment, case, and notification state into one Account database and serve every page from it.

This offers simple reads but creates competing lifecycle truth, stale action eligibility, and difficult correction semantics. It is not approved.

### One cross-domain Order aggregate

Purchase could own payment, shipment, return, case, and notification subrecords inside Order.

This would simplify a single view but erase the approved specialist authorities and create a contention-heavy aggregate. It is not approved.

## Ownership map

| Concern | Authority |
| --- | --- |
| Order identity, items, commercial snapshot, customer association, order lifecycle | Purchase |
| Payment Intent, authorization, capture, refund, reconciliation | Payments |
| Stock positions, reservation, allocation movements | Inventory |
| Fulfillment units, packages, shipment, carrier tracking, delivery outcome, return logistics | Fulfillment |
| Customer profile, Wishlist, addresses, preferences, Account-facing projections | Customer |
| Typed cases, communication association, evidence, obligations, remedies, external work | Support |
| In-app notification record and interaction state | Notifications |
| Channel message, template rendition, provider delivery, bounce and suppression | Messaging |
| Legal documents and policy meaning | Legal |
| Source activity and cross-operation evidence | Audit |

Experience composition does not transfer authority.

## Order aggregate

The Purchase Order contains:

- Stable identifier and human-facing reference
- Guest or customer access association
- Creation operation and time
- Immutable reviewed commercial snapshot
- Immutable Product and Variant purchase snapshot
- Line and PC Build grouping
- Currency and total
- Current Purchase-owned lifecycle
- Payment Intent references
- Inventory allocation references
- Fulfillment unit references
- Consent and Legal version references
- Cancellation and other Purchase-operation references
- Source event sequence and revision

Purchase does not duplicate mutable payment transactions, shipment checkpoints, Support messages, or provider payloads.

## Order lifecycle

Preserve the approved customer lifecycle:

`Placed → Processing → Fulfilled → Closed`

`Placed or Processing → Cancelled`

These states are Purchase-owned summaries of the Order's own commercial lifecycle:

- **Placed** — an authoritative Order exists.
- **Processing** — required post-creation work is active.
- **Fulfilled** — all non-cancelled Order quantities reached the Purchase policy's fulfilled condition.
- **Cancelled** — all eligible remaining quantities were cancelled and required disposition is recorded.
- **Closed** — the Order has no active Purchase-owned fulfillment or payment obligations under the closing policy.

Partial cancellation, partial fulfillment, payment pending, refund, return, delivery exception, and Support work remain explicit dimensions. They do not require inventing a second top-level Order status.

Exact transition policy is versioned Purchase configuration. A transition records reason, actor, preconditions, source evidence, and revision.

## Order line and quantity state

Consequential operations apply to explicit quantity scope, not only the entire Order.

Each line tracks Purchase-owned quantities such as:

- Ordered
- Cancelled
- Assigned to fulfillment
- Fulfilled under Purchase policy
- Subject to active post-purchase work

The owning specialist retains the underlying state. Purchase updates its quantity accounting from accepted source outcomes through idempotent contracts.

Quantity conservation is reconciled. No item can silently disappear between ordered, cancelled, fulfillment, and governed remedy scope.

## Fulfillment model

### Fulfillment Unit

A Fulfillment Unit groups Order quantities that share an approved execution path.

It contains:

- Stable identifier
- Order and line quantity allocation
- Origin or logical fulfillment source
- Destination snapshot reference
- Method and service level
- Promise or estimate
- Lifecycle
- Shipment references
- Provider work reference
- Revision

Splitting an Order into units is Fulfillment policy. It cannot change purchased quantity, price, or Order ownership.

### Shipment

A Shipment represents a physical outbound or return movement.

It contains:

- Shipment identifier
- Fulfillment Unit
- Package and item quantities
- Carrier and service
- Tracking reference
- Label and provider references
- Current state
- Estimated and actual milestones
- Exception and reconciliation state
- Provider-event sequence

Tracking numbers are identifiers, not access secrets or proof of delivery.

### Return Shipment

Return logistics uses a Fulfillment-owned Return Shipment linked to a Support Case or other approved remedy operation.

Creating return logistics does not itself approve a refund, resolve a case, or change the original delivery outcome.

## Fulfillment lifecycle

The approved customer-facing fulfillment states remain:

- Preparing
- Shipped
- Delivered
- Exception
- Returned

Internal states can be more detailed when they map deterministically to one approved presentation state and do not redefine its meaning.

Examples of internal milestones include allocation pending, picking, packed, handed to carrier, in transit, out for delivery, delivery attempted, delivery confirmed, return in transit, and return received.

The mapping is versioned and observable. Unknown provider states map to Unknown or Exception according to governed evidence, never Delivered.

## Delivery promise

Distinguish:

- Pre-purchase estimate
- Checkout-selected Fulfillment quote
- Order promise captured at creation
- Current revised estimate
- Actual delivery outcome

The original promise remains visible in history when a later estimate changes. A carrier estimate cannot overwrite Nexora's customer obligation without an explicit policy and explanation.

Times store instants, local dates, zones, ranges, source, and confidence separately. A missing scan does not fabricate an on-time or delivered state.

## Allocation and fulfillment start

After Order creation:

1. Purchase publishes the committed Order.
2. Inventory exposes the consumed reservation or allocation.
3. Fulfillment creates or resumes units idempotently.
4. Fulfillment validates destination, method, allocation, capacity, and provider eligibility.
5. Fulfillment starts internal or provider work.
6. Source outcomes update Purchase through versioned events and direct reconciliation.

Order creation does not claim shipment preparation has started. Fulfillment failure creates an explicit obligation and recovery workflow.

## Carrier and provider adapters

Fulfillment adapters support:

- Rate or promise retrieval where approved
- Shipment creation
- Label retrieval
- Cancellation
- Tracking query
- Provider event receipt
- Proof-of-delivery evidence
- Return label or pickup
- Reconciliation

Provider operations use Nexora idempotency and stable mapping records.

Provider callbacks:

- Verify origin and signature where supported
- Deduplicate event identity
- Preserve occurred and received time
- Validate Shipment mapping
- Reject impossible regression
- Store bounded evidence
- Apply state through compare-and-set
- Publish source events transactionally

Carrier events can arrive late, duplicated, out of order, or corrected. Fulfillment uses provider sequence, occurred time, current API verification, and reconciliation rather than arrival order alone.

## Proof and disputes

Delivery confirmation records source and evidence quality, for example carrier assertion, customer confirmation, pickup verification, or governed internal handoff.

Proof-of-delivery artifacts are protected objects with purpose, retention, field authorization, and audit. They are not exposed in general notifications, analytics, or unrestricted Admin views.

A disputed delivery creates or links Support work. Support owns the case; Fulfillment retains shipment evidence; Purchase retains Order truth.

## Order actions

Every Order Detail and Admin action returns an action descriptor:

- Action type
- Eligible item or quantity scope
- Current availability
- Owning domain
- Required assurance and permission
- Consequence
- Reason category
- Required evidence or consent
- Existing operation
- Expiry or recheck condition

Descriptors are presentation projections. Starting and committing an action rechecks current source state.

Initial action families include tracking, payment continuation, invoice access, cancellation request, return or warranty initiation, Support contact, and eligible repurchase or PC Build continuation.

## Cancellation coordination

Purchase owns Order cancellation eligibility and the customer-facing cancellation operation. It does not directly edit Payment, Inventory, or Fulfillment state.

The durable workflow:

1. Creates one idempotent Cancellation Operation for explicit item quantities.
2. Rechecks Order state, authorization, assurance, policy, active work, and conflicts.
3. Requests Fulfillment stop or cancellation where required.
4. Requests Inventory allocation release or compensating movement after confirmed disposition.
5. Requests Payments void or Refund according to current payment state.
6. Records each source outcome.
7. Commits Purchase cancellation quantities and Order lifecycle when required preconditions hold.
8. Creates or updates customer obligations and notifications.
9. Reconciles unfinished compensation.

The operation can be Requested, Pending, Partially completed, Completed, Rejected, Conflicted, or Indeterminate.

Cancellation is not shown complete because a carrier request was accepted or a refund was initiated. Each source dimension remains visible.

## Return, warranty, refund, and repair handoff

Order Detail can evaluate and initiate an eligible workflow, but persistent post-purchase remedy work becomes a typed Support Case under the approved architecture.

- Purchase supplies Order and line facts.
- Legal supplies applicable policy.
- Support owns case, evidence, communication, obligations, and coordination.
- Fulfillment owns return logistics.
- Payments owns refund execution.
- Inventory owns returned-stock disposition.
- Catalog owns Product facts.

The handoff creates or resumes one case idempotently. Order Detail links the case and continues showing source outcomes without embedding a duplicate case workspace.

## Payment and refund continuity

Order Detail consumes a Payments-owned summary:

- Current payment state
- Method-safe display
- Authorized, paid, failed, refunded, or pending amount
- Customer action
- Refund references and status
- Reconciliation or unavailable state

Purchase Order lifecycle does not declare Paid or Refunded independently.

Refund approval and coordination belong to the approved remedy owner; Payments executes and reconciles the monetary operation. A refund request, provider acceptance, and completed refund are separate events.

## Invoice and order documents

Order documents use a source-owned document contract:

- Stable document identity and type
- Order and customer-access association
- Issuer
- Version or correction reference
- Generated and effective time
- Storage object reference
- Integrity evidence
- Availability and retention
- Access and disclosure policy

The exact Brazilian fiscal invoice authority and provider integration require later Legal, finance, and implementation approval. A missing invoice is an explicit document state, not a missing Order.

Downloads reauthorize access and use short-lived object capabilities. Notifications do not contain protected documents as unrestricted attachments.

## Federated Order Detail

Customer owns the Account Order Detail experience. Its BFF composes:

- Purchase Order and commercial snapshot
- Payments summary
- Fulfillment units, Shipments, promise, and tracking
- Support cases and obligations
- Applicable documents
- PC Build reference
- Notification context
- Current action descriptors

The composition contract includes per-section owner, source revision, freshness, and status.

Critical source sections use direct current reads. Lower-risk timeline and summary projections can be bounded and cached. One failed optional section does not erase the Order.

## Composite customer status

The customer-facing status is a deterministic projection from:

- Purchase Order lifecycle
- Payment state
- Fulfillment states by quantity
- Active required customer action
- Support obligations

Priority favors the most urgent actionable condition, then active exception, then partial progress, then stable completion.

Examples remain those approved in the Account architecture: Payment required, Preparing items, Partially shipped, Delivery exception, or Delivered with return in progress.

The projection includes:

- Stable summary code
- Brazilian Portuguese message key
- Contributing source states and revisions
- Required action
- Generated time and freshness

It is never written back as Order state.

## Timeline

Order Detail presents an append-only customer timeline assembled from registered source events.

Each timeline entry includes:

- Stable event identity
- Source domain and source aggregate
- Customer-safe event type
- Occurred time and recorded time
- Affected item or shipment scope
- Localized message key and bounded variables
- Correction or supersession reference
- Destination

Events are ordered primarily by business occurrence, with received-time and correction cues for late data. A corrected carrier event does not delete the original evidence; the customer view can collapse superseded detail while preserving truthful history.

Internal notes, provider payloads, risk signals, restricted fields, and operational-only transitions do not enter the customer timeline.

## Orders list

Purchase exposes an owner-authorized, cursor-paginated Order summary query. Customer Account shapes it but does not copy Order authority.

The summary contains:

- Order reference and creation date
- Total and currency
- Key item snapshots
- Composite status projection
- Required customer action
- Fulfillment context
- Source revisions and freshness

Filters use governed customer-facing states and time. They translate to source query semantics rather than filtering a stale downloaded list.

## Account Dashboard projection

Use a rebuildable Customer-owned continuity projection for obligation-first prioritization.

It contains only bounded references and summaries from:

- Security or Account actions
- Active Orders and payment or delivery exceptions
- Active Support obligations
- Resumable Carts and Builds
- Wishlist and optional continuity

Each card records source, object, summary code, urgency class, destination, source revision, freshness, and expiry.

Source events update the projection. Recurring reconciliation repairs missed updates. Source-specific action eligibility is not cached as authority.

Priority is deterministic, versioned, and explainable. Marketing and recommendations cannot outrank active obligations.

## Account projection behavior

- Duplicate source events for one obligation collapse by governed correlation.
- Resolved, expired, or superseded obligations leave active priority but can remain in their source history.
- A failed source produces unavailable or stale state, not an empty Dashboard.
- Projection loss is recoverable from source snapshots and events.
- Account restriction filters capabilities but does not erase eligible historical continuity.
- Customer deletion and closure follow retention and unresolved-obligation policy.

## Guest Order continuity

Guest access uses the scoped Identity session approved in the authentication architecture.

- Order number, tracking number, email, or notification link alone is insufficient.
- Purchase verifies the guest subject-to-Order association on every request.
- The session grants only eligible Order and task scope.
- Sensitive actions can require renewed assurance.
- Claiming an Order into an Account changes only the access association.
- Automatic claim by matching email or telephone is prohibited.

Order Confirmation and messages use opaque destination references that enter the verification flow when the session is absent.

## Order claim

Claim is a Purchase-owned idempotent access-association operation coordinated through Customer Account:

1. Authenticate the Customer subject.
2. Establish current guest Order proof.
3. Recheck whether the Order is already associated.
4. Present explicit confirmation.
5. Commit one association or return the existing one.
6. Publish continuity invalidation.

Conflict does not reveal another Account. Claim never edits historical Order customer, address, invoice, payment, delivery, or consent snapshots.

## Notification event contract

A source requests notification using a semantic event:

- Source event and aggregate reference
- Recipient or recipient-resolution instruction
- Notification class
- Stable event type
- Urgency
- Required or optional status
- Customer-safe bounded variables
- Authoritative destination type and object reference
- Validity and expiry
- Deduplication and correlation identity
- Locale context
- Source revision

The source chooses the semantic fact and class. Notifications and Messaging cannot reclassify marketing as transactional or optional as required.

Sensitive payloads are not copied into the request. Renderers fetch or receive approved minimized variables.

## Notification classes

Preserve:

- Security
- Transactional
- Continuity
- Advisory
- Marketing

Class determines consent, preference, retention, channel, urgency, and suppression policy.

Required Security, Legal, or service communications cannot be disabled when policy requires them. Marketing consent remains independent and cannot be bypassed with a transactional classification.

## In-app Notification

Notifications creates an idempotent record containing:

- Notification identifier
- Customer recipient
- Source event reference
- Class and event type
- Content rendition version
- Destination
- Created and expiry time
- Unread, read, dismissed, archived, or actioned interaction state
- Current source-validity projection

Interaction state does not change source state. Marking a delivery exception notification read does not resolve the shipment.

Opening a Notification reauthorizes the destination and obtains current source state. Expired or inaccessible targets produce safe recovery without revealing another resource.

## Notification center

Customer owns the Notification Center experience and preferences. Notifications supplies in-app records; Messaging supplies channel state where customer-visible.

The list is cursor-paginated, class-filterable, and permission filtered. Duplicate notifications are deduplicated by source semantic identity, not similar text.

Unread count is a projection with bounded inconsistency. Mark-read operations are idempotent and scoped to the recipient.

## Messaging delivery

Messaging converts an eligible notification request into one or more Message Deliveries.

Delivery contains:

- Source and Notification reference
- Recipient endpoint reference
- Channel
- Template and locale version
- Rendered-content digest
- Provider and account
- State
- Attempts
- Deduplication identity
- Schedule and expiry
- Suppression decision

Channels may include email, SMS, push, or approved provider messaging. A channel is not approved merely because the architecture can represent it.

## Template governance

Source owners define semantic event variables and meaning. Messaging owns safe channel rendition. Design, Content, Legal, Security, Accessibility, and source owners review templates according to class.

Templates:

- Use a registered typed variable schema
- Are versioned and immutable after activation
- Have Brazilian Portuguese primary content
- Escape variables by output context
- Avoid sensitive detail in lock-screen, subject-line, or shared-device contexts
- Provide plain-text or equivalent accessible rendition
- Use destination references, not arbitrary URLs
- Preserve source identity and customer-safe next action

Template activation uses preview fixtures and cannot query arbitrary source data.

## Preferences, consent, and suppression

Customer owns the preference experience and Preference Set. Messaging consumes a versioned projection.

Before optional delivery, Messaging evaluates:

- Notification class
- Topic
- Channel preference
- Marketing consent and provenance
- Required-service policy
- Endpoint verification
- Quiet-time or frequency policy
- Bounce, complaint, unsubscribe, and legal suppression
- Message validity

Required messages can bypass optional topic preference only under their governed class. They do not bypass invalid endpoint, safety, provider, or legal suppression blindly.

Preference changes affect future eligible delivery and do not rewrite history.

## Delivery attempts

Message attempts are idempotent by Delivery and provider command.

Normalized states include:

- Queued
- Sending
- Provider accepted
- Delivered where the channel supplies credible evidence
- Deferred
- Failed
- Bounced
- Complained
- Suppressed
- Expired
- Unknown

Provider accepted is not Delivered. Delivered is not Read. Read is not source action.

Retries use channel- and failure-class policy with backoff, jitter, maximum attempts, and expiry. Permanent failure and suppression are not retried.

## Provider callbacks and reconciliation

Messaging provider events use signed or authenticated ingress, inbox deduplication, versioned mapping, out-of-order handling, and reconciliation.

Unknown states remain Unknown. Provider callbacks cannot alter Order, Shipment, Case, or Notification meaning.

Reconciliation compares Nexora Delivery and Attempt state with provider state and identifies accepted-without-outcome, duplicate send, late delivery, invalid endpoint, bounce, and complaint discrepancies.

## Notification timing

Source events are recorded before notification work is requested.

Transactional outbox flow:

1. Source commits state and event.
2. Notifications consumes idempotently and creates in-app state.
3. Messaging evaluates class, preference, template, channel, and suppression.
4. Message worker sends outside the source transaction.
5. Provider outcomes update delivery.

Source commitment never waits for email, SMS, or push. Notification delay is shown as a communication issue, not Order or Shipment failure.

## Deep links

Destinations use a registry of route types and opaque object references.

- The application resolves the current canonical route.
- Authentication or guest verification occurs before protected disclosure.
- Current authorization and object association are checked.
- Action eligibility is re-evaluated.
- Expired, merged, retired, or inaccessible objects return a safe successor or recovery state.
- Sensitive state is not embedded in query parameters.

Short-lived signed links can bootstrap a verification ceremony but do not serve as long-lived resource authorization.

## Real-time and refresh

Order Detail and Account can receive invalidation or summary events through a bounded real-time channel.

Real-time messages contain object, source revision, and invalidation type—not complete sensitive records. The BFF reauthorizes and refetches source state.

Polling remains a fallback. Losing the real-time connection does not imply the Order stopped progressing.

## Caching and freshness

- Immutable Order snapshots and historical timeline entries can use long public-to-subject private cache boundaries.
- Current payment, shipment, action eligibility, restriction, and obligation state use short or direct source reads.
- Account Dashboard projections declare source revision and freshness.
- Notification list interaction state is Notifications authority.
- Shared public caches never store customer Order, Shipment, message, or Account content.
- A cache cannot preserve access after guest expiry, Account restriction, or ownership change.

## Degraded behavior

### Order Detail

- Purchase identity and immutable item snapshot remain visible when eligible.
- Payment, Fulfillment, Support, document, or notification sections degrade independently.
- A failed source is unavailable, not completed or empty.
- Consequential actions requiring the failed source are disabled with recovery.

### Account Dashboard

- Known critical cards remain visibly stale within policy.
- Missing sources do not produce empty first-use modules.
- Stable navigation to Orders, Wishlist, Builds, Support, and Preferences remains.
- Recommendations do not fill obligation gaps.

### Fulfillment provider

- Last confirmed Shipment state remains with freshness.
- New tracking claims are withheld when unverifiable.
- Customer and operator see provider delay separately from physical certainty.
- Reconciliation continues and exceptions alert.

### Notifications and Messaging

- Source operations continue if notification delivery fails.
- In-app Notification can exist while external channel delivery is delayed.
- Message failure does not imply the source event failed.
- Required-message delivery failure creates an operational alert and eligible alternate-channel policy.
- No channel silently changes consent or reclassifies the event.

## Security and privacy

- Order, payment, shipment, document, case, and notification reads enforce current source authorization.
- Customer, guest, workforce, provider, and service subjects remain distinct.
- Carrier and messaging providers receive minimum required data.
- Tracking references, deep links, and Notification identifiers do not authorize access.
- Addresses, contact data, proof of delivery, payment display, and case references are field restricted.
- Templates and provider payloads are untrusted and escaped.
- Admin shipment, cancellation, resend, preference, and export actions require explicit capability, scope, reason, assurance, and audit.
- Provider secrets are isolated by adapter and environment.

Account closure cannot delete retained Orders, invoices, payment, shipment, Support, or Legal evidence prematurely. It changes access and future preference state through governed workflows.

## Observability and reconciliation

Measure:

- Order transition latency and invalid transition attempts
- Order-to-allocation and Order-to-Fulfillment lag
- Fulfillment Unit creation, split, exception, and completion
- Carrier event lag, duplication, regression, and reconciliation
- Promise changes and delivery exceptions
- Cancellation workflow step and compensation backlog
- Composite status revision skew
- Account projection lag, duplicate cards, and reconciliation
- Notification creation and deduplication
- Message queue, send, delivery, bounce, complaint, suppression, and expiry
- Required-message failure
- Deep-link recovery and authorization denial

Reconcile:

- Order quantities against cancellation and Fulfillment assignment
- Fulfillment units against Inventory allocation
- Shipment items against units
- Fulfillment outcome against Purchase lifecycle
- Cancellation steps against source outcomes
- Account summaries against sources
- Notification records against source events
- Message deliveries against notification requests and provider state

Repair uses owner commands and compensating events, never projection edits as source correction.

## Quality gates

Before release:

- Test Order lifecycle and quantity conservation across partial fulfillment and cancellation.
- Test Fulfillment split, shipment, carrier callback order, duplicate, correction, exception, return, and reconciliation.
- Verify delivery promise history and no fabricated Delivered state.
- Test cancellation before allocation, during fulfillment, after authorization, partial cancellation, failed stop, Refund pending, and retry.
- Verify Order Detail composition under every individual and combined source failure.
- Verify composite status priority and explainability without writing it back.
- Rebuild Orders list, Dashboard, timeline, and Notification projections from source records.
- Test guest access, expiry, deep link, Order claim, conflict, Account restriction, and closure continuity.
- Test notification class, consent, preferences, required messages, deduplication, read state, expiry, and inaccessible destination.
- Test message template schema, injection, sensitive lock-screen content, provider failure, bounce, complaint, retry, and reconciliation.
- Test Brazilian Portuguese timelines, dates, delivery ranges, message expansion, pluralization, and correction language.
- Test keyboard, screen reader, zoom, focus, live invalidation, timeline semantics, tracking, Account priority, and Notification Center.

## Consequences

### Benefits

- Every post-purchase fact retains one accountable owner.
- Partial payment, shipment, cancellation, return, and communication states stay truthful.
- Account provides coherent continuity without a duplicate data authority.
- Notifications cannot become false proof or an authorization token.
- Projections support responsive experiences and are rebuildable.

### Costs and risks

- Order Detail composition and status projection require careful contracts.
- Fulfillment and provider events are eventually consistent and noisy.
- Cancellation spans several owners and needs durable compensation.
- Account and Notification projections require reconciliation.
- Required communication failure needs operational response without blocking source transactions.

## References

- [Account and Post-Purchase Architecture](../03-product-structure/04-account-architecture.md)
- [Account and Post-Purchase Patterns](../04-design-system/18-account-and-post-purchase-patterns.md)
- [System States](../03-product-structure/08-error-empty-and-degraded-states.md)
- [Domain Modules and Transaction Boundaries](10-domain-modules-and-transaction-boundaries.md)
- [Cart, Checkout, Payments, and Order Creation](18-cart-checkout-payments-and-order-creation.md)
- [Authorization and Policy Enforcement](13-authorization-and-policy-enforcement.md)
- [ADR-0025: Federated Post-Purchase Continuity](../adrs/ADR-0025-federated-post-purchase-continuity.md)

