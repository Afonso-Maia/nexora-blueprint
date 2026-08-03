# Compatibility Engine Architecture

**Status:** Approved

## Purpose

This document defines the deterministic rule, fact, evaluation, explanation, activation, evidence, recalculation, caching, and failure architecture for Compatibility.

It implements the shared Compatibility domain established by [ADR-0002](../adrs/ADR-0002-shared-compatibility-domain.md). Catalog owns governed input facts; Compatibility owns rules and evaluations; consumers own their experience state and cannot override hard incompatibility.

## Decision

Build a deterministic Compatibility engine inside the authoritative modular core using:

- A constrained, typed, declarative rule model
- Versioned Catalog fact contracts
- Compiled immutable rule-set versions
- Pure side-effect-free evaluation
- An explicit component relationship graph
- Stable severity and unknown-state semantics
- Structured explanation templates backed by evidence
- Atomic activation, shadow evaluation, and explicit rollback
- Dependency-indexed incremental recalculation
- Revision-bound result caching
- Retained evaluation evidence for consequential commerce operations

Do not use arbitrary executable scripts, AI-generated runtime decisions, a general-purpose policy engine, or one-off consumer logic as Compatibility authority.

## Viable approaches considered

### Constrained declarative rules compiled to a domain evaluator

Rule authors use governed operands, relationships, operators, units, severities, and explanation templates. The system validates and compiles these rules into an immutable execution plan.

This is approved because Compatibility needs determinism, explainability, static validation, impact analysis, dependency tracking, safe authoring, and exact replay across Product Detail, Comparison, PC Builder, Cart, Checkout, Support, and Admin.

### General-purpose executable rules or scripts

Rules could be TypeScript, a general expression language, or uploaded scripts.

This offers flexibility but makes termination, dependency discovery, security, testing, migration, explanation, and non-engineer governance materially harder. It is not approved for ordinary rules. A genuinely inexpressible relationship requires extending the governed language through Engineering and Compatibility governance, not inserting an escape-hatch script.

### Compatibility logic embedded in each consumer

Each surface could implement only the checks it needs.

This is prohibited by the approved Blueprint because it creates competing truth and inconsistent outcomes.

## Ownership boundaries

### Compatibility owns

- Relationship and component-role taxonomy used for evaluation
- Rule Set and Rule Version aggregates
- Rule language schemas and compiler
- Severity, applicability, conflict, and unknown semantics
- Evaluation, explanation, and evidence contracts
- Test fixtures and coverage policy
- Activation, scheduling, rollback, and incident response
- Dependency index and impact analysis
- Evaluation diagnostics

### Catalog owns

- Product and Variant identity
- Category and Attribute Definition identity
- Typed governed Product and Variant facts
- Units, value semantics, provenance, and published revisions
- Fact completeness and publication eligibility

### Consumers retain

- PC Builder owns Build composition, slot state, persistence, warning acknowledgements, and workspace interaction.
- Purchase owns Cart and Checkout composition and decides when a current Compatibility result is required.
- Catalog-owned surfaces own Product Detail and Comparison presentation.
- Search owns Compatibility filter projections but not evaluation truth.
- Support owns case context and coordination.
- AI may translate or explain an authoritative result but cannot create, change, suppress, or override it.

## Evaluation subject model

Compatibility evaluates a versioned **configuration**, not an unstructured list of products.

A configuration contains:

- Configuration type
- Typed participant roles or slots
- Product or Variant references
- Quantity where semantically relevant
- Optional installation or environment context from a governed schema
- Catalog fact revisions
- Evaluation purpose

Initial purposes include:

- Product-to-product relation
- Comparison assistance
- PC Build
- Cart validation
- Checkout validation
- Support diagnostic
- Admin simulation
- Search filter projection

Purpose can select applicable rules and evidence retention, but cannot make the same physical relationship produce contradictory hard facts. A purpose-specific rule must declare why the context changes applicability.

## Relationship graph

The engine represents a configuration as a typed graph:

- Nodes represent Products, Variants, components, slots, or governed environment facts.
- Edges represent installed-in, connects-to, powers, cools, fits-within, shares-bus-with, requires, excludes, or other registered relationship types.
- Node and edge types are stable governed identifiers.
- Cardinality and allowed endpoints are schema constraints.

The graph supports pairwise and configuration-wide rules. It avoids forcing power budget, physical clearance, lane sharing, or multi-module memory constraints into unrelated pair checks.

Relationship types are Compatibility-owned semantics. A new Product category does not automatically create a new relationship type.

