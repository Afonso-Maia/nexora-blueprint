# Product and Merchandising Components

**Status:** Approved

## Purpose

This document defines reusable product identity, card, media, price, financing, inventory, variant, specification, rating, review, promotion, badge, collection, and merchandising components.

## Decision

Nexora uses **fact-led commerce components with bounded merchandising**.

Product identity, selected variant, current price, inventory, Compatibility, eligibility, and action consequence outrank promotional language. Merchandising appears through governed slots and provenance rather than ad-hoc banners or altered product facts.

## Product identity

Product Identity contains:

- Governed product name
- Brand
- Model or family
- Selected variant or configuration
- Stable product reference where useful
- Lifecycle state when it affects action

Names are not shortened into ambiguous marketing labels. Variant identity remains adjacent to price, media, stock, and Cart actions.

## Product card

Required anatomy:

1. Factual media
2. Product identity
3. Decisive attribute summary
4. Rating summary when available
5. Current price and applicable context
6. Inventory state
7. Primary destination
8. Contextual Compare, Wishlist, or Cart actions

Optional:

- Promotion
- Compatibility context
- Recommendation reason
- Delivery estimate
- Restrained badge

Rules:

- The entire card may provide a primary navigation target without invalid nested interaction.
- Actions remain individually accessible.
- Cards use content-driven height; decisive facts are not clipped.
- Recommendations remain distinguishable from ordinary results.
- Unavailable products retain identity and permitted alternatives.

## Product media gallery

Gallery supports:

- Primary image
- Thumbnails or view selector
- Zoom
- Variant updates
- Video or 360-degree media only when approved and accessible
- Missing, partial, and failed media

Changing media does not move focus unexpectedly. Product color and physical detail follow the [imagery contract](08-iconography-and-imagery.md).

## Price

Price anatomy may include:

- Current authoritative price
- Prior price
- Discount amount or percentage
- Unit price
- Installment summary
- Immediate-payment condition
- Tax, fee, or delivery context when required
- Effective or expiry context

Rules:

- Current price is visually and programmatically primary.
- Prior price is labelled, not only struck through.
- Conditional price names the condition.
- Estimated, stale, unavailable, and recalculating states are explicit.
- Red is not used to manufacture urgency.
- Price changes after selection preserve the prior visible context and explain the change.

## Financing

Financing Summary presents:

- Eligible payment method or provider
- Number and value of installments
- Total financed amount when required
- Interest or no-interest condition
- Eligibility and subject-to-approval language
- Link to full authoritative terms

The summary never implies approval. Exact plans are recalculated for the current total and customer context.

## Promotion

Promotion Presentation contains:

- Promotion name
- Benefit
- Eligibility
- Applicable products or scope
- Required action or code
- Effective period
- Combination restrictions
- Source and invalid/expired behavior

Promotions cannot silently alter a filter, Cart, or Checkout. Applied promotions remain visible and removable where policy permits.

## Inventory

Inventory Presentation uses distinct states:

- Available
- Limited
- Backordered when approved
- Unavailable
- Store or location specific when relevant
- Reserved
- Unknown
- Stale
- Checking

It names the scope: product, variant, location, quantity, or Cart line. A failed inventory source never appears as available or zero.

## Delivery estimate

Delivery Estimate contains:

- Destination or location context
- Method
- Date or range
- Cutoff or condition
- Cost
- Confidence or pending calculation state

It is an estimate until the owning Fulfillment source confirms the obligation. Product-card estimates remain visibly less authoritative than Checkout selection.

## Variant selector

Variant Selector:

- Names the attribute such as color, storage, size, or configuration.
- Shows current selection.
- Updates media, price, inventory, identifier, and action eligibility together.
- Distinguishes unavailable values from absent values.
- Preserves prior selection when a recalculation fails.
- Does not use swatch color alone; each option has text.

Choosing a variant cannot silently clear Compare, Cart, or Compatibility context.

## Specification group

Specification Group provides:

- Governed group heading
- Label-value pairs
- Units
- Source or applicability where needed
- Progressive disclosure
- Difference highlighting in Comparison context

Unknown, not applicable, and unavailable are distinct. An empty value is not rendered as zero.

## Compatibility summary

Compatibility Summary consumes authoritative evaluation:

- Reference context
- Compatible, warning, hard incompatible, unknown, stale, or evaluating
- Short explanation
- Affected relationship
- Detail disclosure
- Permitted next action

AI may explain the result in a separate labelled region. It cannot recolor, override, or hide the deterministic state.

