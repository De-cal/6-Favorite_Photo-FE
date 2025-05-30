import ActionButton from "@/components/ui/buttons/ActionButton";
import Image from "next/image";
import React from "react";
import ic_close_gray from "@/assets/icons/ic-close-gray.svg";
import { useModal } from "@/providers/ModalProvider";

export default function DeletePhotoCardModal({ onClose, onConfirm}) {
  const handleCancel = () => {
    onClose();
    document.body.style.overflow = "auto";
  };

  const handleConfirm = () => {
    onConfirm(); // 실제 삭제 API 호출
  };

  return (
    <div className="fixed flex justify-center items-center inset-0 bg-transparent">
      <div className="flex flex-col gap-y-[17px] w-[345px] h-[291px] py-[15px] px-[15px] bg-gray-500 sm:w-[400px] md:py-[30px] md:px-[30px] md:w-[560px] md:h-[355px]">
        <div className="flex justify-end items-center">
          <button
            onClick={handleCancel}
            className="relative w-[28px] h-[28px] md:w-[32px] md:h-[32px] cursor-pointer"
          >
            <Image
              src={ic_close_gray}
              alt="닫기"
              fill
              className="object-cover"
            />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold text-[18px]/[26px] md:text-[20px]/[29px]">
            포토카드 판매 내리기
          </p>
          <div className="flex flex-wrap justify-center items-center mt-[30px] mb-[40px] font-normal text-[14px]/[20px] text-gray-300 md:whitespace-pre md:mt-[40px] md:mb-[60px] sm:text-[16px]/[23px]">
            <span className="">정말로 판매를 중단하시겠습니까?</span>
          </div>
          <ActionButton
            onClick={handleConfirm}
            className="w-[120px] h-[55px] sm:w-[140px] md:w-[170px] md:h-[60px]"
          >
            판매 내리기
          </ActionButton>
        </div>
      </div>
    </div>
  );
}