import assert from "node:assert/strict";
import test from "node:test";

const buildRoot = new URL("../dist/server/index.js", import.meta.url);

async function render(pathname) {
  const workerUrl = new URL(buildRoot);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`https://moaaztaha.com${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the public profile with attributable evidence", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("strict-transport-security"), "max-age=31536000");
  assert.match(response.headers.get("cache-control") ?? "", /(?:^|,)\s*no-transform\s*(?:,|$)/i);
  const html = await response.text();
  assert.match(html, /Moaaz Taha — Red Team Operator and Security Researcher/);
  assert.match(html, /CVE-2021-32076/);
  assert.match(html, /Moaaz Mohamed Ahmed Taha/);
  assert.match(html, /moaaz@moaaztaha\.com/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /https:\/\/schema\.org/);
  assert.match(html, /ProfilePage/);
  const profileMarkup = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
  assert.ok(profileMarkup, "profile JSON-LD is present");
  const profileDocument = JSON.parse(profileMarkup[1]);
  assert.match(profileDocument.dateCreated, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/);
  assert.match(profileDocument.dateModified, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/);
  assert.ok(Number.isFinite(Date.parse(profileDocument.dateCreated)));
  assert.ok(Number.isFinite(Date.parse(profileDocument.dateModified)));
  assert.match(html, /EducationalOccupationalCredential/);
  assert.match(html, /https:\/\/moaaztaha\.com\/moaaz-taha\.jpg/);
  assert.match(html, /rel="alternate" type="application\/json" href="\/identity\.json"/);
  assert.match(html, /rel="alternate" type="text\/vcard" href="\/moaaz-taha\.vcf"/);
  assert.match(html, /rel="alternate" type="application\/jrd\+json" href="\/\.well-known\/webfinger\?resource=acct%3Amoaaz%40moaaztaha\.com"/);
  assert.match(html, /property="og:image" content="https:\/\/moaaztaha\.com\/og-card\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /name="author" content="Moaaz Taha"/);
  assert.match(html, /property="og:site_name" content="Moaaz Taha"/);
  assert.match(html, /rel="me" href="mailto:moaaz@moaaztaha\.com"/);
  assert.match(html, /rel="me" href="https:\/\/github\.com\/moaazmtaha"/);
  assert.match(html, /rel="me" href="https:\/\/gravatar\.com\/moaazmtaha"/);
  assert.match(html, /rel="me" href="https:\/\/bugcrowd\.com\/h\/MoaazTaha"/);
  assert.match(html, /rel="me" href="https:\/\/www\.linkedin\.com\/in\/moaaz-taha\/"/);
  assert.match(html, /A trust decision hidden in a referrer header/);
  assert.match(html, /Red team operations/);
  assert.match(html, /Google and Esri also record acknowledgements/);
  assert.match(html, /https:\/\/trust\.arcgis\.com\/en\/security-concern\//);
  assert.match(html, /https:\/\/eu\.badgr\.com\/public\/assertions\/7-dkywJ0RdCjE1A5ZTYGsg/);
  assert.match(html, /https:\/\/certs\.ine\.com\/ad4e677f-ccc5-4ab9-b59c-9f923ccc78ff/);
  assert.match(html, /https:\/\/certs\.ine\.com\/profile\/moaaztaha490182\/wallet/);
  assert.match(html, /https:\/\/bugcrowd\.com\/h\/MoaazTaha/);
  assert.doesNotMatch(html, /https:\/\/bugcrowd\.com\/MoaazTaha/);
  assert.match(html, /href="\/research"/);
  assert.match(html, /href="\/about"/);
  assert.match(html, /Skip to content/);
  assert.doesNotMatch(html, /Verify identity|Identity record|CME Group|Stingrai/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/);
});

test("serves a standards-based mailbox identity record", async () => {
  const response = await render("/.well-known/webfinger?resource=acct%3Amoaaz%40moaaztaha.com");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^application\/jrd\+json\b/i);
  assert.equal(response.headers.get("access-control-allow-origin"), "*");
  assert.equal(response.headers.get("cross-origin-resource-policy"), "cross-origin");

  const document = await response.json();
  assert.equal(document.subject, "acct:moaaz@moaaztaha.com");
  assert.equal(document.properties["https://schema.org/name"], "Moaaz Taha");
  assert.equal(document.properties["https://schema.org/image"], "https://moaaztaha.com/moaaz-taha.jpg");
  assert.deepEqual(document.aliases, [
    "https://moaaztaha.com/#moaaz-taha",
    "https://www.linkedin.com/in/moaaz-taha/",
    "https://github.com/moaazmtaha",
    "https://gravatar.com/moaazmtaha",
    "https://bugcrowd.com/h/MoaazTaha",
    "https://bughunter.withgoogle.com/profile/ee24e782-6d7f-49c1-a619-6cc8cc016a8f",
    "https://www.credly.com/users/moaaz-taha/badges/credly",
    "https://certs.ine.com/profile/moaaztaha490182/wallet/",
    "https://x.com/0xStorm0",
  ]);
  assert.deepEqual(document.links.filter((link) => link.rel === "me").map((link) => link.href), [
    "https://github.com/moaazmtaha",
    "https://gravatar.com/moaazmtaha",
    "https://bugcrowd.com/h/MoaazTaha",
    "https://www.linkedin.com/in/moaaz-taha/",
    "https://bughunter.withgoogle.com/profile/ee24e782-6d7f-49c1-a619-6cc8cc016a8f",
    "https://www.credly.com/users/moaaz-taha/badges/credly",
    "https://certs.ine.com/profile/moaaztaha490182/wallet/",
    "https://x.com/0xStorm0",
  ]);
  assert.ok(document.links.some((link) =>
    link.rel === "http://webfinger.net/rel/profile-page" &&
    link.href === "https://moaaztaha.com/about"
  ));
  assert.ok(document.links.some((link) =>
    link.type === "application/json" &&
    link.href === "https://moaaztaha.com/identity.json"
  ));
  assert.ok(document.links.some((link) =>
    link.rel === "me" &&
    link.href === "https://gravatar.com/moaazmtaha"
  ));
  assert.ok(document.links.some((link) =>
    link.rel === "me" &&
    link.href === "https://bugcrowd.com/h/MoaazTaha"
  ));
});

test("does not enumerate unsupported WebFinger identities", async () => {
  const missing = await render("/.well-known/webfinger");
  assert.equal(missing.status, 400);

  const unknown = await render("/.well-known/webfinger?resource=acct%3Aunknown%40moaaztaha.com");
  assert.equal(unknown.status, 404);
});

test("renders a restrained, indexable about and contact page", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /About Moaaz Taha/);
  assert.match(html, /"@type":"AboutPage"/);
  assert.match(html, /https:\/\/moaaztaha\.com\/#moaaz-taha/);
  assert.match(html, /The problems I like working on/);
  assert.match(html, /Selected milestones/);
  assert.match(html, /Five published CVE records/);
  assert.match(html, /Bugcrowd’s Q3 2020 P1 Warriors/);
  assert.match(html, /Esri’s responsible-disclosure programme/);
  assert.match(html, /separate issuer records for/);
  assert.match(html, /https:\/\/certs\.ine\.com\/ad4e677f-ccc5-4ab9-b59c-9f923ccc78ff/);
  assert.match(html, /Read the source-linked research archive/);
  assert.match(html, /<img src="\/moaaz-taha\.jpg" alt="Moaaz Taha"/);
  assert.match(html, /Moaaz Taha · London/);
  assert.match(html, /href="https:\/\/github\.com\/moaazmtaha"/);
  assert.match(html, /rel="canonical" href="https:\/\/moaaztaha\.com\/about"/);
  const mainStart = html.indexOf("<main");
  const mainEnd = html.indexOf("</main>", mainStart);
  assert.ok(mainStart >= 0, "about page has a visible main region");
  assert.ok(mainEnd > mainStart, "about page closes its visible main region");
  const mainMarkup = html.slice(mainStart, mainEnd + "</main>".length);
  assert.doesNotMatch(mainMarkup, /background checks|Verify identity|Identity record|Public record|MoaazTaha@gmail\.com|identity\.json|CME Group|Stingrai/i);
});

test("renders a distinct research record with corrected, attributable claims", async () => {
  const response = await render("/research");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Vulnerability research by Moaaz Taha/);
  assert.match(html, /"@type":"CollectionPage"/);
  assert.match(html, /"@type":"ItemList"/);
  assert.match(html, /"numberOfItems":5/);
  assert.match(html, /CVE-2020-24862/);
  assert.match(html, /Pharmacy Medical Store and Sale Point/);
  assert.match(html, /Exploit-DB 48752/);
  assert.match(html, /Moaaz Taha \(0xStorm\)/);
  assert.match(html, /rel="canonical" href="https:\/\/moaaztaha\.com\/research"/);
  assert.match(html, /property="og:image" content="https:\/\/moaaztaha\.com\/research-card\.png"/);
  assert.match(html, /name="twitter:image" content="https:\/\/moaaztaha\.com\/research-card\.png"/);
  assert.match(html, /id="cve-2021-32076"/);
});

test("returns a useful, non-indexable page for an unknown route", async () => {
  const response = await render("/this-page-does-not-exist");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /Page not found — Moaaz Taha/);
  assert.match(html, /The homepage, research archive and about page are still available/);
  assert.match(html, /name="robots" content="noindex, follow"/);
  assert.doesNotMatch(html, /Starter Project|codex-preview/);
});
