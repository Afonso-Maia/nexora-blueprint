# Cart, Checkout, Payments, and Order Creation

**Status:** Approved

## Purpose

This document defines Cart persistence, merge and correction, one adaptive Checkout, payment-provider integration, synchronous and asynchronous payment profiles, order creation, idempotency, compensation, reconciliation, security, and failure behavior.

It preserves Purchase ownership of Cart, Checkout, and Order; Payments ownership of payment attempts; one unified Checkout page; provider-bound credentials; and commitment to the exact reviewed Commercial Snapshot.

## Decision

Use:

- Server-authoritative guest and customer Carts
- One Purchase-owned Checkout Session and versioned module state
- A durable Purchase Checkout Operation as the workflow coordinator
- Provider-hosted or provider-tokenized payment collection
- A Payments module with provider-neutral intents, attempts, and adapters
- Explicit payment-method execution profiles
- No distributed transaction with a payment provider
- The approved local atomic Order-creation transaction for authoritative core state
- Idempotent provider commands, signed webhook ingestion, compensation, and reconciliation
- An Order only when Purchase has durably committed an authoritative order outcome

For immediate-authorization methods, obtain a usable payment authorization before Order creation, then atomically create the Order and consume local commercial holds. If local commitment fails after authorization, Payments voids or reverses the authorization through a durable compensation.

For approved asynchronous methods, Purchase may create an Order in an explicit pending-payment state only after the payment instrument or provider intent is valid and the method profile defines reservation, expiry, cancellation, and customer-obligation behavior. A pending payment is never presented as paid.

## Viable approaches considered

### Durable Checkout orchestration with compensation

Purchase coordinates source validations and Payments through persisted steps. Local Order state commits atomically; remote payment work is idempotent and reconciled.

This is approved because a third-party payment transaction cannot participate reliably in Nexora's database transaction. A durable workflow makes every uncertain boundary visible and recoverable.

### Synchronous request chain

Place Order could call Pricing, Inventory, Payments, and Purchase in one long HTTP request and treat any timeout as failure.

This is not approved because it cannot distinguish provider success from lost response, encourages duplicate payment, and cannot safely recover partial outcomes.

### Create every Order before payment

Purchase could create an Order immediately and then attempt payment.

This simplifies correlation but fills Order history with synchronous declines and contradicts the approved rejected-before-order path. It remains appropriate only for payment profiles where a genuine pending-payment Order is the customer obligation.

## Ownership boundaries

### Purchase owns

- Cart and Cart Line
- Guest and customer Cart association
- Cart merge and correction
- Checkout Session and module applicability
- Checkout validation and reviewed version
- Checkout Operation
- Order identity, lifecycle, item and commercial snapshot
- Order-creation idempotency
- Promotion Application, holds, and claims
- Coordination of Compatibility, Pricing, Inventory, Fulfillment, Payments, Customer, Legal, and Notifications

### Payments owns

- Payment Intent
- Payment Attempt
- Payment-method profile
- Provider adapter and references
- Tokenized instrument reference used for the transaction
- Authorization, customer action, capture, void, cancellation, refund, and provider outcome mapping
- Payment risk and provider-assurance context
- Webhook receipt, deduplication, and reconciliation

### Other owners retain

- Pricing owns Price Quotes and monetary effects.
- Inventory owns availability and Reservations.
- Compatibility owns evaluation.
- Fulfillment owns delivery option, cost inputs it controls, capacity, and promise.
- Customer owns saved addresses and payment preference labels, not transaction truth.
- Identity and Security own authentication and assurance.
- Legal owns applicable terms, disclosure, and consent requirements.
- Notifications owns message delivery.

Purchase snapshots source facts needed to preserve the Order but does not become their mutable authority.

## Cart identity

Every Cart has:

- Stable opaque identifier
- Owner class: guest or customer
- Owner association
- Lifecycle
- Currency and market
- Revision
- Created, updated, and expiry times
- Lines and groups
- Promotion state
- Last Commercial Snapshot reference
- Source-correction state

