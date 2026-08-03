# Pricing, Promotions, Inventory, and Availability

**Status:** Approved

## Purpose

This document defines authoritative price calculation, promotion collaboration, stock accounting, availability, reservation, commercial snapshots, publication, reconciliation, and degraded behavior.

It preserves separate source ownership while giving Cart and the unified Checkout a coherent, versioned contract. Displayed price or availability is not a purchase guarantee; commitment binds to explicit current quotes and reservations.

## Decision

Use three coordinated authorities:

- **Pricing** calculates immutable, expiring Price Quotes from versioned price assignments, schedules, and rules.
- **Inventory** calculates availability from authoritative stock positions and owns expiring Reservations.
- **Purchase** evaluates and applies Marketing-owned Promotion Definitions to Cart and Checkout, using Pricing for every authoritative price effect.

Purchase composes these outputs into a versioned **Commercial Snapshot** for Cart and Checkout. A reviewed Checkout commitment references the exact snapshot, Price Quotes, Promotion Applications, Compatibility evaluation, delivery selection, and Inventory Reservations.

Use exact decimal or integer-minor-unit arithmetic, explicit currency and rounding, deterministic rule precedence, optimistic concurrency, idempotent reservation operations, transactional outbox events, and recurring reconciliation.

Cart uses refreshable estimates and does not hold inventory by default. Checkout creates bounded reservations only after the customer has a valid purchasable composition and retains them through visible expiry and governed renewal. Order creation atomically consumes valid reservations through a registered local transaction boundary.

## Viable approaches considered

### Versioned quotes and bounded reservations

Pricing issues immutable quotes; Inventory issues expiring reservations; Purchase binds a reviewed snapshot and revalidates at commitment.

This is approved because it makes changed price, promotion, stock, and unknown outcomes explicit while minimizing oversell and avoiding indefinite Cart holds.

### Live recalculation without durable quotes or reservations

Checkout could read current price and stock at each screen update and attempt purchase directly.

This is simpler but cannot prove what was reviewed, distinguish display from guarantee, safely retry order creation, or control concurrent stock consumption. It is not approved.

### Early Cart reservation

Inventory could be reserved as soon as an item enters Cart.

This can reduce late stock loss but creates hoarding, abandoned holds, poor fairness, and unnecessary capacity pressure. It is not the default. Scarce releases or appointment-like inventory require a separately governed reservation policy.

## Ownership boundaries

### Pricing owns

- Price Assignments
- Price books and applicability
- Price Rules and precedence
- Price Schedules and effective periods
- Exact price calculation and rounding
- Price Quote identity, content, expiry, and explanation
- Price history and correction
- Price projections for Search and merchandising
- Nexora-owned financing presentation inputs

Pricing does not own Product identity, stock, Promotion editorial definition, Cart eligibility, payment authorization, or orders.

### Marketing owns

- Promotion identity and Definition
- Customer-facing name, benefit intent, required action, and presentation
- Targeting intent and eligible Catalog or Marketing scope
- Schedule, campaign, and publication
- Promotion lifecycle and editorial expiry

Marketing cannot make a discount authoritative, reserve stock, or apply a promotion to a Cart.

### Purchase owns

- Promotion eligibility in Cart and Checkout
- Combination, code, customer, quantity, order, usage, and redemption rules
- Promotion Application and removal
- Limited-redemption holds and claims where required
- Commercial Snapshot composition
- Cart and Checkout correction behavior
- Order commercial snapshot

Purchase asks Pricing to calculate the authoritative monetary effect. It does not implement shadow arithmetic.

### Inventory owns

- Stock Position and location or logical pool
- Stock movement and Adjustment
- Holds and sellability classification
- Available-to-promise calculation
- Availability result and confidence
- Reservation creation, renewal, release, consume, and expiry
- Source precedence and reconciliation
- Oversell and backorder policy within approved commerce rules

Inventory does not own Cart lines, orders, Product facts, price, or Fulfillment lifecycle.

### Other owners

- Catalog owns Variant identity and sellability inputs.
- Compatibility owns deterministic configuration eligibility.
- Fulfillment owns delivery methods, capacity, promise, and shipment lifecycle.
- Payments owns payment attempts and provider outcomes.
- Legal owns applicable price, promotion, financing, tax, and disclosure policy meaning.
- Audit records decisions without becoming commercial truth.

