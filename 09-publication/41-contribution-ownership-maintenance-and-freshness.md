# Contribution, Ownership, Maintenance, and Freshness

**Status:** Approved

## Decision

Keep contribution source-first: edit the authoritative Markdown, update references and ADRs when required, run validation, inspect the rendered preview, obtain source-owner and publication review, and commit one coherent topic.

Assign ownership by repository section plus Publication Steward ownership for framework, schema, generation, navigation, and release workflow. Generated views inherit their source owners; the steward owns generation correctness, not source meaning.

Record review cadence and `updatedReview` metadata only for content whose risk justifies freshness review. Git modification time is provenance, not automatic freshness. Stale content remains visible with owner and review state unless it is unsafe, in which case governance determines withdrawal or supersession.

Automated dependency updates, link reports, and freshness reminders create review work; they do not approve changes. Small-team maintenance favors few components, local search, generated indexes, and provider-portable static artifacts.

## Validation

Track orphan ownership, overdue risk-based reviews, expired exceptions, broken links, unsupported dependencies, unreviewed generated changes, and preview/release failures with explicit owners and closure evidence.

## References

- [Contributing](../CONTRIBUTING.md)
- [Publication Governance and Decision Rights](02-publication-governance-and-decision-rights.md)
