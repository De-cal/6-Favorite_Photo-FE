"use client";

import { useEffect } from "react";
import RewardPoint from "./RewardPoint";
import { useAuth } from "@/providers/AuthProvider";
import { useModal } from "@/providers/ModalProvider";
import { usePointTimer } from "@/providers/PointTimerProvider";
import useInactiveTimer from "@/hooks/useInactiveTimer";

function SurprisePointModal() {
  const { user } = useAuth();
  const { hasOpportunity, formattedTime, resetTimer } = usePointTimer();
  const { openModal } = useModal();

  // 기회가 생겼을 때 자동으로 모달 열기
  useEffect(() => {
    if (!!user && hasOpportunity) {
      openModal(() => <RewardPoint />, "center", "center", true);
    }
  }, [hasOpportunity, user]);

  // 비활동 타이머 - 20분 비활동시 타이머 초기화
  const handleInactive = () => {
    resetTimer();
    console.log("비활동으로 인한 타이머 초기화");
  };
  useInactiveTimer(handleInactive, !!user);

  return (
    <div>
      <div className="mb-4"></div>
      <div>다음 포인트 획득 기회까지: {formattedTime}</div>
    </div>
  );
}

export default SurprisePointModal;