A browser cookie or session contains only an opaque Cart association, not the Cart contents or authority.

Guest Cart access is bound to the Customer Experience session and a server-side possession secret. Guessing a Cart identifier is insufficient. Signing in invokes an explicit merge policy rather than changing the owner column blindly.

## Cart Line

A Cart Line contains:

- Stable line identifier
- Product and selected Variant
- Quantity
- Optional PC Build group and component reference
- Offer or promotion intent reference
- Customer-entered configuration needed for the line
- Last confirmed Catalog, Price, Inventory, and Compatibility references
- Correction and availability state
- Revision

Displayed names, prices, and stock are projections. Quantity is Purchase-owned composition; Variant eligibility, price, stock, and Compatibility are revalidated with their owner.

The same Variant can remain separate lines only when a governed configuration, service, promotion, Build, or fulfillment distinction requires it. Otherwise the Cart combines quantities deterministically.

## Cart operations

Add, update quantity, remove, save-for-later handoff, apply promotion, and convert Build use:

- Expected Cart revision
- Operation idempotency key
- Source references
- Explicit quantity and configuration

The server:

1. Reauthorizes Cart access.
2. Validates request and Product/Variant identity.
3. Obtains required current source results.
4. Applies the Cart mutation in one Purchase transaction.
5. Records an outbox event.
6. Recalculates a Commercial Snapshot.
7. Returns per-line corrections and the new Cart revision.

Optimistic UI can acknowledge intent but does not display an unconfirmed total as authoritative.

Build-to-Cart conversion is atomic at Purchase composition level: either the valid requested component set is represented as the Build group or no partial group is added. Source corrections return to the Engineering Workspace without losing the Build.

## Cart correction model

Corrections are typed:

- Variant unavailable or retired
- Quantity invalid or exceeds availability
- Price changed or unavailable
- Promotion rejected, expired, or changed
- Compatibility Warning, Incompatible, Unknown, or stale
- Product or Build group changed
- Delivery restriction discovered
- Source capability unavailable

A correction records affected line or group, prior confirmed context, current source result, whether Checkout is blocked, and eligible actions.

Unrelated valid lines remain intact. Nexora never silently substitutes a Variant, lowers quantity, accepts a Warning, removes a promotion, or replaces a Build component.

## Cart persistence and expiry

Guest and customer Carts are durable server records.

- Guest Cart lifetime and customer Cart inactivity policy are governed configuration.
- Expiry removes active shopping continuity but follows retention and audit rules.
- Carts do not hold inventory by default.
- Price and availability are refreshed at risk-appropriate boundaries.
- Multi-tab edits use revision conflicts and push or poll invalidation.
- Offline clients can retain an intent draft but cannot authoritatively mutate Cart until reconnected.

## Sign-in merge

When a guest with a Cart signs in and a customer Cart already exists, Purchase performs a governed merge:

1. Loads both Carts and verifies ownership.
2. Creates a fixed merge proposal.
3. Combines equivalent lines and preserves distinct configurations.
4. Revalidates quantity, promotion, Compatibility, price, and inventory.
5. Identifies conflicts and changed totals.
6. Requires explicit customer review where intent or benefit changes.
7. Commits once with an idempotent merge identity.
8. Archives the guest Cart as merged without deleting evidence.

The merge cannot duplicate Promotion usage, Reservation, optional additions, or Checkout commitment. An active Checkout is not merged silently.

## Checkout Session

Proceed to Checkout creates or resumes one Purchase-owned Checkout Session bound to:

- Cart identifier and revision
- Guest or customer identity context
- Market and currency
- Applicable module set
- Contact
- Delivery address
- Delivery method
- Payment selection
- Financing selection where approved
- Promotions
- Optional additions
- Consent versions
- Commercial Snapshot
- Reservation and expiry state
- Checkout revision

Checkout is one adaptive page, not route-based steps. Modules can update independently, but every material update increments the server Checkout revision and invalidates affected downstream modules.

