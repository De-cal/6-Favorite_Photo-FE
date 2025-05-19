import React from "react";
import ActionButton from "@/components/ui/buttons/ActionButton";

export default function SellerPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[1480px]">
        <h1 className="w-full text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b border-white pb-2">
          우리집 앞마당
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          {/* 왼쪽 이미지 */}
          <div className="w-[345px] sm:w-full md:w-full mx-auto">
            <img
              src="/images/img-card-placeholder-1.svg"
              alt="판매 이미지"
              className="w-full object-cover rounded-lg border border-white"
            />
          </div>

          {/* 오른쪽 카드 정보 */}
          <div className="flex flex-col justify-between w-[345px] md:w-[440px] sm:w-[342px] m-auto">
            <div>
              {/* 등급/카테고리/작가 */}
              <div className="text-pink-500 font-semibold text-sm">LEGENDARY | 풍경</div>
              <div className="text-gray-300 text-sm mb-4">미쏘손</div>

              {/* 설명 */}
              <p className="text-gray-300 mb-4">
                우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다.
              </p>

              {/* 가격/잔여 */}
              <div className="flex justify-between mb-6">
                <div>
                  <div className="text-gray-400 text-sm">가격</div>
                  <div className="text-lg font-bold">4P</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">잔여</div>
                  <div className="text-lg font-bold">2 / 5</div>
                </div>
              </div>

              {/* 교환 희망 정보 */}
              <div className="border-t border-gray-700 pt-4 mb-4">
                <div className="text-sm text-gray-400 mb-1">🔄 교환 희망 정보</div>
                <div className="text-blue-400 font-medium text-sm">RARE | 풍경</div>
                <p className="text-gray-400 text-sm mt-1">
                  푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.
                </p>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex flex-col gap-3 mt-6">
            <div className="flex flex-col gap-3 mt-6">
              <ActionButton label="수정하기" variant="primary" />
              <ActionButton label="판매 내리기" variant="secondary" />
            </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <div className="w-full max-w-[1480px]">
        <h1 className="w-full text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b border-white pb-2">
          교환 제시 목록
        </h1>
      </div>
    </div>
  );
}
