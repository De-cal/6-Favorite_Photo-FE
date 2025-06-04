"use client";

import useRandomPointTimer from "@/hooks/useRandomPointTimer";
import { createContext, useContext } from "react";

const PointTimerContext = createContext(null);

export const PointTimerProvider = ({ children }) => {
  const { hasOpportunity, formattedTime, spendOpportunity, resetTimer, checkTimerStatus } = useRandomPointTimer();

  const contextValue = {
    hasOpportunity,
    formattedTime,
    spendOpportunity,
    resetTimer,
    checkTimerStatus,
  };

  return <PointTimerContext.Provider value={contextValue}>{children}</PointTimerContext.Provider>;
};

export const usePointTimer = () => {
  const context = useContext(PointTimerContext);
  if (!context) {
    throw new Error("usePointTimer는 PointTimerProvider 안에서 사용해야 해요!");
  }
  return context;
};

export default PointTimerProvider;
