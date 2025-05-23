"use client";

import Card from "@/components/common/Card";
import MobileHeader from "@/components/common/MobileHeader";
import ActionButton from "@/components/ui/buttons/ActionButton";
import { useModal } from "@/providers/ModalProvider";
import Image from "next/image";
import React from "react";
import ic_modal_close from "@/assets/icons/ic-modal-close.svg";
import ic_close_gray from "@/assets/icons/ic-close-gray.svg";
import Desktop from "@/components/common/Desktop";
import Tablet from "@/components/common/Tablet";

export default function ExchangeInputModal() {
  const { closeModal } = useModal();

  const handleClick = () => {
    closeModal();
    document.body.style.overflow = "auto";
  };

  return (
    <div
      className="flex flex-col justify-center items-center px-[15px] absolute top-0 right-0 bottom-0 left-0 overflow-y-auto z-1 bg-black sm:bg-transparent"
      onClick={closeModal}
    >
      <div // 태빈님이 준 백틱 바로아래에도 이밴트 버빌링 일어나서 자식div에 온클릭->이번트 버블링 중지코드 추가
        className="absolute top-0 w-[345px] pb-[20px] font-notoSans z-2 sm:w-full sm:max-w-[1480px] sm:px-[20px] sm:top-auto sm:bottom-0 sm:bg-gray-500 md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] md:bottom-auto md:max-w-[1160px] md:pb-[60px] md:pt-[30px] md:px-[30px]"
        onClick={(e) => e.stopPropagation()}
      >
        <MobileHeader onClick={handleClick} title="포토카드 교환하기" />
        <Tablet>
          <div className="sm:flex sm:justify-center sm:items-center">
            <div className="relative w-[48px] h-[6px] mt-[15px]">
              <Image src={ic_modal_close} alt="닫기" fill className="object-cover" />
            </div>
          </div>
        </Tablet>
        <Desktop>
          <div className="md:flex md:justify-end md:items-center">
            <button onClick={handleClick} className="relative w-[32px] h-[32px] cursor-pointer">
              <Image src={ic_close_gray} alt="닫기" fill className="object-cover" />
            </button>
          </div>
        </Desktop>
        <div className="flex flex-col justify-center items-center">
          <p className="hidden w-full max-w-[704px] font-baskinRobbins text-gray-300 mt-[30px] sm:block sm:font-normal sm:text-[16px]/[16px] md:text-[24px]/[25px] md:max-w-[920px] md:mt-0">
            포토카드 교환하기
          </p>
          <div className="flex flex-col justify-center items-center sm:max-w-[704px] md:max-w-[920px]">
            <div className="font-bold text-[24px]/[29px] w-full mt-[20px] mb-[26px] pb-[10px] border-b-[2px] border-gray-100 sm:text-[40px]/[41px] sm:mt-[40px] sm:mb-[40px] sm:pb-[20px] md:mb-[50px] md:text-[40px]/[48px]">
              How Far I`ll Go
            </div>
            <div className="sm:flex justify-center w-full sm:gap-[20px] md:gap-[40px]">
              <Card type="exchange" />
              <div className="flex flex-col w-full max-w-[440px]">
                <div className="flex flex-col w-full justify-center items-start gap-y-[10px] mt-[26px] sm:mt-0">
                  <p className="font-bold text-[16px]/[19px] sm:mt-0 md:text-[20px]/[24px]">교환 제시 내용</p>
                  <textarea
                    className="font-normal text-[14px]/[17px] w-[345px] h-[140px] py-[12px] px-[20px] bg-gray-500 border rounded-[2px] border-gray-200 resize-none sm:w-full sm:max-w-[440px] sm:text-[16px]/[19px] md:py-[18px]"
                    placeholder="내용을 입력해주세요"
                  />
                </div>
                <div className="flex justify-center items-center gap-[15px] mt-[44px] sm:gap-[20px] sm:mt-[60px]">
                  <ActionButton
                    onClick={handleClick}
                    variant="secondary"
                    className="font-bold text-[16px]/[19px] w-full h-[55px] py-[18px] px-[51px] sm:px-[50px] md:h-[60px] md:text-[18px]/[22px] md:py-[19px] md:px-[69px]"
                  >
                    취소하기
                  </ActionButton>
                  <ActionButton
                    variant="primary"
                    className="font-bold text-[16px]/[19px] w-full h-[55px] py-[18px] px-[52px] sm:px-[50px] md:h-[60px] md:text-[18px]/[22px] md:py-[19px] md:px-[69.5px]"
                  >
                    교환하기
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
