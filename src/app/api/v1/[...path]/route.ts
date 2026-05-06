// Same-origin proxy for landing-be public GET endpoints used by browser code.
// Server-rendered code calls landing-be directly via getServerApiUrl().
//
// Admin endpoints are NOT proxied — admin-client.ts hits landing-be directly
// with a Bearer token (see lib/auth.ts).
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
