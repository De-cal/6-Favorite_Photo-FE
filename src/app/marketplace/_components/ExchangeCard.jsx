"use client";

import React from "react";
import Image from "next/image";
import { genreChange } from "@/lib/utils/genreChange";
import GradeDetail from "@/components/common/GradeDetail";
import ActionButton from "@/components/ui/buttons/ActionButton";
import ExchangeCancelModal from "../[id]/buyer/_components/modal/ExchangeCancelModal";
import { useModal } from "@/providers/ModalProvider";

export default function ExchangeCard({ type, cardArticle }) {
  const { openModal } = useModal();

  // 포토카드 교환 목록 데이터 구조분해
  const exchanges = cardArticle?.exchange?.map((ex) => ({
    exchangeId: ex.id,
    description: ex.description,
    requesterCardId: ex.requesterCard?.id,
    price: ex.requesterCard?.price,
    nickname: ex.requesterCard?.user?.nickname,
    title: ex.requesterCard?.photoCard?.title,
    rank: ex.requesterCard?.photoCard?.rank,
    genre: ex.requesterCard?.photoCard?.genre,
    imgUrl: ex.requesterCard?.photoCard?.imgUrl,
  }));

  // 교환 취소하기
  const handleExchangeCancel = (exchange) => {
    openModal(
      <ExchangeCancelModal
        exchangeId={exchange.exchangeId}
        title={exchange.title}
        rank={exchange.rank}
      />,
    );
    document.body.style.overflow = "hidden";
  };

  return (
    cardArticle?.exchange?.length !== 0 && (
      <>
        <h2 className="font-bold text-[24px]/[29px] w-full mt-[120px] mb-[46px] pb-[10px] border-b-[2px] border-gray-100 sm:text-[32px]/[38px] sm:mb-[48px] sm:pb-[20px] md:mb-[70px] md:text-[40px]/[48px]">
          {type === "buyer" ? "내가 제시한 교환 목록" : "교환 제시 목록"}
        </h2>
        <div className="flex justify-start items-center w-full gap-[5px] sm:gap-[20px] md:gap-[80px]">
          {exchanges?.map((exchange, i) => (
            <div
              key={`${exchange.id}_${i}`}
              className={
                "bg-gray-500 border-1 border-white/10 flex flex-col items-center justify-start font-light md:w-[440px] md:max-h-[626px] md:p-[40px] w-[170px] h-auto p-[10px] text-[10px] sm:w-[342px] sm:max-h-[561px] sm:p-[20px] sm:text-[16px]"
              }
            >
              <div className={"relative mb-[10px] sm:mb-[25px]"}>
                <img src={exchange.imgUrl} alt={exchange.title} />
                {/* @De-cal TODO: Image 컴포넌트 사용하기 위해서 next.config에 설정하기 */}
                {/* <Image
          src={imgUrl}
          alt={title}
          className={
            "md:w-[360px] md:h-[270px] w-[150px] h-[112px] sm:w-[302px] sm:h-[226px]"
          }
        /> */}
              </div>
              <div
                className={"w-full flex flex-col text-[10px] sm:text-[16px]"}
              >
                <div className="flex flex-col justify-center items-start gap-y-[5px] sm:gap-y-[10px]">
                  <p
                    className={
                      "text-white truncate overflow-hidden whitespace-nowrap w-full font-bold text-[14px]/[17px] sm:text-[22px]/[26px]"
                    }
                  >
                    {exchange.title}
                  </p>
                  <div className="flex flex-col w-full gap-y-[5px] sm:gap-y-[10px] md:flex-row">
                    <div className="flex gap-[4px] justify-start items-center">
                      <GradeDetail
                        grade={exchange.rank}
                        className={"text-[10px]/[12px] sm:text-[16px]/[19px]"}
                      />
                      <div
                        className={
                          "border-l border-gray-400 h-3 mx-[5px] sm:mx-[10px]"
                        }
                      />
                      <p className="text-gray-300 text-[10px]/[12px] sm:text-[16px]/[19px]">
                        {genreChange(exchange.genre)}
                      </p>
                      <div
                        className={
                          "hidden border-l border-gray-400 h-3 mx-[5px] sm:mx-[10px] md:block"
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex justify-center items-center gap-[2px]">
                        <p className="text-white font-normal text-[10px]/[12px] sm:text-[16px]/[19px]">
                          {exchange.price} P
                        </p>
                        <p className="text-gray-300 text-[10px]/[12px] sm:text-[16px]/[19px]">
                          에 구매
                        </p>
                      </div>
                      <p className="text-white underline font-normal text-[10px]/[12px] sm:text-[16px]/[19px]">
                        {exchange.nickname}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    "border-b border-gray-400 h-[1px] w-full my-[10px] sm:my-[20px]"
                  }
                />
                <p className="font-normal text-[10px]/[12px] line-clamp-2 sm:text-[16px]/[19px]">
                  {exchange.description}
                </p>
                {type === "buyer" ? (
                  <ActionButton
                    variant="secondary"
                    className="h-[40px] mt-[20px] font-bold text-[12px]/[14px] sm:h-[55px] sm:mt-[25px] sm:font-medium sm:text-[16px]/[19px] md:h-[60px] md:mt-[40px] md:text-[18px]/[22px]"
                    onClick={() => handleExchangeCancel(exchange)}
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
          ))}
        </div>
      </>
    )
  );
}
