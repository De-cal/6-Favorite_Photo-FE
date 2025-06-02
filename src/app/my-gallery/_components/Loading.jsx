"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 200); // 0.5초 간격

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-20 h-screen text-center">
      <div className="flex gap-4">
        {step >= 1 && (
          <div className="w-40 h-60 bg-gray-300 rounded-lg animate-fade-in text-white font-baskinRobbins text-4xl flex items-center justify-center">
            최애
          </div>
        )}
        {step >= 2 && (
          <div className="w-40 h-60 bg-gray-300 rounded-lg animate-fade-in text-main font-baskinRobbins text-4xl flex items-center justify-center">
            의
          </div>
        )}
        {step >= 3 && (
          <div className="w-40 h-60 bg-gray-300 rounded-lg animate-fade-in text-white font-baskinRobbins text-4xl flex items-center justify-center">
            포토
          </div>
        )}
      </div>

      <p className="text-lg font-medium text-gray-600 animate-pulse">
        {step < 4 ? "로딩중..." : "완료되었습니다!"}
      </p>
    </div>
  );
}
