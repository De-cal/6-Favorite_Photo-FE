import ExchangeCard from "@/app/marketplace/_components/ExchangeCard";
import React from "react";

export default function MyExchangeOffer() {
  return (
    <div>
      <h2 className="font-bold text-[24px]/[29px] w-full mt-[120px] mb-[46px] pb-[10px] border-b-[2px] border-gray-100 sm:text-[32px]/[38px] sm:mb-[48px] sm:pb-[20px] md:mb-[70px] md:text-[40px]/[48px]">
        내가 제시한 교환 목록
      </h2>
      <ExchangeCard type="buyer" />
    </div>
  );
}
