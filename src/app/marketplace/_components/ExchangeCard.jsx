"use client";

import React from "react";
import Image from "next/image";
import example from "@/assets/images/img-card-placeholder-1.svg";
import clsx from "clsx";
import { genreChange } from "@/lib/utils/genreChange";
import GradeDetail from "@/components/common/GradeDetail";
import ActionButton from "@/components/ui/buttons/ActionButton";
import { useModal } from "@/providers/ModalProvider";
import ExchangeCancelModal from "../buyers/[id]/_components/modal/ExchangeCancelModal";

export default function ExchangeCard({
  onClick,
  type,
  card = {
    photoCard: {
      title: "How Far I'll Go",
      rank: "RARE",
      genre: "PORTRAIT",
      imgURL: "",
      creator: {
        nickname: "프로여행러",
      },
    },
    price: 4,
    quantity: 1,

    status: "SELLING",
    totalQuantity: 5,
  },
}) {
  const { openModal } = useModal();

  // 교환 취소하기
  const handleExchangeCancel = () => {
    openModal(<ExchangeCancelModal />);
    document.body.style.overflow = "hidden";
  };

  return (
    <div
      className={clsx(
        "bg-gray-500 border-1 border-white/10 flex flex-col items-center justify-start font-light md:w-[440px] md:max-h-[626px] md:p-[40px] w-[170px] h-auto p-[10px] text-[10px] sm:w-[342px] sm:max-h-[561px] sm:p-[20px] sm:text-[16px]",
      )}
      onClick={onClick}
    >
      <div className={clsx("relative mb-[10px] sm:mb-[25px]")}>
        <Image
          src={example}
          alt="photocard"
          className={clsx(
            "md:w-[360px] md:h-[270px] w-[150px] h-[112px] sm:w-[302px] sm:h-[226px]",
          )}
        />
      </div>

      <div className={clsx("w-full flex flex-col text-[10px] sm:text-[16px]")}>
        <div className="flex flex-col justify-center items-start gap-y-[5px] sm:gap-y-[10px]">
          <p
            className={clsx(
              "text-white truncate overflow-hidden whitespace-nowrap w-full font-bold text-[14px]/[17px] sm:text-[22px]/[26px]",
            )}
          >
            {card.photoCard.title}
          </p>
          <div className="flex flex-col w-full gap-y-[5px] sm:gap-y-[10px] md:flex-row">
            <div className="flex gap-[4px] justify-start items-center">
              <GradeDetail
                grade={card.photoCard.rank}
                className={clsx("text-[10px]/[12px] sm:text-[16px]/[19px]")}
              />
              <div
                className={clsx(
                  "border-l border-gray-400 h-3 mx-[5px] sm:mx-[10px]",
                )}
              />
              <p className="text-gray-300 text-[10px]/[12px] sm:text-[16px]/[19px]">
                {genreChange(card.photoCard.genre)}
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
                  {card.price} P
                </p>
                <p className="text-gray-300 text-[10px]/[12px] sm:text-[16px]/[19px]">
                  에 구매
                </p>
              </div>
              <p className="text-white underline font-normal text-[10px]/[12px] sm:text-[16px]/[19px]">
                {card.photoCard.creator.nickname}
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
          스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고
          싶습니다!
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
  );
}
