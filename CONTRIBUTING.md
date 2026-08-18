# Contributing

The Blueprint is Nexora’s single source of truth. Use Markdown, relative asset links, one topic per file, and coherent Git commits.

## Statuses

- **Proposed** — under review and not authoritative
- **Approved** — accepted and authoritative
- **Superseded** — replaced by a later decision
- **Deprecated** — retained for context but no longer recommended

Do not present deferred concepts or explored alternatives as approved capability.

## Decision workflow

1. Discuss a topic in a focused planning task.
2. Separate approved decisions from explored alternatives.
3. Update the relevant topic file.
4. Create or update an ADR for cross-cutting or expensive-to-reverse decisions.
5. Update cross-references and `CHANGELOG.md`.
6. Validate links and formatting.
7. Commit one coherent documentation change at a time.

New features must declare their navigation entry, search behavior, taxonomy impact, filter impact, URL strategy, permissions, mobile behavior, and owning domain.

## Publication workflow

Edit the authoritative repository Markdown; do not edit `dist/`, `.astro/`, Pagefind output, or generated-view markup as a substitute for source truth. Preserve repository-relative links and the document’s single level-one heading.

Before review, use the pinned Node.js 24 and pnpm 10.18.3 toolchain and run:

```sh
pnpm install --frozen-lockfile
pnpm validate
pnpm check
pnpm build
pnpm validate:security
```

Inspect the production preview in both themes and at desktop and narrow widths. Changes to navigation, search, filters, diagrams, tables, errors, or publication components require applicable keyboard, zoom/reflow, print, and assistive-technology evidence. Generated changes receive source-owner review for meaning and Publication Steward review for generation correctness.

Superseded or deprecated documents remain at their canonical path and must record a resolvable `Superseded by` or `Successor` link. Route or heading changes require inbound-reference analysis and an explicit redirect or compatible anchor. Do not infer freshness from Git timestamps; follow the risk-based review record owned by the source section.

Publication incidents and blocking evidence follow the owner, recovery, and escalation process in [Publication Operations and Readiness Evidence](09-publication/45-publication-operations-and-readiness-evidence.md).
