"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { genreChange } from "@/lib/utils/genreChange";
import GradeDetail from "@/components/common/GradeDetail";
import ActionButton from "@/components/ui/buttons/ActionButton";
import { useModal } from "@/providers/ModalProvider";
import ExchangeCancelModal from "../buyers/[id]/_components/modal/ExchangeCancelModal";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import articleApi from "@/lib/api/article.api";

export default function ExchangeCard({ type }) {
  const { id: articleId } = useParams();
  const { openModal } = useModal();

  const { data: cardArticle, isPending } = useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => articleApi.getArticle(articleId),
  });

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  let exchangeId,
    description,
    requesterCardId,
    price,
    nickname,
    title,
    rank,
    genre,
    imgUrl;

  const exchange = cardArticle.recipient?.[0];

  // 포토카드 상세 교환 목록 데이터 구조분해
  if (exchange) {
    ({
      id: exchangeId,
      description,
      requesterCard: {
        id: requesterCardId,
        price,
        user: { nickname },
        photoCard: { title, rank, genre, imgUrl },
      },
    } = exchange);
  }

  // 교환 취소하기
  const handleExchangeCancel = () => {
    openModal(
      <ExchangeCancelModal
        exchangeId={exchangeId}
        requesterCardId={requesterCardId}
        title={title}
        rank={rank}
      />,
    );
    document.body.style.overflow = "hidden";
  };

  return (
    cardArticle.recipient?.[0] && (
      <div
        className={clsx(
          "bg-gray-500 border-1 border-white/10 flex flex-col items-center justify-start font-light md:w-[440px] md:max-h-[626px] md:p-[40px] w-[170px] h-auto p-[10px] text-[10px] sm:w-[342px] sm:max-h-[561px] sm:p-[20px] sm:text-[16px]",
        )}
      >
        <div className={clsx("relative mb-[10px] sm:mb-[25px]")}>
          <img src={imgUrl} alt={title} />
          {/* @De-cal TODO: Image 컴포넌트 사용하기 위해서 next.config에 설정하기 */}
          {/* <Image
          src={imgUrl}
          alt={title}
          className={clsx(
            "md:w-[360px] md:h-[270px] w-[150px] h-[112px] sm:w-[302px] sm:h-[226px]",
          )}
        /> */}
        </div>
        <div
          className={clsx("w-full flex flex-col text-[10px] sm:text-[16px]")}
        >
          <div className="flex flex-col justify-center items-start gap-y-[5px] sm:gap-y-[10px]">
            <p
              className={clsx(
                "text-white truncate overflow-hidden whitespace-nowrap w-full font-bold text-[14px]/[17px] sm:text-[22px]/[26px]",
              )}
            >
              {title}
            </p>
            <div className="flex flex-col w-full gap-y-[5px] sm:gap-y-[10px] md:flex-row">
              <div className="flex gap-[4px] justify-start items-center">
                <GradeDetail
                  grade={rank}
                  className={clsx("text-[10px]/[12px] sm:text-[16px]/[19px]")}
                />
                <div
                  className={clsx(
                    "border-l border-gray-400 h-3 mx-[5px] sm:mx-[10px]",
                  )}
                />
                <p className="text-gray-300 text-[10px]/[12px] sm:text-[16px]/[19px]">
                  {genreChange(genre)}
                </p>
                <div
                  className={clsx(
                    "hidden border-l border-gray-400 h-3 mx-[5px] sm:mx-[10px] md:block",
                  )}
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="flex justify-center items-center gap-[2px]">
                  <p className="text-white font-normal text-[10px]/[12px] sm:text-[16px]/[19px]">
                    {price} P
                  </p>
                  <p className="text-gray-300 text-[10px]/[12px] sm:text-[16px]/[19px]">
                    에 구매
                  </p>
                </div>
                <p className="text-white underline font-normal text-[10px]/[12px] sm:text-[16px]/[19px]">
                  {nickname}
                </p>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "border-b border-gray-400 h-[1px] w-full my-[10px] sm:my-[20px]",
            )}
          />
          <p className="font-normal text-[10px]/[12px] line-clamp-2 sm:text-[16px]/[19px]">
            {description}
          </p>
          {type === "buyer" ? (
            <ActionButton
              variant="secondary"
              className="h-[40px] mt-[20px] font-bold text-[12px]/[14px] sm:h-[55px] sm:mt-[25px] sm:font-medium sm:text-[16px]/[19px] md:h-[60px] md:mt-[40px] md:text-[18px]/[22px]"
              onClick={handleExchangeCancel}
            >
              취소하기
            </ActionButton>
          ) : (
            <div className="flex justify-center items-center gap-[5px] sm:gap-[20px]">
              <ActionButton
                variant="secondary"
                className="w-full h-[40px] mt-[20px] font-bold text-[12px]/[14px] sm:h-[55px] sm:mt-[25px] sm:font-medium sm:text-[16px]/[19px] md:h-[60px] md:mt-[40px] md:text-[18px]/[22px]"
              >
                거절
                <div className="hidden sm:block">하기</div>
              </ActionButton>
              <ActionButton
                variant="primary"
                className="w-full h-[40px] mt-[20px] font-bold text-[12px]/[14px] sm:h-[55px] sm:mt-[25px] sm:font-medium sm:text-[16px]/[19px] md:h-[60px] md:mt-[40px] md:text-[18px]/[22px]"
              >
                승인
                <div className="hidden sm:block">하기</div>
              </ActionButton>
            </div>
          )}
        </div>
      </div>
    )
  );
}
