import { useState, useEffect } from 'react';
import { encryptData, decryptData } from '@/utils/encryption';

// const REWARD_DURATION = 60 * 60 * 1000 - 1000; // 59분 59초
const REWARD_DURATION = 3* 1000; // 3초

const TIMER_START_TIME_KEY = process.env.NEXT_PUBLIC_TIMER_START_TIME_KEY

function usePointRewardTimer(onRewardReady, isModalOpen) {
  const [remainingTime, setRemainingTime] = useState(REWARD_DURATION);

  const startTimer = () => {
    const startTime = Date.now().toString();
    const encryptedStartTime = encryptData(startTime);
    localStorage.setItem(TIMER_START_TIME_KEY, encryptedStartTime);
    setRemainingTime(REWARD_DURATION);
  };
  

  useEffect(() => {
    if (!isModalOpen) {
      const encryptedStartTime = localStorage.getItem(TIMER_START_TIME_KEY);
      if (encryptedStartTime) {
        const decryptedStartTime = decryptData(encryptedStartTime);
        if (decryptedStartTime) {
          const startTime = parseInt(decryptedStartTime, 10);
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime < REWARD_DURATION) {
            setRemainingTime(REWARD_DURATION - elapsedTime);
          } else {
            onRewardReady();
            localStorage.removeItem(TIMER_START_TIME_KEY);
          }
        }
      }
    }
  }, [isModalOpen, onRewardReady]);

  useEffect(() => {
    let intervalId;

    if (!isModalOpen && localStorage.getItem(TIMER_START_TIME_KEY)) {
      intervalId = setInterval(() => {
        const encryptedStartTime = localStorage.getItem(TIMER_START_TIME_KEY);
        if (encryptedStartTime) {
          const decryptedStartTime = decryptData(encryptedStartTime);
          if (decryptedStartTime) {
            const startTime = parseInt(decryptedStartTime, 10);
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < REWARD_DURATION) {
              setRemainingTime(REWARD_DURATION - elapsedTime);
            } else {
              clearInterval(intervalId);
              onRewardReady();
              localStorage.removeItem(TIMER_START_TIME_KEY);
            }
          }
        } else {
          clearInterval(intervalId);
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isModalOpen, onRewardReady]);

  const clearTimer = () => {
    localStorage.removeItem(TIMER_START_TIME_KEY);
    setRemainingTime(REWARD_DURATION);
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}분 ${seconds.toString().padStart(2, '0')}초`;
  };

  return { remainingTime, startTimer, clearTimer, formatTime };
}

export default usePointRewardTimer;