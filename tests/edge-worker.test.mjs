import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../cloudflare/moaaztaha-edge.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

test("redirects www to the apex without losing path or query", async () => {
  const response = await worker.fetch(
    new Request("https://www.moaaztaha.com/about?source=edge"),
  );

  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "https://moaaztaha.com/about?source=edge");
  assert.equal(response.headers.get("strict-transport-security"), "max-age=31536000");
});

test("serves only the retained MTA-STS policy and crawler controls", async () => {
  const policy = await worker.fetch(
    new Request("https://mta-sts.moaaztaha.com/.well-known/mta-sts.txt"),
  );
  assert.equal(policy.status, 200);
  assert.equal(
    await policy.text(),
    await readFile(new URL("../public/.well-known/mta-sts.txt", import.meta.url), "utf8"),
  );
  assert.equal(policy.headers.get("x-robots-tag"), "noindex, nofollow, nosnippet");

  const robots = await worker.fetch(
    new Request("https://mta-sts.moaaztaha.com/robots.txt"),
  );
  assert.equal(robots.status, 200);
  assert.equal(await robots.text(), "User-agent: *\nDisallow: /\n");

  const duplicate = await worker.fetch(
    new Request("https://mta-sts.moaaztaha.com/identity.json"),
  );
  assert.equal(duplicate.status, 404);
  assert.equal(duplicate.headers.get("x-robots-tag"), "noindex, nofollow, nosnippet");

  const write = await worker.fetch(
    new Request("https://mta-sts.moaaztaha.com/.well-known/mta-sts.txt", { method: "POST" }),
  );
  assert.equal(write.status, 405);
  assert.equal(write.headers.get("allow"), "GET, HEAD");
});

test("does not expose a public page on an unrouted hostname", async () => {
  const response = await worker.fetch(new Request("https://example.workers.dev/"));
  assert.equal(response.status, 404);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow, nosnippet");
});
