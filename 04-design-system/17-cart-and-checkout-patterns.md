# Cart and Checkout Patterns

**Status:** Approved

## Purpose

This document specifies Cart composition, unified Checkout modules, totals, promotions, delivery, payment, financing, warranty, review, submission, pending outcomes, and confirmation.

## Decision

Nexora uses **one adaptive Checkout transaction page** preceded by a corrective Cart.

Checkout modules progressively disclose applicable work within one destination. It is not split into route-based steps. Commitment binds to the exact reviewed state, blocks duplicate activation, and remains pending until the authoritative order outcome is known.

## Cart hierarchy

1. Cart identity and item count
2. Item and PC-build groups
3. Item-level constraints and corrections
4. Promotion state
5. Delivery or location context
6. Totals
7. Proceed to Checkout
8. Secondary continuation

Recommendations remain after the direct Checkout path and never conceal item corrections.

## Cart line

Each line exposes:

- Product and selected variant
- Quantity
- Current and prior price context
- Promotion
- Inventory
- Compatibility when applicable
- Save/remove
- Error or changed state

Quantity and removal update through authoritative recalculation. Optimistic acknowledgement cannot present unconfirmed totals as final.

## PC build group

A converted build remains visibly grouped with:

- Build identity
- Components
- Compatibility summary
- Price and stock changes
- Invalid or unavailable component
- Return to owned Engineering Workspace

Users may resolve a line without losing the remaining build.

## Cart corrections

Cart blocks Checkout only for constraints that make the transaction invalid, such as unavailable items, invalid quantity, unresolved hard incompatibility, or unpriceable lines.

Corrections:

- Appear at line and summary level.
- Preserve unaffected items.
- Name changed facts.
- Offer remove, replace, modify, or retry.
- Do not silently substitute products or variants.

## Checkout modules

Approved modules:

- Contact
- Authentication continuation
- Delivery address
- Delivery method
- Payment
- Financing
- Promotions
- Warranty or eligible protection
- Order review
- Terms and consent
- Place Order

Only applicable modules render. Their absence does not change the canonical Checkout page.

## Contact and identity

Checkout supports:

- Guest
- Returning customer
- Authenticated customer
- Reauthentication when risk requires it

Sign-in is optional unless a policy-bound action requires identity. Guest Checkout does not force account creation. Context merge explains Cart conflicts and preserves a safe copy.

## Address

Address pattern supports:

- Saved address
- New address
- Edit
- Delivery eligibility
- Normalization suggestion
- Unverified, incomplete, and restricted regions

Normalization is offered, not silently imposed. The customer can inspect the exact address used.

## Delivery

Delivery Method shows:

- Method
- Date or range
- Cost
- Destination
- Product or shipment applicability
- Cutoff and uncertainty

Changing destination or Cart revalidates methods. An unavailable provider does not become free or immediate delivery.

## Payment

Payment Method:

- Identifies provider and method
- Shows relevant billing context
- Keeps credentials provider-bound
- Exposes verification, pending, rejection, and retry
- Preserves non-sensitive valid Checkout inputs

Failed payment does not imply no order until order creation is reconciled.

## Financing

Financing options show installment, interest, total, eligibility condition, and terms. Selection never implies approval.

If financing becomes ineligible, Checkout preserves other valid modules and returns focus to the affected decision.

## Promotion

Promotion Entry:

- Accepts a code or eligible selection
- Shows applying, applied, rejected, expired, and removed
- Recalculates totals authoritatively
- Explains combination rules
- Preserves the entered code after recoverable failure

## Warranty and optional additions

- Optional paid additions are unselected by default.
- Coverage, provider, price, duration, exclusions, and cancellation terms are visible.
- Eligibility follows the current product or build.
- Declining does not create repeated pressure.
- Optional AI explanation remains separate from the consent control.

## Totals

Order Summary exposes:

- Items subtotal
- Discounts
- Delivery
- Fees and tax where applicable
- Financing context
- Warranty or additions
- Final total
- Changed or recalculating state

Unknown values remain pending. Totals shown at commitment match the reviewed transaction version.

## Review

Before commitment, users can inspect and edit:

- Items and variants
- Contact
- Address
- Delivery
- Payment
- Financing
- Promotions
- Optional additions
- Total
- Required terms

Editing one module does not reset unrelated valid work.

## Place Order

Place Order:

- Names the action and total.
- Requires explicit activation.
- Captures the reviewed transaction version.
- Becomes pending and blocks duplicate activation.
- Does not auto-retry payment or order creation.
- Preserves correlation through uncertain outcomes.

## Operation outcomes

- **Validation failed:** correct in Checkout.
- **Cart correction required:** return to Cart with affected lines highlighted.
- **Payment rejected before order:** retain Checkout and offer safe correction.
- **Pending:** show authoritative processing state and safe waiting behavior.
- **Indeterminate:** explain that outcome is being reconciled; do not invite duplicate order.
- **Order created:** navigate to Order Confirmation.
- **Partial downstream work:** order exists; confirmation names pending fulfillment or payment obligations.

## Order confirmation

Confirmation appears only after an authoritative order exists.

It includes:

- Order reference
- Outcome and current status
- Summary
- Payment and delivery state
- Next expected action
- Secure access to Order Detail
- Continue shopping
- Account creation or claim option for guest when eligible

Celebratory styling remains restrained and cannot obscure obligations.

## Responsive behavior

- Modules stack in task order.
- Summary and total remain accessible while editing.
- Sticky Place Order shows the current exact total and disabled reason.
- On-screen keyboard does not cover input or validation.
- Back preserves work.
- No route-based stepper is introduced.

## Accessibility

- Error summary links to modules and fields.
- Totals and terms are programmatically associated with commitment.
- Pending state blocks duplicate keyboard and pointer activation.
- Provider frames retain labels, focus, error, and recovery.
- Completion or failure receives appropriate focus.
- Timeouts warn and preserve eligible state.

## Offline and degraded behavior

- Cart may expose confirmed cached content with freshness.
- Consequential Checkout mutation is not submitted offline.
- Optional AI, recommendations, reviews, and media may degrade first.
- Missing price, inventory, Compatibility, payment, or total blocks only the affected unsafe commitment.
- Retry is idempotent and operation-aware.

## Governance

1. Purchase owns Cart and Checkout composition.
2. Source domains own price, inventory, Compatibility, payment, delivery, promotion, and order truth.
3. Optional additions require explicit consent and Legal review as applicable.
4. Design System cannot split Checkout into new routes.
5. New modules declare applicability, owner, state, fallback, and effect on totals.

## Validation

Test guest and customer flows, Cart merge, build groups, every module state, changed totals, payment rejection, pending/indeterminate order, back navigation, offline interruption, Portuguese formats, themes, responsive layouts, keyboard, screen reader, zoom, and duplicate activation.

## Consequences

### Benefits

- Users retain one coherent transaction context.
- Errors remain local and recoverable.
- Commitment is bound to reviewed truth.
- Guest and PC-build purchase remain first-class.

### Costs and risks

- One page needs strong module state coordination.
- Provider uncertainty requires reconciliation UX.
- Sticky totals and responsive modules require extensive validation.

## Next decision

Define Account and post-purchase continuity patterns.