## Fact contract

Compatibility consumes an immutable fact snapshot for every participant.

Each fact contains:

- Product and Variant identifier
- Catalog published revision
- Attribute Definition identifier and version
- Typed canonical value
- Canonical unit
- Provenance and verification status where policy requires it
- Missing, unknown, not-applicable, or withheld state
- Effective time

The engine accepts only registered Compatibility-input attributes and versions.

It rejects:

- Display strings as numeric or enumerated facts
- Free-form supplier claims
- Unknown definition versions
- Ambiguous unit conversion
- Stale critical facts beyond policy
- Conflicting Product and Variant values
- Client-supplied facts represented as Catalog authority

Consumer-provided environment facts use a separate validated namespace and provenance. For example, a user-entered case-clearance limit can constrain a simulation but does not update Catalog.

## Rule model

A rule version declares:

- Stable Rule Set and Rule Version identifiers
- Human title and purpose
- Applicable configuration types and participant roles
- Category, Product-type, or Attribute preconditions
- Required fact dependencies
- Typed expression tree
- Outcome and severity
- Structured explanation template
- Evidence bindings
- Remediation and alternative metadata
- Effective schedule
- Test fixtures
- Owner, author, reviewer, and approval evidence
- Schema and compiler compatibility

Rules are immutable after submission for approval. Editing creates a new draft version.

## Expression language

The constrained language supports registered operations such as:

- Exact equality and inequality
- Ordered numeric comparison
- Range containment and overlap
- Set membership, inclusion, intersection, and exclusion
- Cardinality and quantity constraints
- Sum, minimum, maximum, and bounded arithmetic
- Unit-safe measurement comparison
- Required and forbidden relationships
- Boolean composition
- Conditional applicability
- Explicit missing-value tests

Every operator declares accepted types, null behavior, unit behavior, complexity bound, explanation binding, and dependency extraction.

The language does not support:

- Network, filesystem, clock, randomness, or database access
- Unbounded loops or recursion
- Dynamic code loading
- Arbitrary regular expressions
- Floating-point comparison for governed measurements
- Mutation
- Hidden external model calls

The evaluation time is supplied as versioned context when schedule matters. The evaluator never reads an ambient clock during replay.

## Compilation

Activation compiles validated rules into an immutable intermediate representation.

Compilation performs:

- Schema validation
- Type and unit checking
- Reference resolution
- Relationship validation
- Dependency extraction
- Constant folding
- Complexity estimation
- Unreachable and contradictory-branch detection
- Explanation-placeholder validation
- Test-fixture binding
- Compiler-version recording

The compiled artifact has a deterministic content digest. The same source, schema, compiler, and dependencies must produce the same digest.

Compilation failure blocks activation and preserves the current active rule set.

## Outcome model

Every evaluation returns one of:

- **Compatible** — all applicable required checks passed and critical fact coverage is sufficient.
- **Warning** — the configuration is permitted but has a governed risk, limitation, tradeoff, or recommended correction.
- **Incompatible** — a hard constraint failed; the affected configuration or operation is blocked.
- **Unknown** — required facts, supported rules, freshness, or evaluation capability are insufficient to determine the result safely.
- **Not applicable** — no Compatibility relation is defined or required for the requested scope.

Unknown is not Compatible. Not applicable is not Unknown.

An evaluation can include multiple findings. Its overall outcome uses deterministic severity aggregation:

`Incompatible → Unknown → Warning → Compatible → Not applicable`

This ordering is for conservative overall handling, not for concealing individual results. A consumer displays all relevant, non-duplicative findings according to its experience contract.

If policy allows an operation with an Unknown result, that is an explicit consumer-domain eligibility policy with visible uncertainty; Compatibility never changes Unknown to Compatible.

## Rule conflicts

Rules do not use an arbitrary last-write-wins priority to make contradictory physical claims disappear.

During validation and simulation:

- Overlapping Compatible and Incompatible outcomes for the same governed condition are a blocking conflict.
- Duplicate findings are detected by relationship, condition, and outcome identity.
- A narrower explicit exception must reference the general rule, declare its scope, and pass conflict tests.
- Warning and hard-block semantics cannot be changed through explanation text.

If an unanticipated active conflict occurs at runtime, the affected finding is Unknown with a conflict diagnostic, and consequential consumers fail safely. The engine alerts Compatibility owners.

## Explanation contract

Every finding includes a structured explanation:

