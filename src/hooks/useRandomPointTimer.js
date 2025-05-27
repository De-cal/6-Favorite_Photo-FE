"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { encryptData, decryptData } from '@/utils/encryption';

const POINT_TIMER_KEY = process.env.NEXT_PUBLIC_POINT_TIMER_KEY;
const POINT_OPPORTUNITY_KEY = process.env.NEXT_PUBLIC_POINT_OPPORTUNITY_KEY;
// const ONE_HOUR = 60 * 60 * 1000; // 1시간
const ONE_HOUR = 10 * 1000; // 10초

function useRandomPointTimer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [hasOpportunity, setHasOpportunity] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const intervalRef = useRef(null);

  // 타이머 초기화 (비활동시)
  const resetTimer = useCallback(() => {
    const now = Date.now();
    localStorage.setItem(POINT_TIMER_KEY, encryptData(now.toString()));
    localStorage.setItem(POINT_OPPORTUNITY_KEY, encryptData('false'));
    setTimeLeft(ONE_HOUR);
    setHasOpportunity(false);
    setIsTimerActive(true);
  }, []);

  // 타이머 시작
  const startTimer = useCallback(() => {
    const now = Date.now();
    localStorage.setItem(POINT_TIMER_KEY, encryptData(now.toString()));
    localStorage.setItem(POINT_OPPORTUNITY_KEY, encryptData('false'));
    setTimeLeft(ONE_HOUR);
    setHasOpportunity(false);
    setIsTimerActive(true);
  }, []);

  // 기회 사용 (포인트 획득 후 호출)
  const spendOpportunity = useCallback(() => {
    const now = Date.now();
    localStorage.setItem(POINT_TIMER_KEY, encryptData(now.toString()));
    localStorage.setItem(POINT_OPPORTUNITY_KEY, encryptData('false'));
    setTimeLeft(ONE_HOUR);
    setHasOpportunity(false);
    setIsTimerActive(true);
  }, []);

  // 타이머 상태 체크 및 업데이트
  const checkTimerStatus = useCallback(() => {
    const storedTimeEncrypted = localStorage.getItem(POINT_TIMER_KEY);
    const storedOpportunityEncrypted = localStorage.getItem(POINT_OPPORTUNITY_KEY);

    // 처음 접속하는 경우
    if (!storedTimeEncrypted) {
      startTimer();
      return;
    }

    const storedTime = decryptData(storedTimeEncrypted);
    const storedOpportunity = decryptData(storedOpportunityEncrypted);

    if (!storedTime) {
      startTimer();
      return;
    }

    const startTime = parseInt(storedTime, 10);
    const now = Date.now();
    const elapsed = now - startTime;
    const remaining = ONE_HOUR - elapsed;

    if (remaining <= 0) {
      // 1시간이 지났고 아직 기회를 사용하지 않은 경우
      if (storedOpportunity !== 'true') {
        setTimeLeft(0);
        setHasOpportunity(true);
        setIsTimerActive(false);
        localStorage.setItem(POINT_OPPORTUNITY_KEY, encryptData('true'));
      } else {
        // 이미 기회가 있었던 경우 (브라우저 재시작 등)
        setTimeLeft(0);
        setHasOpportunity(true);
        setIsTimerActive(false);
      }
    } else {
      // 아직 1시간이 지나지 않은 경우
      setTimeLeft(remaining);
      setHasOpportunity(false);
      setIsTimerActive(true);
    }
  }, [startTimer]);

  // 타이머.
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1000;
          if (newTime <= 0) {
            setHasOpportunity(true);
            setIsTimerActive(false);
            localStorage.setItem(POINT_OPPORTUNITY_KEY, encryptData('true'));
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerActive, timeLeft]);

  // 마운트시 상태 체크.
  useEffect(() => {
    checkTimerStatus();
  }, [checkTimerStatus]);

  // 시간 포맷팅 함수.
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}분 ${seconds.toString().padStart(2, '0')}초`;
  };


  return {
    hasOpportunity,
    formattedTime: formatTime(timeLeft),
    spendOpportunity,
    resetTimer
  };
}

export default useRandomPointTimer;