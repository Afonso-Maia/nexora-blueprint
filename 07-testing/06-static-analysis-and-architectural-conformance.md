# Static Analysis and Architectural Conformance

**Status:** Approved

## Decision

Nexora treats static analysis as blocking executable governance. Checks run on source and generated artifacts before broader tests and are centralized only where one policy must apply consistently.

## Required checks

- Formatting, lint, strict types, unreachable and unsafe constructs
- OpenAPI, event, configuration, localization, token, and data-schema validity
- Repository dependency direction, public entry points, forbidden imports, and cycle detection
- Domain-storage isolation and prohibition of browser, BFF, Search, AI, cache, Audit, and telemetry authority
- Server/client and customer/Admin trust-boundary imports
- Secret, credential, personal-data, payment-data, and unsafe-log patterns
- Dependency license, provenance, signature, vulnerability, and pinned-version policy
- Accessibility markup rules that are sound statically
- Dead localization keys, invalid ICU interpolation, token aliases, and unsupported variants
- Migration naming, ownership, expand/contract metadata, and destructive-operation declarations

Generated artifacts are reproducible and checked for drift from canonical sources.

## Architecture assertions

Architecture rules have stable identifiers, owners, rationale, scope, examples, and remediation. Suppression is local, justified, reviewed, expiring where risk remains, and visible in release evidence.

Boundary checks verify structure; module and negative authorization tests verify runtime enforcement. A passing import rule never substitutes for source authorization.

## Execution

- Fast changed-file checks run locally and on every change.
- Transitive affected-project checks run in CI.
- Repository-wide policy, dependency, generated-artifact, and vulnerability checks run before promotion and periodically.
- Rule upgrades run first in report mode only when classification is needed; enforcement dates and remediation owners are recorded.

## Failure policy

New violations block. Existing accepted debt requires a fingerprinted baseline, owner, risk, removal plan, and non-expansion check. Baselines cannot hide newly introduced occurrences.

## Tool governance

Tools are selected later under the approved dependency process. Rules and machine-readable output remain portable, versioned, reviewable, and attributable. A vendor dashboard is not the source of policy truth.

## Rejected alternative

Advisory-only lint and architecture reports are rejected because foundational boundaries degrade when violations can merge without explicit exception.

## References

- [Repository Organization](../06-engineering/03-repository-and-application-organization.md)
- [Dependency and Configuration](../06-engineering/33-dependency-configuration-and-environment-management.md)
- [Test Levels and Types](05-test-levels-and-types.md)
