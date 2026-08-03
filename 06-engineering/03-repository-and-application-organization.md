# Repository and Application Organization

**Status:** Approved

## Purpose

This document defines how Nexora source, applications, domain modules, shared implementation assets, platform adapters, and engineering tooling are organized and governed.

It establishes repository and project boundaries without selecting a programming language, framework, package manager, build orchestrator, database, cloud, or deployment platform.

## Decision

Use a **governed monorepo containing independently buildable projects with mechanically enforced dependency and ownership boundaries**.

The monorepo is the coordination boundary for Nexora source and contracts. It is not the runtime or deployment boundary. A project may build, test, version, release, or deploy independently when an approved application or capability boundary requires it.

Organize the repository into these conceptual project classes:

```text
applications
├── customer experience
├── administrative experience
├── application and BFF runtimes
└── workers and independently operated capabilities

domain modules
├── authoritative domain logic
├── application use cases
├── owned contracts
└── owned persistence and integration ports

design system
├── foundations and generated token outputs
├── primitives and components
├── patterns
└── page-template implementation

platform
├── provider and infrastructure adapters
├── runtime capabilities
└── cross-cutting technical mechanisms

contracts
├── external and cross-runtime schemas
├── compatibility and version metadata
└── generated consumer artifacts

tooling
├── build, test, lint, and architecture rules
├── code and schema generation
└── repository automation
```

These are responsibility classes, not a requirement to create every directory immediately. Exact folder names and tool-specific configuration follow technology selection.

## Repository boundary

The monorepo contains:

- First-party application and worker source
- Governed domain-module source
- Design System implementation and generated artifacts
- Public cross-runtime contract definitions
- Platform adapters and shared technical capabilities
- Database schema and migration ownership metadata
- Architecture, build, test, generation, and validation tooling
- Application and project documentation required to implement the Blueprint

The Product Blueprint remains authoritative Markdown documentation. Implementation cannot replace or silently reinterpret it.

Large binary media, production customer data, secrets, generated build artifacts, provider credentials, and environment-specific mutable state do not belong in source control.

## Application organization

### Customer experience

The customer experience is one coherent application boundary for the approved customer-facing ecosystem:

- Storefront and Discovery
- Product Evaluation and Comparison
- Cart and unified Checkout
- Account and post-purchase continuity
- Customer authentication
- Support Center
- PC Builder
- AI Shopping Assistant
- Legal, informational, and customer recovery routes

These remain distinct product domains and route modules inside the experience. Co-location does not transfer authority or require one undifferentiated frontend bundle.

A customer surface may later become an independent application only when route ownership, assurance, scale, reliability, release, or deployment needs pass the approved independent-deployment threshold.

### Administrative experience

The Administrative Dashboard is a distinct application boundary because it has workforce identity, stronger assurance, capability-based navigation, dense operational interaction, source-domain command gateways, field restrictions, audit obligations, and a different security and deployment risk profile.

It consumes the same governed Design System and shared contracts while retaining Admin-specific shells, templates, density, routing, and quality gates.

The Admin application coordinates source-owned work. Its project boundary cannot become a shared Admin domain that owns commerce records.

### Application and BFF runtimes

Experience-facing runtime projects compose use cases, apply presentation-specific policy, propagate identity and authorization context, and translate owned contracts.

The number and deployment shape of BFF runtimes remain a later decision. Repository organization must support customer and Admin separation without assuming one shared BFF or one BFF per UI area.

### Workers and independent capabilities

Workers, Search, AI orchestration, media processing, notifications, and external-provider adapters receive independent projects only after their runtime or deployment boundary is approved.

Background work that remains co-deployed still has an explicit executable entry point, ownership, contract, resource profile, and failure policy. A generic worker that accumulates unrelated domain behavior is prohibited.

## Domain-module organization

Each authoritative domain module owns:

