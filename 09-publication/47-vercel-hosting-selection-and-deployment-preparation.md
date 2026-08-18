# Vercel Hosting Selection and Deployment Preparation

**Status:** Approved
**Date:** 2026-08-11

## Selection

Select Vercel as the managed publication host. Both the Nexora Blueprint and the separately scoped commerce application are intended for Vercel, but this implementation record and every referenced file apply only to the Blueprint repository.

Use `nexora-blueprint.vercel.app` as the temporary provider hostname and canonical origin. It is a pre-launch working value, not the final Nexora domain. Keep robots and `X-Robots-Tag` set to `noindex, nofollow` until a custom hostname, launch approval, canonical migration, and indexing review are recorded.

## Implementation

- `pnpm stage:vercel` converts the already validated `dist/` directory into Build Output API version 3 under `.vercel/output` without rebuilding source.
- Generated Vercel output carries static routing, the accessible 404, CSP and defensive headers, preview isolation, immutable hashed-asset caching, and revalidated HTML caching.
- Publication CI packages `dist/` and `.vercel/output` together and records their SHA-256 digest.
- A separate manually dispatched workflow downloads the exact reviewed CI artifact, verifies its digest, uploads its content-addressed files through Vercel's deployment REST API, creates the deployment, and runs hosted smoke checks.
- The deployment client uses Node's built-in cryptography and Fetch APIs, avoiding a large deployment-only dependency tree that did not pass the repository audit gate. Staged production requests the production target; provider domain auto-assignment remains disabled so later promotion changes routing without rebuilding the artifact.
- The post-change locked dependency audit reports no known vulnerabilities, and the deployment-client syntax check, source validation, Astro check, production build, rendered validation, Vercel staging, security validation, and whitespace validation pass locally.

## Account configuration prerequisite

Create or link the Vercel project with the intended temporary project name and configure environment-protected GitHub secrets for `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, and a dedicated expiring `VERCEL_TOKEN`. Disable Vercel Git-source auto-deployment so the provider cannot rebuild a second artifact outside the governed CI path.

The token receives only the scope needed to deploy and inspect this Blueprint project, is unavailable to untrusted pull requests, and is rotated on the owned schedule. The preferred short-lived workload-identity requirement remains an open provider limitation because Vercel’s documented OIDC federation issues identity from Vercel workloads to external services rather than authenticating GitHub Actions to the Vercel deployment API.

## Connected project evidence

On 2026-08-18, the public GitHub repository `Afonso-Maia/nexora-blueprint` was connected to the local checkout after a sensitive-data scan passed across the complete committed history. Only commit `20c327cd21911248a2a80981905386aca9b970e3` and its ancestors were pushed; the Phase 7 working tree remained uncommitted and unpublished.

Vercel project `nexora-blueprint` (`prj_mmkXuae2AINVg6NiQr0NtnigUq95`) was created in team `team_fnzzyCQbz3qN9je0aNFYYrsc` and linked locally through the ignored `.vercel/project.json` file. The temporary `nexora-blueprint.vercel.app` hostname returns a minimal `noindex, nofollow` setup placeholder. This proves account access, project creation, routing, and TLS only; it is not the reviewed publication artifact and does not satisfy preview, production, smoke, accessibility, performance, rollback, or recovery gates.

## Evidence still required

This selection does not claim deployment completion. The gate still requires:

- preview deployment and hosted route, header, privacy, performance, and 404 evidence;
- staged production deployment, protected approval, promotion, and immutable digest correlation;
- rollback to a previously promoted artifact and recovery rehearsal;
- provider access recovery, logs, monitoring, and export verification; and
- final custom-domain, DNS, TLS, canonical migration, redirects, indexing, and post-launch review selections.

## References

- [CI/CD and Deployment Architecture](36-ci-cd-and-deployment-architecture.md)
- [Hosting, Domain, Redirects, and Availability](37-hosting-domain-redirects-and-availability.md)
- [Publication Operations and Readiness Evidence](45-publication-operations-and-readiness-evidence.md)
- [Vercel Build Output API](https://vercel.com/docs/build-output-api)
- [Vercel REST API](https://vercel.com/docs/rest-api)
- [Vercel deployment file hashing](https://vercel.com/kb/guide/how-do-i-generate-an-sha-for-uploading-a-file-to-the-vercel-api)
- [Vercel deployment promotion](https://vercel.com/docs/deployments/promoting-a-deployment)
