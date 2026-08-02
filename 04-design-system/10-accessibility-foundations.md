# Accessibility Foundations

**Status:** Approved

## Purpose

This document defines Nexora’s accessibility conformance target, structural requirements, interaction contracts, critical-path enhancements, validation matrix, governance, and downstream handoff.

Accessibility is a release gate for every Design System layer and approved product surface.

## Decision

Nexora targets **WCAG 2.2 Level AA as the minimum product-wide conformance baseline**, with selected enhanced requirements for focus appearance, target size, critical commerce facts, authentication, and high-consequence operational work.

The normative reference is the [WCAG 2.2 W3C Recommendation](https://www.w3.org/TR/WCAG22/). The [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) informs established widget semantics and keyboard conventions but does not replace native semantics, user testing, or normative requirements.

This cross-cutting decision is recorded in [ADR-0007](../adrs/ADR-0007-accessibility-conformance-foundation.md).

## Principles

1. Accessibility is structural, not a post-design adaptation.
2. Native semantics and expected platform behavior are preferred.
3. Equivalent access means equivalent purpose, facts, actions, state, and recovery.
4. Personalization cannot remove accessibility or create inaccessible variants.
5. Responsive specialization cannot evade keyboard, zoom, reflow, or assistive-technology support.
6. Automation finds defects but cannot certify human usability.
7. Disabled and denied states remain understandable.
8. Dynamic updates are announced proportionally and do not steal focus.
9. Accessibility defects in critical paths block approval.
10. Legal compliance is an input, not the ceiling of inclusive design.

## Conformance scope

The target covers:

- All 89 approved pages and templates
- All nine page archetypes
- Light and dark themes
- Comfortable and compact density
- Loading, empty, partial, stale, conflict, offline, denied, pending, failed, indeterminate, and completed states
- Customer, guest, workforce, provider, and non-human-subject presentation where applicable
- Search, filters, Comparison, Cart, Checkout, Account, Support, authentication, PC Builder, and Admin
- Responsive and guarded larger-workspace behavior
- Brazilian Portuguese content and formatting

Third-party content and controls require accessible integration, disclosed limitations, and an equivalent safe path where Nexora cannot remediate the source directly.

## Semantic structure

Every page provides:

- One programmatically identifiable primary content region
- A unique descriptive page title
- A logical heading hierarchy
- Named navigation and complementary landmarks where applicable
- Skip or equivalent bypass access to repeated content
- Programmatic object identity, status, and relationships
- Lists, tables, descriptions, and groups matching their visible structure
- Language metadata for the page and changes of language

Visual role and semantic heading level remain independent. Recomposition does not change the document’s meaning.

## Native-first interaction

Use native controls and elements when they express the required semantics and behavior.

Custom widgets require:

- A documented reason native behavior is insufficient
- Complete role, name, value, state, and relationship semantics
- Established keyboard interaction
- Pointer, touch, voice, and assistive-technology equivalence
- High-contrast and forced-color behavior
- Automated and manual validation

ARIA cannot repair incorrect interaction or hidden content ownership.

## Keyboard

All functionality is operable by keyboard without timing-dependent key sequences.

Requirements:

- Tab and Shift+Tab follow logical action order.
- Arrow-key behavior follows the chosen composite-widget pattern.
- Enter and Space behavior matches control convention.
- Escape closes or cancels the current dismissible layer without discarding unrelated work.
- Home, End, Page, and typeahead behavior are provided where established and useful.
- Keyboard shortcuts are documented, remappable or disableable when character-key conflicts may occur, and never the only path.
- No keyboard trap exists except a correctly managed modal scope.
- Drag interactions provide non-drag alternatives.

## Focus

Focus is:

- Visible in all themes, states, densities, and supported forced-color settings
- At least equivalent to a two-pixel perimeter area with sufficient contrast for core controls
- Never removed without a stronger replacement
- Moved only when the user’s context or task requires it
- Restored after dialogs, menus, drawers, and temporary layers
- Preserved or intentionally restored after result updates and responsive recomposition

Focus order follows meaning rather than visual coordinates.

### Focus placement

- Page navigation places focus according to platform and route convention, with the new destination clearly announced.
- Validation summary focus links to affected fields.
- Dialogs focus the title, first required input, or safest action according to purpose.
- Destructive confirmation does not default focus to the destructive action.
- Completion and unrecoverable failure receive focus at the appropriate status heading.
- Background updates do not move focus.

## Target size and input

WCAG 2.2 AA permits targets of at least `24 × 24` CSS pixels or sufficient spacing. Nexora adopts a stronger product default:

- Default effective target: at least `44 × 44px`
- Preferred touch target: `48 × 48px`
- Inline prose links may follow text line geometry.
- Compact controls may have smaller visible geometry only with a compliant effective target and separation.

The system supports pointer, touch, keyboard, voice, switch, and assistive-technology input without assuming precision.

Pointer gestures have simple alternatives. Path-based or multipoint gestures are not the only way to perform an action.

## Text, zoom, and reflow

- Text resizes to at least `200%` without loss of content or function.
- Page zoom and reflow support at least the WCAG AA expectations for a `320 CSS px` equivalent width.
- Two-dimensional scrolling is limited to essential data relationships such as complex tables, diagrams, comparison, and guarded workspaces.
- Essential structures provide accessible navigation or alternate representations.
- Text is not embedded in images when live text can serve the purpose.
- Line height, paragraph spacing, letter spacing, and word spacing tolerate user overrides.
- Sticky and fixed regions do not obscure focused or essential content.

## Color, contrast, and appearance

The [Precision Gold color system](04-precision-gold-color-and-themes.md) supplies:

- `4.5:1` minimum for normal text
- `3:1` minimum for large text
- `3:1` minimum for essential graphical objects, control boundaries, and state indicators
- Perceptible focus against adjacent colors

Color is supplemented for state, selection, required fields, links, price change, Compatibility, inventory, permissions, charts, and focus.

Critical facts prefer enhanced contrast. Light and dark themes require equivalent comprehension, not a waiver based on aesthetics.

## Names, labels, and instructions

- Visible labels and accessible names use matching terminology.
- Icon-only controls have concise unique names.
- Field instructions appear before or adjacent to input when needed.
- Placeholder text is never the only label or instruction.
- Required format, units, constraints, and examples are explicit.
- Error messages name the problem and recovery.
- Ambiguous “click here,” “learn more,” and repeated unlabeled actions are prohibited.
- Changes of context are predictable or initiated by the user.

## Forms and validation

Forms provide:

- Persistent labels
- Programmatic required and invalid states
- Associated help and error content
- An accessible error summary for multi-error submission
- Focusable links from summary to source
- Preserved valid input after recoverable failure
- Review and correction before consequential commitment
- No reliance on color, icon, or placeholder alone

Validation timing avoids announcing errors before users can reasonably complete input. Security non-disclosure may limit detail, but the recovery path remains clear.

## Dynamic content and announcements

Announcements are classified:

- **Polite:** result count, saved state, filter change, background completion
- **Assertive:** blocking validation, session expiry requiring immediate action, destructive failure, critical Compatibility change
- **No live announcement:** decorative loading frames, hover, every keystroke, routine visual reordering

Rules:

- Announce settled meaning, not animation frames.
- Batch related changes.
- Do not duplicate visible and live messages excessively.
- Preserve an inspectable durable state after transient feedback.
- User-controlled AI output follows the same announcement rules and can be paused.

## Media and alternatives

- Informative images have purpose-appropriate alternative text.
- Decorative images are ignored by assistive technology.
- Product alt text identifies the product and meaningful view without repeating nearby content.
- Technical diagrams have structured equivalents.
- Recorded media requires captions, transcripts, and audio description where applicable.
- Auto-playing media is not part of the core system.
- Customer evidence preserves an accessible description or Support-assisted alternative where required.

## Tables, grids, and comparison

- Static data uses semantic tables with headers and captions when appropriate.
- Interactive grids use a documented keyboard model only when cell-level interaction requires it.
- Virtualization preserves row/column count, position, names, focus, and reading continuity.
- Sorting exposes current direction.
- Selection exposes count and scope.
- Comparison provides a linearized view and does not rely on visual column proximity alone.
- Hidden permission-restricted data is not announced through counts, headers, or empty cells.

## Search and filtering

- Search suggestions identify list and active option relationships.
- Keyboard navigation does not overwrite the query unexpectedly.
- Result updates announce count and preserve focus.
- Active filters remain visible and removable.
- Filter drawers expose applied state outside the drawer.
- Zero results remain distinct from loading or failure.
- Voice and image search remain deferred and do not affect conformance scope.

## Commerce and transaction

Critical commerce paths receive enhanced review:

- Price, total, fees, financing terms, stock, Compatibility, and delivery context are programmatically associated.
- Cart and Checkout preserve valid input and exact reviewed state.
- Commit controls prevent duplicate activation and announce pending state.
- Order confirmation appears only after an authoritative order exists.
- Payment inputs and provider integrations retain labels, errors, focus, and recovery.
- Time limits warn users and permit extension where allowed.
- Optional paid additions require explicit consent.

## Authentication

Authentication avoids cognitive-function tests as the only method.

Requirements:

- Password managers, paste, and supported autofill are not blocked.
- Users can reveal entered secrets safely.
- Verification and recovery use clear step identity.
- Security responses avoid account disclosure while preserving recovery.
- CAPTCHA or risk challenges require an accessible alternative.
- Reauthentication returns users to a validated destination with safe context.
- Session expiry warns, preserves eligible work, and avoids sudden destructive loss.

Exact methods remain Security and Engineering inputs.

## AI

- AI is labeled and distinguishable from deterministic facts.
- Conversation supports keyboard, reading order, pause, copy, and correction.
- Streaming or incremental output does not overwhelm announcements.
- Users can inspect and clear applied AI effects.
- AI cannot summarize inaccessible content or infer hidden object existence.
- Confidence, rationale, trade-offs, and source boundaries are available where recommendations affect decisions.

## PC Builder

- The non-linear workspace is fully keyboard operable.
- Component slots, selected parts, compatibility relationships, and blockers are programmatically exposed.
- Recalculation announcements are batched.
- Hard incompatibilities and warnings remain distinct without color.
- Panel changes preserve object and focus context.
- Drag or visual diagrams have non-drag and structured alternatives.

## Admin

- Permission-adaptive navigation does not create focus gaps or disclose hidden capability.
- Dense worklists expose headers, selection, scope, sort, and operation state.
- Bulk actions provide accessible review and partial-result inspection.
- Staged changes expose current value, proposed value, validation, impact, approval, and history.
- Guarded larger-workspace continuation explains the restriction and preserves drafts.
- Emergency protective actions remain accessible at supported viewports.

## Motion and time

The [Motion contract](09-motion-and-interaction-feedback.md) governs reduced motion, interruption, progress, and prohibited animation.

Users can pause, stop, or extend time-dependent content where required. Timing is not the only measure of competence or authorization.

## Accessible states

Every state component preserves:

- Host identity and primary goal
- Explicit state name
- Confirmed versus unknown facts
- Affected scope
- Primary recovery
- Alternative path where available
- Focus and announcement behavior

Loading, zero, empty, partial, unavailable, denied, failed, pending, and indeterminate states cannot share one generic accessible label.

## Testing matrix

### Automated

Automated checks cover:

- Semantic validity
- Accessible names
- Roles, states, and relationships
- Contrast where calculable
- Focusable hidden content
- Heading and landmark issues
- Form associations
- Common keyboard and ARIA defects

Automation is necessary but insufficient.

### Manual

Manual validation covers:

- Keyboard-only completion
- Visible focus and logical order
- Screen reader interaction
- Zoom, reflow, and text spacing
- Touch targets and gestures
- High contrast and forced colors
- Reduced motion
- Error prevention and recovery
- Dynamic announcements
- Theme and density parity

### Representative environments

Engineering will define supported versions. The minimum matrix includes representative:

- Chromium, WebKit, and Gecko browsers
- Windows, macOS, Android, and iOS
- NVDA, JAWS, VoiceOver, and TalkBack
- Keyboard, touch, pointer, and voice-control workflows

### User validation

Critical journeys require usability evaluation with people with disabilities before production readiness. Phase 3 defines scenarios and acceptance criteria; later delivery planning defines recruitment and cadence.

## Critical journey gates

The following cannot pass with unresolved high-impact accessibility defects:

- Search to Product Detail
- Product comparison
- Cart and unified Checkout
- Guest and customer Order Detail
- Account recovery
- Support case creation and communication
- PC Builder selection and Compatibility resolution
- Admin approval, execution, revocation, and emergency protection

## Defect severity

- **Blocker:** prevents a critical task, exposes restricted data, causes destructive error, traps focus, or lacks an equivalent path
- **High:** materially impairs task completion or comprehension
- **Medium:** creates avoidable friction with a viable workaround
- **Low:** limited inconsistency without material task loss

Blocker and High defects prevent system approval for the affected supported use.

## Exceptions and known limitations

An accessibility exception requires:

- Affected pages, components, users, and criteria
- Severity and task consequence
- Equivalent workaround
- Owner and remediation date
- Communication and Support path
- Review by Accessibility stewardship

Exceptions cannot waive protected customer obligations, transaction access, authentication recovery, or emergency Admin safeguards. Known limitations feed the future Accessibility Statement but do not become acceptable by disclosure alone.

## Governance

1. Accessibility stewardship has blocking review authority.
2. Every component declares semantics, keyboard, focus, announcements, alternatives, and test obligations.
3. Domain semantics and accessible labels are reviewed together.
4. Third-party integrations require equivalent-path and failure review.
5. Conformance claims require page-level validation, not component conformance alone.
6. Applicable Brazilian legal requirements will be reviewed by Legal without lowering this design baseline.
7. A material change to the WCAG version, conformance level, or blocking authority requires a superseding ADR.

## Consequences

### Benefits

- One conformance boundary covers all products and states.
- Critical commerce and operational paths receive stronger safeguards.
- Components carry testable accessibility contracts.
- Responsive and density specialization remain accountable.

### Costs and risks

- Manual and assistive-technology validation requires sustained expertise.
- Complex workspaces need more than automated testing.
- Third-party providers may require alternate paths or escalation.
- Enhanced internal targets exceed minimum AA in selected areas.

## Next decision

Define the primitive component catalog and its shared anatomy, state, accessibility, and composition contracts.
