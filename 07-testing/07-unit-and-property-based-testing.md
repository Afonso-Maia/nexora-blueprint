# Unit and Property-Based Testing

**Status:** Approved

## Decision

Pure domain rules use deterministic example and property-based tests without infrastructure. Generative, model-based, and mutation techniques are applied where they materially strengthen invariant evidence rather than as repository-wide quotas.

## Primary subjects

- Money, quantity, rounding, promotion precedence, and eligibility
- Lifecycle transition functions and policy decisions
- Compatibility rule parsing, unit-safe evaluation, explanations, and `Unknown`
- Authorization kernel decisions and non-disclosure shaping
- Search query normalization and governed ranking functions that are pure
- Localization parsing and Brazilian format helpers
- Idempotency digests, revisions, retry classifications, and scheduling calendars
- Serialization, schema transforms, redaction, and accessibility helpers

## Test design

Examples establish named business cases and boundaries. Properties establish invariants across broad generated spaces, including:

- determinism and stable replay;
- no invalid state transition;
- exact conservation or bounded arithmetic;
- order independence only where the contract permits it;
- monotonic revision and non-regression;
- round-trip serialization;
- idempotent repeated application;
- safe failure for malformed, missing, extreme, or unknown input; and
- no hard Compatibility approval from unknown facts.

Generators produce valid and invalid values with shrinking and retained failure seeds. Time, identity, randomness, locale, and ruleset version are explicit inputs.

## Mutation and model evidence

Mutation testing is targeted to Q0/Q1 pure rule packages and security-sensitive helpers to reveal assertions that execute code without protecting meaning. Surviving material mutations require stronger evidence or an explained equivalent control.

State-machine/model tests apply to bounded lifecycles such as Checkout Operation, Order, Case, Build, Reservation, and approval transitions. The model mirrors approved semantics, not implementation structure.

## Controls

- No infrastructure or network
- No test order or wall-clock dependence
- No snapshot-only proof for business decisions
- Failure output includes seed, minimal counterexample, rule/policy version, and expected invariant
- Coverage thresholds may locate unexercised code but do not define completion

## Rejected alternative

Example-only unit testing is rejected for high-dimensional rule spaces. Universal property or mutation testing is also rejected because it creates noise and cost where finite examples already prove the bounded behavior.

## References

- [Compatibility Engine](../06-engineering/16-compatibility-engine-architecture.md)
- [Commercial Facts](../06-engineering/17-pricing-promotions-inventory-and-availability.md)
- [Quality Risk Classification](02-quality-risk-classification.md)
