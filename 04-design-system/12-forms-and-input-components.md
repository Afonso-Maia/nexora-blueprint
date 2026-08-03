# Forms and Input Components

**Status:** Approved

## Purpose

This document defines Nexora’s buttons, links, fields, selection controls, validation, uploads, grouped forms, submission states, and consequential-action safeguards.

## Decision

Nexora uses **persistent-label inputs with explicit state and risk-aware submission**.

Placeholder-led and floating-label fields are not core patterns. Validation occurs after meaningful interaction, on blur where useful, or at submission—not while users are still forming an incomplete value. Consequential changes use review and explicit commitment; low-risk preferences may save locally with visible status.

## Shared field anatomy

Every field may contain:

1. Persistent visible label
2. Required or optional indicator
3. Input or selection control
4. Unit, prefix, suffix, or bounded action
5. Help or format guidance
6. Validation or eligibility message
7. Character, file, or selection limit when relevant

Label, help, and error content remain programmatically associated.

## Shared states

Supported field states are:

- Empty
- Populated
- Hovered
- Focused
- Invalid
- Validated when positive confirmation is useful
- Disabled
- Read-only
- Pending validation
- Unavailable
- Permission-limited

Disabled, read-only, unavailable, and permission-limited remain distinct. A disabled field is not used to conceal an explanation.

## Buttons

### Hierarchy

- **Primary:** one dominant action per decision region
- **Secondary:** valid alternative without equal emphasis
- **Quiet:** low-emphasis local action
- **Destructive:** action with destructive consequence
- **Icon:** familiar bounded utility with accessible name

Button labels use explicit verbs and objects when ambiguity exists. “Continue” is appropriate only when the destination or next step is evident.

### Behavior

- Pending replaces activation while preserving label context.
- Duplicate activation is blocked for consequential operations.
- Success is not shown until authoritative confirmation.
- Destructive actions disclose scope and recovery before commitment.
- Buttons do not navigate when link semantics are correct.
- Disabled buttons expose a nearby reason when users may reasonably expect availability.

## Links

Links navigate or reveal a stable destination. They:

- Remain distinguishable in prose without color alone
- Communicate external, download, new-context, or restricted behavior when relevant
- Preserve safe return context
- Never perform an unreviewed mutation

## Text field

Use for short free-form input. Variants include text, email, telephone, URL, search-specific entry, and governed exact identifiers.

Rules:

- Input purpose and autocomplete metadata reflect the actual field.
- Format guidance precedes invalid submission when predictable.
- Masks do not prevent paste, editing, or assistive technology.
- Values are not reformatted destructively while being entered.

## Text area

Use for multi-line content such as Support explanation or internal notes.

- Resize or content growth remains available.
- Character limits explain counting behavior.
- Drafts preserve meaningful work.
- Internal notes and customer-visible messages use visibly distinct components and destinations.

## Password and secret field

- Supports safe reveal/hide with persistent label.
- Allows paste and password managers.
- Strength guidance names actual requirements.
- Current, new, and confirmation values remain distinct.
- Secret values do not persist into general logs, drafts, or analytics.

## Select and combobox

Use a native select for bounded simple choices where it provides the best platform behavior.

Use a combobox when users need search, large-option discovery, or dynamic suggestions.

Combobox requirements:

- Editable text and selected value remain distinct.
- Active option, count, loading, no match, and errors are exposed.
- Free-form values are accepted only when the domain allows them.
- Permission-restricted options do not leak through search.

## Checkbox, radio, and switch

- Checkbox represents independent binary or multi-selection.
- Radio represents one required or optional choice in a visible group.
- Switch represents an immediate on/off setting, not a one-time form answer.

Switch changes that are high-risk, asynchronous, or approval-bound use a form action instead of implying immediate success.

## Segmented control and tabs

Segmented controls switch among a small set of peer views or values. Tabs change visible panels within one destination. Neither is used as a decorative alternative to radio buttons or page navigation.

## Quantity control

Quantity combines a numeric input with increment and decrement actions.

- Direct entry remains possible.
- Minimum, maximum, inventory, and purchase limits are explicit.
- Corrections do not silently clamp without explanation.
- Cart totals update from authoritative recalculation.

## Date, time, and range

- Text entry remains available when calendar or picker interaction is offered.
- Brazilian formats are clear and unambiguous.
- Min/max, timezone, business-day, and availability constraints are named.
- Range endpoints are labelled.
- Relative dates supplement rather than replace exact consequential dates.

## File upload

Upload supports button selection and drag/drop as equivalent paths.

It exposes:

- Accepted type and size
- Privacy and evidence purpose
- File name, progress, success, scan, rejection, and removal
- Retry without duplicating accepted files
- Accessible preview or description

