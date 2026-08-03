# Support Case and External-Work Testing

**Status:** Approved

## Decision

Support validation proves the shared typed Case envelope, source-owned remedies, append-only communication/evidence, obligation tracking, and bounded external work without allowing provider or presentation state to resolve source outcomes.

## Evidence

- Intent routing, deterministic self-service eligibility, duplicate Case detection, guest/customer continuity, and case-creation threshold
- Shared lifecycle plus type-specific state, responsibility, priority, reason, and source references
- Customer Messages versus Internal Notes, participants, channel association, ordering, edit prohibition, and notification separation
- Evidence upload validation, malware/quarantine, classification, custody, access, retention, acceptance/rejection, and non-equivalence of receipt
- Obligation start, pause reason, evidence, resume, breach/escalation, ownership handoff, and clock/calendar behavior
- Remedy Request authorization, eligibility, idempotency, pending/indeterminate result, source outcome, compensation, and reconciliation
- External work package scope, provider access, callback trust, updates, completion evidence, dispute, timeout, and manufacturer-only handoff
- Accessible Case timeline, next action, attachments, degraded provider state, and mobile restoration

Provider completion never resolves a Case or approves a remedy automatically. AI may summarize or suggest but cannot own Case facts or decisions.

## References

- [Support Engineering](../06-engineering/20-support-cases-communication-evidence-and-external-work.md)
- [ADR-0026](../adrs/ADR-0026-shared-typed-support-case-and-bounded-external-work.md)
