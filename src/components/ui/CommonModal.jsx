"use client";

import Image from "next/image";
import React from "react";
import closebt from "../../assets/icons/close.svg";
import { useModal } from "@/providers/ModalProvider";
function CommonModal({ type, result, data }) {
  //타입
  const { closeModal } = useModal();
  return (
    <div className="w-[500px] h-[300px] bg-black">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-end justify-end bg-black ">
          {/* 닫기 버튼 - 오른쪽 상단 */}
          <button className="" onClick={closeModal}>
            <Image
              src={closebt}
              width={36}
              height={36}
              alt={"모달 닫기 버튼"}
            />
          </button>
        </div>

        <div className="font-[var(--font-baskinRobbins)] text-[46px] flex-flex-row items-center justify-center">
          <span>{type}</span>
          <span
            className={
              result === "성공" || result === "success"
                ? "text-main"
                : "text-gray-300"
            }
          >
            {result}
          </span>
        </div>

        <div className="text-sm text-white text-center mt-2">
          {type === "교환 제시"
            ? `포토카드 교환 제시에 ${result}했습니다!`
            : type === "포토카드 생성"
            ? `[${data.rank} | ${data.title}] 포토카드 생성에 ${result}했습니다!`
            : `[${data.rank} | ${data.title}] ${data.quantity}장 ${type}에 ${result}했습니다!`}
        </div>
        <div>
          <button
            className="w-[211px] h-[55px] border-1 border-gray-100 md:w-[440px] md:h-[60px]"
            onClick={closeModal}
          >
            마이갤러리로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommonModal;
