"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider"; 

export default function GoogleCallbackHandlerPage() {
  const router = useRouter();
  const { getUser } = useAuth(); // 구글 인증 성공후 유저의 상태 갱신

  useEffect(() => {
    getUser(); 

    // 원하는 목적지 페이지로 리다이렉트
    router.push("/marketplace");
  }, [router, getUser]); 

  return (
    <div>
      <p>Google 로그인 처리 중...</p>
      {/* 로딩 스피너 등을 여기에 표시할 수 있습니다. */}
    </div>
  );
}
