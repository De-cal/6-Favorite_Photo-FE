import React from "react";
import example from "@/assets/images/img-card-placeholder-1.svg"
import Image from "next/image";
import DetailCard from "../../_components/DetailCard";
import SellerCardInfo from "../../_components/SellerCardInfo";

export default function SellerPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[1480px]">
        <h1 className="w-full text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b border-gray-100 pb-2">
          우리집 앞마당
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mt-13">
          {/* 왼쪽 이미지 */}
          <div className="w-[345px] sm:w-full md:w-full mx-auto">
            <Image
              src={example}
              alt="판매 이미지"
              className="w-full object-cover"
            />
          </div>

          {/* 오른쪽 카드 정보 */}
          <SellerCardInfo />
        </div>
      </div>
      <br/>
      <br/>
      <div className="w-full max-w-[1480px]">
        <h1 className="w-full text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b border-gray-100 pb-2">
          교환 제시 목록
        </h1>
        <DetailCard>음식</DetailCard>
      </div>
    </div>
  );
}
