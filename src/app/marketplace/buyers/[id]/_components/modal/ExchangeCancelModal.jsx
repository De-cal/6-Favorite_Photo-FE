import ActionButton from "@/components/ui/buttons/ActionButton";
import Image from "next/image";
import React from "react";
import ic_close_gray from "@/assets/icons/ic-close-gray.svg";
import { useModal } from "@/providers/ModalProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import articleApi from "@/lib/api/article.api";
import { useParams } from "next/navigation";
import GradeDetail from "@/components/common/GradeDetail";

export default function ExchangeCancelModal({
  exchangeId,
  requesterCardId,
  title,
  rank,
}) {
  const { id: articleId } = useParams();
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  // 교환 요청 취소 API
  const { mutate: cancelExchangeRequest } = useMutation({
    mutationFn: ({ articleId, exchangeId, requesterCardId }) =>
      articleApi.cancelExchangeRequest(articleId, exchangeId, requesterCardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles", articleId] });
    },
  });

  // 모달 닫기
  const handleClose = () => {
    closeModal();
    document.body.style.overflow = "auto";
  };

  // 교환 취소하기
  const handleCancel = () => {
    cancelExchangeRequest({ articleId, exchangeId, requesterCardId });

    closeModal();
    document.body.style.overflow = "auto";
  };

  return (
    <div className="fixed flex justify-center items-center inset-0 bg-transparent">
      <div className="flex flex-col gap-y-[17px] w-[345px] h-[291px] py-[15px] px-[15px] bg-gray-500 sm:w-[400px] md:py-[30px] md:px-[30px] md:w-[560px] md:h-[355px]">
        <div className="flex justify-end items-center">
          <button
            onClick={handleClose}
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
            교환 제시 취소
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
            <span> 교환 제시를 취소하시겠습니까?</span>
          </div>
          <ActionButton
            onClick={handleCancel}
            className="w-[120px] h-[55px] sm:w-[140px] md:w-[170px] md:h-[60px]"
          >
            취소하기
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
