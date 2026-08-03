# Dependency, Configuration, and Environment Management

**Status:** Approved

## Decision

The TypeScript monorepo uses a pinned supported Node.js LTS line, Corepack-managed pnpm, one lockfile, and Turborepo for the project task graph and remote-cache-compatible builds. Exact versions are committed and advanced through reviewed maintenance changes.

Configuration is typed, validated at process start, classified by sensitivity and mutability, and accessed through owned configuration modules. Secrets are references resolved from the approved secrets manager. Feature decisions use OpenFeature-compatible evaluation so the provider remains replaceable.

## Dependency policy

- One root lockfile is mandatory; frozen-lockfile installation is used in CI.
- Runtime dependencies belong to the consuming project; shared packages do not become dumping grounds.
- Internal package imports obey the approved dependency graph and declared exports.
- Versions are exact or governed workspace ranges; duplicate major versions require evidence.
- Automated update proposals are grouped by risk and must pass all gates.
- New dependencies require ownership, purpose, maintenance health, license, security, size, runtime, and exit assessment.
- Framework wrappers isolate replaceable vendors from domain code.
- Abandoned, vulnerable, or unowned dependencies have a removal plan.

Generated clients, schemas, tokens, and assets are reproducible and checked for drift. Build tools cannot reach the network unless the task explicitly declares it.

## Configuration classes

| Class | Examples | Rule |
| --- | --- | --- |
| Build-time public | asset origin, release identifier | Non-secret; embedded and immutable per artifact |
| Runtime operational | endpoints, timeouts, concurrency | Typed; validated before readiness |
| Source policy | promotion rules, permissions, Compatibility | Owned versioned data, never environment variables |
| Secret | credentials, signing keys | Secret-manager reference only |
| Feature flag | rollout or kill switch | Typed evaluation with owner and expiry |

Every key declares type, default policy, environments, owner, sensitivity, reload behavior, and failure behavior. Unknown keys and missing required keys fail startup. Production does not inherit developer defaults.

## Environment model

Local, test, preview, staging, and production are named capability profiles, not long-lived divergent branches. The same artifact is promoted between controlled environments. Environment-specific values are supplied at runtime; source-owned data is seeded or migrated through governed interfaces.

- Local development has documented one-command dependency startup and safe fake providers.
- Test environments are disposable and deterministic.
- Preview environments contain synthetic data and cannot call production providers.
- Staging mirrors production topology and controls within justified scale limits.
- Production access, data, keys, and provider accounts are isolated.

No environment may silently weaken authentication, authorization, Audit, privacy, or accessibility behavior.

## Feature flags

Flags are for release decoupling, experiments, operational kill switches, and bounded migration—not permanent business configuration.

- Each flag has a typed key, owner, purpose, allowed contexts, default, creation date, and removal date.
- Consequential server decisions evaluate at the source and record the flag revision.
- Clients receive only safe evaluated values.
- Missing providers use an explicit fail-safe default.
- Identity, permission, price, inventory, compatibility, and lifecycle truth cannot be delegated to a flag.
- Stale-flag checks block release after expiry.

## Consequences

- Installs and builds are reproducible across the small initial team.
- Configuration errors surface before traffic.
- Provider coupling for flags and secrets stays outside domain code.
- The repository incurs maintenance for pins, lockfile hygiene, generated-output drift, and flag retirement.

## References

- [Repository and Application Organization](03-repository-and-application-organization.md)
- [Security, Privacy, Secrets, and Audit](27-security-privacy-secrets-and-audit.md)
- [Testing Interfaces and Architectural Quality Gates](32-testing-interfaces-and-architectural-quality-gates.md)
- [ADR-0036](../adrs/ADR-0036-pinned-pnpm-turborepo-and-typed-runtime-configuration.md)
