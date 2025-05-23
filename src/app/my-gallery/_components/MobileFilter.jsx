"use client";
import React from "react";
import deleteIcon from "@/assets/icons/ic-close-gray.svg";
import exchange from "@/assets/icons/ic-exchange-gray.svg";
import Image from "next/image";
//dd
export default function MobileFilter() {
  const common = data.filter((card) => card.photoCard.rank === "COMMON").length;
  const rare = data.filter((card) => card.photoCard.rank === "RARE").length;
  const superrare = data.filter((card) => card.photoCard.rank === "SUPER RARE").length;
  const legendary = data.filter((card) => card.photoCard.rank === "LEGENDARY").length;
  const genre = ["PORTRAIT", "LANDSCAPE", "ANIMAL", "OBJECT", "FOOD", "ETC"];
  const grade = ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"];
  const sellingType = ["SELLING", "WAITING_EXCHANGE"];
  const soldout = ["SELLING", "SOLDOUT"];
  return (
    <>
      <div className="w-full h-[480px] rounded-[20px] bg-[#1B1B1B]">
        <div className="w-full flex flex-col items-center">
          <div className="w-full relative py-[16.5px]">
            <p className="font-noto font-medium text-[16px] leading-[100%] tracking-[0%] text-gray-400 text-center">
              필터
            </p>
            <Image
              alt="deleteIcon"
              src={deleteIcon}
              className="cursor-pointer absolute right-[15px] top-[13px] text-gray-400"
            />
          </div>
          <div className="flex w-full px-[24px] h-[49px] items-center gap-[24px]">
            <p className="cursor-pointer pl-[16px] w-[64px] font-noto font-medium text-[14px] leading-[100%] tracking-[0%]">
              등급
            </p>
            <p className="cursor-pointer text-gray-400 text-center w-[58px] font-noto font-medium text-[14px] leading-[100%] tracking-[0%]">
              장르
            </p>
          </div>
          <div className="w-full flex flex-col gap-[3px]">
            <div className="bg-gray-500 w-full h-[49px] flex justify-between items-center px-[32px]">
              <p className="text-[#EFFF04] font-noto font-normal text-[14px] leading-[100%] tracking-[0%] text-center">
                COMMON
              </p>
              <p className="font-noto font-normal text-[14px] leading-[100%] tracking-[0%] text-center">{common}</p>
            </div>
            <div className="w-full h-[49px] flex justify-between items-center px-[32px]">
              <p className="text-[#29C9F9] font-noto font-normal text-[14px] leading-[100%] tracking-[0%] text-center">
                RARE
              </p>
              <p className="text-gray-400 font-noto font-normal text-[14px] leading-[100%] tracking-[0%] text-center">
                {rare}
              </p>
            </div>
            <div className="w-full h-[49px] flex justify-between items-center px-[32px]">
              <p className="text-[#A77EFF] font-noto font-normal text-[14px] leading-[100%] tracking-[0%] text-center">
                SUPER RARE
              </p>
              <p className="text-gray-400 font-noto font-normal text-[14px] leading-[100%] tracking-[0%] text-center">
                {superrare}
              </p>
            </div>
            <div className="w-full h-[49px] flex justify-between items-center px-[32px]">
              <p className="text-[#FF2A6A] font-noto font-normal text-[14px] leading-[100%] tracking-[0%] text-center">
                LEGENDARY
              </p>
              <p className="text-gray-400 font-noto font-normal text-[14px] leading-[100%] tracking-[0%] text-center">
                {legendary}
              </p>
            </div>
          </div>
          <div className="gap-[11px] flex justify-between mt-[76px] w-full px-[15px]">
            <div className="cursor-pointer w-[54px] h-[55px] flex items-center justify-center">
              <Image alt="exchangeIcon" src={exchange} width={24} height={24} />
            </div>
            <button className="cursor-pointer w-[272px] h-[55px] bg-[#EFFF04] text-[#0F0F0F] font-noto-sans-kr font-bold text-[16px] leading-[100%] tracking-[0] text-center">
              {`${total}개 포토보기`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
