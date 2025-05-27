"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import example from "@/assets/images/img-card-placeholder-1.svg";
import { genreChange } from "@/utils/genreChange";
import ActionButton from "@/components/ui/buttons/ActionButton";
import { useModal } from "@/providers/ModalProvider";

function CardInfo({ data }) {
  const rankStyles = {
    COMMON: "text-main",
    RARE: "text-blue",
    SUPERRARE: "text-purple",
    LEGENDARY: "text-pink",
  };

  const infoRef = useRef(null);
  const [infoHeight, setInfoHeight] = useState(0);

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth >= 640 && infoRef.current) {
        setInfoHeight(infoRef.current.clientHeight);
      } else {
        setInfoHeight("auto"); // 모바일은 auto
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <section className="mt-[26px] sm:mt-[48px] md:mt-[70px] flex flex-col sm:flex-row gap-5 w-full max-w-[1480px]">
      <div
        className="flex-1 min-w-[400px]"
        style={{ height: infoHeight !== "auto" ? `${infoHeight}px` : "auto" }}
      >
        <Image
          src={data.photoCard.imgURL === "" ? example : data.photoCard.imgURL}
          alt={"사진이미지"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ✅ 오른쪽 카드 정보 */}
      <div className="w-full sm:max-w-[440px] flex flex-col" ref={infoRef}>
        <div className="flex flex-row justify-between items-center w-full gap-4 pb-[34px] border-b-1 border-gray-400">
          <div className="flex flex-row justify-between items-center">
            <div
              className={`pr-[10px] border-r-2 border-gray-400 ${
                rankStyles[data.photoCard.rank] || ""
              }`}
            >
              {data.photoCard.rank}
            </div>
            <div className="pl-[10px] text-gray-400">
              {genreChange(data.photoCard.genre)}
            </div>
          </div>
          <div className="text-sm">{data.photoCard.creator.nickname}</div>
        </div>

        <div className="py-[30px] border-b-1 border-gray-400 text-center sm:text-start">
          {data.photoCard.description}
        </div>
        <div className="py-[30px] border-b-1 border-gray-400 text-center sm:text-start">
          {`구매 가격 : ${data.price}P `}
        </div>
        <div className="py-[30px] border-b-1 border-gray-400 text-center sm:text-start">
          {`보유 수량 : ${data.quantity}장 `}
        </div>
        <div className="py-[30px] border-b-1 border-gray-400 text-center sm:text-start">
          {`구매 일시 : ${data.createdAt} `}
        </div>
        <div className="pt-[60px] text-center">
          <ActionButton
            className="w-full h-20 text-2xl"
            // onClick={()=>openModal(<판매하기 모달/>)}
          >
            판매하기
          </ActionButton>
        </div>
      </div>
    </section>
  );
}

export default CardInfo;