Upload does not imply that evidence is authoritative, safe, or attached until confirmed.

## Search field boundary

General Text Field does not own search suggestions, query history, ranking, result routing, or zero-result recovery. Those belong to Search components and patterns.

## Field groups

Related fields use a visible group title and programmatic grouping. Repeated address, payment, product-attribute, and permission-scope groups retain object identity.

Multi-column forms:

- Follow one logical focus order.
- Collapse without separating labels, values, or validation.
- Avoid side-by-side fields when sequence or error recovery becomes ambiguous.

## Validation model

### Timing

- Format help appears before input when necessary.
- Validation begins after a meaningful user action.
- Submission validates the complete relevant scope.
- Server or source-domain validation remains authoritative.
- Async validation exposes pending and stale results.

### Placement

- Field errors appear adjacent to their source.
- Multi-error submission provides a summary linked to affected fields.
- Cross-field and eligibility errors appear at the affected group or action.
- Page-level failure does not replace field-specific correction.

### Content

Messages state:

- What is wrong or unknown
- Why it matters when helpful
- How to correct or continue
- Whether prior input is preserved

## Submission models

### Immediate local setting

Allowed for low-risk reversible preferences. It shows saving, saved, and failed status and restores the prior authoritative value on rejection.

### Grouped save

Used for related editable data such as an address. Dirty state, validation, cancel, and save scope remain visible.

### Review and commit

Used for Checkout, high-risk Account changes, Admin changes, approvals, execution, privacy requests, and destructive actions.

It binds commitment to the exact reviewed state and prevents duplicate submission.

### Staged change

Used in Admin Resource Workspaces. The form produces a governed change envelope rather than directly claiming mutation success.

## Destructive confirmation

Confirmation strength is proportional to consequence:

- Clear title naming the action
- Scope and affected objects
- Reversibility or permanence
- Dependencies and blocked obligations
- Required assurance or approval
- Safe cancel

Typed phrases are used only when they materially reduce confusion and remain accessible; they are not a ritual substitute for clear scope.

## Form persistence

- Valid values survive recoverable failures.
- Sensitive values persist only as permitted by Security.
- Guest and authenticated transitions preserve eligible form state.
- Returning to a prior module does not duplicate submission.
- Stale forms compare current authoritative state before commit.
- Permission loss preserves or transfers drafts according to the approved domain policy.

## Accessibility

- Persistent labels are required.
- Focus order matches meaning.
- Error summaries and fields are linked.
- Native input semantics are preferred.
- Autocomplete and paste remain available where safe.
- Targets follow the `44px` effective default.
- Text inputs use at least `16px` in touch contexts where smaller text impairs entry.
- Required, invalid, and selected state do not rely on color.
- On-screen keyboards do not obscure active controls or actions.

## Responsive and density

- Field groups reflow before labels or controls shrink.
- Primary submission remains associated with the current form scope.
- Sticky action regions expose dirty, invalid, pending, or stale state.
- Compact Admin forms may reduce inset and row spacing but not labels, errors, or targets.
- Complex schema editing may use guarded larger-workspace continuation.

## Privacy and security

- Sensitive fields declare retention, masking, copy, paste, reveal, and analytics behavior.
- Payment credentials remain provider-bound and outside general form state.
- Identity existence is not disclosed through validation.
- Hidden permission fields are not submitted or inferred from prior cached values.
- Customer-uploaded evidence follows Support retention and access contracts.

## Validation

Test each component for:

- Every shared state and valid combination
- Keyboard, touch, screen reader, voice, zoom, and reflow
- Light/dark and comfortable/compact
- Portuguese labels, errors, formats, and expansion
- Browser autofill and password managers
- Slow, failed, partial, stale, offline, and duplicate submission
- Permission and assurance changes during work
- Long values, empty values, and invalid pasted data

## Governance

1. New input components require a distinct semantic or interaction contract.
2. Domain validation remains source-owned.
3. Forms cannot invent eligibility, permission, or operation truth.
4. High-risk submission requires domain, Accessibility, Security, and Design System review as applicable.
5. Provider widgets require equivalent labels, errors, focus, and recovery.

## Consequences

### Benefits

- Persistent labels and explicit states reduce ambiguity.
- Risk-aware submission matches Account, Checkout, and Admin architecture.
- Valid work survives recoverable interruption.
- Domain truth remains outside presentation components.

### Costs and risks

- Explicit messages and states require more content design.
- Provider-controlled inputs need integration review.
- Staged and async forms produce more test combinations.

## Next decision

Define global, local, mobile, Account, Support, and permission-aware Admin navigation components.
