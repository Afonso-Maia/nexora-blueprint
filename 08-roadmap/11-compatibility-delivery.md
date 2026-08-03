# Compatibility Capability Delivery

**Status:** Approved

## Decision

Deliver deterministic Compatibility in I2 after governed Catalog facts exist and before compatibility-dependent Comparison, PC Builder, or AI claims.

Sequence typed fact contracts, versioned declarative rules, deterministic graph evaluation, explicit compatible/incompatible/unknown results, structured explanations, conflict detection, atomic ruleset activation, impact analysis, and rebuildable projections.

The initial supported category graph is a controlled scope decision based on complete fact quality and representative evidence; unsupported relationships return unknown rather than invented compatibility.

## Exposure

First expose Compatibility on Product Detail and Comparison. PC Builder consumes the same engine in I6. AI may cite Compatibility only through the governed tool after I7 evidence. Admin rule authoring requires preview, impact, approval where assigned, activation, rollback to a prior immutable ruleset, and Audit.

## Gates

Ruleset/fact identities bind every result. Property, mutation, golden-case, conflict, missing-fact, activation, performance, and reconciliation evidence block exposure.

## References

- [Compatibility Architecture](../06-engineering/16-compatibility-engine-architecture.md)
- [Compatibility Validation](../07-testing/22-deterministic-compatibility-validation.md)
