"use client";

import React, { useState } from "react";
import ActionButton from "@/components/ui/buttons/ActionButton";
import GradeDetail from "@/components/common/GradeDetail";
import SelectPhotoCardsModal from "@/app/marketplace/_components/SelectPhotoCardsModal";
import { useBuyer } from "@/contexts/BuyerContext";

export default function SellerExchangeInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cardArticle } = useBuyer();

  // 교환하기
  const handleExchange = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="relative">
      {isModalOpen && (
        <SelectPhotoCardsModal
          type="exchange"
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <div className="flex justify-between items-center border-b-[2px] border-gray-100 sm:gap-[20px] md:gap-[80px]">
        <h2 className="font-bold text-[24px]/[29px] w-full mt-[120px] pb-[10px] sm:text-[32px]/[38px] sm:pb-[42px] md:text-[40px]/[48px]">
          교환 희망 정보
        </h2>
        <div className="hidden pb-[20px] sm:block max-w-[440px] min-w[342px] w-full">
          <ActionButton
            className="mt-[120px] sm:top-0 sm:right-0 sm:h-[60px] max-w-[440px] min-w[342px] w-full text-lg md:text-xl"
            onClick={handleExchange}
            disabled={cardArticle.remainingQuantity === 0}
          >
            포토카드 교환하기
          </ActionButton>
        </div>
      </div>
      <p className="font-bold text-[18px]/[26px] mt-[46px] sm:mt-[40px] md:mt-[60px] md:text-[24px]/[35px]">
        {cardArticle.exchangeText}
      </p>
      <div className="flex justify-start items-center gap-[15px] mt-[20px]">
        <GradeDetail
          grade={cardArticle.exchangeRank}
          className="font-bold text-[18px]/[22px] md:text-[24px]/[29px]"
        />
        <div className="border-l-[1.5px] border-gray-400 h-[17px]"></div>
        <p className="font-bold text-[18px]/[22px] text-gray-300 md:text-[24px]/[29px]">
          {cardArticle.exchangeGenre}
        </p>
      </div>
      <ActionButton
        className="mt-[40px] sm:mt-0 sm:hidden sm:top-0 sm:right-0"
        onClick={handleExchange}
      >
        포토카드 교환하기
      </ActionButton>
    </div>
  );
}
