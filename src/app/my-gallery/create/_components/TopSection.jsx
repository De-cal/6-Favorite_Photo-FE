"use client";

import { useState, useEffect } from "react";
import MobileHeader from "@/components/common/MobileHeader";
import Image from "next/image";
import alert from "@/assets/icons/ic-alert.svg";
import { useCreateStatus } from "@/hooks/useCreateStatus";

export default function TopSection() {
  const { createStatus, loading, error } = useCreateStatus();
  const [showNotice, setShowNotice] = useState(false);
  // 생성 기회가 0일 때 자동으로 알림 표시
  useEffect(() => {
    if (!loading && createStatus.createCount === 0) {
      setShowNotice(true);
      
      // 3초 후 알림 자동 숨김
      const timer = setTimeout(() => {
        setShowNotice(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [createStatus.createCount, loading]);


  return (
    <>
      <div className="sm:hidden md:hidden relative w-full h-[60px] sm:h-[80px] md:h-[85px] flex flex-col sm:flex-row md:flex-row justify-center items-center sm:justify-between sm:pb-[20px] md:pb-[21.5px] md:max-w-[1480px]">
        <MobileHeader title={"포토카드 생성"} src="/" />
      </div>
      
      <section className="relative w-full h-[60px] sm:h-[80px] md:h-[85px] sm:border-b-2 border-b-gray-100 flex flex-col sm:flex-row md:flex-row justify-center items-center sm:justify-between sm:pb-[20px] md:pb-[21.5px] md:max-w-[1480px]">
        <h1 className="font-baskinRobbins text-[20px] sm:text-[48px] md:text-[62px] hidden sm:block">
          포토카드 생성
        </h1>

        {/* 데스크탑 우측 영역 */}
        <div className="hidden sm:flex flex-row items-center gap-4">
          {/* 상단 안내 메시지 (데스크탑) */}
          {showNotice && (
            <div className="absolute top-[15px] sm:top-[5px] md:top-[5px] left-1/2 -translate-x-1/2 px-4 py-2 bg-[#535353cc] text-white rounded-4xl text-sm z-50 gap-2.5 flex flex-row items-center justify-center w-[320px] h-[64px]">
              <Image src={alert} alt="경고창 이미지" />
              <p>이번달 모든 생성 기회를 소진했어요</p>
            </div>
          )}

          {/* 생성 가능 횟수 표시 */}
          <CreateCountDisplay size="large" showLoading={loading} error={error} />
        </div>

        {/* 모바일 전용 생성 횟수 표시 */}
        <div className="w-full sm:hidden md:hidden flex">
          <CreateCountDisplay size="small" showLoading={loading} error={error} />

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

// 생성 횟수 표시 컴포넌트 (TopSection 내부에서만 사용)
function CreateCountDisplay({ size = 'large', showLoading, error }) {
  const { createStatus } = useCreateStatus();

  if (showLoading) {
    return (
      <div className="flex items-end gap-1">
        <span className="text-gray-400 animate-pulse">
          {size === 'large' ? '로딩 중...' : '...'}
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-end gap-1">
        <span className="text-red-400 text-sm">오류 발생</span>
      </div>
    );
  }

  const { createCount, maxCount, currentMonth, canCreate } = createStatus;
  
  // 크기별 스타일
  const mainTextSize = size === 'large' ? 'text-[40px]' : 'text-[32px]';
  const subTextSize = size === 'large' ? 'text-[28px]' : 'text-[21px]';
  const dateTextSize = size === 'large' ? 'text-[16px]' : 'text-xs';
  const marginBottom = size === 'large' ? 'mb-1' : 'mb-[-3px]';

  return (
    <div className="flex items-end gap-1">
      <span className={`font-bold leading-none ${
        canCreate ? 'text-main' : 'text-gray-400'
      } ${mainTextSize} ${size === 'small' ? marginBottom : ''}`}>
        {createCount}
      </span>
      <span className={`text-white leading-none ${subTextSize}`}>
        / {maxCount}
      </span>
      <span className={`text-gray-300 leading-none ${dateTextSize} ${
        size === 'large' ? 'mb-1' : 'ml-1'
      }`}>
        ({currentMonth})
      </span>
      {!canCreate && (
        <span className="text-red-400 text-[12px] leading-none mb-1 ml-2">
          소진됨
        </span>
      )}
    </div>
  );
}