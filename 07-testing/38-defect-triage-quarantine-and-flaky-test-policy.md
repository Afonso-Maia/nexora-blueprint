# Defect, Triage, Quarantine, and Flaky-Test Policy

**Status:** Approved

## Decision

Defects are classified by consequence and evidence loss. Flaky tests are failures requiring diagnosis; they cannot be silently retried into success.

Severity:

- **Blocker:** unsafe authority, destructive/corrupting outcome, restricted disclosure, inaccessible critical task, uncontrolled production risk, or evidence system unable to protect Q0
- **High:** material principal-task failure, misleading consequential state, or loss of required Q1 protection
- **Medium:** significant inconsistency or friction with viable safe recovery
- **Low:** narrow limited defect without material task impact

Priority additionally considers exposure, recurrence, detectability, workaround, change window, and remediation cost. Severity is never lowered because a fix is difficult.

Triage records requirement/risk, artifact/environment, reproduction or seed, actual/expected authority, affected users/states, diagnostics, owner, severity, containment, fix, regression evidence, and escape analysis.

A test is flaky when identical intended conditions yield inconsistent results. Automatic retry may collect diagnostic evidence but the original failure remains visible and cannot produce a passing gate.

Quarantine requires owner, issue, risk, affected requirements, compensating protection, scope, expiry, and removal criterion. Q0 protection cannot be quarantined without equivalent passing evidence. Expired quarantine blocks.

Environment incidents and product defects are distinguished after evidence, not by assumption. Repeated flakes trigger systemic review of isolation, waits, data, concurrency, environment, provider, and test architecture.

## References

- [Component Quality Severity](../04-design-system/24-component-lifecycle-and-quality.md#quality-severity)
- [Release Confidence](03-ready-done-and-release-confidence.md)
