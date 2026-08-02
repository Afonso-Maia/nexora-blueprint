# Primitive Components

**Status:** Approved

## Purpose

This document defines the smallest governed structural, content, media, and interaction building blocks used by Nexora components and patterns.

## Decision

Nexora uses a **small semantic primitive substrate**, not an exhaustive atomic catalog.

Primitives encode stable layout relationships, typography, media framing, focus, activation, disclosure, and overlay behavior. They do not own domain state, business policy, product taxonomy, Compatibility, permissions, transactions, or page workflow.

## Primitive criteria

An artifact is a primitive when it:

- Solves one low-level recurring responsibility
- Has stable semantics or composition behavior
- Is used by multiple component families
- Has no durable domain workflow
- Can declare complete accessibility and state behavior
- Cannot be represented more clearly by native structure alone in specifications

A design token is not a primitive. A visually small component is not automatically a primitive.

## Shared primitive contract

Every primitive declares:

- Purpose and semantic output
- Allowed content
- Supported tokens and constrained properties
- Default and exceptional behavior
- States and invalid combinations
- Keyboard, focus, and assistive-technology behavior
- Responsive, density, theme, and localization behavior
- Nesting and composition rules
- Performance and test obligations
- Prohibited product semantics

## Structural primitives

### Container

Constrains content to an approved maximum measure and responsive page gutter.

Variants:

- Reading
- Form
- Transaction
- Standard
- Wide
- Data-wide

Container does not select an archetype or add a page landmark automatically.

### Stack

Arranges related items along the block direction with a semantic gap.

Rules:

- Gap uses approved spatial semantics.
- Nested stacks reflect real grouping.
- Stack does not add dividers or cards automatically.
- Visual reversal cannot contradict reading order.

### Inline

Arranges related items in the inline direction with wrapping and alignment.

Use for labels, actions, metadata, and compact value groups. Inline content wraps before it clips and respects logical direction.

### Cluster

Distributes a variable group of peers with wrapping, such as chips, action sets, or metadata.

Cluster does not imply selection. Its children retain their own interaction semantics.

### Grid

Creates a governed repeated or aligned layout.

Grid supports:

- Fixed logical column count
- Minimum viable item width
- Named responsive transformations
- Consistent gaps
- Semantic source order

Grid is a layout primitive, not an interactive ARIA grid.

### Split

Creates primary and supporting regions with bounded measures.

Split collapses according to content fit and archetype rules. It cannot move critical constraints below optional guidance.

### Frame

Maintains a media or visualization aspect relationship.

Frame supports governed ratios and fallback behavior. It does not choose crop semantics; Media defines contain, cover, and focal treatment.

### Divider

Adds a perceivable and semantic separation only when the content structure needs it.

Decorative separators are hidden from assistive technology. A structural separator exposes the appropriate semantics.

### Spacer

Spacer is not a public content primitive. Layout uses gaps and insets. An implementation may use internal spacing mechanics, but arbitrary empty elements are not part of the design contract.

## Surface primitives

### Surface

Provides a semantic background, boundary, radius, and optional elevation.

Approved roles:

- Canvas
- Base
- Sunken
- Raised
- Floating
- Inverse
- Functional status surface

Surface does not imply a card, selection, clickability, or landmark. Interactive appearance requires an interaction component.

### Scrim

Provides protective contrast or modal separation under the approved depth contract.

Scrim cannot reveal restricted background information or become a decorative translucent layer.

## Content primitives

### Text

Applies one approved semantic type role and content color.

Text:

- Does not select a semantic HTML role solely from visual style.
- Supports user scaling and wrapping.
- Does not truncate unless a consuming component supplies complete-content recovery.
- Preserves locale and direction metadata.

### Heading

Associates a visual heading role with a separately declared semantic level.

Heading order belongs to page and component structure. Size does not determine level.

### Label

Presents persistent visible naming for a control, value, or compact object property.

Form-label association belongs to the form component; Label provides typography and content behavior.

### Code

Presents exact identifiers or code-like values using the governed monospace strategy.

Code supports wrap, copy, and character distinction. It cannot visually alter the authoritative value.

### Icon

Renders one governed icon at an approved size.

Icon declares whether it is decorative or informative. Interactive behavior belongs to a control.

### Media

Renders an image, illustration, or other bounded visual with:

- Fit and focal treatment
- Intrinsic dimensions
- Loading and failure behavior
- Alternative text or decorative status
- Theme-safe boundary

Media does not infer product variant truth.

## Interaction primitives

Interaction primitives are primarily composition foundations. They are not exposed as unlabeled customer controls.

### Pressable

Provides consistent activation semantics for controls that are not native links or form inputs.

Pressable supplies:

- Keyboard activation
- Pointer and touch behavior
- Focus visibility
- Pressed, disabled, and pending coordination
- Minimum target behavior