## Module dependency graph

Checkout declares explicit dependencies rather than resetting every field.

Examples:

- Cart change invalidates price, promotions, inventory, delivery, Compatibility, payment amount, and review.
- Address change invalidates delivery eligibility, promise, cost, applicable tax treatment where owned, and potentially inventory pool.
- Delivery change invalidates totals and payment amount.
- Promotion change invalidates Pricing, totals, and payment amount.
- Payment-method change can invalidate financing terms, conditional Pricing, assurance, and consent.
- Identity or assurance change can invalidate saved-resource access and risk decisions without erasing valid public inputs.

Each module reports Valid, Incomplete, Invalid, Recalculating, Unavailable, or Superseded with source evidence.

## Checkout recalculation

Recalculation is a durable, idempotent application operation when it crosses multiple sources.

It:

1. Freezes the expected Cart and Checkout revisions.
2. Resolves current Catalog eligibility.
3. Evaluates Compatibility.
4. Evaluates Promotion eligibility and holds.
5. Obtains Price Quotes.
6. Resolves Inventory availability and Reservations when eligible.
7. Obtains Fulfillment options and selected quote.
8. Resolves applicable Legal consent versions.
9. Produces the new Commercial Snapshot and module states.
10. Commits the Checkout revision.

Results based on superseded input are discarded with correlation evidence. The UI retains the last confirmed state as visibly stale while a new calculation is pending.

## Reviewed transaction

Checkout becomes reviewable only when all commitment-required modules are valid.

The reviewed version contains:

- Checkout revision and digest
- Cart revision
- Exact Commercial Snapshot
- Contact and identity class
- Delivery address snapshot
- Fulfillment selection and promise
- Payment-method profile and amount
- Financing terms and eligibility references where applicable
- Optional additions and explicit consent
- Legal terms and consent versions
- Reservation, Quote, Promotion, and Compatibility references
- Expiry and revalidation boundaries

Editing a material field creates a new version and revokes reviewed status. Place Order names the exact final amount and binds to this version.

## Payment integration posture

Use a provider-neutral Payments port with one primary provider adapter initially. A second provider is added only for a durable method, availability, commercial, or risk requirement—not as speculative abstraction.

The port supports:

- Create or update Payment Intent
- Tokenize or attach provider-bound instrument
- Start required customer action
- Confirm or authorize
- Query status
- Capture
- Void or cancel
- Refund
- Receive and verify provider event
- Reconcile

Nexora's domain model is provider-neutral, but the adapter preserves provider-specific evidence and outcome detail privately.

## Payment credential handling

Prefer provider-hosted fields, hosted components, or redirect flows so raw card and bank credentials go directly from the customer agent to the compliant payment provider.

Nexora stores only:

- Provider and merchant-account reference
- Provider token or instrument reference
- Customer-safe brand, type, and masked display
- Expiry metadata where permitted
- Consent and preference association
- Transaction references

Nexora application servers, logs, analytics, support tools, and databases must not receive or store PAN, CVV, banking secrets, or authentication codes when provider tokenization can prevent it.

Provider scripts and frames are constrained by content-security, integrity or provider-origin policy, privacy review, monitoring, and an accessible fallback.

## Payment Intent

A Payment Intent is Nexora's authoritative payment-operation aggregate.

It contains:

- Stable identifier
- Checkout and potential Order reference
- Payment-method profile
- Amount and currency
- Commercial Snapshot digest
- Instrument token reference
- Provider and merchant account
- State
- Required customer action
- Attempt identities
- Idempotency and correlation
- Provider status and reconciliation state
- Expiry

Updating amount or material context creates a new attempt or provider operation according to the method profile. A provider-side mutable intent cannot silently authorize a superseded Checkout amount.

## Payment Attempt

Every provider command creates or resumes one Payment Attempt with:

- Attempt identifier
- Intent
- Command type
- Expected prior state
- Amount
- Provider idempotency key
- Request digest
- Started time
- Response or timeout
- Provider reference
- Mapped outcome
- Reconciliation state

