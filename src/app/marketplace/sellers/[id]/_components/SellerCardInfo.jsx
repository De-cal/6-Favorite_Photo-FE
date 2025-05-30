"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import GradeDetail from "@/components/common/GradeDetail";
import Image from "next/image";
import exchange from "@/assets/icons/ic-exchange.svg";
import ActionButton from "@/components/ui/buttons/ActionButton";
import DeletePhotoCardModal from "./DeletePhotoCardModal";
import { deleteArticle } from "@/lib/api/article.api";

export default function SellerCardInfo({ cardArticle, onUpdate }) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    // 수정 페이지로 이동 (예: /marketplace/edit/[articleId])
    router.push(`/marketplace/edit/${cardArticle.id}`);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteArticle(cardArticle.id);
      
      // 삭제 성공 시 마켓플레이스로 이동
      router.push("/marketplace");
      
      // 성공 메시지 표시 (토스트 등)
      alert("판매가 취소되었습니다.");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("판매 취소에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col justify-between w-[345px] md:w-[440px] sm:w-[342px] m-auto">
      <div>
        {/* 등급/카테고리/작가 */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <GradeDetail grade={cardArticle.photoCard.rank} />
            <span className="text-gray-300 text-sm md:text-[24px]">
              | {cardArticle.photoCard.genre}
            </span>
          </div>
          <div className="text-white text-sm md:text-[24px] underline">
            {cardArticle.user.nickname}
          </div>
        </div>

        {/* 설명 */}
        <p className="py-3 border-t border-b border-gray-400 text-[16px] md:text-[18px] text-white pb-6 pt-6 mb-6 mt-6">
          {cardArticle.photoCard.description}
        </p>

        {/* 가격/잔여 */}
        <div className="flex flex-col mb-6">
          <div className="flex justify-between">
            <span className="text-[20px] text-gray-300">가격 </span>
            <span className=" text-lg font-bold">{cardArticle.price}P</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[20px] text-gray-300">잔여 </span>
            <div>
              <span className="text-lg font-bold">
                {cardArticle.remainingQuantity}
              </span>
              <span className="text-gray-300 text-lg font-bold">
                {" "}
                / {cardArticle.totalQuantity}
              </span>
            </div>
          </div>
        </div>

        {/* 교환 희망 정보 */}
        <div className="pt-12 mb-4">
          <div className="flex items-center mb-1">
            <Image
              src={exchange}
              alt="exchange"
              className="mr-2 w-[25px] h-[25px]"
            />
            <div className="text-[22px] text-white  md:text-[28px] mb-1">
              교환 희망 정보
            </div>
          </div>
          <div className="border-t border-gray-100 flex items-center gap-2 mb-8 pt-8">
            <GradeDetail grade={cardArticle.exchangeRank} />
            <span className="text-gray-300 text-sm md:text-[24px]">
              | {cardArticle.exchangeGenre}
            </span>
          </div>
          <p className="border-t border-gray-400 text-white text-[16px] md:text-[18px] pt-4">
            {cardArticle.exchangeText}
          </p>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex flex-col gap-3 mt-6">
        <ActionButton
          variant="primary"
          className="w-[345px] h-[75px] text-lg md:text-xl md:w-[440px] md:h-[80px]"
          onClick={handleEdit}
        >
          수정하기
        </ActionButton>
        <ActionButton 
          onClick={() => setIsDeleteModalOpen(true)} 
          variant="secondary"
        >
          판매 내리기
        </ActionButton>
      </div>

      {/* 삭제 모달 */}
      {isDeleteModalOpen && (
        <DeletePhotoCardModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          cardTitle={cardArticle.photoCard.title}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}