# Accessibility Engineering

**Status:** Approved

## Purpose

This document implements the WCAG 2.2 AA baseline and enhanced critical-path requirements approved by [ADR-0007](../adrs/ADR-0007-accessibility-conformance-foundation.md).

Automated checks are necessary but never sufficient. Accessibility acceptance combines semantic implementation, component contracts, automated analysis, keyboard and zoom validation, and assistive-technology testing.

## Ownership

- Product owners define equivalent outcomes.
- Design System owns accessible primitives and component behavior.
- Feature teams own correct composition and content.
- Accessibility Engineering owns standards, tooling, test matrix, consultation, and blocking authority.
- Provider owners ensure third-party equivalence.
- Release owners preserve evidence.

An accessible component cannot make an inaccessible page impossible; feature teams remain accountable.

## Semantic-first implementation

- Use native HTML controls and landmarks before ARIA.
- Preserve heading hierarchy and page title.
- Use links for navigation and buttons for actions.
- Associate labels, descriptions, errors, totals, and constraints programmatically.
- Keep DOM order aligned with reading and focus order.
- Use tables only for tabular data with headers and captions.
- Use lists, status, progress, dialog, and disclosure semantics accurately.
- Avoid redundant or invalid ARIA.

ARIA never changes application authorization or lifecycle.

## Keyboard

Every action is operable without pointer, drag, hover, gesture, or timing precision.

- Logical focus order
- Visible focus
- No keyboard trap
- Escape and close behavior
- Roving tabindex only in appropriate composite widgets
- Drag alternatives
- Skip navigation
- Stable shortcuts with discoverability and conflict avoidance

Checkout, Builder, Comparison, filters, Admin bulk work, evidence upload, and dialogs receive complete keyboard journeys.

## Focus

Focus moves only after a meaningful user-triggered context change:

- Route navigation to heading or task target
- Dialog open and return
- Error summary to field
- Completion or failure outcome
- Removed focused item to a logical neighbor

Async refresh does not reset focus. Recalculation and partial updates use status announcements.

## Dynamic state

Use restrained live regions:

- Polite for settled search count, save, recalculation, and background status
- Assertive only for urgent blocking error
- Batch high-frequency changes
- Avoid announcing skeletons and every stream token

Loading, empty, partial, stale, pending, Indeterminate, and completed remain semantically distinct.

## Forms

- Persistent visible label
- Format and requirement before input
- Field error plus summary
- Preserve valid input
- Do not rely on placeholder
- Correct autocomplete and input purpose
- Password manager and paste support
- Accessible timeout and resend
- Explicit confirmation for consequences

Validation does not erase values or move focus unexpectedly.

## Visual requirements

- Semantic color tokens meet approved contrast.
- Text and controls survive 200% zoom and reflow at 320 CSS pixels.
- No essential two-dimensional scrolling except approved complex content with alternative.
- Text spacing overrides do not clip.
- Status never uses color alone.
- Focus indicators are not obscured.
- Touch targets meet approved sizing.
- Light, dark, comfortable, and compact modes retain equivalence.

## Motion

Respect `prefers-reduced-motion`.

- Remove nonessential animation.
- Provide non-motion state cues.
- Avoid flashing.
- Pause controllable movement.
- Do not make time or animation convey unique information.

## Media and documents

- Images have purpose-appropriate alternative text.
- Decorative imagery is ignored.
- Product media alt text stays factual.
- Video requires captions and transcript; audio description when visual information is essential.
- Generated PDFs and downloads require an accessible format or equivalent HTML outcome.
- Charts provide structured data and summary.

## Responsive workspaces

Comparison, PC Builder, Checkout, Support, and Admin preserve:

- Same task and information
- Programmatic panel names
- Focus and scroll continuity
- Structured alternative to diagrams
- No required drag
- Complete mobile action path or explicit approved larger-workspace guard

## Third-party components

Identity, payment, chat, maps, media, consent, and provider widgets must pass the same journey requirements.

Adoption requires:

- Keyboard and screen-reader behavior
- Zoom and contrast
- Focus ownership
- Error and timeout recovery
- Localization
- CSP and privacy
- Provider remediation commitment
- Equivalent fallback

An inaccessible critical provider blocks launch.

## Tooling

Use:

- TypeScript and lint rules for common semantic errors
- Storybook accessibility checks
- axe-core automated scans
- Playwright keyboard, focus, and page checks
- DOM and accessible-name assertions
- Visual regression for focus, zoom, contrast modes, and reflow
- HTML validation

Tools and versions are centrally pinned. Suppressions require owner, rationale, scope, expiry, and manual evidence.

## Component gates

Every Design System component includes:

- Keyboard model
- Focus behavior
- Role, name, state, and property contract
- Label and description contract
- Error and status behavior
- Reduced-motion behavior
- Zoom and responsive behavior
- High-contrast behavior
- Screen-reader notes
- Automated and manual fixtures

Breaking accessible behavior is a breaking component change.

## Page gates

Every page template and canonical page validates:

- Title, landmarks, headings, and skip path
- Primary task keyboard journey
- Focus restoration
- Every required state
- Error recovery
- Zoom and reflow
- Theme and density
- Portuguese content expansion
- Provider and cross-shell transition

Critical journeys receive end-to-end assistive-technology validation.

## Manual test matrix

At minimum:

- Keyboard-only on supported desktop browsers
- VoiceOver with Safari on macOS and iOS
- NVDA with a supported Chromium or Firefox browser on Windows
- Browser zoom and OS text scaling
- Forced-colors/high-contrast where supported
- Reduced motion
- Mobile screen reader for critical customer journeys

Exact supported versions follow the browser-support register.

## Testing cadence

- Component contribution
- Feature pull request
- Page/template release
- Provider adoption
- Browser or framework upgrade
- Design System release
- Pre-production journey audit
- Periodic production audit
- Incident regression

Detailed QA campaign planning remains in the later Testing phase.

## Defects and exceptions

Accessibility defects use severity based on blocked outcome, affected users, workaround, frequency, and criticality.

Exceptions require:

- Exact barrier
- Affected outcome
- Equivalent workaround
- Owner
- Remediation plan
- Expiry
- Approval

No permanent blanket exception exists.

## Production monitoring

Monitor:

- Client errors in accessible interactions
- Focus and dialog failures where safely detectable
- Provider failures
- Customer accessibility feedback
- Support patterns
- Automated scans of representative public pages

Do not record assistive-technology use as sensitive personalization without consent.

## Quality gate

A release is blocked when a critical journey cannot be completed through an approved accessibility path, even if automated scores pass.

## Consequences

Accessibility becomes an engineering invariant and release criterion. This requires recurring manual expertise and provider scrutiny but prevents late retrofit and preserves the premium experience.

## References

- [Accessibility Foundations](../04-design-system/10-accessibility-foundations.md)
- [Primitive Components](../04-design-system/11-primitive-components.md)
- [Component Lifecycle](../04-design-system/24-component-lifecycle-and-quality.md)
- [ADR-0007](../adrs/ADR-0007-accessibility-conformance-foundation.md)

