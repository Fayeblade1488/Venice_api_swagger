# Venice API (OpenAPI 3.0)

Production-ready OpenAPI definition for the Venice.ai API. This repository hosts the canonical spec used to generate SDKs, publish reference docs, and validate compatibility.

## TL;DR

- Spec lives in: `swagger.yaml` (release builds in `venice.swagger.release.v*.yaml`)
- Lint and preview locally in minutes
- Generate SDKs via `openapi-generator`
- Publish docs with your preferred pipeline (Swagger UI / Redoc)

---

## Contents

.
├─ swagger.yaml                         # Source spec
├─ venice.swagger.release.v3.yaml       # Release-ready spec
├─ /docs/                               # Optional: static docs site
└─ /scripts/                            # Lint/build helpers (optional)

## Quick start

Validate the spec in your browser (zero install):
1. Open https:*//editor.swagger.io*
2. Import `venice.swagger.release.v3.yaml`
3. Confirm no errors; warnings are documented in comments where applicable.

Local validation (recommended):

```bash
# Spectral
npx @stoplight/spectral lint venice.swagger.release.v3.yaml

# Redocly CLI
npx @redocly/cli lint venice.swagger.release.v3.yaml

Local preview with Swagger UI:

*# Option A: Serve with docker (swaggerapi/swagger-ui)*
docker run -p 8080:8080 -e SWAGGER_JSON=/tmp/spec.yaml \
  -v "$PWD/venice.swagger.release.v3.yaml":/tmp/spec.yaml swaggerapi/swagger-ui

*# Option B: Redoc (static)*
npx @redocly/cli build-docs venice.swagger.release.v3.yaml -o docs/index.html

**Generate SDKs**

Using openapi-generator (Java-based tool):

*# Install (one-time)*
brew install openapi-generator   *# macOS*
*# or: docker pull openapitools/openapi-generator-cli*

*# Typescript (fetch)*
openapi-generator generate \
  -i venice.swagger.release.v3.yaml \
  -g typescript-fetch \
  -o sdk/typescript

*# Python*
openapi-generator generate \
  -i venice.swagger.release.v3.yaml \
  -g python \
  -o sdk/python

Notes:
	•	File upload endpoints are modeled with oneOf for binary (multipart), byte (base64 in JSON), and uri. Your generator should map these appropriately.
	•	Chat completion response role is restricted to assistant for OpenAI compatibility.

**Mock server (optional)**

docker run -p 4010:4010 -v "$PWD/venice.swagger.release.v3.yaml:/tmp/spec.yaml" stoplight/prism:4 \
  mock -h 0.0.0.0 /tmp/spec.yaml

**Release process**
	1.	Edit swagger.yaml (source of truth).
	2.	Run linters (Spectral/Redocly) and fix any findings.
	3.	Produce a release build (e.g., venice.swagger.release.v3.yaml) and bump x-version if needed.
	4.	Tag the repo: git tag -a v3.0.0 -m "Venice API 3.0.0" then git push --tags.
	5.	Attach the release spec to your docs pipeline (Swagger UI or Redoc).

**Versioning**
	•	OpenAPI file includes x-version: "3.0.0" on each path for diff tracking.
	•	Use semantic versioning for tags and release filenames: venice.swagger.release.v3.yaml.

**Contributing**
	1.	Fork and create a feature branch.
	2.	Update swagger.yaml. Keep changes minimal and well-commented.
	3.	Run:

npx @stoplight/spectral lint swagger.yaml
npx @redocly/cli lint swagger.yaml


	4.	Open a PR with:
	•	Summary of changes
	•	Rationale and impact
	•	Links to any downstream generator diffs (if applicable)

**Security**
	•	Do not include secrets in examples.
	•	Endpoints that accept files are validated; clients should prefer multipart for large media.
	•	Report vulnerabilities via your standard security contact or private issue tracker.

**License**

Specify your license. Common choices:
	•	Apache-2.0 (permissive, patent grant)
	•	MIT (permissive)
	•	BUSL / Proprietary (if the spec is closed-source)

Include a LICENSE file at the repository root.

**Contact**
	•	Issues: GitHub Issues
	•	Docs: Published site (Swagger UI / Redoc) built from venice.swagger.release.v3.yaml

If you want, I can also add a minimal `Makefile` with `lint`, `docs`, and `sdk` targets so Jules can run one-liners without thinking.