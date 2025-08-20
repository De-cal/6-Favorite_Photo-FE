"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import Loading from "@/components/common/Loading";

// 로그인된 사용자만 접근 가능한 경로 목록
const protectedPathPrefixes = [
  "/my-sell",
  "/my-gallery",
  "/my-gallery/create",
  "/marketplace/",
];

// 미인증 사용자만 접근 가능한 경로 목록
const publicExactPaths = ["/login", "/signup", "/", "/marketplace"];

export default function RouteGuard({ children }) {
  const { user, isLoading } = useAuth(); // AuthProvider의 isLoading 상태를 가져옴
  const router = useRouter();
  const pathname = usePathname();
  const [isRouteGuardLoading, setIsRouteGuardLoading] = useState(true);

  useEffect(() => {
    // AuthProvider가 로딩 중일 때는 아무것도 하지 않고 로딩 상태를 유지
    if (isLoading) {
      return;
    }

    // AuthProvider 로딩이 끝난 후, 라우팅 로직 실행
    const path = pathname.split("?")[0];
    const isPublicRoute = publicExactPaths.includes(path);
    const isProtectedRoute = protectedPathPrefixes.some((prefix) =>
      prefix.endsWith("/")
        ? path.startsWith(prefix) && path !== prefix.slice(0, -1)
        : path === prefix,
    );

    if (isProtectedRoute && !user) {
      router.push("/login");
      setIsRouteGuardLoading(false);
    } else if (isPublicRoute && user) {
      router.push("/marketplace");
      setIsRouteGuardLoading(false);
    } else {
      setIsRouteGuardLoading(false);
    }
  }, [user, pathname, router, isLoading]); // isLoading을 의존성 배열에 추가

  // AuthProvider가 로딩 중이거나 RouteGuard가 아직 로딩 중이면 Loading 컴포넌트 표시
  if (isLoading || isRouteGuardLoading) {
    return <Loading />;
  }

  return children;
}
