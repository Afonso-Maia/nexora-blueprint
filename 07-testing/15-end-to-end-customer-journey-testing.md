# End-to-End Customer Journey Testing

**Status:** Approved

## Decision

Nexora maintains a deliberately small, risk-selected deployed customer journey suite. It proves application, BFF, source, worker, provider-adapter, and browser composition while narrow suites retain exhaustive rule and failure coverage.

## Core journey set

The release suite covers:

1. Search or governed browse to Product Detail
2. Product Comparison decision continuity
3. PC Builder creation, persistence, recalculation, and Cart conversion
4. Cart through unified Checkout to authoritative Order or truthful pending/failed outcome
5. Authentication interruption and validated continuation
6. Order Detail and federated Account continuity
7. Support Case creation and customer update
8. Deterministic path completion with AI absent or unavailable

Each journey includes one material rejection, recovery, degraded, or ambiguity path. Variants are risk-selected rather than multiplied across every browser and payment combination.

## Journey contract

Every journey records:

- approved goal, page IDs, actors, risk IDs, and source owners;
- authoritative preconditions and synthetic data identities;
- stable public actions and semantic locators;
- operation, correlation, quote, ruleset, revision, and provider-test references;
- authoritative final and intermediate assertions;
- accessible focus, announcements, errors, and recovery;
- telemetry and diagnostics expected; and
- cleanup or expiration behavior.

UI confirmation alone cannot prove price, payment, Order, Case, Build, or notification outcome. The suite confirms the owning source through a governed diagnostic/read interface.

## Execution and stability

- Critical smoke journeys run on release candidates and progressive exposure.
- Broader variants run on a governed schedule and relevant changes.
- Tests use condition-based waits tied to visible or authoritative state, never arbitrary sleeps.
- Each run receives isolated identities, inventory or reservation allocation, provider namespace, and idempotency keys.
- A failure preserves trace, browser state, network summary, operation references, and safe screenshots.

## Scope controls

Journey tests do not exhaust domain calculations, field validation, role matrices, visual combinations, provider faults, message delivery permutations, or every page. Those remain at cheaper layers.

## Rejected alternative

An 89-page browser regression suite is rejected. Page coverage is proven through templates, components, contracts, and page mapping; only cross-boundary outcomes warrant journey automation.

## References

- [Customer Journeys](../02-information-architecture/08-customer-journeys.md)
- [Critical Journey Contract](../06-engineering/32-testing-interfaces-and-architectural-quality-gates.md#critical-journey-contract)
- [Test Levels and Types](05-test-levels-and-types.md)
