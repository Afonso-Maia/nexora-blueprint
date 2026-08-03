# Component Lifecycle and Quality

**Status:** Approved

## Purpose

This document operationalizes contribution, specification, review, testing, versioning, release, adoption, exception, deprecation, and removal for all Design System layers.

## Decision

Nexora treats every governed asset as a **versioned product contract with tracked consumers and release gates**.

Visual completion alone is insufficient. Approval requires semantic, behavioral, accessibility, state, theme, responsive, density, content, localization, testing, and lifecycle completeness appropriate to the layer.

## Lifecycle

`Identify → Classify → Propose → Specify → Review → Validate → Approve → Publish → Adopt → Maintain → Deprecate → Remove`

## Identify

A request includes:

- Problem
- Affected users and tasks
- Approved page IDs and archetypes
- Existing workaround
- Frequency and consequence
- Known similar assets
- Owner

## Classify

Determine:

- Foundation, Token, Primitive, Component, Pattern, or Page template
- Shared system, domain extension, or host-specific composition
- Whether an existing asset can extend safely
- Separate-asset threshold
- ADR need

Visual difference alone is not sufficient.

## Proposal status

Statuses:

- **Proposed:** under review, not authoritative
- **Approved:** authoritative supported contract
- **Deprecated:** supported temporarily with replacement
- **Removed:** unavailable to new or migrated consumers, retained historically
- **Superseded:** decision replaced by a later approved contract

Experimental exploration remains outside approved documentation and cannot be presented as supported.

## Required specification

Every component or pattern declares:

- Name and layer
- Purpose
- Owner
- Anatomy
- Semantic model
- Content model
- Variants
- States and combinations
- Actions and effects
- Accessibility
- Keyboard and focus
- Announcements
- Theme
- Responsive transformations
- Density
- Localization
- Data and source ownership
- Permissions and privacy
- Loading, failure, partial, offline, stale, and conflict behavior
- Dependencies
- Consumers
- Prohibited uses
- Test matrix
- Version and status
- Change history

Not-applicable fields are explicitly marked with rationale.

## Naming

- Canonical names describe purpose.
- One asset has one name across design and engineering.
- Variants use semantic language.
- Marketing, page, team, and framework names are prohibited in shared component names.
- Renaming a consumed asset is a migration even when appearance is unchanged.

## Ownership

### Design System owner

Owns shared contract, catalog, release, cross-product quality, and lifecycle.

### Domain owner

Owns domain semantics, authoritative states, content, operation effects, and source dependencies.

### Accessibility owner

Has blocking review for incomplete or failing supported behavior.

### Engineering owner

Later owns implementation parity, package delivery, browser/platform support, performance, and technical tests.

Approval remains accountable even when review is delegated.

## Review gates

Required gates according to impact:

- Design System architecture
- Domain semantics
- Accessibility
- Content and localization
- Brand
- Security and privacy
- Legal
- Engineering feasibility
- Performance

A failed required gate blocks approval.

## Test layers

### Contract tests

Validate supported properties, states, invalid combinations, semantics, and event effects.

### Visual tests

Validate approved themes, density, viewports, content extremes, and state combinations.

### Interaction tests

Validate keyboard, pointer, touch, focus, dismissal, selection, and interruption.

### Accessibility tests

Combine automated rules with manual keyboard, screen-reader, zoom, reflow, forced-color, and reduced-motion tests.

### Content tests

Validate Portuguese grammar, expansion, terminology, formatting, missing content, and safe fallback.

### Integration tests

Validate real source state, permission, async outcome, provider failure, and host composition.

### Journey tests

Validate critical customer and Admin tasks across several components and pages.

## Required combinations

Each asset tests applicable:

- Light and dark
- Comfortable and compact
- Constrained, compact, standard, wide, and data-wide
- Empty, loading, partial, stale, offline, failed, pending, and completed
- Anonymous, guest, customer, restricted, workforce, and provider contexts
- Default, long, missing, and invalid Portuguese content
- Keyboard, touch, screen reader, zoom, reflow, high contrast, and reduced motion

Pairwise or risk-based reduction may manage combinations but cannot omit critical paths or known interactions.

## Reference compositions

Components validate in representative archetypes, not only isolation.

