"use client";

import { useState, useEffect } from "react";
import MobileHeader from "@/components/common/MobileHeader";
import Image from "next/image";
import alert from "@/assets/icons/ic-alert.svg";

export default function TopSection({ user, showNotice, setShowNotice }) {
  // 생성 기회가 0일 때 자동으로 알림 표시
  useEffect(() => {
    if (user?.createCount === 0) {
      setShowNotice?.(true);
    }
  }, [user?.createCount, setShowNotice]);

  return (
    <>
      <div className="sm:hidden md:hidden relative w-full h-[60px] sm:h-[80px] md:h-[85px] flex flex-col sm:flex-row md:flex-row justify-center items-center sm:justify-between sm:pb-[20px] md:pb-[21.5px] md:max-w-[1480px]">
        <MobileHeader title={"포토카드 생성"} src="/" />
      </div>
      
      <section className="relative w-full h-[60px] sm:h-[80px] md:h-[85px] sm:border-b-2 border-b-gray-100 flex flex-col sm:flex-row md:flex-row justify-center items-center sm:justify-between sm:pb-[20px] md:pb-[21.5px] md:max-w-[1480px]">
        <h1 className="font-baskinRobbins text-[20px] sm:text-[48px] md:text-[62px] hidden sm:block">
          포토카드 생성
        </h1>

        {/* ✅ 데스크탑 우측 영역 */}
        <div className="hidden sm:flex flex-row items-center gap-4">
          {/* ✅ 상단 안내 메시지 (데스크탑) */}
          {showNotice && (
            <div className="absolute top-[15px] sm:top-[5px] md:top-[5px] left-1/2 -translate-x-1/2 px-4 py-2 bg-[#535353cc] text-white rounded-4xl text-sm z-50 gap-2.5 flex flex-row items-center justify-center w-[320px] h-[64px]">
              <Image src={alert} alt="경고창 이미지" />
              <p>이번달 모든 생성 기회를 소진했어요</p>
            </div>
          )}

          {/* 생성 가능 횟수 표시 */}
          <div className="flex items-end gap-1">
            <span className="text-main text-[40px] font-bold leading-none">
              {user?.createCount ?? 0}
            </span>
            <span className="text-white text-[28px] leading-none">/ 3</span>
            <span className="text-gray-300 text-[16px] leading-none mb-1">(2025년 5월)</span>
          </div>
        </div>

        {/* 모바일 전용 생성 횟수 표시 */}
        <div className="w-full sm:hidden md:hidden flex">
          <div className="flex items-end gap-1">
            <span className="text-main text-[32px] font-bold leading-none mb-[-3px]">
              {user?.createCount ?? 0}
            </span>
            <span className="text-white text-[21px] leading-none">/ 3</span>
            <span className="text-gray-300 text-xs ml-1 leading-none">(2025년 5월)</span>
          </div>
        </div>
        {showNotice && (
            <div className="sm:hidden md:hidden absolute top-[20px] sm:top-[5px] md:top-[5px] left-1/2 -translate-x-1/2 px-4 py-2 bg-[#535353cc] text-white rounded-4xl text-sm z-50 gap-2.5 flex flex-row items-center justify-center w-[320px] h-[64px]">
              <Image src={alert} alt="경고창 이미지" />
              <p>이번달 모든 생성 기회를 소진했어요</p>
            </div>
          )}
      </section>

 
    </>
  );
}