Use native button semantics whenever possible. Pressable cannot make arbitrary containers interactive without a clear role and label.

### Navigation target

Provides link semantics, current state, focus, and destination behavior.

Navigation target is not used for mutations. Disabled navigation requires a genuine unavailable state and explanation; links are not styled as enabled when no destination exists.

### Focus boundary

Coordinates focus entry, containment where truly modal, restoration, and escape behavior for a governed region.

It does not automatically trap focus. The consuming overlay or composite pattern declares whether containment is required.

### Disclosure

Coordinates expanded state, controlling relationship, content identity, and keyboard behavior.

Disclosure preserves content in the accessibility tree according to actual visibility and does not hide critical constraints by default.

### Selection group

Coordinates single or multiple selection semantics, names, current values, and keyboard behavior.

The consuming component declares whether it is radio-like, checkbox-like, tab-like, listbox-like, or another established pattern. Visual chips do not determine semantics.

### Roving-focus group

Supports composite widgets where one tab stop and internal directional navigation are appropriate.

It is prohibited for ordinary lists of links or controls that should remain independently tabbable.

### Overlay anchor

Coordinates trigger relationship, positioning intent, collision, dismissal, focus return, and layering for popovers, menus, and tooltips.

Overlay content declares its own semantics and action safety.

### Scroll region

Creates a named bounded scroll area only when necessary.

It:

- Remains keyboard and touch operable.
- Exposes focus when needed.
- Avoids nested scroll traps.
- Preserves restoration context.
- Does not hide essential content behind hover-only scrollbars.

## Internal state primitives

### Progress indicator

Represents determinate or indeterminate progress with an accessible name and current value when measurable.

It cannot claim completion.

### Skeleton block

Preserves approximate layout during loading without fabricating exact facts.

Skeleton is hidden from repetitive assistive-technology announcements and replaced by the settled content.

### Status mark

Combines a functional icon shape and color role for a known status family.

Status mark always appears with visible or programmatically associated text. Domain components provide the specific meaning.

## Composition rules

1. Layout primitives may nest only when each level represents a real relationship.
2. Interactive primitives cannot be nested into conflicting activation targets.
3. A component exposes one primary semantic control rather than a collection of ungoverned primitive properties.
4. Components consume semantic tokens; callers do not inject raw style values.
5. Primitives do not accept page IDs, permissions, price logic, Compatibility results, or domain lifecycle values as styling inputs.
6. Responsive changes use named transformations, not arbitrary child reordering.
7. Theme and density resolve tokens without changing semantics.

## State model

Primitives support only states they can own:

- Resting
- Hovered where applicable
- Focused
- Pressed
- Selected when the primitive coordinates selection
- Disabled
- Read-only where meaningful
- Pending for activation coordination
- Loading for media or content replacement

Domain states such as refunded, incompatible, out of stock, awaiting approval, or restricted belong to composed components.

## Escape hatches

An escape hatch requires:

- A missing reusable capability
- Named affected consumers
- Accessibility and responsive impact
- Containment
- Review date
- Contribution or removal path

Arbitrary color, spacing, DOM-role, focus, or ordering overrides are prohibited. Repeated escape hatches trigger primitive review.

## Accessibility

Primitives implement:

- Native semantics where possible
- Complete names, roles, values, states, and relationships
- Keyboard and focus behavior
- Target size
- Theme and forced-color behavior
- Reduced motion
- Zoom, text scaling, and reflow
- Pointer and touch equivalence

Primitive compliance does not certify a composed component or page.

## Responsive and density behavior

- Structural primitives use logical properties and content-driven wrapping.
- Compact density changes approved gap and inset semantics only.
- Source order remains stable.
- Scroll regions appear only when reflow cannot preserve the relationship.
- Surface and Frame may become full bleed at constrained capacity under their host contract.

## Validation

Each primitive is validated:

- Alone and in representative compositions
- In light and dark themes
- In comfortable and compact density
- With Portuguese expansion and technical extremes
- With keyboard, touch, screen reader, zoom, reflow, forced colors, and reduced motion
- Under loading, failure, and missing-content conditions
- For invalid nesting and unsupported states

## Governance

1. Primitives are owned by the Design System Council.
2. A new primitive must meet the primitive criteria and separate-asset threshold.
3. Domain-specific requests default to components or patterns.
4. Semantic or interaction changes are coordinated or breaking.
5. Primitive consumers are tracked before deprecation or removal.

## Consequences

### Benefits

- Shared low-level behavior stays consistent.
- Domain logic remains visible in higher layers.
- Layout adapts without arbitrary page styling.
- Accessibility contracts are reusable and testable.

### Costs and risks

- A small catalog requires disciplined composition.
- Over-general primitives could become unsafe escape hatches.
- Native and custom behavior need platform-specific Engineering validation later.

## Next decision

Define form and input components, validation, grouped submission, and consequential-action behavior.
