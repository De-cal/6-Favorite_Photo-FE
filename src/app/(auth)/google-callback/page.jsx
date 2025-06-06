"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import Loading from "@/components/common/Loading";

export default function GoogleCallbackHandlerPage() {
  const router = useRouter();
  const { getUser } = useAuth();
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    // 이미 처리가 완료되었다면, 더 이상 실행하지 않고 즉시 종료
    if (hasProcessed) {
      return;
    }

    const handleAuthCallback = async () => {
      try {
        await getUser();
        setHasProcessed(true); // <--- 플래그를 true로 설정하여 다음 리렌더링 시 getUser 실행 방지
        router.push("/marketplace");
      } catch (error) {
        console.error(
          "Google Callback: 구글에서 유저정보를 가져오는데 실패하였습니다:",
          error,
        );
      }
    };
    handleAuthCallback();
  }, [router, hasProcessed]);

  return (
    <div>
      <Loading />
    </div>
  );
}