Timeout yields Unknown or Pending, never automatic failure. Retrying with the same intent and command identity queries or resumes the original attempt before considering a new one.

## Payment states

The normalized state model distinguishes:

- Created
- Requires instrument
- Requires customer action
- Processing
- Authorized
- Captured
- Declined
- Canceled
- Voided
- Partially refunded
- Refunded
- Unknown
- Reconciliation required

Provider statuses map through versioned adapters. Unknown provider states fail closed and alert; they do not map to Declined or Paid by convenience.

Authorized and Captured are distinct even if a method combines them.

## Payment-method execution profiles

Every launched method declares:

- Synchronous or asynchronous confirmation
- Authorization and capture capabilities
- Customer-action model
- Provider expiry
- Inventory Reservation policy
- Promotion Hold policy
- Whether a pending-payment Order is allowed
- Cancellation and refund behavior
- Retry safety
- Webhook and polling behavior
- Assurance, Legal, accessibility, and localization requirements

The architecture does not silently apply card semantics to PIX, boleto, financing, wallet, or another method. The exact launch methods require provider and Legal approval.

## Immediate-authorization profile

For a method that can authorize before Order creation:

1. Place Order creates the durable Checkout Operation.
2. Purchase validates the reviewed Checkout.
3. Payments creates or confirms the Payment Intent idempotently.
4. The customer completes required provider action.
5. Payments reaches Authorized or an equivalent commitment-ready result.
6. Purchase revalidates Snapshot expiry and local holds.
7. Purchase commits the Order transaction.
8. Payments captures immediately or later according to the approved method and fulfillment policy.

If authorization is declined before step 7, no Order is created. Checkout remains available for correction.

If step 7 fails after authorization, the workflow issues an idempotent void. Until void is confirmed, the Checkout Operation is Indeterminate or compensating and the customer is not invited to pay again.

## Asynchronous-payment profile

For an approved method whose outcome arrives later:

1. Validate reviewed Checkout and method eligibility.
2. Create the Payment Intent and provider payment request.
3. Confirm that provider creation and customer instructions are durable.
4. Revalidate required local holds.
5. Atomically create an Order in Pending payment and consume or transform holds according to the method policy.
6. Present Order Confirmation with the payment obligation and expiry.
7. Apply signed provider events or reconciliation to transition payment and Order state.
8. Cancel or expire unpaid Orders and release allocations through a durable workflow.

An asynchronous method is launched only if Inventory and Promotion policies can support its payment window. A provider request alone does not create an Order if its local commit cannot complete.

## Financing profile

Financing selection and provider application remain distinct from approval.

- Applicable Legal terms are visible before selection.
- Customer financial data remains provider-bound where possible.
- Eligibility and approval status are provider and Payments facts.
- Price, installment, interest, total financed amount, and validity bind to the reviewed Snapshot.
- A pending financing decision follows an explicit method profile.
- Decline preserves other eligible payment choices and non-sensitive Checkout state.

No financing method launches without complete Brazilian legal, privacy, accessibility, cancellation, and reconciliation contracts.

## Customer action and return

Redirect, challenge, 3-D Secure, wallet, or bank authorization uses:

- Allowlisted return and webhook endpoints
- State, nonce, session, Payment Intent, and attempt binding
- One-time continuation
- Current Checkout reauthorization
- Non-disclosing errors
- Safe cross-device or app-switch recovery where the provider supports it

Returning to Nexora does not prove payment success. Payments verifies through the provider API or authenticated event.

The UI preserves focus and intent, explains provider transitions, and offers an accessible alternative when a third-party component fails to meet the required path.

## Checkout Operation

Place Order creates one durable operation with:

- Operation identifier
- Checkout and reviewed revision
- Idempotency key
- Actual subject and guest/customer context
- Commercial Snapshot digest
- Payment Intent
- Current step
- Attempts
- Deadlines
- Compensation state
- Order reference when committed
- Final outcome

