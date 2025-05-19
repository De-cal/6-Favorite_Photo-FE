"use client";

import useInactiveTimer from "@/hooks/useInactiveTimer";
import usePointRewardTimer from "@/hooks/usePointRewardTimer";
import React, { useState, useEffect, useCallback } from "react";
import CommonModal from "./CommonModal";
import RewardPoint from "./RewardPoint";

function SurprisePointModal() {
  const [isSurpriseModalOpen, setIsSurpriseModalOpen] = useState(false);

  const handleRewardReady = useCallback(() => {
    setIsSurpriseModalOpen(true);
  }, [setIsSurpriseModalOpen]);

  const { startTimer, clearTimer, formatTime, remainingTime } =
    usePointRewardTimer(handleRewardReady, isSurpriseModalOpen);

  const handleCloseSurpriseModal = useCallback(() => {
    setIsSurpriseModalOpen(false);
  }, [setIsSurpriseModalOpen]);

  useInactiveTimer(() => {
    clearTimer();
    setIsSurpriseModalOpen(false);
  });

  // TODO: 로그인 해서 로컬스토리지에 담겨있는 시작 시간으로 변경 예정.
  // useEffect(() => {
  //   startTimer(); // 컴포넌트 마운트 시 타이머 시작
  // }, [startTimer]);

  // TODO: 로그인 해서 로컬스토리지에 담겨있는 시작 시간으로 변경 예정. 로그인 하면 이 부분 삭제.
  useEffect(() => {
    const storedStartTime = localStorage.getItem("rewardTimerStart");
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
        <RewardPoint
          clearTimer={clearTimer}
          formatTime={formatTime}
          remainingTime={remainingTime}
        />
      </CommonModal>
    </div>
  );
}

export default SurprisePointModal;
