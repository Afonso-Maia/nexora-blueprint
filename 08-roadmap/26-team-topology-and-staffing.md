# Team Topology, Ownership, and Staffing Assumptions

**Status:** Approved

## Decision

Use stable capability ownership with temporary mission-focused delivery cells. Do not create a separate team for every domain or a centralized platform queue for all shared work.

Initial accountable capabilities are Customer Experience, Commerce Core, Product Intelligence, Support/Account, Admin Experience, and Platform Quality/Operations. Individuals may cover multiple capabilities; the capacity register records that reality and its risks.

For each committed increment, form a small cell from the owning experience, relevant source owners, Design System/accessibility, and Platform Quality/operations. Security, Privacy, data, content, and other specialists join according to risk.

## Assumptions

No exact headcount or velocity is approved. Forecasts use capability availability ranges, explicit contention, leave/on-call load, onboarding, and provider dependencies. Ownership must exist even when implementation capacity is fractional.

Source owners remain accountable for domain behavior and tests; experience owners for composition; Platform for the paved road; Release owner for the dossier. Independent specialist authority is preserved.

## Gate

Work cannot enter committed when required authority or minimum implementation/operational ownership is absent. Adding people does not automatically shorten a dependency-bound critical path.

## References

- [Test Ownership](../07-testing/04-test-ownership-and-responsibility.md)
- [Domain Modules](../06-engineering/10-domain-modules-and-transaction-boundaries.md)
