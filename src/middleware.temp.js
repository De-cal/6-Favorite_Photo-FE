// import { NextResponse } from "next/server";

// const authRoutes = ["/login", "/signup"];
// // 유저 인증이 필요한 페이지 체크하는 함수
// function isProtectedRoute(pathname) {
//   // 나의 판매 포토카드 페이지
//   if (pathname.startsWith("/my-sell")) {
//     return true;
//   }

//   // 마이 갤러리 페이지
//   if (pathname === "/my-gallery" || pathname.startsWith("/my-gallery/")) {
//     return true;
//   }

//   // 마켓플레이스 페이지 하위경로 (/marketplace는 제외)
//   if (pathname.startsWith("/marketplace/")) {
//     return true;
//   }
//   return false;
// }
// export function middleware(request) {
//   const { pathname } = request.nextUrl;
//   const accessToken = request.cookies.get("accessToken")?.value;
//   const refreshToken = request.cookies.get("refreshToken")?.value;
//   const isAuthenticated = Boolean(accessToken || refreshToken);

//   // 로그인한 사용자가 auth 라우트에 접근하려고 할 때
//   if (isAuthenticated && authRoutes.includes(pathname)) {
//     return NextResponse.redirect(new URL("/marketplace", request.url));
//   }

//   // 인증되지 않은 사용자가 보호된 라우트에 접근하려고 할 때
//   if (!isAuthenticated && isProtectedRoute(pathname)) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
//   return NextResponse.next();
// }

// // 미들웨어가 적용될 경로 설정
// export const config = {
//   matcher: [
//     "/login",
//     "/signup",
//     "/marketplace",
//     "/marketplace/:path*",
//     "/my-sell",
//     "/my-sell/:path*",
//     "/my-gallery",
//     "/my-gallery/:path*",
//   ],
// };