- Its domain model, invariants, and lifecycle behavior
- Its application use cases and command handling
- Its public in-process contract
- Its persistence and external-integration ports
- Its private implementation
- Its schema and migration ownership
- Its domain events and integration-event mapping
- Its authorization enforcement points
- Its tests, fixtures, operational diagnostics, and module documentation

Initial module names must follow approved source authority rather than page or navigation labels. Expected authorities include Catalog, Compatibility, Pricing, Inventory, Purchase, Customer, Support, Discovery, Identity and Security responsibilities, Roles and Permissions responsibilities, AI, PC Builder, Marketing, Reviews, Notifications, and Admin Platform composition.

This list guides organization but does not pre-approve every item as a separately deployed service, database, or package. Module granularity is refined through domain and data decisions.

Purchase remains the approved authority for Cart, Checkout composition, and orders. Repository organization cannot create a parallel authoritative Orders module merely because orders have distinct pages or operational workflows.

## Public and private boundaries

Every project exposes one or more declared public entry points. Consumers cannot import:

- Private implementation paths
- Persistence models or database clients owned by another module
- Internal framework wiring
- Test-only helpers outside approved testing contracts
- Generated implementation details not designated as contracts

Public module contracts expose behavior and stable data shapes rather than mutable internal entities.

Cross-runtime contracts use governed schemas in the contract class or in an explicitly owning project. In-process contracts remain owned by the providing module and are not copied into a generic shared-model package.

## Dependency direction

Dependencies follow these rules:

1. Applications may depend on application composition, Design System, and public module or contract entry points.
2. Application and BFF composition may coordinate public module use cases but cannot access private domain or persistence implementation.
3. Domain modules may depend on narrowly governed foundation libraries and their declared ports.
4. One authoritative domain module cannot import another module's private model, persistence, or implementation.
5. Platform adapters depend inward on owned ports or public contracts; domain logic does not depend on provider SDKs or infrastructure frameworks.
6. Design System lower layers cannot depend on higher layers or domain applications.
7. Contracts cannot depend on applications, provider adapters, or mutable runtime configuration.
8. Tooling may inspect projects but cannot become a runtime dependency.
9. Cycles across project boundaries are invalid.

When one domain needs another domain's fact or operation, it uses an owned contract, application orchestration, or governed event. Moving code to a shared package is not a substitute for resolving authority.

## Shared-code threshold

Code belongs in a shared project only when it has:

- A stable cross-consumer responsibility
- One accountable owner
- A documented public contract
- Multiple real or imminent approved consumers
- Compatible security, accessibility, runtime, and release needs
- Independent tests and lifecycle

Visual similarity, duplicated type shapes, common framework usage, or possible future reuse is insufficient.

Generic `common`, `shared`, `utils`, `helpers`, and `models` projects are prohibited unless their responsibility and ownership are narrowed and named. Prefer small owner-led capabilities such as identifiers, clocks, money representation, contract validation, observability interfaces, or testing fixtures when a later decision approves their semantics.

## Design System organization

Design System projects preserve:

`Foundations → Tokens → Primitives → Components → Patterns → Page templates`

The implementation may group adjacent layers for practical publication only when public entry points, dependency direction, ownership, testing, and breaking-change impact remain distinguishable.

Domain-specific components and patterns remain owned extensions. They consume shared lower layers without moving domain semantics into primitives or generic components.

Generated token and asset outputs have one declared source. Generated files cannot be edited independently or become a competing token authority.

## Ownership metadata

Every project declares:

- Accountable owner
- Purpose and classification
- Public entry points
- Allowed dependency classes
- Runtime and deployment consumers
- Data and schema ownership, if any
- Security and privacy classification
- Accessibility obligations
- Supported environments
- Build, test, and quality commands
- Versioning and release policy
- Lifecycle status

Repository-level ownership rules request accountable review for changes to public contracts, schemas, migrations, security boundaries, Design System foundations, architecture rules, and deployment definitions.

Ownership metadata supports review and automation. It does not replace source-domain authorization or operational accountability.

## Boundary enforcement

The repository toolchain must fail validation for:

