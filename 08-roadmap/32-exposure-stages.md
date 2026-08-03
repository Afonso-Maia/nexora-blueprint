# Internal, Preview, Pilot, Beta, and General-Availability Stages

**Status:** Approved

## Decision

Define exposure stages as evidence and operating contracts, not marketing labels.

| Stage | Audience and constraints | Graduation emphasis |
| --- | --- | --- |
| Internal | authorized workforce/test identities; controlled or synthetic effects | integrated behavior, diagnostics, security, usability |
| Preview | invited stakeholders in non-production or isolated production mode; synthetic/non-consequential data | composition, accessibility, provider sandbox, recovery |
| Pilot | small approved real-user cohort, bounded products/providers/volume, staffed monitoring | authoritative outcomes, reconciliation, support and incident response |
| Beta | broader controlled cohort with production providers and documented limitations | capacity, provider drift, operational sustainability, residual-risk closure |
| GA | supported intended audience and declared scope | complete eligible dossier, sustained operations, rollback/repair and support readiness |

Capabilities may have different stages within one artifact. Stage is recorded per capability/cohort, not inferred from environment.

## Gates

Each graduation defines supported scope, data/provider modes, allowed effects, quality evidence, operational coverage, user communication, telemetry, halt criteria, rollback/repair posture, and decision authority. Regression may pause or reduce exposure without rebuilding.

## References

- [Release Confidence](../07-testing/03-ready-done-and-release-confidence.md)
- [Progressive Exposure](31-feature-flags-and-progressive-exposure.md)
