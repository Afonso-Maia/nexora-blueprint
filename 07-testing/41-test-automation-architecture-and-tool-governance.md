# Test Automation Architecture and Tool Governance

**Status:** Approved

## Decision

Automation uses shared evidence contracts and platform primitives with domain-owned suites. Tools remain replaceable adapters selected by proof fidelity, diagnostics, accessibility, determinism, integration, maintenance, security, and total cost.

## Architecture

- Tests live with the owning source or contract where practical.
- Shared libraries provide identities, clocks, seeds, factories, PostgreSQL lifecycle, queue/network/provider controls, semantic interaction, trace capture, and evidence metadata.
- Domain-specific helpers expose business language without hiding assertions, retries, waits, or effects.
- Runners emit a common result envelope: test/risk/requirement IDs, artifact, environment, seed, timing, owner, status, quarantine/exception, and safe diagnostics.
- Parallelization uses isolated namespaces and resource budgets.
- Test code follows production review, dependency, secret, update, deprecation, and security policy.

## Tool selection

Selection records compare at least two viable choices against required proof, browser/AT support, protocol fidelity, deterministic control, diagnostics, CI fit, data handling, license, ecosystem health, migration/exit, and operating cost.

Tool adoption does not approve SaaS data transfer, production access, test-only product hooks, opaque self-healing selectors, record/replay of personal data, or vendor-owned requirement truth.

Test-only interfaces are allowed only as secured non-production adapters or governed diagnostic ports that expose approved public outcomes. Production code cannot change semantics under test.

Automatic test generation may propose cases; owners review requirement, assertions, data, layer, and maintenance. Generated volume is not evidence quality.

## References

- [Technology Governance](../06-engineering/35-adr-and-technology-selection-governance.md)
- [Test Levels and Types](05-test-levels-and-types.md)
