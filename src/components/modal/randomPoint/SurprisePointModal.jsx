"use client";

import { useCallback, useEffect, useState } from "react";
import RewardPoint from "./RewardPoint";
import { useAuth } from "@/providers/AuthProvider";
import { useModal } from "@/providers/ModalProvider";
import { usePointTimer } from "@/providers/PointTimerProvider";
import CommonModal from "./CommonModal";

function SurprisePointModal() {
  const { isLoggedIn, login, logout } = useAuth();
  const { openPointModal } = useModal();
  const { hasOpportunity, formattedTime } = usePointTimer();
  const { openModal } = useModal();

  // 기회가 생겼을 때 자동으로 모달 열기
  useEffect(() => {
    if (hasOpportunity && isLoggedIn) {
      openModal(() => <RewardPoint />, "center", "center", true);
    }
  }, [hasOpportunity, isLoggedIn]);

  // useEffect(() => {
  //   if (hasOpportunity && isLoggedIn) {
  //     setIsSurpriseModalOpen(true);
  //   }
  // }, [hasOpportunity, isLoggedIn]);

  // TODO: 비활동 타이머 - 20분 비활동시 타이머 초기화
  // const handleInactive = () => {
  //   resetTimer();
  //   console.log("비활동으로 인한 타이머 초기화");
  // };
  // useInactiveTimer(handleInactive, isLoggedIn);

  // const handleCloseSurpriseModal = useCallback(() => {
  //   setIsSurpriseModalOpen(false);
  // }, [setIsSurpriseModalOpen]);

  return (
    <div>
      <div className="mb-4">
        {isLoggedIn ? (
          <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            로그아웃
          </button>
        ) : (
          <button onClick={login} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            로그인
          </button>
        )}
      </div>
      <div>다음 포인트 획득 기회까지: {formattedTime}</div>
    </div>
  );
}

export default SurprisePointModal;
