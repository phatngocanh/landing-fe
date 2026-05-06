import { NextRequest, NextResponse } from "next/server";

// Gate every /admin/* route except /admin/login. The cookie's actual validity
// is verified by the BE — middleware only checks presence so a user without a
// session can't even render the admin shell.
const SESSION_COOKIE = "pna_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const hasSession = req.cookies.get(SESSION_COOKIE)?.value;
  if (!hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
