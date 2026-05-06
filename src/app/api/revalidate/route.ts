// On-demand cache invalidation for ISR. Call from the admin UI (after a
// product/category mutation) or from a backend webhook to bust specific
// fetch tags or page paths immediately, instead of waiting for the
// `revalidate` window to expire.
//
//   POST /api/revalidate
//   Authorization: Bearer $REVALIDATE_SECRET
//   { "tags": ["products"], "paths": ["/products"] }
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

interface Body {
  tags?: string[];
  paths?: string[];
}

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "revalidation disabled" }, { status: 503 });
  }
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as Body;
  const tags = Array.isArray(body.tags) ? body.tags.filter((t) => typeof t === "string") : [];
  const paths = Array.isArray(body.paths) ? body.paths.filter((p) => typeof p === "string") : [];

  for (const t of tags) revalidateTag(t);
  for (const p of paths) revalidatePath(p);

  return NextResponse.json({ ok: true, tags, paths });
}
