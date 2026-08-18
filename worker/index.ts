/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const baseSecurityHeaders = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Permissions-Policy": "camera=(), geolocation=(), microphone=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

const canonicalWebFingerSubject = "acct:moaaz@moaaztaha.com";

const webFingerDocument = {
  subject: canonicalWebFingerSubject,
  aliases: [
    "https://moaaztaha.com/#moaaz-taha",
    "https://github.com/moaazmtaha",
    "https://gravatar.com/moaazmtaha",
    "https://bugcrowd.com/h/MoaazTaha",
    "https://www.linkedin.com/in/moaaz-taha/",
    "https://x.com/0xStorm0",
  ],
  properties: {
    "https://schema.org/name": "Moaaz Taha",
    "https://schema.org/jobTitle": "Senior Cyber Security Engineer, Threat Simulation",
    "https://schema.org/image": "https://moaaztaha.com/moaaz-taha.jpg",
  },
  links: [
    {
      rel: "http://webfinger.net/rel/profile-page",
      type: "text/html",
      href: "https://moaaztaha.com/about",
    },
    {
      rel: "alternate",
      type: "application/json",
      href: "https://moaaztaha.com/identity.json",
    },
    {
      rel: "alternate",
      type: "text/vcard",
      href: "https://moaaztaha.com/moaaz-taha.vcf",
    },
    { rel: "me", href: "https://github.com/moaazmtaha" },
    { rel: "me", href: "https://gravatar.com/moaazmtaha" },
    { rel: "me", href: "https://bugcrowd.com/h/MoaazTaha" },
    { rel: "me", href: "https://www.linkedin.com/in/moaaz-taha/" },
    { rel: "me", href: "https://x.com/0xStorm0" },
  ],
};

function webFingerResponse(request: Request, url: URL): Response {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=3600",
    "Content-Type": "application/jrd+json; charset=utf-8",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { ...headers, Allow: "GET, HEAD" },
    });
  }

  const resource = url.searchParams.get("resource");
  if (!resource) {
    return new Response(JSON.stringify({
      error: "invalid_request",
      error_description: "The resource query parameter is required.",
    }), { status: 400, headers });
  }

  if (resource.toLowerCase() !== canonicalWebFingerSubject) {
    return new Response(JSON.stringify({ error: "not_found" }), { status: 404, headers });
  }

  return new Response(request.method === "HEAD" ? null : JSON.stringify(webFingerDocument), {
    status: 200,
    headers,
  });
}

function withSecurityHeaders(response: Response, request: Request): Response {
  const headers = new Headers(response.headers);
  const requestUrl = new URL(request.url);
  const isHttps = requestUrl.protocol === "https:";
  const contentSecurityPolicy = [
    "default-src 'self'",
    "base-uri 'none'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    ...(isHttps ? ["upgrade-insecure-requests"] : []),
  ].join("; ");

  for (const [name, value] of Object.entries(baseSecurityHeaders)) {
    headers.set(name, value);
  }
  if (requestUrl.pathname === "/.well-known/webfinger") {
    headers.set("Cross-Origin-Resource-Policy", "cross-origin");
  }
  headers.set("Content-Security-Policy", contentSecurityPolicy);
  const contentType = headers.get("Content-Type") ?? "";
  if (/^text\/html\b/i.test(contentType)) {
    const cacheControl = headers.get("Cache-Control");
    if (!/(?:^|,)\s*no-transform\s*(?:,|$)/i.test(cacheControl ?? "")) {
      headers.set("Cache-Control", [cacheControl, "no-transform"].filter(Boolean).join(", "));
    }
  }
  if (isHttps) {
    headers.set("Strict-Transport-Security", "max-age=31536000");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/.well-known/webfinger") {
      return withSecurityHeaders(webFingerResponse(request, url), request);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const imageResponse = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
      return withSecurityHeaders(imageResponse, request);
    }

    const response = await handler.fetch(request, env, ctx);
    return withSecurityHeaders(response, request);
  },
};

export default worker;
