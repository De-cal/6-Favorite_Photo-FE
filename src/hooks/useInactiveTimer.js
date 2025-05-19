import { useState, useEffect } from 'react';

const INACTIVE_THRESHOLD = 20 * 60 * 1000; // 20분
const LAST_ACTIVE_TIME_KEY = process.env.NEXT_PUBLIC_LAST_ACTIVE_TIME_KEY

// 최대 20분까지 움직임이 없는 사용자는 포인트 시간 초기화.
function useInactiveTimer(onInactive) {
  const [lastActive, setLastActive] = useState(Date.now());

  useEffect(() => {
    const handleActivity = () => {
      setLastActive(Date.now());
      localStorage.setItem(LAST_ACTIVE_TIME_KEY, Date.now());
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, []);

  useEffect(() => {
    const checkInactiveInterval = setInterval(() => {
      const storedLastActive = localStorage.getItem(LAST_ACTIVE_TIME_KEY);
      const currentTime = Date.now();

      if (storedLastActive && currentTime - parseInt(storedLastActive, 10) > INACTIVE_THRESHOLD) {
        onInactive();
      }
    }, 1000); 

    return () => clearInterval(checkInactiveInterval);
  }, [onInactive]);

  return { resetInactiveTimer: () => setLastActive(Date.now()) };
}

export default useInactiveTimer;