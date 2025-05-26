import ActionButton from "@/components/ui/buttons/ActionButton";
import Image from "next/image";
import React from "react";
import ic_close_gray from "@/assets/icons/ic-close-gray.svg";
import { useModal } from "@/providers/ModalProvider";
import ExchangeInputModal from "./ExchangeInputModal";

export default function ExchangeCancelModal() {
  const { closeModal, openModal } = useModal();

  const cardArticle = {
    photoCard: {
      title: "우리집 앞마당",
      description: "우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다.",
      rank: "LEGENDARY",
      genre: "풍경",
      imgUrl: "img_card_placeholder_1",
    },
    user: {
      nickname: "미쓰손",
    },
    price: 4,
    totalQuantity: 5,
    ramainingQuantity: 2,
    exchangeText: "푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.",
    exchangeRank: "RARE",
    exchangeGenre: "풍경",
  };

  const handleClose = () => {
    closeModal();
    openModal(<ExchangeInputModal />);
  };

  const handleCancel = () => {
    closeModal();
    document.body.style.overflow = "auto";
  };

  return (
    <div className="fixed flex justify-center items-center inset-0 bg-transparent">
      <div className="flex flex-col gap-y-[17px] w-[345px] h-[291px] py-[15px] px-[15px] bg-gray-500 sm:w-[400px] md:py-[30px] md:px-[30px] md:w-[560px] md:h-[355px]">
        <div className="flex justify-end items-center">
          <button onClick={handleClose} className="relative w-[28px] h-[28px] md:w-[32px] md:h-[32px] cursor-pointer">
            <Image src={ic_close_gray} alt="닫기" fill className="object-cover" />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold text-[18px]/[26px] md:text-[20px]/[29px]">교환 제시 취소</p>
          <div className="flex flex-wrap justify-center items-center mt-[30px] mb-[40px] font-normal text-[14px]/[20px] text-gray-300 md:whitespace-pre md:mt-[40px] md:mb-[60px] sm:text-[16px]/[23px]">
            <span className="">{`[${cardArticle.photoCard.rank} | ${cardArticle.photoCard.title}]`}</span>
            <span className=""> 교환 제시를 취소하시겠습니까?</span>
          </div>
          <ActionButton onClick={handleCancel} className="w-[120px] h-[55px] sm:w-[140px] md:w-[170px] md:h-[60px]">
            취소하기
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
