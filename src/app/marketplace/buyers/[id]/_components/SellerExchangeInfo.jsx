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
    <>
      <h2 className="font-bold text-[24px]/[29px] w-full pb-[10px] border-b-[2px] border-gray-100 sm:text-[32px]/[38px] sm:pb-[20px] md:text-[40px]/[48px]">
        교환 희망 정보
      </h2>
      <p className="font-bold text-[18px]/[26px] md:text-[24px]/[35px]">
        {cardArticle.exchangeText}
      </p>
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
      <ActionButton onClick={handleClick}>포토카드 교환하기</ActionButton>
    </>
  );
}