## Rating summary

Rating Summary includes:

- Average
- Review count
- Scale
- Distribution access where useful
- No-review state

Stars supplement a text value. “No reviews” is not zero quality.

## Review

Review Card may include:

- Rating
- Title and content
- Author context allowed by policy
- Verified-purchase or other governed provenance
- Product variant
- Date
- Helpful and report actions
- Moderation or removal state

AI summaries of reviews are labelled, explain scope, and link to source reviews. They do not invent consensus.

## Badge taxonomy

Approved badge families:

- Product lifecycle: New, Refurbished if later approved
- Promotion: Deal, eligible offer
- Provenance: Verified purchase, sponsored
- Availability: limited only when authoritative
- Recommendation: recommended with reason access
- Operational: draft, pending, approved in Admin contexts

Badges do not represent complex Compatibility, permission, Support, or transaction states without an accompanying status component.

Badge limits:

- Product cards show no more than two high-value badges by default.
- Multiple promotions consolidate.
- Badge color follows semantic role.
- Marketing cannot create campaign-specific badge geometry.

## Collection and campaign module

Collection Module includes:

- Clear title and purpose
- Governed product set
- Optional explanation
- Destination
- Provenance or sponsorship
- Loading, partial, and empty behavior

It cannot precede Search on Home when doing so weakens Search priority. Campaign modules remain bounded and do not introduce independent navigation.

## Recommendation module

Recommendation Module contains:

- Title naming the recommendation purpose
- Products or content
- Reason or contributing context
- AI or deterministic provenance
- Modify, dismiss, or clear behavior where personalized
- Confidence and trade-off access when decision consequential
- Degraded and unavailable state

Recommendations never appear indistinguishable from Search results or Compatibility facts.

## Merchandising slots

Page templates define allowed slots:

- Home: secondary to Search and meaningful continuation
- Results: bounded supporting module, not injected repeatedly
- Product Detail: after identity, constraints, and primary action
- Cart/Checkout: only relevant, eligible, non-obstructive additions
- Account/Support/Admin: prohibited unless directly task-relevant and approved

## Cart line summary

Cart Line reuses product identity, variant, media, price, promotion, inventory, quantity, Compatibility, and recovery components. It does not create alternate meanings for those facts.

## States

Components specify:

- Loading without fabricated fact
- Partial product data
- Missing media
- Price unavailable or changed
- Inventory unknown or changed
- Variant unavailable
- Promotion invalid or expired
- Compatibility stale or unavailable
- Review source unavailable
- Product discontinued or replaced

Successful facts remain usable when another module degrades.

## Responsive and density

- Product cards reflow without clipping names or decisive facts.
- Detail identity, constraints, and action remain conceptually together.
- Specifications use stacked label-value or governed overflow.
- Media thumbnails become an accessible compact selector.
- Compact density affects Admin product worklists, not customer card legibility.

## Accessibility

- Product and variant names provide unique accessible identity.
- Media has context-appropriate alternatives.
- Price relationships are announced coherently.
- Swatches include text.
- Ratings include numeric text.
- State uses label and icon in addition to color.
- Compare, Wishlist, and Cart actions name their product.
- Dynamic variant changes announce consequential updates without flooding.

## Governance

1. Catalog owns product identity, attributes, variants, and facts.
2. Pricing owns authoritative price and promotion calculation as assigned.
3. Inventory owns stock state.
4. Compatibility owns deterministic evaluation.
5. Marketing owns governed collections and promotional content.
6. Design System owns shared presentation and interaction.
7. A new badge or merchandising slot requires semantic and hierarchy review.

## Validation

Test:

- Long product names and technical attributes
- Every price, inventory, variant, promotion, and Compatibility state
- Light/dark, comfortable/compact, and responsive layouts
- Missing, partial, stale, and conflicting data
- Portuguese currency, installment, units, and dates
- Keyboard, touch, screen reader, zoom, and reflow
- Search cards, Product Detail, Comparison, Cart, Checkout, and Admin product work

## Consequences

### Benefits

- Product facts remain consistent across the journey.
- Merchandising supports rather than dominates discovery.
- Typed badges resist visual clutter.
- Degraded sources preserve trustworthy partial content.

### Costs and risks

- Cross-domain facts require coordinated component inputs.
- Promotions and financing produce many conditional states.
- Accurate variant and media synchronization needs strong source contracts.

## Next decision

Define Comparison and recommendation decision-support patterns.
