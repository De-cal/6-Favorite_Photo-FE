import Link from "next/link";
import React from "react";

export default function TabletAndDesktopProfileModal({
  handleTabletAndDesktopModalClose,
}) {
  return (
    <>
      <div
        onClick={handleTabletAndDesktopModalClose}
        className="fixed top-[70px] right-0 bottom-0 left-0 bg-transparent z-55 hidden sm:block md:top-[80px]"
      ></div>
      <div className="absolute right-0 mt-[10px] flex-col justify-between font-notoSans w-[260px] h-[231px] bg-gray-500 z-60 hidden sm:flex">
        <div className="flex flex-col px-[20px] pt-[20px] pb-[27px] gap-[20px] border-b-[1px] border-gray-400">
          <h1 className="font-bold text-[18px]/[22px]">안녕하세요, 유디님!</h1>
          <div className="flex justify-between items-center">
            <p className="font-light text-[12px]/[14px] text-gray-300">
              보유 포인트
            </p>
            <p className="font-normal text-[12px]/[14px] text-main">1,540 P</p>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start px-[20px] pt-[20px] pb-[27px]">
          <div className="flex flex-col justify-center items-start gap-[15px]">
            <Link
              onClick={handleTabletAndDesktopModalClose}
              href="/marketplace"
              className="font-bold text-[14px]/[17px]"
            >
              마켓플레이스
            </Link>
            <Link
              onClick={handleTabletAndDesktopModalClose}
              href="/my-gallery"
              className="font-bold text-[14px]/[17px]"
            >
              마이갤러리
            </Link>
            <Link
              onClick={handleTabletAndDesktopModalClose}
              href="/my-sell"
              className="font-bold text-[14px]/[17px]"
            >
              판매 중인 포토카드
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