The operation state can be:

- Validating
- Customer action required
- Payment processing
- Ready to commit
- Committing
- Order created
- Declined before Order
- Validation correction required
- Compensating
- Pending
- Indeterminate
- Failed safely

Refreshing, reopening, or retrying Place Order reads this operation. It cannot start a second workflow with the same idempotency identity.

## Local Order-creation transaction

The registered local transaction:

- Confirms no Order exists for the Checkout Operation
- Rechecks expected Checkout and Commercial Snapshot revisions
- Creates the Purchase Order
- Stores immutable customer-safe Product/Variant and commercial snapshots
- Claims Promotion Redemption Holds
- Consumes Inventory Reservations into allocations
- Stores Compatibility evidence
- Records applicable consent acceptance
- Links the Payment Intent and current payment state
- Records outbox events

The transaction uses narrow registered cross-module access as approved in the data architecture. Failure rolls back all local changes.

Provider calls, notifications, search indexing, analytics, and remote fulfillment calls do not occur inside the transaction.

## Order snapshot

At creation, the Order records:

- Stable Order identifier and human reference
- Guest or customer access association
- Product, Variant, quantity, and PC Build grouping
- Product names and decisive attributes as reviewed
- Unit, line, discount, delivery, optional addition, fee, tax classification, and total amounts
- Currency and rounding
- Promotion evidence
- Compatibility evidence
- Delivery address and selection snapshot
- Payment Intent and state
- Legal consent and policy versions
- Source identifiers and revisions
- Order-creation operation

The snapshot preserves what was purchased and reviewed. It is not a mutable copy of Catalog, Pricing, Inventory, or Legal truth.

## Order creation outcome

Order Confirmation appears only after the local Order transaction commits.

The response distinguishes:

- Order created and payment Authorized
- Order created and payment Captured
- Order created with payment Pending
- Order created with another downstream obligation Pending
- No Order; payment Declined
- No Order; validation correction required
- Outcome Indeterminate and under reconciliation

An Order existing with a pending payment is truthful only for a method profile that permits it. A synchronous decline does not create a placeholder Order.

## Capture posture

Capture timing is a governed payment-method and fulfillment policy.

Possible profiles include:

- Immediate authorization and capture
- Authorization at Checkout and capture after allocation or fulfillment milestone
- Asynchronous payment with provider-confirmed settlement

The architecture does not select one rule for every method. Each profile defines authorization expiry, partial capture, split fulfillment, cancellation, void, refund, and reconciliation consequences.

Capture command is idempotent and amount-bound. A retry never captures more than the approved amount.

## Provider events

Provider webhooks are untrusted asynchronous inputs.

The ingress:

1. Preserves bounded raw evidence.
2. Verifies signature, endpoint, merchant account, timestamp, and replay policy.
3. Deduplicates provider event identity.
4. Maps the event through the versioned adapter.
5. Locks or compare-and-sets the Payment aggregate.
6. Rejects invalid state regression.
7. Records an inbox entry and resulting outbox event atomically.
8. Acknowledges independently of downstream workflow completion.

Event arrival order is not trusted. When status is ambiguous or consequential, Payments queries the provider's authoritative API.

## Reconciliation

Payments reconciles:

- Nexora Intents and Attempts against provider transactions
- Authorized or captured payment without Order
- Order marked paid without provider evidence
- Duplicate, excess, partial, or wrong-currency capture
- Void or refund pending too long
- Unknown provider state
- Missing or duplicated webhook
- Asynchronous payment after Order expiry or cancellation

Purchase reconciles:

- Checkout Operation to zero or one Order
- Order to Commercial Snapshot
- Order to Inventory allocation
- Order to Promotion claim
- Order to Payment Intent

Repair uses an idempotent governed command and retains before-and-after evidence. Operators cannot directly edit a paid flag or provider reference.

## Compensation

Compensations are explicit workflow steps:

