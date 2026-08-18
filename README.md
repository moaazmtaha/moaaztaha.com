# moaaztaha.com

Source for [moaaztaha.com](https://moaaztaha.com), the professional site of
security engineer Moaaz Taha.

The site is deliberately small: three editorial pages, no CMS, no database,
no analytics and no client-side form. It publishes a concise biography,
selected public work and a source-linked archive of five CVEs.

## Local development

Requires Node.js 22.13 or newer.

```powershell
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Validation

```powershell
npm run lint
npm test
npm audit --omit=dev --audit-level=high
```

The test build checks the rendered homepage, About page, research archive,
metadata, security headers and 404 response. GitHub Actions runs the same
checks for each push and pull request.

## Public pages

- [`/`](https://moaaztaha.com/) — work, selected research and earlier roles
- [`/about`](https://moaaztaha.com/about) — interests, milestones and contact
- [`/research`](https://moaaztaha.com/research) — five CVEs with vendor, NVD and Exploit-DB sources
- [`/.well-known/security.txt`](https://moaaztaha.com/.well-known/security.txt) — security contact

Claims on the site are limited to material that can be tied to a named public
source. The design is text-led, uses system fonts and has no third-party
runtime dependencies.
