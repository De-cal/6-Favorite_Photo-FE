"use client";

import { useEffect, useCallback, useRef } from 'react';
import { encryptData, decryptData } from '@/lib/utils/encryption';

// 비활성 기준 시간 (20분)
const INACTIVE_THRESHOLD = 20 * 60 * 1000

const LAST_ACTIVE_TIME_KEY = process.env.NEXT_PUBLIC_LAST_ACTIVE_TIME_KEY;
const events = ['mousemove', 'keypress', 'scroll', 'click']; // 유저 활동 이벤트들

function useInactiveTimer(onInactiveCallback, checkTimerStatus, isLoggedIn) {
  const lastActivityTimeRef = useRef(null); // 마지막 활동 시간
  const intervalIdRef = useRef(null); // setInterval ID 저장
  const onInactiveCallbackRef = useRef(onInactiveCallback); // 콜백 최신값 저장

  // 콜백이 바뀔 때마다 최신값을 ref에 저장
  useEffect(() => {
    onInactiveCallbackRef.current = onInactiveCallback;
  }, [onInactiveCallback]);

  // 내부용: 활동 시간만 갱신 (타이머 재시작 X)
  const updateLastActivityTimeSilently = useCallback(() => {
    const now = Date.now();
    lastActivityTimeRef.current = now;
    if (typeof window !== 'undefined') {
      localStorage.setItem(LAST_ACTIVE_TIME_KEY, encryptData(now.toString()));
    }
  }, []);

  // 외부용: 활동 시간 갱신 + 타이머 재확인
  const updateLastActivityTimeWithTimerCheck = useCallback(() => {
    updateLastActivityTimeSilently();
    checkTimerStatus(); // 유저가 다시 활동하면 타이머 재확인
  }, [checkTimerStatus, updateLastActivityTimeSilently]);

  // 비활성 상태인지 체크하는 함수 (5초마다 호출됨)
  const checkInactive = useCallback(() => {
    if (!isLoggedIn) {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      return;
    }

    if (!lastActivityTimeRef.current) {
      const storedEncrypted = localStorage.getItem(LAST_ACTIVE_TIME_KEY);
      if (storedEncrypted) {
        const decrypted = decryptData(storedEncrypted);
        if (decrypted) {
          lastActivityTimeRef.current = parseInt(decrypted, 10);
        } else {
          updateLastActivityTimeSilently();
        }
      } else {
        updateLastActivityTimeSilently();
      }
    }

    const currentTime = Date.now();
    if (currentTime - lastActivityTimeRef.current > INACTIVE_THRESHOLD) {
      onInactiveCallbackRef.current(); // 비활성 콜백 실행
      updateLastActivityTimeSilently(); // 단순히 시간 초기화만
    }
  }, [isLoggedIn, updateLastActivityTimeSilently]);

  // 이벤트 리스너 및 타이머 등록/정리
  useEffect(() => {
    if (!isLoggedIn) {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      events.forEach(event => window.removeEventListener(event, updateLastActivityTimeWithTimerCheck));
      return;
    }

    updateLastActivityTimeWithTimerCheck(); // 초기화 및 타이머 시작

    events.forEach(event =>
      window.addEventListener(event, updateLastActivityTimeWithTimerCheck)
    );

    intervalIdRef.current = setInterval(checkInactive, 5000);

    return () => {
      events.forEach(event =>
        window.removeEventListener(event, updateLastActivityTimeWithTimerCheck)
      );
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isLoggedIn, updateLastActivityTimeWithTimerCheck, checkInactive]);

  // 외부에서 수동 초기화 시에는 타이머도 재확인
  return { resetInactiveTimer: updateLastActivityTimeWithTimerCheck };
}

export default useInactiveTimer;
