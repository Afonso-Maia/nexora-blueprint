# Manual, Exploratory, Usability, and Acceptance Boundaries

**Status:** Approved

## Decision

Human testing is chartered evidence for judgment, novelty, comprehension, assistive technology, realistic workflow, and product acceptance. It complements repeatable automation and is not an unstructured final regression phase.

## Boundaries

- **Exploratory:** time-boxed investigation of risks, state interactions, unfamiliar changes, and failure recovery; produces notes, evidence, defects, and new automated candidates.
- **Usability:** representative Brazilian participants evaluate comprehension, findability, confidence, recovery, and workload; it cannot authorize inaccessible or incorrect behavior.
- **Accessibility manual/AT:** qualified execution of semantic and task contracts not provable automatically.
- **Security/privacy review:** threat-led expert analysis and bounded manual validation.
- **Operational game day:** operators diagnose, restore, reconcile, and use runbooks under controlled faults.
- **Product acceptance:** accountable product/domain owners confirm approved intent and outcomes.
- **Workforce acceptance:** representative authorized operators validate real queue/workspace meaning without redefining permissions or policy.

Charters record goal, risks, pages/templates, participants, build/environment/data, constraints, methods, observations, defects, coverage, residual questions, and evidence links. Sensitive recordings and participant data require consent, minimization, access, and retention controls.

Manual scripts are not repeated indefinitely when deterministic automation can provide equal evidence. Automation is not added when human judgment is the actual requirement.

Acceptance cannot waive security, accessibility, privacy, authority, or release gates outside the explicit exception policy.

## References

- [Test Ownership](04-test-ownership-and-responsibility.md)
- [Accessibility Validation](19-accessibility-and-assistive-technology-validation.md)