- Disallowed dependency directions
- Cross-project import cycles
- Imports through undeclared private paths
- Direct access to another module's storage
- Provider SDK use inside governed domain logic
- Missing project ownership or classification
- Contract changes without compatibility classification
- Schema or migration files without an owning domain
- Unapproved dependency additions
- Generated artifacts that differ from their governed source

Enforcement uses project manifests, public entry points, dependency graph rules, static analysis, architecture tests, and storage-access checks appropriate to the selected technologies.

Temporary exceptions follow the approved [Engineering exception policy](02-mission-principles-scope-and-governance.md#exception-policy). They require owner, scope, review date, containment, and removal plan.

## Build and change isolation

Each project has deterministic build and validation inputs. The toolchain can calculate affected projects from source, configuration, contract, and dependency changes.

An affected-project optimization may skip unrelated work only when:

- The dependency graph is complete.
- Generated inputs and environment-sensitive configuration are represented.
- Security, repository-integrity, and global architecture checks still run where required.
- A full-validation path remains available and runs at governed intervals or release gates.

Independent buildability does not require independent version numbers or deployments. Release strategy follows application, Design System, contract, and deployment decisions.

## Rejected alternative

Multiple repositories aligned to applications or major domains are viable when independently accountable teams require separate access, release, compliance, or operational boundaries.

Nexora does not begin with that model. For the expected team size it would make atomic contract changes, shared Design System evolution, architecture validation, local development, dependency discovery, and cross-surface refactoring more expensive without a demonstrated isolation benefit.

Repository extraction remains possible when a project gains a durable security, compliance, access, release, scale, or team-accountability boundary. Extraction requires explicit contract, history, ownership, CI/CD, dependency, migration, and developer-workflow planning.

## Validation

This decision:

- Preserves the modular authoritative core without equating repository and deployment boundaries.
- Gives customer and Admin experiences appropriately distinct application boundaries.
- Supports selective independent deployment without pre-creating services.
- Prevents page names and UI areas from defining source modules.
- Protects domain storage and implementation behind owned public contracts.
- Preserves the Design System layer model and generated-source authority.
- Makes ownership, dependency direction, cycles, and exceptions mechanically governable.
- Remains neutral about languages, frameworks, package managers, build tools, and cloud platforms.

## Consequences

### Benefits

- Cross-cutting changes and contracts can be reviewed atomically.
- A small team receives one coherent development and validation environment.
- Project boundaries remain visible and enforceable.
- Shared Design System and contract evolution are easier to coordinate.
- Deployment units can evolve without repository-first fragmentation.

### Costs and risks

- Build performance and affected-project accuracy require disciplined tooling.
- Broad repository access may need later path-sensitive controls for sensitive capabilities.
- Poorly governed shared projects could recreate hidden coupling.
- Independent deployment from a monorepo requires artifact and pipeline isolation.

## Governance

- New projects declare their class, owner, public contract, consumers, dependency rules, and lifecycle.
- A new application requires an approved runtime, assurance, release, or deployment distinction.
- A shared project must pass the shared-code threshold.
- Cross-project cycles and private imports are not accepted as expedient architecture.
- A material change to repository strategy, project classes, or dependency direction requires a superseding ADR.

## References

- [ADR-0009: Governed Monorepo and Enforced Project Boundaries](../adrs/ADR-0009-governed-monorepo.md)
- [System Shape and Deployment Boundary](01-system-shape-and-deployment-boundary.md)
- [Engineering Mission, Principles, Scope, and Governance](02-mission-principles-scope-and-governance.md)
- [Page Relationships and Domain Ownership](../03-product-structure/02-page-relationships-and-ownership.md)
- [Design System Architecture](../04-design-system/01-system-architecture.md)
- [Component Lifecycle and Quality](../04-design-system/24-component-lifecycle-and-quality.md)

## Next decision

Define system context and runtime topology, including executable roles, trust boundaries, synchronous paths, asynchronous paths, edge behavior, and the initial co-deployment model.
