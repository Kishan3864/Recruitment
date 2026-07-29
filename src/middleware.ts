import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Gate every /admin route at the edge: no valid session cookie → login page.
 * (Layouts re-check with requireAdmin — middleware is the first fence, not
 * the only one.)
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("admin_session")?.value;
  const secret = new TextEncoder().encode(
    process.env.ADMIN_SESSION_SECRET || "dev-only-secret-change-me"
  );

  let authed = false;
  if (token) {
    try {
      await jwtVerify(token, secret);
      authed = true;
    } catch {
      authed = false;
    }
  }

  if (pathname === "/admin/login") {
    return authed ? NextResponse.redirect(new URL("/admin", req.url)) : NextResponse.next();
  }
  if (!authed) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
