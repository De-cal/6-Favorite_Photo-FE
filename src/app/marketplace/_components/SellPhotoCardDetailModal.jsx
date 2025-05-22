import Image from "next/image";
import React from "react";
import close from "@/assets/icons/ic-close.svg";
import example from "@/assets/images/img-card-placeholder-1.svg";
import ExchangeInfo from "./ExchangeInfo";
import SellPhotoDetail from "./SellPhotoDetail";
import MobileHeader from "@/components/common/MobileHeader";

function SellPhotoCardDetailModal({
  setDetailModal,
  card = {
    title: "우리집 앞마당",
    rank: "LEGENDARY",
    genre: "PORTRAIT",
    owner: "유디",
    totalQuantity: 3,
  },
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/80 pt-[60px] sm:pt-[40px] md:py-[40px]">
      <div className="max-w-[1160px] w-full bg-gray-500 px-[15px] flex flex-col items-center min-h-screen overflow-y-auto pb-[100px] pt-[20px]">
        <MobileHeader
          title="나의 포토카드 판매하기"
          onClick={() => setDetailModal(null)}
        />
        <div className="flex justify-end w-full mr-[30px] mt-[30px]">
          <button onClick={() => setDetailModal(null)}>
            <Image
              src={close}
              alt="close"
              className="h-[32px] hidden sm:block"
            />
          </button>
        </div>
        <div className="max-w-[920px] sm:w-full w-[345px]">
          <div className="text-gray-300 font-baskinRobbins text-[16px] md:text-[24px] hidden sm:block">
            나의 포토카드 판매하기
          </div>
          <div className="text-[26px] sm:text-[40px] md:text-[46px] mt-[15px] sm:mt-[40px] font-bold">
            {card.title}
          </div>
          <div className=" border-b-2 border-white mt-[10px] sm:mt-[20px]">
            {" "}
          </div>
          <div className="mt-[26px] sm:mt-[48px] flex flex-col items-center sm:flex-row gap-[20px] md:gap-[40px] sm:justify-center sm:items-start w-full">
            <Image
              src={example}
              alt="photocard"
              className="w-[345px] sm:flex-1"
            />
            <SellPhotoDetail />
          </div>
          <ExchangeInfo />
          <div className="flex gap-[15px] sm:gap-[20px] md:gap-[40px] w-full justify-between mt-[44px] sm:mt-15 md:mt-[90px]">
            <button
              className="py-[18px] border-1 border-gray-100 w-full font-bold"
              onClick={() => setDetailModal(null)}
            >
              취소하기
            </button>
            <button className="py-[18px] bg-main text-black w-full font-bold">
              판매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellPhotoCardDetailModal;
