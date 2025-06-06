"use client";

import { useEffect } from "react";
import RewardPoint from "./RewardPoint";
import { useAuth } from "@/providers/AuthProvider";
import { useModal } from "@/providers/ModalProvider";
import { usePointTimer } from "@/providers/PointTimerProvider";
import useInactiveTimer from "@/hooks/useInactiveTimer";

export default function SurprisePointModal() {
  const { user } = useAuth();
  const { hasOpportunity, resetTimer, checkTimerStatus } = usePointTimer();
  const { openModal } = useModal();

  // 기회가 생겼을 때 자동으로 모달 열기
  useEffect(() => {
    if (!!user && hasOpportunity) {
      openModal(() => <RewardPoint />, "center", "center", true);
    }
  }, [hasOpportunity, user]);

  // 비활동 타이머 - 20분 비활동시 타이머 초기화
  useInactiveTimer(resetTimer, checkTimerStatus, !!user);

  return;
}
