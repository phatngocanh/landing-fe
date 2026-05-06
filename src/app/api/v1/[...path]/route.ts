// Same-origin proxy for landing-be public GET endpoints.
// Browser code calls /api/v1/* on this Next.js host; this handler forwards
// to landing-be (using the server-only API_URL/NEXT_PUBLIC_API_URL).
//
// Eliminates CORS, mixed-content, and runtime-config-for-API-URL concerns.
// Admin endpoints with cookies are NOT routed here — admin-client.ts hits
// landing-be directly so the pna_session cookie travels with the request.
import { NextRequest, NextResponse } from "next/server";
import { getServerApiUrl } from "@/lib/api/runtime-config";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const base = getServerApiUrl().replace(/\/$/, "");
  const target = `${base}/api/v1/${path.join("/")}${req.nextUrl.search}`;

  const upstream = await fetch(target, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const body = await upstream.text();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "application/json",
    },
  });
}
