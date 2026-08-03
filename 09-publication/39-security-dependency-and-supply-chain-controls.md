# Security, Dependency, and Supply-Chain Controls

**Status:** Approved

## Decision

Treat source content, dependencies, build plugins, generated HTML, previews, and deployment credentials as separate trust boundaries. Pin direct and transitive dependencies through one lockfile, review new packages and integrations, automate vulnerability and license checks, and use supported versions with owned updates.

Disable arbitrary script execution, unsafe raw HTML, remote MDX imports, unreviewed embeds, and secrets in public configuration. Apply a restrictive Content Security Policy compatible with documented features, secure headers, dependency provenance, least-privilege short-lived deployment identity, and isolated untrusted preview builds.

Content rendering escapes untrusted markup and validates URLs. Published artifacts contain no repository secrets, private paths, internal logs, source maps with unintended content, or environment credentials.

## Validation

Run secret scanning, dependency audit, license policy, static content security checks, artifact inspection, CSP tests, malicious-markup fixtures, preview isolation tests, provenance verification, and recurring dependency-update rehearsal.

## References

- [ADR-0033](../adrs/ADR-0033-managed-secrets-and-append-only-audit-integrity.md)
- [Dependency and Configuration Management](../06-engineering/33-dependency-configuration-and-environment-management.md)