## Money contract

Every monetary value contains:

- ISO 4217 currency code
- Exact integer minor units or constrained exact decimal
- Tax inclusion classification
- Rounding mode and stage
- Calculation component
- Source and version

BRL is the primary launch currency. Supporting another currency or market requires explicit product, tax, payment, Legal, fulfillment, and localization review.

Binary floating point is prohibited for calculation, comparison, persistence, events, and contract generation.

Rounding occurs at documented component boundaries. Re-summing already rounded presentation text is prohibited. The quote exposes authoritative component and total values, and the UI formats them through Brazilian Portuguese localization.

## Pricing model

### Price Assignment

A Price Assignment binds:

- Variant or governed Product scope
- Price book
- Currency
- Base or direct sell amount
- Effective interval
- Applicability scope
- Source and provenance
- Version and lifecycle

Intervals use explicit inclusive/exclusive boundary semantics. Overlapping assignments for the same precedence class are rejected unless a registered rule resolves them deterministically.

### Price Rule

A Price Rule defines a constrained monetary transformation or selection, such as an approved payment-condition price, quantity tier, or Promotion effect.

It declares:

- Stable identifier and immutable version
- Applicability
- Inputs and source owners
- Calculation type
- Precedence and combination class
- Caps, floors, and bounds
- Currency and rounding
- Explanation components
- Effective interval
- Approval and simulation evidence

Rules use a typed, bounded calculation model. Arbitrary scripts, dynamic database queries, provider callbacks during pure calculation, and AI-generated values are prohibited.

### Price Schedule

A schedule activates an approved Assignment or Rule at a defined instant. Activation is idempotent and records the exact version. Schedule processing cannot silently choose a different draft.

Conflicting schedules fail validation before activation. If runtime activation fails, the previous valid price remains current and the intended change becomes an explicit incident; no partial product population is implied complete.

## Pricing precedence

Pricing evaluates a versioned plan with deterministic precedence.

At a high level:

1. Resolve eligible base Price Assignment.
2. Apply required authoritative adjustments.
3. Evaluate compatible Promotion effects requested by Purchase.
4. Apply approved conditional-payment or financing presentation calculations.
5. Enforce floors, caps, rounding, and disclosure components.

The concrete rule order is governed Pricing data and cannot derive from creation time, database row order, highest discount alone, or UI placement.

Every applied and rejected component is explainable. A Rule cannot use `priority` as an unreviewed escape from a semantic conflict.

## Price Quote

A Price Quote is an immutable Pricing-owned result.

It contains:

- Quote identifier
- Subject or anonymous applicability class where needed
- Variant, quantity, and market context
- Currency
- Base amount
- Applied and rejected price components
- Promotion effect references
- Unit and line totals
- Tax and fee classification where owned
- Rounding evidence
- Price Assignment, Rule, and schedule versions
- Input revisions
- Issued time and expiry
- Revalidation triggers
- Explanation contract

A quote is audience- and purpose-bound. A Search projection, Product Detail quote, Cart quote, and Checkout quote can have different freshness requirements and eligible context.

Possession of a Quote identifier does not authorize its use. Pricing validates binding, expiry, quantity, Variant, customer or guest context, currency, and purpose.

## Price guarantee

Quote expiry defines the bounded period in which Pricing will honor the calculated price for its declared purpose, subject to explicit invalidating conditions.

- Product and Search display can use non-guaranteed projections with freshness.
- Cart quotes are refreshable and do not guarantee future Checkout.
- Checkout quotes are commitment-eligible until their explicit expiry.
- A changed quote is never silently substituted at Place Order.
- If a quote expires, Checkout recalculates and returns the customer to review with a focused price-change explanation.

Exact durations are governed operational policy. Countdown behavior follows accessibility requirements and warns before expiry without manufactured urgency.

## Price history and correction

Pricing retains effective price history required for customer explanation, promotion evidence, operational investigation, and applicable Brazilian policy.

Corrections:

