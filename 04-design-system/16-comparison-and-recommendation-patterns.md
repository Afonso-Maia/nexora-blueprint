# Comparison and Recommendation Patterns

**Status:** Approved

## Purpose

This document defines the Comparison Decision Workspace, difference presentation, recommendation evidence, confidence, AI boundaries, selection continuity, and purchase handoff.

## Decision

Nexora uses **one layered Comparison Decision Workspace** with explainable recommendations.

Comparison begins with decision-relevant differences and progressively exposes technical depth. It does not begin as a full specification table or split into separate guided and expert pages.

## Workspace hierarchy

1. Comparison identity and selected products
2. Executive summary
3. Key differences
4. Use-case recommendations
5. Compatibility
6. Price and value context
7. Full technical comparison
8. Optional AI summary
9. Direct selection and purchase continuation

Deterministic facts remain above AI guidance.

## Comparison set

The set exposes:

- Products and selected variants
- Maximum supported set size
- Source context
- Persistence status
- Unavailable or rejected members
- Add, replace, reorder, and remove
- Clear comparison

Changes preserve valid members and explain invalid ones. Removing the last member returns to source context or a useful empty workspace.

## Product header

Each comparison column retains:

- Product identity
- Media
- Variant
- Price
- Inventory
- Primary selection or Cart action
- Save and remove

Headers may remain sticky without covering row labels, focus, or warnings.

## Executive summary

The summary states:

- Most important differentiators
- Best-fit contexts
- Material trade-offs
- Missing or stale evidence
- No-clear-winner state when appropriate

It does not collapse nuanced outcomes into one universal winner.

## Key difference row

Difference rows:

- Use governed attribute definitions and units.
- Highlight material difference with text and structure.
- Explain why the difference matters.
- Distinguish better, worse, different, unknown, and not applicable.
- Avoid green/red judgement when value depends on use case.

## Use-case recommendation

Recommendation anatomy:

- Recommended product
- Named use case
- Rationale
- Evidence
- Confidence
- Trade-offs
- Conditions favoring another product
- Source and freshness

Users can inspect or modify the use case. AI-generated recommendations are labelled separately from governed rules or editorial guidance.

## Confidence

Confidence uses:

- High, medium, or low
- Plain-language basis
- Missing evidence
- Sensitivity to user criteria

Confidence is not a decorative percentage unless the underlying method supports a meaningful calibrated value.

## Compatibility

Compatibility comparison:

- Names reference context.
- Shows compatible, warning, hard-incompatible, unknown, stale, and evaluating.
- Explains affected relationships.
- Preserves source-domain authority.
- Blocks no action beyond the Compatibility contract.

Product-level compatibility and PC-build compatibility remain distinguishable.

## Price and value

Value context combines:

- Current price
- Relevant financing
- Included features
- Material performance or capability differences
- Promotion conditions
- Total-cost context when authoritative

“Best value” requires explicit criteria and cannot be inferred from lowest price alone.

## Full technical comparison

- Attributes group by governed category.
- “Show differences only” remains reversible.
- Row labels remain visible.
- Missing, unknown, and not applicable are distinct.
- Long values wrap or disclose fully.
- Horizontal relationships remain accessible through linearized and table semantics.

## AI summary

AI Summary:

- Is optional and collapsed by default unless explicitly invoked.
- Names the current compared set and criteria.
- Discloses that it is generated guidance.
- Links claims to visible authoritative facts where practical.
- Can be regenerated after criteria change.
- Never alters products, criteria, filters, or Cart without explicit action.

Chain-of-thought is not exposed; user-relevant rationale and evidence are.

## Selection and purchase

Choosing a product:

- Names exact product and variant.
- Revalidates price, inventory, eligibility, and Compatibility.
- Preserves the comparison set.
- Adds to Cart only after explicit action.
- Explains rejection without clearing the workspace.

## Responsive behavior

- Product identity and current column remain visible.
- Constrained layouts show one focused product with stable row navigation or an accessible stacked comparison.
- Users can switch product context without losing the current attribute group.
- Sticky regions remain bounded.
- The full technical table may use governed overflow with row and column context.

## Accessibility

- Comparison has a linearized reading path.
- Product and attribute headers remain programmatically associated.
- Difference highlighting is not color-only.
- Reordering has non-drag alternatives.
- Column removal and focus restoration are predictable.
- Recommendation confidence and trade-offs are textual.
- Updates announce affected scope without replaying the entire matrix.

## States

Required states include:

- Empty set
- One-product set
- Set limit
- Duplicate member
- Unavailable product or variant
- Price or stock changed
- Partial specifications
- Compatibility stale or unavailable
- Recommendation unavailable
- AI unavailable
- Persist conflict

Partial failure preserves confirmed comparison facts.

## Governance

1. Catalog owns attributes and product facts.
2. Pricing, Inventory, and Compatibility own their facts.
3. Recommendation owners declare method, evidence, confidence, and refresh.
4. AI does not own product truth or the comparison set.
5. A new comparison dimension derives from governed data.

## Validation

Test representative pairs and maximum sets across categories, themes, viewports, densities, missing data, conflicting variants, long Portuguese values, keyboard, screen reader, zoom, and purchase handoff.

## Consequences

### Benefits

- Users see decisive differences before technical depth.
- Recommendations remain inspectable and conditional.
- Comparison context survives purchase selection.
- AI adds explanation without replacing facts.

### Costs and risks

- Cross-category comparison requires careful attribute applicability.
- Narrow layouts need robust row/column context.
- Recommendation evidence and confidence require ongoing governance.

## Next decision

Define Cart and unified Checkout patterns.
