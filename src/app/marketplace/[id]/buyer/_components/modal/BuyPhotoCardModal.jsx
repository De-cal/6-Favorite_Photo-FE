import ActionButton from "@/components/ui/buttons/ActionButton";
import Image from "next/image";
import React from "react";
import ic_close_gray from "@/assets/icons/ic-close-gray.svg";
import { useModal } from "@/providers/ModalProvider";
import { useParams } from "next/navigation";
import { purchaseArticle } from "@/lib/api/article.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CommonModal from "@/components/common/CommonModal";
import GradeDetail from "@/components/common/GradeDetail";

export default function BuyPhotoCardModal({
  title,
  rank,
  purchaseQuantity,
  totalPrice,
}) {
  const { id: articleId } = useParams();
  const { openModal, closeModal } = useModal();
  const queryClient = useQueryClient();

  // 포토카드 구매 API
  const { mutate: purchaseArticleMutate } = useMutation({
    mutationFn: ({ articleId, body }) =>
      purchaseArticle(articleId, body),
    onSuccess: () => {
      document.body.style.overflow = "hidden";
      openModal(
        <CommonModal
          type="구매"
          result="성공"
          data={{ title, rank, quantity: purchaseQuantity }}
        />,
      );
      queryClient.invalidateQueries({ queryKey: ["articles", articleId] });
    },
    onError: () => {
      document.body.style.overflow = "hidden";
      openModal(
        <CommonModal
          type="구매"
          result="실패"
          data={{ title, rank, quantity: purchaseQuantity }}
        />,
      );
    },
  });

  // 취소하기
  const handleCancel = () => {
    closeModal();
    document.body.style.overflow = "auto";
  };

  // 구매하기
  const handleBuyPhotoCard = () => {
    purchaseArticleMutate({ articleId, body: { purchaseQuantity, totalPrice } });

    closeModal();
    document.body.style.overflow = "auto";
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
            포토카드 구매
          </p>
          <div className="flex flex-wrap justify-center items-center mt-[30px] mb-[40px] font-normal text-[14px]/[20px] text-gray-300 whitespace-pre md:mt-[40px] md:mb-[60px] md:text-[16px]/[23px]">
            <span>
              [
              <GradeDetail
                grade={rank}
                className="text-[14px]/[20px] md:text-[16px]/[23px]"
              />{" "}
              | {title}]
            </span>
            <span> {purchaseQuantity}장을 구매하시겠습니까?</span>
          </div>
          <ActionButton
            onClick={handleBuyPhotoCard}
            className="w-[120px] h-[55px] sm:w-[140px] md:w-[170px] md:h-[60px]"
          >
            구매하기
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
