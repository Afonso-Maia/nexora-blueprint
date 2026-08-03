# Deterministic Compatibility Validation

**Status:** Approved

## Decision

Compatibility validation binds immutable Catalog fact revisions, ruleset source, compiled digest, engine version, inputs, findings, explanations, and dependency evidence. Golden fixtures are semantic decision records, not opaque snapshots.

## Evidence

- Parser, type, unit, rule-conflict, dependency-index, and compilation properties
- Known compatible, incompatible, conditional, insufficient-data, and contradictory-fact cases
- `Unknown` remains conservative and cannot become approval
- Hard findings cannot be overridden by consumers or AI
- Determinism across consumers, replay, ordering, serialization, and supported runtime versions
- Explanation cites exact facts, rules, severities, affected parts, and recovery
- Incremental recalculation equals full evaluation for affected dependencies
- Ruleset activation validates fixtures, conflicts, impact, independent review, and digest atomically
- Catalog migration and rule-language compatibility
- PC Builder, Comparison, Product, Cart, and Checkout preserve the same authority and revalidate at commitment

Property-based generators cover component graphs, missing facts, unit boundaries, cycles, replacements, and rule ordering. Curated real-world synthetic builds cover high-value Brazilian catalog combinations.

Impact analysis compares old and new rulesets over a versioned representative corpus, classifies every changed finding, and blocks unexplained hard-outcome changes.

## References

- [Compatibility Engine](../06-engineering/16-compatibility-engine-architecture.md)
- [ADR-0022](../adrs/ADR-0022-deterministic-declarative-compatibility-engine.md)
