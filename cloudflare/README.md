# Cloudflare edge hostname worker

`moaaztaha-edge.js` is the retained source for the production Cloudflare Worker
named `moaaztaha-edge`.

Production routes:

- `www.moaaztaha.com/*`
- `mta-sts.moaaztaha.com/*`

The matching CNAME records remain pointed at `custom-domains.chatgpt.site` and
are proxied so Cloudflare executes these routes before any origin request. The
Worker redirects `www` to the apex and confines the MTA-STS hostname to its
policy and robots surfaces. It must never be routed over the apex hostname.

After any change, run `npm test`, `npm run lint` and the production verification
scripts retained in the managed project before publishing. Keep the policy text
byte-for-byte aligned with `public/.well-known/mta-sts.txt`.
