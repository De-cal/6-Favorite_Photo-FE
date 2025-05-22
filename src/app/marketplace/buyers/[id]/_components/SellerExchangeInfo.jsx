"use client";

import React from "react";
import img_card_placeholder_1 from "@/assets/images/img-card-placeholder-1.svg";
import ActionButton from "@/components/ui/buttons/ActionButton";
import clsx from "clsx";

export default function SellerExchangeInfo() {
  const cardArticle = {
    photoCard: {
      title: "우리집 앞마당",
      description:
        "우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다.",
      rank: "LEGENDARY",
      genre: "풍경",
      imgUrl: img_card_placeholder_1,
    },
    user: {
      nickname: "미쓰손",
    },
    price: 4,
    totalQuantity: 5,
    ramainingQuantity: 2,
    exchangeText:
      "푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.",
    exchangeRank: "RARE",
    exchangeGenre: "풍경",
  };

  const handleClick = () => {
    console.log("클릭");
  };

  return (
    <div className="relative">
      <h2 className="font-bold text-[24px]/[29px] w-full border-b-[2px] border-gray-100 mt-[120px] pb-[10px] sm:text-[32px]/[38px] sm:pb-[42px] md:text-[40px]/[48px]">
        교환 희망 정보
      </h2>
      <p className="font-bold text-[18px]/[26px] mt-[46px] sm:mt-[40px] md:mt-[60px] md:text-[24px]/[35px]">
        {cardArticle.exchangeText}
      </p>
      <div className="flex justify-start items-center gap-[15px] mt-[20px]">
        <p
          className={clsx(
            {
              "text-pink": cardArticle.exchangeRank === "LEGENDARY",
              "text-purple": cardArticle.exchangeRank === "SUPER RARE",
              "text-blue": cardArticle.exchangeRank === "RARE",
              "text-main": cardArticle.exchangeRank === "COMMON",
            },
            "font-bold text-[18px]/[22px] text-blue md:text-[24px]/[29px]"
          )}
        >
          {cardArticle.exchangeRank}
        </p>
        <div className="border-l-[1.5px] border-gray-400 h-[17px]"></div>
        <p className="font-bold text-[18px]/[22px] text-gray-300 md:text-[24px]/[29px]">
          {cardArticle.exchangeGenre}
        </p>
      </div>
      <ActionButton
        className="mt-[40px] sm:mt-0 sm:absolute sm:top-0 sm:right-0"
        onClick={handleClick}
      >
        포토카드 교환하기
      </ActionButton>
    </div>
  );
}
