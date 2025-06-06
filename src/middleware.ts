import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/authentication") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/admin") && (!token || token.isSuperAdmin === 0)) {
    return NextResponse.redirect(new URL("/authentication", req.url));
  }

  if (pathname.startsWith("/account") && !token) {
    return NextResponse.redirect(new URL("/authentication", req.url));
  }

  return NextResponse.next();
}