- Void authorization after local Order commit failure
- Release Reservation after declined or abandoned Checkout
- Release Promotion Hold
- Cancel provider payment request
- Cancel expired pending-payment Order
- Restore inventory allocation through Inventory movement
- Initiate Refund for an approved post-commit reversal

Compensation can fail and remains Pending with alerts and reconciliation. It is not represented as rollback of a remote transaction.

## Idempotency

Idempotency scopes include:

- Cart mutation
- Cart merge
- Checkout recalculation
- Reservation operation
- Promotion Hold
- Payment Intent creation
- Payment command and attempt
- Place Order
- Local Order creation
- Capture, void, cancel, and refund
- Provider event

Keys bind to subject or session, operation, target, and request digest. Reusing a key with different input is a conflict.

Provider adapters use stable derived provider keys and persist the mapping before or with the call when the provider contract permits.

## Timeouts and expiry

Checkout coordinates distinct expiries:

- Session inactivity and absolute lifetime
- Price Quote
- Inventory Reservation
- Promotion Hold
- Delivery quote
- Payment provider intent or customer action
- Assurance
- Reviewed transaction

The earliest material expiry controls commitment eligibility. Checkout warns accessibly, attempts only policy-approved renewal, and preserves unaffected inputs.

Server time is authoritative. A client countdown is presentation and cannot extend a hold.

## Security and compliance

- Reduce payment-data scope through provider tokenization.
- Separate provider public configuration from server credentials.
- Store secrets in the platform secret manager and rotate them.
- Use distinct provider accounts or keys by environment.
- Prohibit production payment credentials and webhooks in local development.
- Apply strict CSP and controlled third-party origins to payment pages.
- Redact tokens, payment data, return parameters, and provider payloads from logs.
- Restrict payment, refund, export, and reconciliation fields and capabilities.
- Require reason, assurance, segregation, and audit for manual payment actions.
- Protect Checkout against CSRF, session fixation, amount tampering, replay, and clickjacking.

PCI DSS scope, Brazilian consumer, privacy, tax, financing, invoice, and payment-method obligations require specialist validation before launch. Engineering architecture does not invent compliance values.

## Privacy

Checkout collects only data required for the applicable modules.

- Contact and address are purpose-bound.
- Provider risk fields are minimized and documented.
- Payment method display data is separated from raw provider evidence.
- Guest Order access does not require account creation.
- Abandoned Checkout retention and deletion are governed.
- Analytics excludes payment secrets and unnecessary form values.
- Session replay tooling is disabled or rigorously masked on Checkout and payment surfaces.

## Accessibility

- Provider components must expose programmatic labels, focus, error, and status.
- Required customer action is explained before redirect or challenge.
- Timeouts warn without relying on color, animation, or rapid countdown.
- Returning focus targets the affected module or final outcome.
- Error summary links to Cart or Checkout corrections.
- Sticky Place Order exposes the current exact total and disabled reason.
- Pending state prevents duplicate pointer and keyboard activation.
- Cross-device, wallet, QR, or app-switch flows provide accessible instructions and status refresh.
- Payment-method alternatives remain operable at 200% zoom, high contrast, keyboard, screen reader, reduced motion, and mobile viewport.

An inaccessible provider flow blocks that method's launch unless an equivalent approved alternative meets the same customer outcome.

## Degraded behavior

### Optional capability failure

AI, recommendations, reviews, and nonessential media degrade without blocking Checkout.

### Source validation failure

Missing current price, inventory, required Compatibility, delivery, consent, or total blocks only unsafe commitment and preserves the Checkout.

### Payment provider unavailable

- Existing provider outcome is reconciled before retry.
- A new payment attempt is not sent blindly.
- Other approved payment methods may remain available.
- Checkout preserves non-sensitive valid input.
- Pending or Indeterminate status names that no duplicate action should be taken.

### Webhook delay

Polling and reconciliation can establish provider status. Absence of a webhook is not a decline.

### BFF or browser interruption

