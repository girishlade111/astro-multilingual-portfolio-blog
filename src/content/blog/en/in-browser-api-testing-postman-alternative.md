---
title: "Building an In-Browser API Testing Studio: A Lightweight, Zero-Install Tool"
description: "Why modern API clients became bloated, and how we engineered an in-browser REST & GraphQL tester with response streaming and cURL generation."
pubDate: "2026-11-05"
readingTime: 6
category: "Prototypes"
slug: "in-browser-api-testing-postman-alternative"
lang: "en"
tags: ["api-testing", "rest-client", "cors", "developer-tools"]
tool: "API Studio"
---

A few years ago, testing a simple REST endpoint was easy: you opened a lightweight tool like Postman or Insomnia, typed a URL, and inspected the JSON response. Today, those same tools require mandatory cloud logins, take 30 seconds to launch, consume hundreds of megabytes of RAM, and push paid enterprise subscriptions.

In the LadeStack labs, I prototyped **API Studio** (api.ladestack.in) to return to first principles: an instant, in-browser HTTP testing environment with zero setup.

## The CORS Challenge and How to Overcome It

The single biggest obstacle to building an in-browser HTTP client is the browser's **Cross-Origin Resource Sharing (CORS)** security policy. When a script at `api.ladestack.in` tries to send a `POST` request to an external API (e.g., `https://api.github.com`), the browser blocks the response unless the target explicitly returns `Access-Control-Allow-Origin: *`.

We solved this via a dual-mode dispatch architecture:

1. **Direct Mode (For CORS-enabled APIs)**: The browser fires native `fetch()` directly with zero hops.
2. **Transparent Edge Proxy Mode**: For legacy APIs lacking CORS headers, requests are relayed through a high-performance Cloudflare Worker that forwards the payload and mirrors the response without recording any telemetry.

```typescript
export async function dispatchApiRequest(
  request: ApiRequestDefinition,
  useProxy = false
): Promise<ApiResponseResult> {
  const targetUrl = useProxy
    ? `https://cors-relay.ladestack.in/?url=${encodeURIComponent(request.url)}`
    : request.url;

  const t0 = performance.now();
  const response = await fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
  });
  const t1 = performance.now();

  const contentType = response.headers.get('content-type') || '';
  const bodyText = await response.text();

  return {
    status: response.status,
    statusText: response.statusText,
    durationMs: Math.round(t1 - t0),
    headers: Object.fromEntries(response.headers.entries()),
    data: contentType.includes('application/json') ? JSON.parse(bodyText) : bodyText
  };
}
```

## Instant cURL Export and Variable Environments

Developers frequently need to share commands with teammates. API Studio generates executable cURL commands with a single click, complete with escaped headers and payload strings.

No login, no cloud sync, and no memory bloat.
