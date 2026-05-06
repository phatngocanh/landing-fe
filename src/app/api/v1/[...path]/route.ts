// Same-origin proxy to landing-be. The browser hits /api/v1/* on this Next.js
// host; this handler forwards to landing-be (using the server-only API_URL /
// NEXT_PUBLIC_API_URL).
//
// This eliminates CORS, mixed-content, and shared-cookie-domain concerns. Admin
// endpoints route through here too, so the pna_session cookie is set on the
// FE host (landing.phatngocanh.xyz) directly — the Next.js middleware can read
// it natively without any cross-subdomain cookie tricks.
import { NextRequest, NextResponse } from "next/server";
import { getServerApiUrl } from "@/lib/api/runtime-config";

export const dynamic = "force-dynamic";

function resolveTarget(req: NextRequest, path: string[]): string {
  const base = getServerApiUrl().replace(/\/$/, "");
  return `${base}/api/v1/${path.join("/")}${req.nextUrl.search}`;
}

// Hop-by-hop and other headers we should not blindly forward upstream.
const REQUEST_HEADER_BLOCKLIST = new Set([
  "host",
  "connection",
  "content-length",
  "transfer-encoding",
  "upgrade",
  "keep-alive",
  "te",
  "trailer",
  "proxy-authorization",
  "proxy-authenticate",
  "origin",
  "referer",
]);

// Headers we should not pass back from upstream to the browser as-is.
const RESPONSE_HEADER_BLOCKLIST = new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "content-encoding", // body is already decoded by fetch
  "content-length",
]);

function buildUpstreamHeaders(req: NextRequest): Headers {
  const out = new Headers();
  req.headers.forEach((value, key) => {
    if (!REQUEST_HEADER_BLOCKLIST.has(key.toLowerCase())) {
      out.set(key, value);
    }
  });
  out.set("Accept", out.get("Accept") ?? "application/json");
  return out;
}

function buildClientResponse(upstream: Response, body: BodyInit | null): NextResponse {
  const res = new NextResponse(body, { status: upstream.status });
  upstream.headers.forEach((value, key) => {
    if (RESPONSE_HEADER_BLOCKLIST.has(key.toLowerCase())) return;
    // Set-Cookie is special — multiple values must be preserved individually.
    if (key.toLowerCase() === "set-cookie") return;
    res.headers.set(key, value);
  });
  // Forward Set-Cookie verbatim. Headers.getSetCookie returns the array of
  // individual values (Node 20+ / undici).
  const setCookies =
    typeof upstream.headers.getSetCookie === "function"
      ? upstream.headers.getSetCookie()
      : [];
  for (const sc of setCookies) {
    res.headers.append("set-cookie", sc);
  }
  return res;
}

async function proxy(req: NextRequest, path: string[]): Promise<NextResponse> {
  const target = resolveTarget(req, path);
  const method = req.method.toUpperCase();
  const init: RequestInit = {
    method,
    headers: buildUpstreamHeaders(req),
    cache: "no-store",
    redirect: "manual",
  };
  if (method !== "GET" && method !== "HEAD") {
    init.body = await req.arrayBuffer();
  }
  const upstream = await fetch(target, init);
  const body = method === "HEAD" ? null : await upstream.arrayBuffer();
  return buildClientResponse(upstream, body);
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxy(req, (await ctx.params).path);
}
export async function POST(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxy(req, (await ctx.params).path);
}
export async function PUT(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxy(req, (await ctx.params).path);
}
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxy(req, (await ctx.params).path);
}
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxy(req, (await ctx.params).path);
}
