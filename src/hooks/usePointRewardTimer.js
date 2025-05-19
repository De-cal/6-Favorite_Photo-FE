import { useState, useEffect } from 'react';

const REWARD_DURATION = 60 * 60 * 1000 - 1000; // 59분 59초
const TIMER_START_TIME_KEY = 'rewardTimerStart';

function usePointRewardTimer(onRewardReady, isModalOpen) {
  const [remainingTime, setRemainingTime] = useState(REWARD_DURATION);

  useEffect(() => {
    if (!isModalOpen) {
      const storedStartTime = localStorage.getItem(TIMER_START_TIME_KEY);
      if (storedStartTime) {
        const startTime = parseInt(storedStartTime, 10);
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < REWARD_DURATION) {
          setRemainingTime(REWARD_DURATION - elapsedTime);
        } else {
          onRewardReady();
          localStorage.removeItem(TIMER_START_TIME_KEY);
        }
      }
    } 
  }, [isModalOpen, onRewardReady]);

  useEffect(() => {
    let intervalId;

    if (!isModalOpen && localStorage.getItem(TIMER_START_TIME_KEY)) {
      intervalId = setInterval(() => {
        const storedStartTime = localStorage.getItem(TIMER_START_TIME_KEY);
        if (storedStartTime) {
          const startTime = parseInt(storedStartTime, 10);
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime < REWARD_DURATION) {
            setRemainingTime(REWARD_DURATION - elapsedTime);
          } else {
            clearInterval(intervalId);
            onRewardReady();
            localStorage.removeItem(TIMER_START_TIME_KEY);
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

  const startTimer = () => {
    localStorage.setItem(TIMER_START_TIME_KEY, Date.now());
    setRemainingTime(REWARD_DURATION);
  };

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