At minimum:

- Customer Hub
- Search Results
- Product Detail
- Comparison Workspace
- Checkout Transaction
- Support Content or Detail
- Authentication Recovery
- Admin Queue
- Admin Resource Workspace

## Quality severity

- **Blocker:** unsafe authority, inaccessible critical task, destructive error, restricted disclosure, or data/state corruption
- **High:** material task failure or misleading consequential state
- **Medium:** significant inconsistency or friction with a viable path
- **Low:** limited defect without material task impact

Approved releases contain no known Blocker or High defect in supported use.

## Versioning

The Design System uses semantic change classes:

- **Major:** breaking semantic, behavior, accessibility, state, or composition change
- **Minor:** backward-compatible capability, state, or variant
- **Patch:** compatible correction or clarification

Documentation may record conceptual versions before implementation packaging exists.

Theme-only or “visual-only” changes are breaking when they alter hierarchy, contrast, state distinction, layout fit, or consumer assumptions.

## Release notes

Each release records:

- Changed assets
- Change class
- Rationale
- Affected consumers
- Migration
- Accessibility impact
- Theme/responsive/content impact
- Deprecations
- Known limitations

## Adoption

Adoption records:

- Consumer product and page IDs
- Version
- Domain extension
- Exceptions
- Owner
- Migration status

Using a shared component does not transfer source-domain ownership.

## Exceptions

Exception requirements follow [Mission and Governance](02-mission-principles-and-governance.md#exception-policy).

Repeated exceptions trigger:

- Missing variant review
- Incorrect layer review
- Pattern gap review
- Page architecture conflict review

An exception does not become a silent variant.

## Deprecation

Deprecation requires:

- Reason
- Approved replacement
- Affected consumers
- Migration guide
- Compatibility window
- Accessibility and state impact
- Owner
- Removal criteria and date or condition

New consumers cannot adopt deprecated assets.

## Removal

Removal occurs only when:

- Known supported consumers have migrated or received an approved exception.
- Documentation and examples no longer recommend the asset.
- Tokens and dependencies are safely removed or aliased.
- Historical records retain the old meaning.
- Rollback or correction exists where necessary.

## Breaking change process

1. Proposal and impact analysis
2. Consumer inventory
3. ADR evaluation
4. Migration and compatibility strategy
5. Required reviews
6. Approval
7. Versioned publication
8. Adoption tracking
9. Deprecation window
10. Removal validation

## Third-party dependencies

Fonts, icons, payment controls, media providers, maps, charts, editors, or other dependencies declare:

- Version and license
- Owner
- Accessibility and theme behavior
- Data and privacy
- Failure and fallback
- Update policy
- Replacement plan

Silent upstream updates are prohibited.

## Design-to-engineering parity

Later implementation must map each approved asset to:

- Canonical name
- Tokens
- Supported properties
- States
- Accessibility semantics
- Documentation
- Tests
- Version

Design-only variants and code-only variants are defects unless explicitly classified.

## Metrics

Track:

- Approved asset coverage
- Page and archetype adoption
- Exceptions
- Duplicates
- Accessibility defects
- Breaking changes
- Deprecated consumers
- Test coverage
- Documentation freshness

Metrics support stewardship; they do not replace qualitative review.

## Governance

1. Design System Council approves shared releases.
2. Domain owners approve domain semantics.
3. Accessibility approval is blocking.
4. Known consumers are tracked for coordinated and breaking changes.
5. No unresolved alternative ships as approved.
6. Cross-cutting expensive changes receive ADR review.

## Phase 3 handoff requirement

Before Phase 3 completion:

- Every specified asset has an owner and layer.
- Every pattern has representative components and states.
- Every archetype has a template.
- Every page maps to a template and pattern set.
- Residual Engineering inputs are explicit.

## Consequences

### Benefits

- Shared assets remain maintainable after initial design.
- Breaking effects are visible before release.
- Accessibility and localization remain release gates.
- Deprecated behavior has a controlled exit.

### Costs and risks

- Consumer tracking and testing require tooling.
- Release gates add review time.
- Broad combination coverage needs risk-based automation and manual testing.

## Next decision

Define the nine page-template specifications and their mapping contract.