The Checkout Operation continues durably. Reopening restores authoritative state and does not repeat provider action.

### Order commit failure after payment authorization

No Order is shown. The operation enters compensation, voids the authorization, and prevents another attempt until resolution or a safely new reviewed transaction.

## Observability

Measure:

- Cart mutation and merge conflicts
- Cart correction categories
- Checkout module invalidation and recalculation latency
- Reviewed-version churn and expiry
- Place Order attempts and duplicate suppression
- Provider action, decline, challenge, timeout, and unknown rates
- Authorization-to-Order latency
- Payment authorization without Order
- Order without expected payment evidence
- Compensation and reconciliation backlog
- Webhook signature failure, duplication, lag, and state regression
- Reservation and Promotion Hold expiry during payment
- Checkout abandonment by module and accessible path

Trace Cart, Checkout, Commercial Snapshot, Checkout Operation, Payment Intent, Attempt, provider transaction, Order, Reservation, Promotion, and notification with correlation identifiers.

Metrics do not contain raw card data, personal form values, tokens, codes, or unrestricted provider messages.

## Quality gates

Before release:

- Test guest and customer Cart identity, expiry, multi-tab conflict, and sign-in merge.
- Test every Cart correction and Build-to-Cart atomicity.
- Test Checkout dependency invalidation without erasing unrelated modules.
- Bind Place Order to exact reviewed amount, consent, Quotes, Reservations, and revisions.
- Prove one Checkout Operation creates at most one Order.
- Prove provider retries cannot duplicate authorization, capture, void, or refund.
- Race-test Snapshot expiry, Reservation expiry, payment callback, Order commit, and browser retry.
- Test immediate, customer-action, asynchronous, decline, timeout, unknown, and late-success profiles.
- Verify webhook signature, replay, order inversion, unknown status, and reconciliation.
- Exercise authorization-without-Order compensation and late asynchronous payment after cancellation.
- Verify no prohibited payment data reaches servers, logs, analytics, support, screenshots, or test fixtures.
- Test provider sandbox contract and deterministic local fake adapter.
- Test Brazilian Portuguese money, terms, errors, date/time, payment instructions, and customer-safe provider outcomes.
- Test keyboard, screen reader, zoom, contrast, mobile, reduced motion, timeout warning, redirect return, focus restoration, and duplicate activation.

## Consequences

### Benefits

- One Checkout remains coherent while each source retains authority.
- Durable operations survive browser, BFF, and provider uncertainty.
- Synchronous declines do not create false Orders.
- Approved asynchronous methods can create truthful pending-payment Orders.
- Provider tokenization minimizes sensitive payment-data exposure.
- Exact snapshot binding makes retries and customer review defensible.

### Costs and risks

- Checkout orchestration, expiration, compensation, and reconciliation are complex.
- Payment-method profiles require method-specific product and Legal work.
- Provider-hosted UI can constrain accessibility and presentation.
- Authorization before local commit creates a small compensation window.
- Pending-payment Orders require inventory and expiry policy.

## References

- [Cart and Checkout Patterns](../04-design-system/17-cart-and-checkout-patterns.md)
- [Page Relationships and Domain Ownership](../03-product-structure/02-page-relationships-and-ownership.md)
- [System States](../03-product-structure/08-error-empty-and-degraded-states.md)
- [Domain Modules and Transaction Boundaries](10-domain-modules-and-transaction-boundaries.md)
- [State Ownership and Restoration](08-state-ownership-and-restoration.md)
- [API and Backend-for-Frontend Strategy](09-api-and-bff-strategy.md)
- [Identity, Sessions, Authentication, and Assurance](12-identity-sessions-authentication-and-assurance.md)
- [Pricing, Promotions, Inventory, and Availability](17-pricing-promotions-inventory-and-availability.md)
- [ADR-0024: Durable Checkout Orchestration and Provider-Tokenized Payments](../adrs/ADR-0024-durable-checkout-orchestration-and-provider-tokenized-payments.md)

