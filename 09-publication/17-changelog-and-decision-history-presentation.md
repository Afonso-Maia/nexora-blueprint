# Changelog and Decision-History Presentation

**Status:** Approved

## Decision

Publish the repository changelog and ADR chronology as complementary history views. The changelog communicates approved milestones; ADR chronology communicates durable architectural choices. Git commit history remains supporting provenance, not a substitute for either.

Generate links from changelog entries to named phases, decisions, and ADRs where explicit references exist. Do not infer approval solely from commit messages or dates. A timeline orders events but always displays status and phase.

Expose source revision links only when the hosting and repository visibility model permits them without leaking private data. Author identities, branch names, and internal workflow metadata are not required for the portfolio experience.

## Validation

Verify chronological ordering, canonical targets, ADR coverage, milestone headings, status context, timezone-independent dates, and graceful behavior when external revision links are unavailable.

## References

- [Changelog](../CHANGELOG.md)
- [Architecture Decision Records](../adrs/README.md)
