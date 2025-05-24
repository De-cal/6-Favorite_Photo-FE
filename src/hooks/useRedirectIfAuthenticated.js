"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// 디폴트로 marketplace 페이지로 이동하게 하고 parameter로 다른 path로 이동하게 받을수 있음
export default function useRedirectIfAuthenticated(redirectPath = "/marketplace") {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.replace(redirectPath);
    }
  }, [router, redirectPath]);
}
