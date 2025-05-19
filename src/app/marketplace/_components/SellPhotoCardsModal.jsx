"use client";
import Image from "next/image";
import React, { useState } from "react";
import close from "@/assets/icons/ic-close.svg";
import Card from "@/components/common/Card";
import SellPhotoCardDetailModal from "./SellPhotoCardDetailModal";

function SellPhotoCardsModal({ isModalOpen }) {
  const [DetailModal, setDetailModal] = useState(null);
  const [cards, setCards] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);
  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/80 pt-[60px] sm:pt-[40px] md:py-[40px">
      <div className="max-w-[1160px] w-full bg-gray-500 px-[15px] flex flex-col items-center min-h-screen overflow-y-auto pb-[100px]">
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
          <div className="grid grid-cols-2 mt-[20px] sm:mt-[40px] gap-y-[5px] sm:gap-y-4 place-items-center">
            {cards.map((card) => (
              <Card key={card.id} onClick={() => setDetailModal(card)} />
            ))}
          </div>
        </div>
      </div>
      {DetailModal && (
        <SellPhotoCardDetailModal
          setDetailModal={setDetailModal}
          card={DetailModal}
        />
      )}
    </div>
  );
}

export default SellPhotoCardsModal;