- Stable finding code
- Outcome and severity
- Affected participant and relationship identifiers
- Rule Set and Rule Version
- Plain-language Brazilian Portuguese message key
- Fact bindings and comparison values safe for the audience
- Why the relationship matters
- Required correction or eligible alternatives
- Override eligibility
- Evidence and source revision references
- Diagnostic reference for authorized Admin or Support use

Explanation templates use controlled placeholders. Rule authors cannot insert executable markup or expose restricted supplier, security, or internal test data.

Customer messages prioritize the problem, affected parts, and corrective action. Admin diagnostics can expose additional typed evidence when authorized.

AI can restate an explanation at an appropriate level, but the stable finding, outcome, evidence, and correction remain visible and attributable to Compatibility.

## Warning acknowledgement

Warnings may be acknowledged only when the Rule Version declares them overrideable for the operation.

An acknowledgement records:

- Configuration or operation identity
- Exact finding code and Rule Version
- Fact revisions
- Attributable subject
- Presentation language
- Confirmation time
- Expiry or invalidation policy

A changed configuration, relevant fact, Rule Version, purpose, or operation can invalidate acknowledgement.

Hard incompatibilities are never acknowledged away. AI, Support, Admin role, or customer preference cannot convert a hard block into a warning.

## Evaluation request

The public domain contract accepts:

- Purpose and configuration type
- Participant and role references
- Configuration revision
- Optional governed context
- Required freshness class
- Caller correlation and operation identity

Compatibility resolves authoritative Catalog fact snapshots. A consumer can pass known source revisions as an optimization or concurrency precondition, but cannot assert newer facts.

The request is bounded by participant, edge, rule, and complexity limits. Unsupported graph size or type returns an explicit unsupported or unavailable result rather than partial Compatible.

## Evaluation response

The response contains:

- Evaluation identifier
- Overall outcome
- Ordered findings
- Configuration digest
- Active Rule Set versions and digest
- Catalog fact revisions and digest
- Evaluation-purpose and context version
- Evaluated time
- Engine and compiler version
- Coverage and freshness state
- Expiry or revalidation triggers
- Cache status
- Explanation contract version

The response distinguishes successful evaluation from transport or capability failure. An HTTP success does not mean Compatible.

## Evaluation modes

### Current evaluation

Resolves current authoritative facts and active rules. Use for Product, PC Builder changes, Cart, Checkout, and source decisions that require current truth.

### Pinned replay

Evaluates or retrieves the exact rule and fact versions recorded for historical evidence. Use for audit, Support explanation, incident analysis, and regression.

Pinned replay cannot authorize a current purchase.

### Draft simulation

Runs a draft rule version against approved fixtures, selected configurations, or a bounded production-derived corpus in an isolated environment.

Simulation cannot publish a result as current authority and is protected by Admin authorization and data minimization.

### Shadow evaluation

Runs an approved candidate Rule Set beside the active version, records differences, and has no customer or commerce effect.

## Incremental evaluation

The compiler builds a dependency index from:

- Participant roles
- Relationship types
- Category and Product types
- Attribute Definition versions
- Context fields

When a Build changes, the engine:

1. Computes the changed nodes, edges, facts, and context.
2. Selects affected rule partitions.
3. Reuses unaffected findings only when their rule and fact digests remain valid.
4. Re-evaluates affected rules.
5. Recomputes the overall outcome and explanation order.

Incremental and full evaluation of the same versions must produce identical results. Differential tests enforce this invariant.

Consumers debounce interaction for performance but must not delay a known hard block or present stale Compatible as current.

## Caching

Compatibility results can be cached by:

- Configuration digest
- Purpose and context version
- Rule-set digest
- Catalog fact digest
- Engine version

The key contains no translated labels or price and inventory data.

Cache entries expire at the earliest relevant rule, fact, context, or policy boundary. Catalog publication and Rule Set activation invalidate affected entries through the dependency index.

Cache is an optimization. A missing or invalid entry triggers deterministic evaluation. Consequential evaluation cannot use a stale entry outside its declared freshness contract.

## Persistence and evidence

Browsing and interactive evaluation may remain ephemeral with trace sampling.

Retain immutable evaluation evidence when it influences:

- Cart correction
- Checkout commitment
- Order creation
- Build-to-Cart conversion
- Warning acknowledgement
- Support or warranty decision
- Admin rule activation or rollback
- Incident investigation

The evidence stores the compact configuration digest, fact and rule versions, findings, outcome, acknowledgement, and correlation needed for replay. It does not duplicate unrestricted Catalog documents.

