"use client";
import Image from "next/image";
import React, { useState } from "react";
import close from "@/assets/icons/close.svg";
import Card from "./common/Card";

function SellPhotoCardsModal() {
  const [cards, setCards] = useState([]);
  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/80 pt-[60px] sm:pt-[40px] md:py-[40px">
      <div className="max-w-[1160px] w-full bg-gray-500 px-[15px] flex flex-col items-center ">
        <div className="flex justify-end w-full mr-[30px] mt-[30px]">
          <button>
            <Image src={close} alt="close" className="h-[32px]" />
          </button>
        </div>
        <div className="max-w-[920px] w-full">
          <div className="text-gray-300 font-baskinRobbins text-[14px] sm:text-[16px] md:text-[24px]">
            마이갤러리
          </div>
          <div className="font-baskinRobbins text-[26px] sm:text-[40px] md:text-[46px] mt-[15px] sm:mt-[40px]">
            나의 포토카드 판매하기
          </div>
          <div className="hidden sm:block border-b-2 border-white mt-[20px]">
            {" "}
          </div>
          <div>
            {cards.map((card) => (
              <Card key={card.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellPhotoCardsModal;
