"use client";
import Image from "next/image";
import React, { useState } from "react";
import close from "@/assets/icons/ic-close.svg";
import example from "@/assets/images/img-card-placeholder-1.svg";
import plus from "@/assets/icons/ic-plus.svg";
import minus from "@/assets/icons/ic-minus.svg";
import clsx from "clsx";
import Dropdown from "./Dropdown";

function SellPhotoCardDetailModal({
  setDetailModal,
  card = {
    title: "우리집 앞마당",
    rank: "LEGENDARY",
    genre: "PORTRAIT",
    owner: "유디",
    totalQuantity: 3,
  },
}) {
  const [quantity, setQuantity] = useState(0);
  const GenreChange = (genre) => {
    if (genre === "PORTRAIT") {
      return "인물";
    } else if (genre === "LANDSCAPE") {
      return "풍경";
    } else if (genre === "ANIMAL") {
      return "동물";
    } else if (genre === "OBJECT") {
      return "사물";
    } else if (genre === "FOOD") {
      return "음식";
    } else if (genre === "ETC") {
      return "기타";
    }
    return;
  };
  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/80 pt-[60px] sm:pt-[40px] md:py-[40px]">
      <div className="max-w-[1160px] w-full bg-gray-500 px-[15px] flex flex-col items-center min-h-screen overflow-y-auto pb-[100px]">
        <div className="flex justify-end w-full mr-[30px] mt-[30px]">
          <button onClick={() => setDetailModal(null)}>
            <Image src={close} alt="close" className="h-[32px]" />
          </button>
        </div>
        <div className="max-w-[920px] w-full">
          <div className="text-gray-300 font-baskinRobbins text-[14px] sm:text-[16px] md:text-[24px]">
            나의 포토카드 판매하기
          </div>
          <div className="text-[26px] sm:text-[40px] md:text-[46px] mt-[15px] sm:mt-[40px] font-bold">
            {card.title}
          </div>
          <div className=" border-b-2 border-white mt-[10px] sm:mt-[20px]">
            {" "}
          </div>
          <div className="mt-[26px] sm:mt-[48px] flex flex-col items-center sm:flex-row gap-[20px] md:gap-[40px] sm:justify-center sm:items-start">
            <Image src={example} alt="photocard" className="w-[345px]" />
            <div className="flex flex-col w-full max-w-[345px]">
              <div className="flex flex-row justify-between w-full mt-[5px] sm:mt-0 text-[18px]">
                <div className="flex gap-[5px] items-center">
                  <p
                    className={clsx("font-normal", {
                      "text-main": card.rank === "COMMON",
                      "text-blue": card.rank === "RARE",
                      "text-purple": card.rank === "SUPER RARE",
                      "text-pink": card.rank === "LEGENDARY",
                    })}
                  >
                    {card.rank}
                  </p>
                  <div className="border-l border-gray-400 h-6 mx-[15px] "></div>
                  <p className=" text-gray-300">{GenreChange(card.genre)}</p>
                </div>
                <p className="text-white underline font-normal">{card.owner}</p>
              </div>
              <div className="border-b border-gray-400 h-[1px] w-full my-[10px] sm:my-[20px]">
                {" "}
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="flex justify-between items-center">
                  <p>총 판매 수량</p>
                  <div className="flex gap-[15px]">
                    <div className="border-gray-200 border-1 flex w-[144px] h-[45px] justify-evenly items-center">
                      <button
                        onClick={() => setQuantity((prev) => prev - 1)}
                        disabled={quantity === 0}
                      >
                        <Image alt="minus" src={minus} />
                      </button>
                      <p>{quantity}</p>
                      <button
                        onClick={() => setQuantity((prev) => prev + 1)}
                        disabled={quantity === card.totalQuantity}
                      >
                        <Image alt="plus" src={plus} />
                      </button>
                    </div>
                    <div>
                      <p>/ {card.totalQuantity}</p>
                      <p className="text-gray-200 text-[12px]">
                        최대 {card.totalQuantity}장
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p>장당 가격</p>
                  <div className="border-gray-200 border-1 w-[202px] h-[45px] md:w-[245px] md:h-[50px] relative flex justify-center">
                    <input
                      placeholder="숫자만 입력"
                      className="absolute left-5 top-2"
                    />
                    <p className="absolute top-2 right-3">P</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-[22px] md:text-[28px] mt-[15px] sm:mt-[40px] font-bold">
            교환 희망 정보
          </div>
          <div className=" border-b-2 border-white mt-[10px] sm:mt-[20px]  mb-[46px]">
            {" "}
          </div>
          <div>
            <div className="flex flex-col sm:gap-[20px] md:gap-[40px] sm:flex-row">
              <Dropdown type="등급" />
              <Dropdown type="장르" />
            </div>
            <div className="mt-[34px]">
              <div className="font-bold md:text-[20px]">교환 희망 설명</div>
              <textarea
                placeholder="설명을 입력해 주세요"
                className="border-1 w-full border-gray-200 mt-[10px] pt-[12px] pl-[20px] h-[120px]"
              />
            </div>
          </div>
          <div className="flex gap-[15px] sm:gap-[20px] md:gap-[40px] w-full justify-between mt-[44px] sm:mt-15 md:mt-[90px]">
            <button className="py-[18px] border-1 border-gray-100 w-full font-bold">
              취소하기
            </button>
            <button className="py-[18px] bg-main text-black w-full font-bold">
              판매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellPhotoCardDetailModal;
