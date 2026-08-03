# Assumptions, Constraints, and Controlled Registers

**Status:** Approved

## Decision

Maintain one versioned roadmap-control system with linked registers rather than duplicating truth in plans and status reports.

| Register | Minimum fields |
| --- | --- |
| Increment | outcome, pages/templates, owner, horizon, dependencies, entry/exit evidence, exposure |
| Assumption | statement, confidence, evidence, owner, review date, invalidation effect |
| Dependency | provider/consumer, type, needed-by gate, satisfaction evidence, fallback |
| Risk | Q tier, probability, impact, controls, trigger, owner, residual risk |
| Issue | observed condition, impact, containment, owner, target resolution |
| Decision | question, authority, status, effective date, affected records |
| Provider/procurement | capability, stage, lead time, constraints, exit posture |
| Capacity | team/specialist capability, availability range, contention, review date |
| Environment/data | profile, provider mode, data revision, parity gaps, owner |
| Debt/temporary control | risk, containment, expiry, removal increment, evidence |

Repository Markdown remains authoritative for approved strategy. Implementation systems may host live register instances, but must retain stable identifiers and exportable history.

Unknown dates, staffing, policy, provider, workload, and legal values remain explicit assumptions or decision gates. They are never filled with planning convenience.

## Control

Every committed increment reviews its linked records. Expired assumptions and temporary controls block horizon promotion until renewed by the proper authority or resolved.

## References

- [Technology-Selection Governance](../06-engineering/35-adr-and-technology-selection-governance.md)
- [Requirements and Evidence Traceability](../07-testing/39-requirements-risks-tests-and-evidence-traceability.md)
