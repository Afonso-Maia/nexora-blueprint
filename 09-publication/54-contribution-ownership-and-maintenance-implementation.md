# Contribution, Ownership, and Maintenance Implementation

**Status:** Completed
**Date:** 2026-08-18

## Purpose

Record the repository controls that implement source-first contribution, explicit ownership routing, incident intake, and risk-based freshness review for the current single-maintainer project.

## Ownership selection

`@Afonso-Maia` is the named interim assignee for Publication Steward, repository source ownership, accessibility gate coordination, security/privacy gate coordination, and platform operations. `.github/CODEOWNERS` routes all changes to that maintainer and repeats explicit routing for publication sources, generation scripts, components, and workflows.

This is a transparent small-team control, not independent approval. The same person may prepare and review a change, so automation, immutable evidence, and explicit manual protocols compensate where possible. Disabled-user review, assistive-technology review, and any specialist sign-off required by the readiness gate remain external evidence and cannot be self-certified by the ownership assignment.

## Maintenance intake

Structured public issue forms now exist for:

- publication incidents, classified by correctness, accessibility, security/privacy, route integrity, or availability/performance; and
- risk-based freshness reviews, recording the authoritative path, trigger, evidence, outcome, reviewer, and next review condition.

The incident form explicitly prohibits credentials, private user data, exploit details, and sensitive material because the repository is public. Sensitive incident coordination must occur outside public issue content; only a sanitized record and closure evidence belong here.

## Mechanical validation

Security validation requires the CODEOWNERS routing and both structured issue forms. It also requires the incident form's public-repository sensitive-data warning and the freshness form's authoritative-source field, preventing these operational controls from disappearing silently.

## Remaining evidence

The named owner must still execute and record launch approval, monitoring, rollback, access recovery, risk-based reviews, and post-launch review. Independent accessibility and disabled-user evidence remains blocking. Ownership routing does not resolve the Vercel Node patch mismatch, disabled CI, custom domain selection, or immutable artifact promotion.

## References

- [Contribution, Ownership, Maintenance, and Freshness](41-contribution-ownership-maintenance-and-freshness.md)
- [Publication Governance and Decision Rights](02-publication-governance-and-decision-rights.md)
- [Publication Operations and Readiness Evidence](45-publication-operations-and-readiness-evidence.md)
- [Contributing](../CONTRIBUTING.md)
