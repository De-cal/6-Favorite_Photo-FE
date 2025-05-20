// components/seller/SellerCardInfo.jsx
import React from "react";
import GradeDetail from "@/components/common/GradeDetail";
import Image from "next/image";
import exchange from "@/assets/icons/ic-exchange.svg";
import ActionButton from "@/components/ui/buttons/ActionButton";

export default function SellerCardInfo() {
  return (
    <div className="flex flex-col justify-between w-[345px] md:w-[440px] sm:w-[342px] m-auto">
      <div>
        {/* 등급/카테고리/작가 */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <GradeDetail grade="LEGENDARY" />
            <span className="text-gray-300 text-sm md:text-[24px]">| 풍경</span>
          </div>
          <div className="text-white text-sm md:text-[24px] underline">미쓰손</div>
        </div>

        {/* 설명 */}
        <p className="py-3 border-t border-b border-gray-400 text-[16px] md:text-[18px] text-white pb-6 pt-6 mb-6 mt-6">
          우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다.
        </p>

        {/* 가격/잔여 */}
        <div className="flex flex-col mb-6">
          <div className="flex justify-between">
            <span className="text-[20px] text-gray-300">가격 </span>
            <span className=" text-lg font-bold">4P</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[20px] text-gray-300">잔여 </span>
            <div>
              <span className="text-lg font-bold">2</span>
              <span className="text-gray-300 text-lg font-bold"> / 5</span>
            </div>
          </div>
        </div>

        {/* 교환 희망 정보 */}
        <div className="pt-12 mb-4">
          <div className="flex items-center mb-1">
            <Image src={exchange} alt="exchange" className="mr-2 w-[25px] h-[25px]" />
            <div className="text-[22px] text-white  md:text-[28px] mb-1">교환 희망 정보</div>
          </div>
          <div className="border-t border-gray-100 flex items-center gap-2 mb-8 pt-8">
            <GradeDetail grade="RARE" />
            <span className="text-gray-300 text-sm md:text-[24px]">| 풍경</span>
          </div>
          <p className="border-t border-gray-400 text-white text-[16px] md:text-[18px] pt-4">
            푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.
          </p>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex flex-col gap-3 mt-6">
        <ActionButton variant="primary" className="w-[345px] h-[75px] text-lg md:text-xl md:w-[440px] md:h-[80px]">
          수정하기
        </ActionButton>
        <ActionButton variant="secondary">판매 내리기</ActionButton>
      </div>
    </div>
  );
}
