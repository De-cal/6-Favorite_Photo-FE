"use client";

import { useEffect, useCallback, useRef } from 'react';
import { encryptData, decryptData } from '@/utils/encryption';

const INACTIVE_THRESHOLD = 20 * 60 * 1000; // 20분
const LAST_ACTIVE_TIME_KEY = process.env.NEXT_PUBLIC_LAST_ACTIVE_TIME_KEY;
const events = ['mousemove', 'keypress', 'scroll', 'click'];

function useInactiveTimer(onInactiveCallback, isLoggedIn) {
  const lastActivityTimeRef = useRef(null);
  const intervalIdRef = useRef(null);
  const onInactiveCallbackRef = useRef(onInactiveCallback);

  useEffect(() => {
    onInactiveCallbackRef.current = onInactiveCallback;
  }, [onInactiveCallback]);

  const updateLastActivityTime = useCallback(() => {
    const now = Date.now();
    lastActivityTimeRef.current = now;
    if (typeof window !== 'undefined') {
      localStorage.setItem(LAST_ACTIVE_TIME_KEY, encryptData(now.toString()));
    }
  }, []);

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
          updateLastActivityTime();
        }
      } else {
        updateLastActivityTime();
      }
    }

    const currentTime = Date.now();
    if (currentTime - lastActivityTimeRef.current > INACTIVE_THRESHOLD) {
      console.log("사용자 비활동 감지: 포인트 타이머 초기화 및 모달 닫기");
      onInactiveCallbackRef.current();
      updateLastActivityTime();
    }
  }, [updateLastActivityTime, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      
      events.forEach(event => window.removeEventListener(event, updateLastActivityTime));
      return;
    }

    updateLastActivityTime();

    events.forEach(event => window.addEventListener(event, updateLastActivityTime));
    intervalIdRef.current = setInterval(checkInactive, 5000);

    return () => {
      events.forEach(event => window.removeEventListener(event, updateLastActivityTime));
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [updateLastActivityTime, checkInactive, isLoggedIn]);

  return { resetInactiveTimer: updateLastActivityTime };
}

export default useInactiveTimer;