import React from "react";
import ActionButton from "@/components/ui/buttons/ActionButton";
import GradeDetail from "../../../../components/common/GradeDetail";


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
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <GradeDetail grade="LEGENDARY" />
                  <span className="text-gray-300 text-sm md:text-[24px]">| 풍경</span>
                </div>
                <div className="text-white text-sm md:text-[24px] underline">미쓰손</div>
              </div>


              {/* 설명 */}
              <p className="text-[16px] md:text-[18px] text-white mb-4">
                우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다.
              </p>

              {/* 가격/잔여 */}
              <div className="flex justify-between mb-6">
                <div>
                  <div className="text-sm">가격</div>
                  <div className="text-gray-300 text-lg font-bold">4P</div>
                </div>
                <div>
                  <div className="text-sm">잔여</div>
                  <div className="text-gray-300 text-lg font-bold">2 / 5</div>
                </div>
              </div>

              {/* 교환 희망 정보 */}
              <div className="border-t border-gray-700 pt-4 mb-4">
                <div className="text-[22px] text-white mb-1 md:text-[28px]">교환 희망 정보</div>
                <div className="flex items-center gap-2 mb-1">
                  <GradeDetail grade="RARE" />
                  <span className="text-gray-300 text-sm md:text-[24px]">| 풍경</span>
                </div>
                <p className="text-white text-[16px] md:text-[18px] mt-1">
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