Orders retain the Compatibility evidence used at commitment. Later rule changes do not rewrite that history; current Support or repurchase guidance can also run a fresh evaluation.

## Rule lifecycle

The lifecycle is:

`Draft → Validate → Test → Impact analysis → Independent review → Approve → Shadow or schedule → Activate → Observe → Supersede or deactivate`

Activation:

1. Rechecks author, approver, segregation, assurance, and schedule.
2. Recompiles from immutable source.
3. Verifies the artifact digest and required fixtures.
4. Atomically updates the active Rule Set pointer.
5. Records an activation event and affected dependency partitions.
6. Starts cache invalidation and recalculation.

Activation success means the new authoritative version is current. Downstream recalculation lag remains visible.

Rollback activates a previously verified Rule Version or corrected successor through a new Activation Record. History is never deleted.

## Rule testing

Every Rule Version includes:

- Positive compatible cases
- Hard-incompatible cases
- Warning cases
- Boundary values
- Missing and unknown facts
- Unit conversion
- Non-applicable participants
- Conflicting and overlapping rule cases
- Explanation snapshots
- Consumer-critical scenarios

Property and metamorphic tests apply where semantics permit. Examples include participant-order invariance for symmetric relationships and equivalent-unit invariance.

Golden fixtures use stable Catalog fact snapshots, not current mutable products.

## Coverage

Coverage is explicit by:

- Configuration type
- Participant role pair or group
- Category and Product type
- Required fact availability
- Rule Set version

The Admin workspace exposes covered, uncovered, unknown, stale, and conflicting populations. A high number of successful evaluations is not proof of complete coverage.

New Catalog categories, Attribute Definition versions, and Product types require Compatibility impact acknowledgment before Catalog activation when classified as Compatibility-relevant.

## Impact analysis and recalculation

Candidate rule or Catalog fact changes produce:

- Affected Product and Variant count
- Affected relationship and configuration types
- Stored Builds and active Carts potentially changed
- Checkout and purchase-safety effect
- Changed Compatible, Warning, Incompatible, and Unknown distribution
- Newly blocked and newly allowed configurations
- Explanation changes
- Search filter projection changes
- Coverage and performance impact

Large analysis uses resumable workers over version-fixed snapshots. Counts carry snapshot revision and exact or estimated status.

After activation, PC Builder and Search projections can recalculate asynchronously. Cart and Checkout obtain current evaluation directly when required; they do not wait for bulk projections.

## Consumer contracts

### Product Detail

Can evaluate selected Product/Variant relations or show Compatibility entry points. It distinguishes no selection, unknown facts, warning, hard block, and engine unavailability.

### Comparison

Uses the same rules and facts for comparable relationships. It does not infer compatibility from equal specification strings.

### PC Builder

Evaluates the complete Build graph after relevant changes, highlights affected slots and relationships, preserves last confirmed findings while recalculation is visibly pending, and blocks hard incompatibility.

### Search and Category Discovery

Compatibility filters use a versioned derived projection for candidate narrowing. Opening a Product and consequential actions can request current evaluation. A stale filter projection must not be represented as a current guarantee.

### Cart and Checkout

Purchase supplies the selected configuration and requires current evaluation at governed checkpoints.

- Hard incompatibility blocks progression.
- Warning follows explicit acknowledgement policy.
- Unknown follows Purchase's approved safety policy and never becomes Compatible.
- Engine unavailability cannot silently bypass a required check.

### Support and Admin

Support sees customer-safe findings and authorized evidence. Compatibility Admin sees rule diagnostics, fixtures, impact, and activation evidence. Neither consumer can edit evaluation output.

### AI

AI tools request evaluation through the same contract. They can propose alternatives and explain findings, but cannot fabricate a result, suppress a hard block, or use model knowledge instead of current rules.

## Checkout time-of-check behavior

Compatibility is re-evaluated:

- When a Build converts to Cart
- When relevant Cart composition changes
- Before Checkout commitment when Compatibility is applicable
- After a material Product/Variant or rule revision affecting the configuration

Purchase binds order creation to an Evaluation identifier, configuration digest, and acceptable current outcome. If facts or rules change between evaluation and commitment, the command conflicts and obtains a new evaluation.

Compatibility does not reserve a rule result indefinitely. Evaluation freshness is a precondition, not a lock on Catalog evolution.

## Degraded behavior

