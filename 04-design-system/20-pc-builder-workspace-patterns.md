# PC Builder Workspace Patterns

**Status:** Approved

## Purpose

This document defines PC Builder initialization, persistent workspace regions, component slots, selection, Compatibility, budget, performance, AI assistance, save/share, conflict, and Cart conversion.

## Decision

Nexora uses **one persistent, non-linear Engineering Workspace**.

Guided and Expert are initialization modes that produce one build object. After initialization, both use the same workspace, deterministic Compatibility, state persistence, and completion behavior.

## Builder Start

Builder Start includes:

- Create new build
- Resume eligible draft
- Guided initialization
- Expert initialization
- Purpose, budget, and existing-component context
- Explanation that choices remain editable

It does not present a required step sequence.

## Workspace regions

Required:

1. Build identity, owner, save state, and status
2. Component List
3. Compatibility Panel
4. Budget Panel
5. Performance Panel
6. Primary save and Cart conversion
7. Conflict and recovery

Optional:

- AI Copilot
- History
- Share
- Upgrade scenario

## Build header

Shows:

- Build name
- Ownership or guest draft
- Saved, saving, unsaved, conflicted, or read-only
- Last confirmed update
- Duplicate and share
- Safe exit

Save state remains visible across panels.

## Component slot

Each slot exposes:

- Component category
- Required or optional
- Selected product and variant
- Price and inventory
- Compatibility state
- Selection criteria
- Add, replace, inspect, or remove
- Slot-level warning or blocker

Empty, selected, unavailable, stale, and locked slots remain distinct.

## Component selection

Selection uses governed Search and filtering:

- Category is constrained by the slot.
- Relevant attributes and Compatibility filters lead.
- Current build context is visible.
- Products retain price, stock, and decisive facts.
- Selecting re-evaluates the build before confirmation.
- Rejection preserves Search context.

AI can propose candidates but cannot insert them without explicit selection.

## Compatibility Panel

Displays:

- Overall build evaluation
- Hard incompatibilities
- Warnings
- Unknown or stale evaluations
- Affected component relationships
- Explanation
- Permitted resolution

Hard incompatibilities:

- Block invalid conversion or selection as defined by Compatibility.
- Cannot be overridden.
- Remain visible near affected slots and in the global summary.

Warnings:

- Explain risk and trade-off.
- May be overridden only when the domain permits it.
- Record explicit acknowledgement where required.

## Recalculation

When a component changes:

- Affected evaluations show recalculating.
- Prior confirmed state remains visibly stale, not current.
- Budget and performance identify pending values.
- Announcements batch settled changes.
- Unaffected work stays interactive.

## Budget Panel

Shows:

- Target budget
- Current total
- Remaining or exceeded amount
- Unavailable price
- Changed price
- Optional excluded costs
- Financing context only when applicable

Budget conflict is not a Compatibility blocker. It informs the user and preserves control.

## Performance Panel

Performance is:

- Use-case specific
- Estimated and labelled
- Based on named component facts or models
- Accompanied by confidence and missing inputs
- Distinct from guaranteed benchmark results

AI explanation cannot promote an estimate to deterministic fact.

## AI Copilot

AI can:

- Explain trade-offs
- Suggest components
- Identify budget alternatives
- Summarize warnings
- Answer build questions

It must:

- Name build context
- Separate its suggestion from Compatibility
- Explain rationale and trade-offs
- Ask before applying visible criteria
- Never override hard incompatibility
- Degrade without blocking the workspace

## Save and guest draft

- Authenticated builds save to the owned durable object.
- Guest drafts may persist locally with clear limitations.
- Sign-in offers explicit claim or merge.
- Save conflict preserves both local work and authoritative version for review.
- Lost permission creates read-only, handoff, or safe recovery according to policy.

## Share

Share Summary states:

- What is shared
- Current snapshot or live-reference behavior
- Price and stock freshness
- Owner controls
- Expiry or revocation

Recipients inspect a Shared Build and duplicate it to obtain an owned editable copy.

## Convert to Cart

Conversion:

- Revalidates components, variants, stock, prices, and Compatibility.
- Shows exact included components.
- Blocks hard incompatibility.
- Preserves warnings and acknowledgements.
- Creates a grouped Cart representation.
- Retains the source build and conversion context.

## Conflict and stale state

Required patterns:

- Concurrent edit conflict
- Build rule version changed
- Component discontinued
- Variant unavailable
- Price or stock changed
- Compatibility stale
- Guest draft storage unavailable
- Partial Catalog, performance, or AI failure

Recovery preserves the latest safe build state and never silently substitutes components.

## Responsive behavior

- Build identity, save state, total, and blockers remain visible.
- Component List becomes the primary constrained view.
- Compatibility, Budget, Performance, and AI become labelled drawers or tabs.
- Switching panels preserves active slot and Search context.
- Complex side-by-side analysis may use guarded larger-workspace continuation without changing the page.

## Accessibility

- Slots and relationships are programmatic.
- The complete workflow is keyboard operable.
- Selection does not require drag.
- Warnings and blockers use text, icon, and semantic status.
- Recalculation announcements are batched.
- Charts or diagrams have structured alternatives.
- Panel navigation preserves focus and context.

## Governance

1. PC Builder owns build state and workspace.
2. Compatibility owns rules and evaluation.
3. Catalog owns component facts.
4. Pricing and Inventory own commerce facts.
5. AI remains optional guidance.
6. The Design System cannot introduce wizard-only completion.

## Validation

Test Guided and Expert initialization, all slot states, compatibility combinations, budget and performance uncertainty, guest claim, save conflict, sharing, Cart conversion, partial services, themes, responsive layouts, keyboard, screen reader, zoom, and long Portuguese technical content.

## Consequences

### Benefits

- Users can work non-linearly without losing state.
- Deterministic constraints remain authoritative.
- Guidance serves both novice and expert users.
- Builds remain durable through sharing and purchase.

### Costs and risks

- Cross-panel state requires careful coordination.
- Recalculation and stale-state combinations are extensive.
- Constrained layouts need robust panel restoration.

## Next decision

Define Administrative Dashboard worklist, workspace, action, permission, audit, and responsive patterns.
