const canonicalHostname = "moaaztaha.com";
const mtaStsHostname = `mta-sts.${canonicalHostname}`;
const mtaStsPolicy = [
  "version: STSv1",
  "mode: enforce",
  "mx: eu1-smtp.messagingengine.com",
  "mx: eu2-smtp.messagingengine.com",
  "max_age: 604800",
  "",
].join("\n");

const baseSecurityHeaders = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Permissions-Policy": "camera=(), geolocation=(), microphone=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

function withSecurityHeaders(response, request) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(baseSecurityHeaders)) {
    headers.set(name, value);
  }
  if (new URL(request.url).protocol === "https:") {
    headers.set("Strict-Transport-Security", "max-age=31536000");
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function mtaStsResponse(request, url) {
  const headers = {
    "Cache-Control": "public, max-age=300",
    "Content-Type": "text/plain; charset=utf-8",
    "X-Robots-Tag": "noindex, nofollow, nosnippet",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed\n", {
      status: 405,
      headers: { ...headers, Allow: "GET, HEAD" },
    });
  }

  if (url.pathname === "/.well-known/mta-sts.txt") {
    return new Response(request.method === "HEAD" ? null : mtaStsPolicy, {
      status: 200,
      headers,
    });
  }

  if (url.pathname === "/robots.txt") {
    return new Response(
      request.method === "HEAD" ? null : "User-agent: *\nDisallow: /\n",
      { status: 200, headers },
    );
  }

  return new Response(request.method === "HEAD" ? null : "Not found\n", {
    status: 404,
    headers,
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.hostname === `www.${canonicalHostname}`) {
      url.hostname = canonicalHostname;
      url.protocol = "https:";
      return withSecurityHeaders(Response.redirect(url.toString(), 308), request);
    }

    if (url.hostname === mtaStsHostname) {
      return withSecurityHeaders(mtaStsResponse(request, url), request);
    }

    return withSecurityHeaders(
      new Response(request.method === "HEAD" ? null : "Not found\n", {
        status: 404,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "text/plain; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow, nosnippet",
        },
      }),
      request,
    );
  },
};
