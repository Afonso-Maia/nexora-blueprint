# Frontmatter and Metadata Schema

**Status:** Approved

## Decision

Introduce frontmatter incrementally under a versioned schema. Prefer derivation from headings, paths, indexes, and source ledgers; store a field only when it cannot be derived reliably or requires explicit governance.

Allowed fields are `id`, `title`, `phase`, `type`, `status`, `owner`, `order`, `aliases`, `search`, `supersedes`, `supersededBy`, and `updatedReview`. Fields use controlled values and stable identifiers. `title` is an override, not a second title; `search: false` requires a reason in publication configuration.

Metadata cannot change approved meaning or silently override body status. During migration, a validated extractor may read current body status; conflicting frontmatter fails the build. Completed documents receive metadata only when required by an approved publication feature.

## Validation

Publish a machine-readable schema, reject unknown fields, validate types and references, compare duplicated status and title values, and test representative documents from every section before broad migration.

## References

- [Phase 7 Framing and Publication Architecture](01-framing-and-publication-architecture.md)
- [Content Taxonomy and Stable Identifiers](13-content-taxonomy-and-stable-identifiers.md)
