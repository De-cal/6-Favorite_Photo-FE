"use client";

import Card from "@/components/common/Card";
import MobileHeader from "@/components/common/MobileHeader";
import ActionButton from "@/components/ui/buttons/ActionButton";
import { useModal } from "@/providers/ModalProvider";
import React from "react";

export default function ExchangeInputModal() {
  const { closeModal } = useModal();

  const handleClick = () => {
    closeModal();
    document.body.style.overflow = "auto";
  };

  return (
    <div className="flex flex-col justify-center items-center absolute top-0 right-0 bottom-0 left-0 overflow-y-auto z-1 bg-gray-700">
      <div className="absolute top-0 w-[345px] mx-auto font-notoSans z-2 sm:w-full sm:max-w-[1920px]">
        <MobileHeader onClick={handleClick} title="포토카드 교환하기" />
        <div className="flex flex-col justify-center items-center py-[20px] px-[15px]">
          <div className="font-bold text-[24px]/[29px] w-full mb-[26px] pb-[10px] border-b-[2px] border-gray-100 sm:text-[40px]/[41px] sm:mb-[40px] sm:pb-[20px] md:mb-[50px] md:text-[40px]/[48px]">
            How Far I`ll Go
          </div>
          <div className="sm:flex sm:gap-[20px] md:gap-[40px]">
            <div className="min-w-[342px]">
              <Card type="my_card" />
            </div>
            {/* <div className="w-full max-w-[440px]"> */}
            <div className="flex flex-col gap-y-[10px] mt-[120px]">
              <p className="font-bold text-[16px]/[19px] sm:mt-0 md:text-[20px]/[24px]">
                교환 제시 내용
              </p>
              <textarea
                className="font-normal text-[14px]/[17px] w-[345px] h-[140px] py-[12px] px-[20px] bg-gray-500 border rounded-[2px] border-gray-200 resize-none sm:w-full sm:max-w-[440px] sm:text-[16px]/[19px] md:py-[18px]"
                placeholder="내용을 입력해주세요"
              />
            </div>
            <div className="flex justify-center items-center gap-[15px] mt-[44px] sm:gap-[20px] sm:mt-[60px]">
              <ActionButton
                variant="secondary"
                className="font-bold text-[16px]/[19px] h-[55px] py-[18px] px-[51px] md:h-[60px] md:text-[18px]/[22px] md:py-[19px] md:px-[69px]"
              >
                취소하기
              </ActionButton>
              <ActionButton
                variant="primary"
                className="font-bold text-[16px]/[19px] not-odd:h-[55px] py-[18px] px-[52px] md:h-[60px] md:text-[18px]/[22px] md:py-[19px] md:px-[69.5px]"
              >
                교환하기
              </ActionButton>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
