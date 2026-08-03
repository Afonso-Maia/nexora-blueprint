# ADR and Technology-Selection Governance

**Status:** Approved

## Decision

Architecture decisions are governed by reversibility, scope, and evidence. The Blueprint records approved behavior and boundaries; ADRs record consequential engineering choices and their alternatives; a maintained technology register records operational ownership and lifecycle. Tools do not become architecture merely because they are already in use.

## Decision paths

| Change | Required record |
| --- | --- |
| Local, reversible implementation within an approved boundary | Reviewed code and tests |
| Shared convention or package with bounded replacement cost | Engineering document or lightweight proposal |
| Cross-cutting, externally visible, security-sensitive, or expensive-to-reverse choice | ADR plus affected Blueprint updates |
| Change to approved product truth, ownership, permission, state, accessibility, or policy | Return to Blueprint governance before implementation |
| Temporary exception | Owned exception with risk, containment, expiry, and removal evidence |

An ADR is immutable as a historical decision. A later ADR supersedes it; accepted text is not rewritten to disguise change.

## Technology evaluation

Every significant selection compares at least two viable approaches against:

- fit with approved boundaries and required qualities;
- small-team cognitive and operational load;
- security, privacy, accessibility, and Brazilian-region needs;
- failure, consistency, migration, and exit behavior;
- performance and scaling evidence;
- ecosystem maturity, maintenance, licensing, and supply chain;
- observability, local development, and testability;
- total cost, including people and recovery;
- vendor portability and data export.

A time-boxed proof may answer specific unknowns. Proof code, benchmark data, test profile, and limitations are retained; a prototype does not imply approval.

## Technology register

Each adopted technology records:

- purpose and allowed scope;
- owner and operational support;
- approved version or support policy;
- data classification and trust boundary;
- criticality and degradation behavior;
- dependencies, quotas, cost, and regional constraints;
- upgrade cadence and security-notice source;
- backup/export, migration, and exit plan;
- related ADRs and review date.

The register uses lifecycle states: assess, trial, adopt, contain, and retire. “Adopt” is not permission for unrestricted use.

## Boundary evolution

A module becomes an independent service only after documented evidence of a durable distinction in data ownership, transaction boundary, scaling, reliability, security, deployment, external integration, or accountable team. Extraction includes contract, data migration, operations, failure semantics, and rollback plans.

Conversely, independent infrastructure may be consolidated when the distinction disappears. Organizational fashion is not boundary evidence.

## Review and deprecation

- Owners review critical technologies and exceptions at a regular engineering-governance cadence.
- Unsupported versions, critical vulnerabilities, unacceptable vendor changes, or missing ownership trigger containment.
- Deprecation publishes replacement, compatibility window, consumer inventory, migration evidence, and removal date.
- Generated dependency and consumer graphs inform impact review.
- Emergency adoption is narrowly scoped and receives retrospective review.

## Decision completion gate

A consequential decision is complete only when the approved document, ADR where required, cross-references, validation evidence, technology-register effect, and focused commit agree. Unresolved alternatives remain proposals and cannot be represented as approved defaults.

## Consequences

- Architectural history, operational ownership, and exit costs remain visible.
- Small implementation choices stay lightweight.
- Expensive choices require more evidence and maintenance.
- Governance can slow urgent work unless emergency and exception paths remain disciplined.

## References

- [Mission, Principles, Scope, and Governance](02-mission-principles-scope-and-governance.md)
- [System Shape and Deployment Boundary](01-system-shape-and-deployment-boundary.md)
- [Repository and Application Organization](03-repository-and-application-organization.md)
- [ADR Index](../adrs/README.md)
- [Product Decisions](../product-decisions/README.md)
