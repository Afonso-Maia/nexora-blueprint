# Vercel Hosting Selection and Deployment Preparation

**Status:** Approved
**Date:** 2026-08-11

## Selection

Select Vercel as the managed publication host. Both the Nexora Blueprint and the separately scoped commerce application are intended for Vercel, but this implementation record and every referenced file apply only to the Blueprint repository.

Use `nexora-blueprint.vercel.app` as the temporary provider hostname and canonical origin. It is a pre-launch working value, not the final Nexora domain. Keep robots and `X-Robots-Tag` set to `noindex, nofollow` until a custom hostname, launch approval, canonical migration, and indexing review are recorded.

## Implementation

- `vercel.json` declares the Astro framework, locked scripts-disabled installation, the repository build, the `dist/` output boundary, trailing-slash behavior, security headers, cache policy, and preview-safe indexing policy.
- The connected Vercel Git project builds committed source with Node 24 and the repository-pinned pnpm and dependency lock. This is the active hosted-preview path and creates an immutable deployment for each Git revision.
- Publication CI independently validates and packages `dist/` and `.vercel/output` from the same reviewed source and records a SHA-256 digest. The CI artifact remains the release candidate required by the approved build-once production gate.
- The manual prebuilt workflow remains present but is not the active preview path: its initial raw Build Output API deployments returned a root 404, and the later pinned-CLI attempt did not produce accepted hosted smoke evidence. These failed attempts are retained as operational evidence, not represented as readiness success.
- Native Vercel Git preview is a controlled pre-launch exception for acquiring hosted accessibility, routing, privacy, performance, and resilience evidence. It does not satisfy exact CI-artifact promotion and cannot by itself complete Phase 7.
- The locked dependency audit reports no known vulnerabilities, and source validation, Astro check, production build, rendered validation, Vercel staging, security validation, and whitespace validation pass locally.

## Account configuration prerequisite

Link the Vercel project to the public GitHub repository with `main` as the production branch, repository root as the Root Directory, Astro as the framework, `pnpm build` as the Build Command, `dist` as the Output Directory, locked scripts-disabled installation, and Node 24. Keep every deployment non-indexable during pre-launch evidence gathering.

The environment-protected GitHub values `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, and `VERCEL_TOKEN` remain isolated from untrusted pull requests while the build-once deployment path is unresolved. They are not required by native Vercel Git builds and may be removed after the production promotion mechanism is replaced or retired. The preferred short-lived workload-identity requirement remains an open provider limitation because Vercel’s documented OIDC federation issues identity from Vercel workloads to external services rather than authenticating GitHub Actions to the Vercel deployment API.

## Connected project evidence

On 2026-08-18, the public GitHub repository `Afonso-Maia/nexora-blueprint` was connected to the local checkout after a sensitive-data scan passed across the complete committed history. Phase 7 implementation commits were subsequently validated in GitHub Actions and pushed to `main`; no protected deployment value is committed.

Vercel project `nexora-blueprint` (`prj_mmkXuae2AINVg6NiQr0NtnigUq95`) was created in team `team_fnzzyCQbz3qN9je0aNFYYrsc`, linked locally through the ignored `.vercel/project.json` file, and connected to GitHub. Vercel reports Node 24 and the temporary `nexora-blueprint.vercel.app` domains. Before the native-source configuration commit, the provider deployment history contains the setup placeholder and failed prebuilt smoke candidates; none is accepted as the reviewed publication release.

The first native Git build correlated production deployment `dpl_GsrPR2rjUqHuEbDnWNEgDU244uiF` with commit `acff4edd84c6121da92aa20eda8453d70c06d643` and proved repository cloning, `main` production-branch selection, and provider build invocation. It stopped before installation because Vercel's Node 24 build image supplied `24.15.0`, below the repository requirement `>=24.18.0 <25`. The requirement remains unchanged. Provider-only install and build commands disable pnpm engine enforcement solely to obtain non-indexed hosted-preview evidence; this exception does not approve production, alter the Node 24.19 release toolchain, or satisfy the immutable-artifact gate.

The following native Git deployment `dpl_G5jMAn2aMv2nAEPR9zmMuJBU9cyq`, correlated with commit `bddbd8320a28371612bea49d4313c829e574090c`, reached READY and received the temporary production aliases. Hosted route, landmark, defensive-header, indexing-isolation, and custom-404 smoke checks passed. Browser interaction then identified a Pagefind WebAssembly CSP incompatibility. Deployment `dpl_Ek6qoJETC48Bnw1T5vq6WVUEWGJu`, correlated with commit `5367a9cec6123a46c94a4c3e32a666a9111ab08a`, proved the preferred `'wasm-unsafe-eval'` header was live, but the available browser engine still rejected compilation. Deployment `dpl_7Pk4ERUhJgtkTodjmh87SW8ycGRK`, correlated with commit `8a956268a99e02a55d67543cd9cce0d6e3079496`, proved a worker-path-only `'unsafe-eval'` fallback also could not override the inherited document policy. The successor removes both CSP exceptions and replaces Pagefind with a mechanically equivalent build-generated JSON index and repository-owned accessible search dialog; it must pass hosted search and recovery checks before acceptance.

## Evidence still required

This selection does not claim deployment completion. The gate still requires:

- preview deployment and hosted route, header, privacy, performance, and 404 evidence;
- removal of the provider Node `24.15.0` exception after Vercel supplies a patch satisfying `>=24.18.0 <25`;
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
