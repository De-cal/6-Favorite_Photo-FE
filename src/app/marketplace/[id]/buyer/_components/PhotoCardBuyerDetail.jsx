"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ic_plus from "@/assets/icons/ic-plus.svg";
import ic_minus from "@/assets/icons/ic-minus.svg";
import ActionButton from "@/components/ui/buttons/ActionButton";
import GradeDetail from "@/components/common/GradeDetail";
import { useModal } from "@/providers/ModalProvider";
import BuyPhotoCardModal from "./modal/BuyPhotoCardModal";
import { useBuyer } from "@/contexts/BuyerContext";
import { getImageUrl } from "@/lib/utils/imageUrl";

export default function PhotoCardBuyerDetail() {
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(null);
  const { openModal } = useModal();
  const { cardArticle, isPending } = useBuyer();

  useEffect(() => {
    if (isPending) return;

    setTotalPrice(price * purchaseQuantity);
  }, [isPending]);

  // 구매수량 감소
  const handleDecrease = () => {
    if (purchaseQuantity === 1) return;

    setPurchaseQuantity(purchaseQuantity - 1);
  };

  // 구매수량 추가
  const handleIncrease = () => {
    if (purchaseQuantity === remainingQuantity) return;

    setPurchaseQuantity(purchaseQuantity + 1);
  };

  // 총 가격 변경
  useEffect(() => {
    if (isPending) return;

    setTotalPrice(price * purchaseQuantity);
  }, [purchaseQuantity]);

  // 구매하기
  const openBuyConfirmModal = () => {
    openModal(
      <BuyPhotoCardModal
        title={title}
        rank={rank}
        purchaseQuantity={purchaseQuantity}
        totalPrice={totalPrice}
      />,
    );
    document.body.style.overflow = "hidden";
  };

  // 포토카드 상세 데이터 구조분해
  const {
    price,
    remainingQuantity,
    totalQuantity,
    userPhotoCard: {
      photoCard: {
        title,
        imgUrl,
        rank,
        genre,
        description,
        creator: { nickname },
      },
    },
  } = cardArticle;

  return (
    <>
      <p className="hidden font-baskinRobbins font-normal text-[16px]/[16px] text-gray-300 py-[40px] sm:block md:text-[24px]/[25px] md:py-[60px]">
        마켓플레이스
      </p>
      <div className="font-bold text-[24px]/[29px] w-full pb-[10px] border-b-[2px] border-gray-100 sm:text-[32px]/[38px] sm:pb-[20px] md:text-[40px]/[48px]">
        {title}
      </div>
      <div className="flex flex-col justify-center items-start gap-y-[20px] sm:flex-row sm:gap-[20px] md:gap-[80px]">
        <div className="relative w-[345px] min-h-[258.75px] max-w-[960px] max-h-[720px] aspect-[345/258.75] mt-[26px] sm:w-full sm:min-w-[342px] sm:mt-[48px] md:mt-[70px]">
          <Image
            src={getImageUrl(imgUrl)}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-[440px] sm:min-w-[342px] sm:mt-[48px] md:mt-[70px] w-full">
          <div className="flex justify-between items-center pb-[30px] border-b-[1px] border-gray-400">
            <div className="flex justify-center items-center gap-[10px] md:gap-[30px]">
              <GradeDetail
                grade={rank}
                className="font-bold text-[18px]/[22px] md:text-[24px]/[29px]"
              />
              <div className="border-l-[1.5px] border-gray-400 h-[17px]"></div>
              <p className="font-bold text-[18px]/[22px] text-gray-300 md:text-[24px]/[29px]">
                {genre}
              </p>
            </div>
            <p className="font-bold text-[18px]/[22px] underline">{nickname}</p>
          </div>
          <p className="font-normal text-[16px]/[19px] py-[30px] border-b-[1px] border-gray-400 md:text-[18px]/[22px]">
            {description}
          </p>
          <div className="flex flex-col py-[30px] gap-y-[10px] border-b-[1px] border-gray-400">
            <div className="flex justify-between items-center">
              <p className="font-normal text-[18px]/[22px] text-gray-300 md:text-[20px]/[24px]">
                가격
              </p>
              <p className="font-bold text-[20px]/[24px] md:text-[24px]/[29px]">
                {price} P
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-normal text-[18px]/[22px] text-gray-300 md:text-[20px]/[24px]">
                잔여
              </p>
              <div className="flex justify-center items-center gap-[5px]">
                <p className="font-bold text-[20px]/[24px] md:text-[24px]/[29px]">
                  {remainingQuantity}
                </p>
                <p className="font-normal text-[20px]/[24px] text-gray-300 md:text-[24px]/[29px]">
                  / {totalQuantity}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col py-[30px] gap-y-[20px]">
            <div className="flex justify-between items-center">
              <p className="font-normal text-[18px]/[22px] md:text-[20px]/[24px]">
                구매수량
              </p>
              <div className="flex justify-center items-center max-w-[176px] py-[10px] px-[12px] border border-gray-200 rounded-[2px] gap-[33px] md:gap-[46px]">
                <button
                  onClick={handleDecrease}
                  className="relative w-[22px] h-[22px] md:w-[24px] md:h-[24px] cursor-pointer"
                >
                  <Image
                    src={ic_minus}
                    alt="마이너스"
                    fill
                    className="object-cover"
                  />
                </button>
                <p className="font-normal text-[18px]/[22px] md:text-[20px]/[24px]">
                  {purchaseQuantity}
                </p>
                <button
                  onClick={handleIncrease}
                  className="relative w-[22px] h-[22px] md:w-[24px] md:h-[24px] cursor-pointer"
                >
                  <Image
                    src={ic_plus}
                    alt="플러스"
                    fill
                    className="object-cover"
                  />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-normal text-[18px]/[22px] md:text-[20px]/[24px]">
                총 가격
              </p>
              <div className="flex justify-center items-center gap-[10px]">
                <p className="font-bold text-[20px]/[24px] md:text-[24px]/[29px]">
                  {totalPrice} P
                </p>
                <p className="font-normal text-[18px]/[22px] text-gray-300 md:text-[20px]/[24px]">
                  ({purchaseQuantity}장)
                </p>
              </div>
            </div>
          </div>
          <ActionButton
            className="mt-[40px] md:mt-[80px] max-w-[440px] min-w-[342px] w-full"
            onClick={openBuyConfirmModal}
            disabled={remainingQuantity === 0}
          >
            포토카드 구매하기
          </ActionButton>
        </div>
      </div>
    </>
  );
}
