"use client";
import React, { useState } from "react";
import deleteIcon from "@/assets/icons/ic-close-gray.svg";
import exchange from "@/assets/icons/ic-exchange-gray.svg";
import Image from "next/image";
import { useModal } from "@/providers/ModalProvider";

export default function MobileFilter({ data, onSelectFilter }) {
  const { closeModal } = useModal();
  const total = data.reduce((sum, card) => sum + card.quantity, 0);
  const common = data.filter((card) => card.photoCard.rank === "COMMON").reduce((sum, card) => sum + card.quantity, 0);
  const rare = data.filter((card) => card.photoCard.rank === "RARE").reduce((sum, card) => sum + card.quantity, 0);
  const superrare = data
    .filter((card) => card.photoCard.rank === "SUPER RARE")
    .reduce((sum, card) => sum + card.quantity, 0);
  const legendary = data
    .filter((card) => card.photoCard.rank === "LEGENDARY")
    .reduce((sum, card) => sum + card.quantity, 0);
  const [option, setOption] = useState("등급");

  const handleOptionClick = (value) => {
    setOption(value);
  };
  const genre = ["PORTRAIT", "LANDSCAPE", "ANIMAL", "OBJECT", "FOOD", "ETC"];
  const grade = ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"];
  const sellingType = ["SELLING", "WAITING_EXCHANGE"];
  const soldout = ["SELLING", "SOLDOUT"];
  const [selectedValues, setSelectedValues] = useState({
    등급: null,
    장르: null,
    판매방법: null,
    매진여부: null,
  });
  const handleItemClick = (value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [option]: value,
    }));
  };
  const renderOptionContent = () => {
    const renderList = (items, colorMap = {}) => (
      <div className="w-full flex flex-col gap-[3px] mt-1">
        {items.map((item) => (
          <button
            key={item}
            className={`w-full h-[49px] flex justify-between items-center px-[32px] cursor-pointer ${
              selectedValues[option] === item ? "bg-gray-500" : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            <p className={`font-noto font-normal text-[14px] text-center ${colorMap[item] || ""}`}>{item}</p>
            {/* 등급일 때만 수량 표시 */}
            {option === "등급" && (
              <p className="text-gray-400 font-noto font-normal text-[14px] text-center">
                {item === "COMMON"
                  ? `${common}개`
                  : item === "RARE"
                  ? `${rare}개`
                  : item === "SUPER RARE"
                  ? `${superrare}개`
                  : item === "LEGENDARY"
                  ? `${legendary}개`
                  : null}
              </p>
            )}
          </button>
        ))}
      </div>
    );

    switch (option) {
      case "장르":
        return renderList(genre);
      case "판매방법":
        return renderList(sellingType);
      case "매진여부":
        return renderList(soldout);
      case "등급":
      default:
        return renderList(grade, {
          COMMON: "text-[#EFFF04]",
          RARE: "text-[#29C9F9]",
          "SUPER RARE": "text-[#A77EFF]",
          LEGENDARY: "text-[#FF2A6A]",
        });
    }
  };

  return (
    <div className="w-full pb-10 rounded-[20px] bg-[#1B1B1B]">
      <div className="w-full flex flex-col items-center">
        <div className="w-full relative py-[16.5px]">
          <p className="font-noto font-medium text-[16px] text-gray-400 text-center">필터</p>
          <Image
            alt="닫기버튼"
            src={deleteIcon}
            className="cursor-pointer absolute right-[15px] top-[13px] text-gray-400"
            onClick={() => closeModal()}
          />
        </div>

        <div className="flex w-full px-[24px] h-[49px] items-center gap-[24px]">
          {["등급", "장르", "판매방법", "매진여부"].map((item) => (
            <button
              key={item}
              className={`cursor-pointer font-noto font-medium text-[14px] leading-[100%] tracking-[0%] ${
                option === item ? "text-white" : "text-gray-400"
              }`}
              onClick={() => handleOptionClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {renderOptionContent()}

        <div className="gap-[11px] flex justify-between mt-[76px] w-full px-[15px]">
          <div className="cursor-pointer w-[54px] h-[55px] flex items-center justify-center">
            <Image alt="exchangeIcon" src={exchange} width={24} height={24} />
          </div>
          <button
            className="cursor-pointer rounded-[2px] w-[272px] h-[55px] bg-[#EFFF04] text-[#0F0F0F] font-noto-sans-kr font-bold text-[16px] text-center"
            onClick={() => {
              const transformed = {
                rank: selectedValues["등급"],
                genre: selectedValues["장르"],
                sellingType: selectedValues["판매방법"],
                soldout: selectedValues["매진여부"],
              };
              onSelectFilter(transformed); //  한 번에 전달
              closeModal();
            }}
          >
            해당 조건으로 검색하기
          </button>
        </div>
      </div>
    </div>
  );
}
