# Risk, Dependency, Issue, and Decision Registers

**Status:** Approved

## Decision

Operate linked live controls using stable IDs and auditable history.

- Risks use outcome tier, probability, impact, affected authority/pages, controls, trigger, owner, review, residual risk, and acceptance authority.
- Dependencies use provider/consumer, type, needed-by gate, lead-time range, fallback, owner, and satisfaction evidence.
- Issues record observed impact, containment, resolution, owner, escalation, and verification.
- Decisions record question, options considered, authority, status, rationale, effective point, dependencies, affected records, and supersession.

Assumptions and temporary controls link directly rather than appearing as prose footnotes. One record may affect multiple increments, pages, risks, tests, and release dossiers.

## Cadence and escalation

Committed records are reviewed weekly; Q0/Q1 and critical-path changes are reviewed immediately. Overdue actions, low-confidence critical assumptions, unowned records, expired controls, and repeated issue recurrence escalate to horizon or exposure review.

Closure requires evidence that the condition is resolved, transferred to an accepted residual risk, or superseded by an approved decision.

## References

- [Controlled Registers](03-assumptions-constraints-and-controlled-registers.md)
- [Traceability](../07-testing/39-requirements-risks-tests-and-evidence-traceability.md)
