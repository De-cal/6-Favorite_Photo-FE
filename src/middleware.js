import { NextResponse } from "next/server";

const authRoutes = ["/login", "/signup"];

function isProtectedRoute(pathname) {
  if (pathname.startsWith("/my-sell")) return true;
  if (pathname === "/my-gallery" || pathname.startsWith("/my-gallery/"))
    return true;
  if (pathname.startsWith("/marketplace/")) return true;
  return false;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 정적 요청 무시
  if (
    pathname.startsWith("/_next") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".webp")
  ) {
    console.log("[MIDDLEWARE] Static resource bypass:", pathname);
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isAuthenticated = Boolean(accessToken || refreshToken);

  console.log("[MIDDLEWARE] pathname:", pathname);
  console.log("[MIDDLEWARE] accessToken exists:", !!accessToken);
  console.log("[MIDDLEWARE] refreshToken exists:", !!refreshToken);
  console.log("[MIDDLEWARE] isAuthenticated:", isAuthenticated);

  if (isAuthenticated && authRoutes.includes(pathname)) {
    console.log(
      "[MIDDLEWARE] Authenticated user tried to access auth page, redirecting to /marketplace",
    );
    return NextResponse.redirect(new URL("/marketplace", request.url));
  }

  if (!isAuthenticated && isProtectedRoute(pathname)) {
    console.log(
      "[MIDDLEWARE] Unauthenticated user tried to access protected route, redirecting to /login",
    );
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("[MIDDLEWARE] Allowing request to proceed");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/marketplace",
    "/marketplace/:path*",
    "/my-sell",
    "/my-sell/:path*",
    "/my-gallery",
    "/my-gallery/:path*",
  ],
};