- Never rewrite an activated historical version invisibly
- Create a governed successor or correction record
- Identify affected quotes, Carts, Checkouts, orders, promotions, Search documents, and reporting
- Distinguish erroneous display, erroneous quote, and committed order
- Route customer remedy and legal consequences to their owning domains

The architecture does not invent legal reference-price periods or display policy values; Legal and commercial governance supply them.

## Promotion Definition

A Marketing Promotion Definition contains:

- Stable identity and version
- Customer-facing content and presentation references
- Targeting intent
- Product, Category, Brand, Collection, or campaign scope
- Required code or explicit activation
- Intended benefit class
- Schedule
- Public terms and Legal reference
- Publication and lifecycle

It is not by itself a discount calculation or Cart eligibility decision.

## Promotion execution contract

An approved promotion becomes executable only when coordinated versions exist:

- Marketing Definition
- Pricing effect Rule
- Purchase eligibility and combination policy
- Inventory impact acknowledgment where required
- Legal terms and consent reference where applicable

The executable Promotion Program records these exact versions and activation state. Activation is blocked if any required component is missing, expired, incompatible, or unapproved.

No module creates a duplicate full Promotion record. Each authority retains its component and the Program references them.

## Promotion eligibility

Purchase evaluates:

- Cart and line composition
- Customer, guest, segment, or channel eligibility
- Code status
- Quantity and spend thresholds
- Product and Variant eligibility
- Usage and redemption limits
- Combination and exclusion rules
- Schedule
- Delivery or payment conditions where approved
- Current program versions

Targeting intent from Marketing is not sufficient proof. Sensitive inferred traits and Support or payment hardship data cannot become hidden eligibility inputs.

The evaluation returns applied, eligible-not-applied, rejected, exhausted, expired, conflicted, pending, or unavailable with a stable reason category.

## Promotion combination

Combination policy is an explicit graph or matrix, not incidental rule ordering.

- Each Program declares stack class and exclusions.
- Customer-entered codes are preserved through recoverable failure.
- The engine evaluates eligible combinations deterministically.
- If several combinations are permitted, customer-benefit selection follows a governed objective and explains the applied set.
- A hidden lower-benefit selection for margin is prohibited.
- Automatic and code-based programs remain distinguishable.
- Removing one promotion triggers authoritative recalculation.

Ambiguous or contradictory combination policy blocks activation.

## Promotion limits and redemption

Purchase owns usage state because it owns application to Cart, Checkout, and order.

Limited programs use:

- A durable Redemption Hold during eligible Checkout
- Explicit expiry and renewal
- Idempotent claim at order commitment
- Release on abandonment, correction, cancellation before claim, or governed rollback
- Reconciliation of holds, claims, orders, and budget or quantity constraints

A Marketing impression or Cart display does not consume a redemption. A code validation response does not guarantee future capacity.

Budget-limited monetary effects coordinate with Pricing evidence. The exact financial ledger owner and accounting integration are later financial-platform decisions; no unowned mutable budget counter is approved.

## Inventory accounting

Inventory uses an append-only movement ledger plus derived current positions.

Movement classes can include:

- Receipt
- Transfer
- Reservation hold
- Reservation release
- Reservation consume
- Order allocation
- Fulfillment deduction
- Return receipt
- Damage or quality hold
- Manual adjustment
- Provider reconciliation correction

Every movement has:

- Stable identifier
- Variant and location or pool
- Signed quantity
- Unit of measure
- Reason code
- Source operation
- Idempotency identity
- Occurred and recorded time
- Actor or workload
- Prior and resulting position version
- Correlation and evidence

Applied movements are immutable. Corrections use compensating movements, not row editing.

The derived Stock Position can be updated transactionally with the ledger for efficient current reads.

## Location and pool model

Inventory can represent physical locations and governed logical pools without making either customer taxonomy.

A Stock Position is identified by:

- Variant
- Location or pool
- Stock disposition

Dispositions distinguish sellable, reserved, allocated, quality hold, damaged, inbound, backordered, and other registered meanings.

The launch topology can begin with a small number of locations or one logical sellable pool. Location expansion does not change Variant identity or permit aggregate stock to promise an impossible shipment.

## Available to promise

Availability is a calculated decision, not the raw on-hand number.

The policy considers versioned components such as:

- Sellable on-hand
- Active reservations
- Allocations
- Safety stock
- Holds and restrictions
- Approved inbound supply
- Backorder policy
- Location and fulfillment eligibility
- Source freshness and confidence

The exact formula is Inventory-owned governed policy. A client cannot calculate it from exposed counts.

Inventory does not expose exact internal quantities publicly by default. It returns an Availability result appropriate to the purpose.

## Availability contract

An Availability result contains:

- Variant and requested quantity
- Destination or location context when known
- Available, Limited, Backordered, Unavailable, Unknown, Stale, or Checking state
- Fulfillable quantity where disclosure is approved
- Location or pool scope
- Confidence and freshness
- Position and policy version
- Expected recheck trigger
- Reservation eligibility
- Customer-safe explanation

Unknown is not Unavailable, and neither is Available.

Product cards can consume a coarse projection. Product Detail uses a fresher Variant-specific query. Cart and Checkout require quantity-aware authoritative evaluation.

Delivery dates remain Fulfillment estimates. Inventory availability alone cannot promise a delivery date.

## Inventory Reservation

A Reservation is an Inventory-owned time-bounded claim against available-to-promise stock.

It contains:

- Reservation identifier
- Checkout or approved operation owner
- Variant, quantity, and location or pool
- Position and policy version
- Status
- Created and expiry time
- Idempotency key
- Renewal policy
- Consumption and release references

Lifecycle:

`Requested → Active → Consumed | Released | Expired | Rejected`

State transitions are compare-and-set and idempotent.

An Active reservation reduces availability according to Inventory policy. Expiry and release restore it exactly once. Consumption converts the hold to the appropriate order allocation without a release gap.

## Reservation timing

Normal Cart does not reserve inventory.

Checkout requests reservations when:

- Items and quantities are valid
- Current Catalog and Compatibility constraints allow continuation
- Destination or pool context is sufficient where required
- The customer has entered the commitment flow

The interface shows reservation expiry and recovery. Activity can renew only within policy; background tab activity alone cannot keep scarce stock indefinitely.

If one line cannot reserve:

- The reservation operation returns per-line outcomes.
- Purchase preserves successful context temporarily while presenting correction.
- Policy determines whether successful sibling reservations remain briefly or release immediately.
- Checkout never claims the whole Cart is reserved after partial failure.

## Order commitment

The reviewed Checkout Commercial Snapshot contains:

- Cart and Checkout revision
- Product and Variant snapshots
- Price Quote identifiers and digests
- Promotion Applications and Redemption Holds
- Inventory Reservation identifiers
- Compatibility evaluation
- Fulfillment selection and quote
- Optional addition quotes
- Currency, components, discounts, fees, tax classification, and final total
- Expiry and invalidation boundaries

Place Order sends the Snapshot revision and idempotency key. Purchase revalidates current authorization, assurance, Checkout state, quote bindings, Promotion holds, Reservations, Compatibility, delivery, consent, and payment preconditions.

The core registers one narrow local transaction for the non-divisible invariant:

- Create the authoritative Order once
- Claim eligible Promotion Redemption Holds
- Consume Inventory Reservations into order allocation
- Store the immutable commercial snapshot
- Record outbox events

Pricing Quotes are immutable validated inputs and do not require Pricing-table mutation.

If the transaction cannot commit, none of these local authoritative changes commit. Remote payment and provider work follow the later Checkout workflow architecture and cannot weaken this invariant.

## Oversell and backorder

Default normal sellable inventory does not permit available-to-promise to become negative.

Oversell requires an explicit Inventory policy by Variant or class with:

- Business justification
- Maximum exposure
- Customer promise and disclosure
- Fulfillment handling
- Monitoring and kill switch
- Approval and review

Backorder is a distinct approved availability mode with expected timing and customer consent. It is not represented as Available and does not use an ordinary on-hand Reservation.

## External inventory sources

Provider, warehouse, ERP, and supplier inputs enter through adapters.

- Authenticate and validate source.
- Map provider identifiers to Nexora Variant and location.
- Enforce source precedence and expected sequence.
- Apply idempotent movements or snapshots.
- Detect gaps, duplicates, reversals, and stale feeds.
- Preserve provider evidence.
- Reconcile against authoritative Nexora positions.

