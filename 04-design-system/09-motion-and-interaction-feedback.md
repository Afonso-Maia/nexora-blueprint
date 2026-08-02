# Motion and Interaction Feedback

**Status:** Approved

## Purpose

This document defines motion roles, timing, easing, spatial continuity, interaction feedback, asynchronous progress, drag behavior, reduced motion, and prohibited animation.

## Decision

Nexora uses **functional, restrained, and interruptible motion**.

Motion explains relationship, change, progress, and consequence. It does not decorate routine navigation, manufacture urgency, make AI appear sentient, or delay a fast path. Reduced motion replaces non-essential spatial movement with immediate updates or restrained non-spatial feedback.

## Motion principles

1. Every motion has an informational purpose.
2. Feedback begins promptly after user input.
3. Visual completion does not claim authoritative operation success.
4. Motion remains interruptible and reversible where the action is reversible.
5. Related objects move coherently; unrelated regions remain stable.
6. Repeated work uses less motion than first-use explanation.
7. Focus and announcements follow state truth, not animation timing alone.
8. Reduced motion preserves comprehension and task completion.
9. Loading motion does not fabricate progress.
10. No essential information exists only during animation.

## Duration tokens

| Token | Duration | Use |
| --- | ---: | --- |
| `motion.duration.none` | `0ms` | Immediate state or reduced-motion replacement |
| `motion.duration.instant` | `80ms` | Press, highlight, and local response |
| `motion.duration.fast` | `140ms` | Hover, focus-adjacent, small disclosure |
| `motion.duration.standard` | `220ms` | Default component transition |
| `motion.duration.deliberate` | `320ms` | Drawer, panel, or meaningful reflow |
| `motion.duration.slow` | `480ms` | Rare large-context continuity |
| `motion.duration.ambient` | `800ms+` | Progress cycles only; never content choreography |

Durations are upper-level intent. Platform calibration may vary slightly while preserving perceptual category and reduced-motion behavior.

## Easing tokens

| Token | Conceptual curve | Use |
| --- | --- | --- |
| `motion.easing.standard` | balanced ease-in-out | State-to-state movement |
| `motion.easing.enter` | decelerating | Content entering a stable location |
| `motion.easing.exit` | accelerating | Content leaving without replacement |
| `motion.easing.emphasized` | stronger deceleration | Bounded major panel or shared-object continuity |
| `motion.easing.linear` | linear | Indeterminate rotation or continuous measurable travel |

Spring or overshoot behavior is not part of the core system. It may imply playfulness or uncertainty inappropriate to transactions and technical state.

## Feedback sequence

For user-initiated interaction:

1. Acknowledge activation immediately.
2. Preserve the initiating label, object, and scope.
3. Show validation or accepted processing state.
4. Present authoritative success, failure, partial, pending, or indeterminate outcome.
5. Keep recovery or next action available.

A pressed animation is acknowledgement, not confirmation.

## Component feedback

### Hover and focus

- Hover uses subtle color, surface, or border change within `fast`.
- Focus appears immediately and does not animate from invisibility.
- Hover never reveals an action unavailable to keyboard or touch users.
- Tooltips use a restrained delay only to avoid accidental activation; essential content remains visible elsewhere.

### Press and selection

- Pressed feedback uses `instant`.
- Selection changes expose label, icon, border, and programmatic state.
- Multi-select and compare selection persist after the animation.
- Disabled controls do not animate as if activation were accepted.

### Disclosure

- Expand/collapse uses `fast` or `standard`.
- Focus and reading order remain logical.
- Content is not announced repeatedly during intermediate frames.
- Large dynamic height changes prefer a simple reveal over complex interpolation.

### Navigation

- Ordinary route changes do not require page-transition choreography.
- Shared-object continuity may preserve orientation in Comparison, PC Builder, Account, or Admin when it does not delay content.
- Back and restoration return to meaningful prior context without replaying decorative entrance motion.

## Panels and overlays

- Menus and popovers use `fast`.
- Drawers use `standard` or `deliberate`.
- Dialogs use a restrained opacity and scale or spatial entrance.
- Exiting content releases focus only after the destination can safely receive it.
- Overlay motion never masks restricted background content.
- On-screen keyboard and safe-area changes reflow without competing animations.

## Loading and progress

### Initial loading

Skeletons may use a restrained low-contrast pulse. They approximate layout structure, not exact text, price, stock, Compatibility, or permission.

### Indeterminate work

Use a spinner, progress bar, or equivalent only when duration cannot be measured. The indicator has an accessible label naming the work.

### Determinate work

Progress reflects authoritative measurement and includes text when users need the current step, quantity, or remaining obligation.

### Long-running operations

After prompt acknowledgement:

- Name the accepted operation.
- Preserve scope and correlation.
- Allow safe navigation when processing is asynchronous.
- Surface completion through source-owned state and notification.
- Avoid looping celebration or attention-demanding motion.

