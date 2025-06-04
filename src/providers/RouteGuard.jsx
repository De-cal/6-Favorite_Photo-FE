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
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isRouteGuardLoading, setIsRouteGuardLoading] = useState(true);

  useEffect(() => {
    const path = pathname.split("?")[0];

    const isPublicRoute = publicExactPaths.includes(path);

    const isProtectedRoute = protectedPathPrefixes.some((prefix) =>
      // prefix가 "/"로 끝나는 경우에는 해당 prefix로 시작하는 모든 하위 경로 포함
      prefix.endsWith("/")
        ? path.startsWith(prefix) && path !== prefix.slice(0, -1)
        : path === prefix,
    );

    if (isProtectedRoute && !user) {
      router.push("/login");
    } else if (isPublicRoute && user) {
      router.push("/marketplace");
    } else {
      setIsRouteGuardLoading(false);
    }
  }, [user, pathname, router]);

  if (isRouteGuardLoading) {
    return <Loading />;
  }

  return children;
}