An external snapshot cannot overwrite newer Nexora reservations or allocations. Source adapters translate facts into Inventory operations rather than writing positions directly.

## Search and read projections

Pricing and Inventory publish bounded projections for:

- Product cards
- Product Detail
- Search filtering and sorting
- Category Discovery
- Comparison
- Wishlist
- PC Builder
- Marketing collections
- Admin worklists

Each projection declares:

- Source revision
- Generated and expiry time
- Purpose
- Granularity
- Missing and stale behavior
- Rebuild contract

Search price and availability are discovery signals. Opening a result and performing an action rechecks the source.

Promotional pages suppress or mark programs whose commercial components are unavailable, expired, exhausted, or materially stale. Marketing publication cannot keep an invalid price effect active.

## Publication and change propagation

Pricing, Marketing, Purchase Promotion, and Inventory changes use transactional outbox events.

Events include:

- Price Assignment or Rule activated
- Price projection changed
- Promotion Program activated, paused, exhausted, or expired
- Promotion redemption state changed
- Stock Position changed
- Availability class changed
- Reservation activated, released, expired, or consumed
- Inventory reconciliation exception detected

Events carry owner, aggregate, revision, schema, occurred time, correlation, and changed-field class. Consumers process idempotently and reconcile.

Price and availability changes can be high volume. Event compaction may retain the newest projection revision for read consumers, but reservation, movement, quote, redemption, and order evidence cannot be compacted away.

## Administrative workflows

Pricing lifecycle:

`Draft → Validate → Simulate → Independently review → Approve → Schedule or activate → Observe → Expire or supersede`

Promotion Program lifecycle:

`Draft components → Cross-owner validate → Simulate → Review → Approve → Schedule → Active → Paused | Exhausted | Expired`

Inventory adjustments:

`Propose → Validate reason and scope → Approve when required → Apply movement → Reconcile`

Simulation uses fixed Catalog, price, Promotion, Cart, and Inventory snapshots and cannot mutate production truth.

Bulk changes are resumable operations with per-item outcomes. They do not imply one database transaction across an unbounded assortment.

Distinct capabilities apply to author, simulate, approve, activate, adjust, export, pause, reconcile, and administer policy. Financial, inventory, and promotion segregation remains source enforced.

## Idempotency and concurrency

- Price quote creation is idempotent for the same request identity and input revisions.
- Reservation create, renew, release, and consume have separate idempotency identities.
- Promotion hold and claim are idempotent.
- Inventory movement rejects duplicate source-operation identity.
- Administrative activation uses strong ETags and immutable versions.
- Checkout recalculation uses the expected Commercial Snapshot revision.
- Order commitment uses one durable Purchase idempotency key.

Retry returns the original result or current operation state. It never creates a second reservation, discount claim, movement, or order.

## Degraded behavior

### Pricing unavailable

- Public surfaces may show an unexpired projection marked with applicable freshness.
- Add to Cart can preserve intent but cannot create an authoritative priced line when policy requires current Pricing.
- Checkout commitment blocks if a current eligible Quote cannot be validated.
- No surface substitutes Catalog text, Search price, or previous Cart arithmetic as authoritative price.

### Promotion unavailable

- Items and non-promotional Pricing remain intact.
- Existing Promotion Application is shown as pending, stale, removed, or unavailable according to evidence.
- Checkout does not silently charge a higher total after removing a discount; it returns to review.
- Marketing presentation does not imply an active commercial benefit.

### Inventory unavailable

- Unknown is shown distinctly from out of stock.
- Cart preserves items.
- Checkout cannot create or validate required Reservations.
- Existing Active reservations remain governed by their recorded expiry; outage does not extend them silently.
- Direct Product and Support paths remain available.

### Projection lag

- Search and cards can show stale status within policy.
- Product Detail and Cart recheck.
- Changed facts appear as corrections.
- Checkout commitment binds only to current valid source contracts.

Missing data never becomes zero price, free delivery, maximum discount, available stock, successful reservation, or promotion eligibility.

## Security and privacy

