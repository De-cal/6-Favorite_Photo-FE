"use client";

import useInactiveTimer from "@/hooks/useInactiveTimer";
import usePointRewardTimer from "@/hooks/usePointRewardTimer";
import React, { useState, useEffect, useCallback } from "react";
import CommonModal from "./CommonModal";
import RewardPoint from "./RewardPoint";

const TIMER_START_TIME_KEY = process.env.NEXT_PUBLIC_TIMER_START_TIME_KEY;

function SurprisePointModal() {
  const [isSurpriseModalOpen, setIsSurpriseModalOpen] = useState(false);

  const handleRewardReady = useCallback(() => {
    setIsSurpriseModalOpen(true);
  }, [setIsSurpriseModalOpen]);

  const { startTimer, clearTimer, formatTime, remainingTime } = usePointRewardTimer(
    handleRewardReady,
    isSurpriseModalOpen,
  );

  const handleCloseSurpriseModal = useCallback(() => {
    setIsSurpriseModalOpen(false);
  }, [setIsSurpriseModalOpen]);

  useInactiveTimer(() => {
    clearTimer();
    setIsSurpriseModalOpen(false);
  });

  useEffect(() => {
    const storedStartTime = localStorage.getItem(TIMER_START_TIME_KEY);
    if (!storedStartTime) {
      startTimer();
    }
  }, [startTimer]);

  return (
    <div>
      <div>다음 포인트 획득 기회까지: {formatTime(remainingTime)}</div>
      <CommonModal
        isOpen={isSurpriseModalOpen}
        onClose={handleCloseSurpriseModal}
        className="w-[345px] px-4 py-8 bg-gray-500"
      >
        <RewardPoint clearTimer={clearTimer} formatTime={formatTime} remainingTime={remainingTime} />
      </CommonModal>
    </div>
  );
}

export default SurprisePointModal;
