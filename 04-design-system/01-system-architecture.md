# Design System Architecture

**Status:** Approved

## Purpose

This document defines the framing, layering, nomenclature, and extension boundary for Phase 3 — Design System and Experience Specification.

The system connects the approved product architecture to reusable visual and interaction rules without reopening page ownership, lifecycle, permissions, taxonomy, compatibility facts, operational authority, or other source-domain decisions.

## Decision

Nexora uses the following dependency and governance model:

`Foundations → Tokens → Primitives → Components → Patterns → Page templates`

The layers establish shared vocabulary, responsibility, and traceability. They do not require every design decision to produce a separate artifact in all six layers.

This cross-cutting decision is recorded in [ADR-0004](../adrs/ADR-0004-layered-design-system-architecture.md).

## Layer definitions

### Foundations

Foundations define the durable principles and constraints that govern every surface: brand expression, accessibility, interaction principles, responsive semantic continuity, content, localization, theme parity, and system governance.

Foundations state why the system behaves as it does. They are not implementation values or page-specific layouts.

### Tokens

Tokens encode named design decisions for color, typography, spacing, sizing, layout, shape, borders, elevation, motion, density, and other reusable properties.

Tokens express role and intent rather than page ownership or arbitrary visual values. Theme and responsive modes may resolve tokens differently without changing their semantic meaning.

### Primitives

Primitives are the smallest governed layout, content, and interaction building blocks with stable semantics, behavior, accessibility, and state contracts.

Primitives are intentionally low-level. They do not contain domain workflow, merchandising strategy, or page-specific authority.

### Components

Components are reusable composed controls or content units with defined anatomy, behavior, variants, states, accessibility, content rules, testing obligations, and lifecycle.

A component may express domain semantics when those semantics are durable across multiple approved contexts. Visual resemblance alone does not make two uses the same component.

### Patterns

Patterns define governed arrangements and interaction behavior for recurring product tasks, decisions, workflows, and state transitions. They coordinate components while preserving authoritative facts, user intent, recovery, and host-page hierarchy.

Patterns may be cross-product or domain-specific. They do not create new canonical destinations, lifecycle authority, or permission models.

### Page templates

Page templates are design-system realizations of the nine approved [page archetype contracts](../03-product-structure/03-information-hierarchy.md). They specify how applicable regions, patterns, responsive transformations, and states compose for the 89 approved pages and templates.

Page templates do not create new canonical pages. A page remains governed by its Page Inventory identity, accountable domain, relationships, lifecycle, access contract, and primary archetype.

## Dependency rules

1. Higher layers consume the contracts of lower layers and cannot silently override them.
2. Foundations apply across all layers, including when a lower-level artifact does not expose a configurable property.
3. Tokens may change presentation but cannot change semantic priority, interaction meaning, or authority.
4. Primitives and components expose only supported states and combinations.
5. Patterns define coordination and behavior rather than copying source-domain rules.
6. Page templates satisfy their archetype contract before adding optional composition.
7. A lower-layer change requires impact analysis across its known consumers.
8. A visual exception at a higher layer does not automatically justify a new lower-layer artifact.

## Separate-asset threshold

A separate primitive, component, pattern, or page-template variant requires at least one durable distinction in:

- Semantic meaning
- Interaction behavior
- Accessibility contract
- State model
- Content or localization contract
- Responsive or density behavior
- Testing obligation
- Ownership or governance

Purely cosmetic differences should normally use tokens, supported properties, or documented variants. One-off page styling is not a valid system layer.

Visually similar experiences must remain separate when combining them would conceal different semantics, operation outcomes, accessibility behavior, authority, or recovery. Reuse cannot flatten the distinct states defined by the [host-owned state architecture](../03-product-structure/08-error-empty-and-degraded-states.md).

## Page and archetype boundary

The Design System consumes:

- 89 canonical pages and templates
- Nine primary page archetypes
- Seven semantic hierarchy layers
- Page-specific required states, relationships, access, and ownership

Every page-template specification must identify:

- The primary approved archetype
- Required, optional, and prohibited regions
- Applicable patterns and components
- Host-owned and route-level state behavior
- Responsive and density transformations
- Accessibility obligations
- Content and localization behavior
- Source-domain facts and actions it presents but does not own

A genuine missing destination or architectural conflict returns to Blueprint governance. It cannot be resolved by inventing a design-system template.

## Protected architectural boundaries

Phase 3 must preserve:

- Search-first interaction priority
- Governed taxonomy and attribute-driven filters
- Visible, inspectable, modifiable, and clearable intent
- Optional and explainable AI
- Deterministic Compatibility authority
- Progressive disclosure without hiding consequential facts
- Meaningful state persistence and direct fast paths
- One Comparison Decision Workspace
- One PC Builder Engineering Workspace
- One unified Checkout
- Federated Account continuity
- Shared typed Support cases
- Capability-based Admin navigation and permission-aware presentation
- Host-owned operation-aware states
- Responsive semantic continuity
- Light and dark theme parity
- Accessibility as a foundational constraint

The system cannot redefine page ownership, lifecycle, permissions, product taxonomy, compatibility facts, or operational authority.

## Governance

1. Each system artifact declares its layer, purpose, consumers, owner, states, accessibility obligations, responsive behavior, content behavior, testing requirements, and lifecycle status.
2. New artifacts must pass the separate-asset threshold.
3. Changes to foundations or widely consumed tokens require explicit consumer impact review.
4. Breaking semantic or behavioral changes require migration, deprecation, and removal criteria.
5. Page-template coverage is validated against the complete Page Inventory and archetype mapping.
6. Exceptions are documented, time-bounded where appropriate, and cannot bypass protected architectural boundaries.
7. Cross-cutting or expensive-to-reverse changes require ADR evaluation.

## Consequences

### Benefits

- Designers and engineers share one vocabulary from principle to page composition.
- Accessibility, themes, responsive behavior, and states remain traceable across layers.
- The nine archetypes provide a governed upper boundary for all 89 pages.
- Reuse can grow without replacing domain semantics or source authority.
- Contribution, testing, versioning, and deprecation can operate at the correct level.

### Costs and risks

- Layer classification requires governance and review.
- Excessive abstraction could create unnecessary primitives or components.
- Page templates could be mistaken for canonical pages without the explicit archetype boundary.
- Cross-layer changes require maintained consumer traceability.

These risks are controlled through the separate-asset threshold, dependency rules, Page Inventory mapping, and lifecycle governance.

## Validation criteria

This decision is valid when:

- Every defined artifact can be assigned to one primary layer.
- Layer definitions do not conflict with the approved product architecture.
- Page templates map to approved archetypes rather than creating page identities.
- Shared components preserve distinct semantic and operation states.
- Responsive and theme variation preserves semantic meaning and accessibility.
- The separate-asset threshold prevents cosmetic component proliferation.

## Next decision

Define the Phase 3 mission, principles, scope boundaries, governance roles, and success criteria within this approved architecture.
