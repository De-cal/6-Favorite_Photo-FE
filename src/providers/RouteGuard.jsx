"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import Loading from "@/components/common/Loading";

// 로그인된 사용자만 접근 가능한 경로 목록
const protectedPaths = [
  "/me",
  "/my-sell",
  "/my-gallery",
  "/my-gallery/create",
  "/marketplace/buyer",
  "/marketplace/seller",
];

// 미인증 사용자만 접근 가능한 경로 목록
const publicPaths = ["/login", "/signup", "/", "/marketplace"];

export default function RouteGuard({ children }) {
  const { user, isLoading: isAuthLoading } = useAuth(); // AuthProvider의 user와 isLoading 상태를 가져옵니다.
  const router = useRouter();
  const pathname = usePathname();
  const [isRouteGuardLoading, setIsRouteGuardLoading] = useState(true);

  useEffect(() => {
    if (isAuthLoading) {
      setIsRouteGuardLoading(true);
      return;
    }

    const path = pathname.split("?")[0];

    const isProtectedRoute = protectedPaths.some(
      (route) =>
        path === route || (path.startsWith(route + "/") && route !== "/"),
    );

    const isPublicRoute = publicPaths.some(
      (route) =>
        path === route || (path.startsWith(route + "/") && route !== "/"),
    );

    if (isProtectedRoute && !user) {
      // 인증된 사용자만 접근 가능한 경로에 미인증 사용자가 접근 시
      router.replace("/login");
      setIsRouteGuardLoading(true);
    } else if (isPublicRoute && user) {
      // 미인증 사용자만 접근 가능한 경로에 인증된 사용자가 접근 시
      router.replace("/marketplace");
      setIsRouteGuardLoading(true);
    } else {
      // 접근 가능한 경로
      setIsRouteGuardLoading(false);
    }
  }, [user, pathname, router, isAuthLoading]);

  // AuthProvider 로딩 중이거나, RouteGuard 로딩 중일 때 로딩 컴포넌트 표시
  if (isAuthLoading || isRouteGuardLoading) {
    return <Loading />;
  }

  return children;
}
