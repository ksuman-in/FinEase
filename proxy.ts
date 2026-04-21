// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

  // If we are on a protected route and NO token exists
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
