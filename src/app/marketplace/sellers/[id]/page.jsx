import React from "react";
import example from "@/assets/images/img-card-placeholder-1.svg";
import Image from "next/image";
import SellerCardInfo from "./_components/SellerCardInfo";
import MobileHeader from "@/components/common/MobileHeader";
import ExchangeCards from "./_components/ExchangeCards";

export default function SellerPage() {
  return (
    <>
      <MobileHeader src="/marketplace" title="마켓플레이스" />
      <div className="min-h-screen flex flex-col items-center bg-black text-white p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-[1480px]">
          <h1 className="w-[345px] sm:w-full md:w-full mx-auto text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b border-gray-100 pb-2">
            우리집 앞마당
          </h1>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mt-13">
            {/* 왼쪽 이미지 */}
            <div className="w-[345px] sm:w-full md:w-full mx-auto">
              <Image src={example} alt="판매 이미지" className="w-full object-cover" />
            </div>

            {/* 오른쪽 카드 정보 */}
            <SellerCardInfo
              cardArticle={{
                photoCard: {
                  title: "우리집 앞마당",
                  description: "우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다.",
                  rank: "LEGENDARY",
                  genre: "풍경",
                },
                user: {
                  nickname: "미쓰손",
                },
                price: 4,
                totalQuantity: 5,
                remainingQuantity: 2,
                exchangeText: "푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.",
                exchangeRank: "RARE",
                exchangeGenre: "풍경",
              }}
            />
          </div>
        </div>
        <br />
        <br />
        <ExchangeCards />
      </div>
    </>
  );
}