An operation that becomes indeterminate does not animate to 100%.

## Search, filtering, and results

- Suggestions update promptly without moving focus.
- Result changes use stable regions rather than full-grid entrance animation.
- Active filters visibly persist.
- Sort or filter changes may use a brief local transition to explain reordering.
- Infinite or incremental loading exposes position and completion without endless decorative motion.

## Commerce

- Cart addition acknowledges the exact item and variant.
- Price, stock, and total changes use restrained emphasis without counting animations that obscure exact values.
- Checkout validation moves focus or offers a summary after layout is stable.
- Place Order enters a guarded pending state and blocks duplicate activation.
- Success motion begins only after an authoritative order exists.
- Payment failure does not shake the entire page.

## Comparison and PC Builder

- Added or removed products preserve column and selection continuity.
- Compatibility recalculation identifies affected components and pending facts.
- Hard blockers do not pulse continuously.
- Budget and performance changes update values directly with bounded emphasis.
- Panel switching preserves workspace object, selection, and scroll context.

## Admin operations

- Selection and bulk scope update immediately.
- Preview-to-commit preserves change-envelope identity.
- Approval and execution never use celebratory motion.
- Partial or indeterminate outcomes remain stable for inspection.
- New queue items do not steal focus or continuously reorder a user’s active work.

## Drag and spatial manipulation

Drag is allowed only when spatial manipulation materially improves the task.

Every drag interaction provides:

- Keyboard and non-drag alternative
- Clear pickup, position, valid target, and drop feedback
- Cancellation
- Boundary and invalid-target explanation
- Persisted outcome only after authoritative acceptance

Auto-scrolling is bounded and stops immediately when intent stops. Drag motion cannot bypass Compatibility, permission, validation, or staged-change rules.

## Notifications

- Toasts enter and exit with `standard` or less.
- Critical or action-required messages do not disappear solely on a timer.
- Repeated events aggregate rather than cascade.
- Motion never becomes the only notice.
- New notifications do not move focus.
- Source pages retain durable operation truth after transient feedback disappears.

## Reduced motion

When reduced motion is requested:

- Spatial travel, scale, parallax, simulated depth, and continuous pulsing are removed.
- State changes become immediate or use a brief opacity transition.
- Progress remains available through text and static or minimally animated indicators.
- Auto-advancing media stops unless explicitly started.
- Drag alternatives remain fully usable.
- Focus never depends on waiting for animation.

Reduced motion does not remove meaningful state feedback or progress.

## Prohibited motion

- Auto-playing hero carousels
- Parallax tied to routine scrolling
- Continuous gold glow or gamer-style ambient animation
- Bouncing primary actions
- Confetti for purchase, approval, or operational completion
- Animated AI typing intended to simulate personhood when content is already available
- Fake progress percentages
- Count-up prices or totals
- Repeated shaking of invalid content
- Motion that blocks navigation or input
- Auto-scrolling users away from active work

## Performance and resilience

- Prefer properties that do not trigger broad layout work.
- Motion cannot delay meaningful content or interaction readiness.
- Low-power and degraded modes may remove non-essential transitions.
- Background tabs and restored sessions resolve to current state rather than replaying missed animation.
- A failed animation asset or API does not block state presentation.

## Accessibility

- Flashing content remains below seizure-risk thresholds; the core system does not use rapid flashes.
- Focus is visible before and after transitions.
- Announcements occur for meaningful settled states.
- Magnification users do not lose the active object during movement.
- Motion-triggered content is available by another input method.
- Pause, stop, or hide controls exist for any non-essential moving content that persists.

## Governance

1. New duration or easing tokens require a recurring semantic need.
2. Component motion declares purpose, trigger, duration, interruption, reduced-motion replacement, focus behavior, and announcement behavior.
3. Marketing motion cannot enter core transaction, Support, authentication, PC Builder validation, or Admin operation semantics.
4. AI receives no exclusive anthropomorphic animation language.
5. Motion changes are tested with real content and degraded performance.

## Validation

Validate:

- Pointer, keyboard, touch, voice, and assistive-technology activation
- Reduced-motion preference
- Slow device and network behavior
- Rapid repeated input and interruption
- Back navigation and restored persisted state
- Loading, pending, partial, failed, and indeterminate operations
- Overlay focus and dismissal
- Search updates, Checkout submission, PC Builder recalculation, and Admin bulk work

## Consequences

### Benefits

- Motion reinforces causality without distracting from technical content.
- Operation truth remains independent from visual acknowledgement.
- Reduced motion is an equivalent mode.
- Stable layouts support dense comparison and Admin work.

### Costs and risks

- Restrained motion demands stronger static hierarchy.
- Shared-object continuity requires later implementation coordination.
- Async operations need authoritative state events rather than animation shortcuts.

## Next decision

Define accessibility foundations, conformance scope, interaction requirements, and validation gates.
