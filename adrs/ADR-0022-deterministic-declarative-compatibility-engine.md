# ADR-0022: Deterministic Declarative Compatibility Engine

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Compatibility must provide one explainable result across Product Detail, Comparison, Search filters, PC Builder, Cart, Checkout, Support, Admin, and AI. The model must handle typed Catalog facts, physical and logical relationships, configuration-wide constraints, missing data, rule evolution, and replay without allowing consumer-specific or AI-created truth.

Viable approaches included:

1. A constrained declarative rule model compiled to a deterministic domain evaluator
2. General-purpose executable rules or scripts
3. Compatibility logic embedded independently in consumers

## Decision

Build the Compatibility engine in the authoritative modular core using a constrained typed declarative rule model and immutable compiled Rule Set versions.

Evaluate versioned Catalog fact snapshots and a typed configuration relationship graph through a pure, side-effect-free evaluator.

Use explicit Compatible, Warning, Incompatible, Unknown, and Not-applicable outcomes with structured findings and evidence. Hard incompatibilities cannot be overridden. Unknown never becomes Compatible implicitly.

Compile and statically validate rule types, units, references, dependencies, complexity, conflicts, explanations, and fixtures before atomic activation. Support shadow evaluation, dependency-indexed impact analysis, explicit rollback, and deterministic replay.

Cache only by configuration, rule, fact, context, and engine digests. Re-evaluate current authority at Cart and Checkout checkpoints and retain the consequential evaluation evidence.

Arbitrary scripts, general-purpose policy execution, consumer fallbacks, and AI-generated runtime decisions are prohibited.

## Consequences

### Benefits

- Deterministic results remain consistent across every consumer.
- Typed unit-safe rules are statically testable.
- Findings are explainable, replayable, and auditable.
- Dependency indexing enables incremental evaluation and impact analysis.
- Hard constraints remain active through purchase commitment.

### Costs and risks

- A domain-specific rule language and authoring environment require investment.
- Cross-rule conflict and coverage need continuous governance.
- Catalog fact migrations affect rule compatibility.
- Conservative Unknown semantics expose data-quality gaps.

## Governance

- Compatibility remains the sole rule and evaluation authority.
- Catalog remains the fact authority.
- Rule activation requires immutable source, fixtures, conflict analysis, independent review, and an exact compiled digest.
- Language extensions require Compatibility and Engineering review with migration and security analysis.
- Consumers cannot override hard findings or provide fallback rules.
- A material change to rule execution, outcome semantics, fact authority, hard-block behavior, or evaluation evidence requires a superseding ADR.

## References

- [Compatibility Engine Architecture](../06-engineering/16-compatibility-engine-architecture.md)
- [PC Builder Architecture](../02-information-architecture/09-pc-builder.md)
- [ADR-0002: Shared Compatibility Domain](ADR-0002-shared-compatibility-domain.md)
- [ADR-0020: Governed Versioned Catalog](ADR-0020-governed-versioned-catalog.md)

