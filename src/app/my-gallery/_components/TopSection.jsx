"use client";
import ActionButton from "@/components/ui/buttons/ActionButton";
import Link from "next/link";
import MobileHeader from "@/components/common/MobileHeader";
import { useState } from "react";
import Image from "next/image";
import alert from "@/assets/icons/ic-alert.svg";

export default function TopSection({ user }) {
  const [showNotice, setShowNotice] = useState(false);

  const isDisabled = user.createCount === 0;
  const buttonText = `포토카드 생성하기 (${user.createCount}/3)`;

  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault(); // 링크 이동 방지
      setShowNotice(true);
      setTimeout(() => setShowNotice(false), 3000);
    }
  };

  return (
    <section className="relative w-full h-[60px] sm:h-[80px] md:h-[85px] sm:border-b-2 border-b-gray-100 flex justify-center items-center sm:justify-between sm:pb-[20px] md:pb-[21.5px] md:max-w-[1480px]">
      <MobileHeader title={"마이갤러리"} src="/" />

      {/* ✅ 상단 안내 메시지 (모바일 & 데스크탑 공통) */}
      {showNotice && (
        <div className="  absolute top-[100px] sm:top-[5px] left-1/2 -translate-x-1/2 px-4 py-2  bg-[#535353cc] text-white rounded-4xl text-sm z-50 gap-2.5 flex flex-row items-center justify-center w-[320px] h-[64px] sm:w-[320px] sm:h-[64px]">
          {" "}
          <Image src={alert} alt="경고창 이미지" className="" />
          <p>이번달 모든 생성 기회를 소진했어요</p>
        </div>
      )}

      {/* ✅ 하단 고정 버튼 (모바일 전용) */}
      <div className="fixed bottom-10 left-0 w-full px-[15px] z-50 sm:hidden bg-black flex justify-center">
        <Link href="/my-gallery/create" onClick={handleClick}>
          <ActionButton
            variant={isDisabled ? "disabled" : "primary"}
            className={`w-[356px] h-15 ${
              isDisabled ? "bg-gray-400 text-gray-300 cursor-not-allowed" : ""
            }`}
          >
            {buttonText}
          </ActionButton>
        </Link>
      </div>

      <h1 className="font-baskinRobbins text-[20px] sm:text-[48px] md:text-[62px] hidden sm:block">
        마이갤러리
      </h1>

      {/* ✅ 데스크탑 우측 버튼 */}
      <div className="hidden sm:flex flex-row items-end gap-3">
        <span className="text-[14px] text-gray-300">2025년 5월</span>
        <Link href="/my-gallery/create" onClick={handleClick}>
          <ActionButton
            variant={isDisabled ? "disabled" : "primary"}
            className={`w-[342px] h-[60px] md:w-[440px]  ${
              isDisabled ? "bg-gray-400 text-gray-300 cursor-not-allowed" : ""
            }`}
          >
            {buttonText}
          </ActionButton>
        </Link>
      </div>
    </section>
  );
}