- Missing optional facts can yield a Warning only when an explicit rule defines that behavior.
- Missing required facts yield Unknown.
- Unsupported Attribute or rule versions yield Unknown with diagnostic evidence.
- Runtime conflict yields Unknown and alerts.
- Engine timeout or unavailability is a capability failure, not an evaluation result.
- Consumers can display the last confirmed result as stale context but cannot use stale Compatible for a current consequential decision.
- PC Builder preserves the Build and identifies recalculation failure.
- Product and Comparison remain usable with an explicit Compatibility-unavailable state.
- Cart and Checkout block only where current Compatibility is a required safety or eligibility condition, with a recoverable state and no lost composition.

No fallback consumer rule set is permitted.

## Security and authorization

Public evaluation accepts only eligible published Product and Variant references and bounded context.

Draft rules, diagnostics, production-derived simulations, impact populations, and internal evidence are permission-filtered.

Separate capabilities govern:

- Rule discovery and reading
- Draft authoring
- Fixture management
- Simulation
- Submission
- Independent approval
- Scheduling and activation
- Deactivation and rollback
- Evidence export
- Language or compiler administration

Rule author and activator are segregated where policy requires. Break-glass activation remains bounded, visible, auditable, and cannot disable evidence.

Rule and explanation inputs are untrusted. Templates use controlled rendering and cannot execute code or inject markup.

## Observability

Measure:

- Evaluation latency by purpose and graph size
- Outcome and finding distribution
- Unknown reason and coverage gaps
- Fact and Rule Set revision skew
- Cache hit and invalidation lag
- Incremental versus full evaluation consistency
- Rule conflict and compiler failure
- Shadow-result differences
- Activation and rollback propagation
- Build, Cart, and Checkout correction rates
- Stale evaluation rejection
- Recalculation backlog
- Explanation rendering failures

Traces correlate consumer request, configuration digest, rule and fact digests, evaluation, acknowledgement, and Purchase operation without exposing restricted Product or customer data.

## Quality gates

Before release:

- Prove deterministic output for identical inputs, versions, and engine.
- Prove full and incremental evaluation equivalence.
- Type-, unit-, complexity-, and termination-check every rule.
- Run all rule fixtures and cross-rule conflict analysis.
- Test missing, unknown, stale, unsupported, non-applicable, and runtime-conflict semantics.
- Test exact boundary values and canonical unit equivalence.
- Replay retained evidence across supported engine versions.
- Simulate changes across representative Products, Builds, Carts, and Checkout configurations.
- Verify hard blocks cannot be overridden by warning acknowledgement, Admin, Support, AI, client input, or stale cache.
- Test atomic activation, scheduled activation, failed compilation, cache invalidation, shadow comparison, and rollback.
- Verify customer, Support, and Admin explanation disclosure.
- Test keyboard, screen reader, zoom, color-independent severity, focus movement, live recalculation announcements, and reduced motion.

Architecture tests reject:

- Compatibility decisions outside the Compatibility contract
- Executable rule scripts or hidden evaluator callbacks
- Display strings used as facts
- Consumer-supplied facts asserted as Catalog truth
- Rule activation without fixtures and independent evidence
- A `boolean`-only result without Unknown and explanation semantics

## Consequences

### Benefits

- One deterministic result serves every approved surface.
- Typed rules and facts make unit, boundary, and missing-data behavior explicit.
- Compilation and dependency indexing support safe governance and fast recalculation.
- Structured evidence makes results explainable and replayable.
- Hard incompatibility remains enforceable through Checkout.

### Costs and risks

- The constrained language and authoring tools require domain-specific engineering.
- Rule interaction and coverage analysis become ongoing operational work.
- Catalog schema changes require coordinated migrations.
- Stored Builds and Search projections can lag after activation.
- Conservative Unknown handling can block or slow customers when fact quality is poor.

## References

- [PC Builder Architecture](../02-information-architecture/09-pc-builder.md)
- [Page Relationships and Domain Ownership](../03-product-structure/02-page-relationships-and-ownership.md)
- [PC Builder Workspace Patterns](../04-design-system/20-pc-builder-workspace-patterns.md)
- [Domain Modules and Transaction Boundaries](10-domain-modules-and-transaction-boundaries.md)
- [Catalog and Taxonomy Architecture](14-catalog-and-taxonomy-architecture.md)
- [Search Indexing, Ranking, Filtering, and Query](15-search-indexing-ranking-filtering-and-query.md)
- [ADR-0002: Shared Compatibility Domain](../adrs/ADR-0002-shared-compatibility-domain.md)
- [ADR-0022: Deterministic Declarative Compatibility Engine](../adrs/ADR-0022-deterministic-declarative-compatibility-engine.md)

