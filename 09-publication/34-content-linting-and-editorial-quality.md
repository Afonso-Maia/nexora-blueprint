# Content Linting and Editorial Quality

**Status:** Approved

## Decision

Use layered editorial controls: deterministic linting for mechanically provable rules, owner review for meaning and authority, and publication review for readability and presentation.

Automated checks cover heading hierarchy, duplicate headings, trailing whitespace, malformed Markdown, link text, image alternatives, table structure, code languages, prohibited raw HTML, status vocabulary, stable identifiers, metadata, terminology, and common inaccessible phrasing. Spell checking uses a governed dictionary for Nexora, Portuguese terms, brands, technologies, and identifiers.

Automation does not rewrite approved prose without review. Style guidance favors precise plain language, source authority, expanded acronyms, scannable sections, and explicit controlled values while preserving established domain terminology.

## Validation

Every rule has rationale, severity, owner, examples, and a narrow exception mechanism. Baselines cannot hide new failures indefinitely; temporary suppressions are scoped and expiring.

## References

- [Tone of Voice](../01-brand/tone-of-voice.md)
- [Contributing](../CONTRIBUTING.md)