- Public contracts expose only customer-safe price and availability.
- Internal cost, margin, supplier terms, stock counts, fraud controls, promotion budgets, customer segments, and approval thresholds are field restricted.
- Promotion codes are treated as untrusted inputs, normalized narrowly, rate limited, and not logged in full when sensitive.
- Reservation and Quote identifiers are opaque and context-bound.
- Admin adjustments and manual prices require reason, authorization, assurance, and audit.
- Provider payloads cannot inject amounts, currency, HTML, rules, or identifiers into trusted contracts.

Personalization and promotion eligibility use the minimum customer data. Sensitive-category inference, Support cases, payment hardship, and unrelated Account data are prohibited unless a later explicit lawful policy approves a narrowly defined purpose.

## Observability and reconciliation

Measure:

- Quote latency, failure, expiry, and price-change correction
- Missing and conflicting price coverage
- Promotion eligibility, application, rejection, exhaustion, and combination conflict
- Redemption Hold and claim imbalance
- Stock movement throughput and duplicate rejection
- Available-to-promise by state
- Reservation success, partial failure, renewal, expiry, release, and consume
- Over-reserved, negative, stale, and conflicting positions
- Source-feed lag and reconciliation variance
- Projection age and Search-to-source correction
- Checkout Snapshot churn and Place Order conflicts
- Order-to-reservation and order-to-redemption reconciliation

Reconciliation detects:

- Active reservation without owning Checkout
- Consumed reservation without Order allocation
- Expired reservation still reducing availability
- Promotion claim without Order
- Order discount without matching Promotion evidence
- Order line without valid Quote evidence
- Position not equal to its movement-derived state

Repairs are governed compensating operations with evidence, not direct row edits.

## Quality gates

Before release:

- Test exact arithmetic, currency, rounding stages, caps, floors, and component totals.
- Test Price Assignment overlap, schedule boundaries, precedence, Quote binding, expiry, and correction.
- Test Promotion eligibility, codes, combinations, best permitted benefit, holds, exhaustion, pause, expiry, and claim.
- Test Stock Position derivation from movements and every Reservation transition.
- Prove duplicate requests cannot duplicate discounts, movements, reservations, or orders.
- Race-test the last available unit, concurrent renew/expire/consume, and order retry.
- Prove the registered Order transaction is atomic across Order creation, Reservation consumption, Promotion claim, commercial snapshot, and outbox.
- Exercise stale, partial, unknown, changed, and unavailable states on Search, Product, Cart, Checkout, PC Builder, Admin, and Support.
- Verify price, discount, availability, expiry, and correction announcements for keyboard, screen reader, zoom, mobile, reduced motion, and Brazilian Portuguese formatting.
- Reconcile generated adversarial histories and verify invariant repair.

## Consequences

### Benefits

- Each commercial fact retains one authority.
- Customers review the exact price, discount, and stock state used for commitment.
- Reservations reduce oversell without allowing abandoned Carts to hoard inventory.
- Immutable quotes and snapshots support idempotent order creation and audit.
- Projection lag cannot silently become purchase truth.

### Costs and risks

- Quote, Promotion Hold, Reservation, and Snapshot lifecycles add coordination.
- Expiry can interrupt Checkout and needs careful accessible recovery.
- High-volume stock and projection events require compaction and reconciliation.
- Promotion collaboration crosses four domain owners.
- The narrow local order transaction requires explicit schema-role governance.

## References

- [Page Relationships and Domain Ownership](../03-product-structure/02-page-relationships-and-ownership.md)
- [Error, Empty, and Degraded States](../03-product-structure/08-error-empty-and-degraded-states.md)
- [Product and Merchandising Components](../04-design-system/15-product-and-merchandising-components.md)
- [Cart and Checkout Patterns](../04-design-system/17-cart-and-checkout-patterns.md)
- [Domain Modules and Transaction Boundaries](10-domain-modules-and-transaction-boundaries.md)
- [Data Ownership, Storage, and Migration](11-data-ownership-storage-and-migration.md)
- [Compatibility Engine Architecture](16-compatibility-engine-architecture.md)
- [ADR-0023: Versioned Commercial Quotes and Inventory Reservations](../adrs/ADR-0023-versioned-commercial-quotes-and-inventory-reservations.md)

