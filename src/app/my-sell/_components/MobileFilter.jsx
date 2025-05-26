"use client";
import React, { useState } from "react";
import deleteIcon from "@/assets/icons/ic-close-gray.svg";
import exchange from "@/assets/icons/ic-exchange-gray.svg";
import Image from "next/image";
import { useModal } from "@/providers/ModalProvider";
import { genreChange } from "@/utils/genreChange";

export default function MobileFilter({ data, onSelectFilter }) {
  const { closeModal } = useModal();

  const rankCount = (data, rank) =>
    data.filter((card) => card.photoCard.rank === rank).reduce((sum, card) => sum + card.quantity, 0);

  const genreCount = (data, genre) =>
    data.filter((card) => card.photoCard.genre === genre).reduce((sum, card) => sum + card.quantity, 0);

  const sellingTypeCount = (data, type) =>
    data.filter((card) => card.status === type).reduce((sum, card) => sum + card.quantity, 0);

  const soldoutCount = (data, soldout) =>
    data
      .filter((card) => (soldout === "SOLDOUT" ? card.quantity === 0 : card.quantity > 0))
      .reduce((sum, card) => sum + card.quantity, 0);

  const [option, setOption] = useState("등급");

  const handleOptionClick = (value) => setOption(value);

  const sellingTypeMap = {
    "판매 중": "SELLING",
    "교환 대기 중": "WAITING_EXCHANGE",
  };

  const soldoutMap = {
    "판매 중": "SELLING",
    "판매 완료": "SOLDOUT",
  };

  const genre = ["PORTRAIT", "LANDSCAPE", "ANIMAL", "OBJECT", "FOOD", "ETC"];
  const grade = ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"];
  const sellingTypeKorean = ["판매 중", "교환 대기 중"];
  const soldoutKorean = ["판매 중", "판매 완료"];

  const [selectedValues, setSelectedValues] = useState({
    등급: null,
    장르: null,
    판매방법: null,
    매진여부: null,
  });

  const handleItemClick = (value) => {
    const actualValue =
      option === "판매방법" ? sellingTypeMap[value] : option === "매진여부" ? soldoutMap[value] : value;

    setSelectedValues((prev) => ({
      ...prev,
      [option]: actualValue,
    }));
  };

  const filteredTotal = data
    .filter((card) => {
      const matchRank = !selectedValues["등급"] || card.photoCard.rank === selectedValues["등급"];
      const matchGenre = !selectedValues["장르"] || card.photoCard.genre === selectedValues["장르"];
      const matchSellingType = !selectedValues["판매방법"] || card.status === selectedValues["판매방법"];
      const matchSoldout =
        !selectedValues["매진여부"] ||
        (selectedValues["매진여부"] === "SOLDOUT" ? card.quantity === 0 : card.quantity > 0);

      return matchRank && matchGenre && matchSellingType && matchSoldout;
    })
    .reduce((sum, card) => sum + card.quantity, 0);

  const renderOptionContent = () => {
    const renderList = (items, colorMap = {}) => (
      <div className="w-full flex flex-col gap-[3px] mt-1">
        {items.map((item) => {
          const actualValue =
            option === "판매방법" ? sellingTypeMap[item] : option === "매진여부" ? soldoutMap[item] : item;

          const isSelected = selectedValues[option] === actualValue;

          return (
            <button
              key={item}
              className={`w-full h-[49px] flex justify-between items-center px-[32px] cursor-pointer ${
                isSelected ? "bg-gray-500" : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              <p className={`font-noto font-normal text-[14px] text-center ${colorMap[item] || ""}`}>
                {option === "장르" ? genreChange(item) : item}
              </p>

              <p className="text-gray-400 font-noto font-normal text-[14px] text-center">
                {option === "등급"
                  ? `${rankCount(data, item)}개`
                  : option === "장르"
                  ? `${genreCount(data, item)}개`
                  : option === "판매방법"
                  ? `${sellingTypeCount(data, actualValue)}개`
                  : `${soldoutCount(data, actualValue)}개`}
              </p>
            </button>
          );
        })}
      </div>
    );

    switch (option) {
      case "장르":
        return renderList(genre);
      case "판매방법":
        return renderList(sellingTypeKorean);
      case "매진여부":
        return renderList(soldoutKorean);
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

        <div className="flex w-full px-[24px] h-[49px] items-center gap-[24px] border-b-1 border-gray-500">
          {["등급", "장르", "판매방법", "매진여부"].map((item) => (
            <button
              key={item}
              className={`cursor-pointer font-noto font-medium text-[14px] whitespace-nowrap p-4  ${
                option === item ? "text-white border-b-[1.5px] border-white" : "text-gray-400"
              }`}
              onClick={() => handleOptionClick(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {renderOptionContent()}

        <div className="gap-[11px] flex justify-between mt-[76px] w-full px-[15px]">
          <button
            className="cursor-pointer w-[54px] h-[55px] flex items-center justify-center"
            onClick={() => {
              const resetValues = {
                등급: null,
                장르: null,
                판매방법: null,
                매진여부: null,
              };
              setSelectedValues(resetValues);
              onSelectFilter({
                rank: null,
                genre: null,
                sellingType: null,
                soldout: null,
              });
            }}
          >
            <Image alt="exchangeIcon" src={exchange} width={24} height={24} />
          </button>

          <button
            className="cursor-pointer rounded-[2px] w-[272px] h-[55px] bg-[#EFFF04] text-[#0F0F0F] font-noto-sans-kr font-bold text-[16px] text-center"
            onClick={() => {
              const transformed = {
                rank: selectedValues["등급"],
                genre: selectedValues["장르"],
                sellingType: selectedValues["판매방법"],
                soldout: selectedValues["매진여부"],
              };
              onSelectFilter(transformed);
              closeModal();
            }}
          >
            {`${filteredTotal}장 카드 검색하기`}
          </button>
        </div>
      </div>
    </div>
  );
}
