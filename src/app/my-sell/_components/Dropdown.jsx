"use client";
import down from "@/assets/icons/ic-down.svg";
import up from "@/assets/icons/ic-up.svg";
import Image from "next/image";
import { useState } from "react";
import { genreChange } from "@/lib/utils/genreChange"; // genreChange 함수 import

export default function Dropdown({ type, onSelect, isOpen, setOpenDropdown }) {
  const [choice, setChoice] = useState(type);

  const sellingTypeMap = {
    SELLING: "판매 중",
    WAITING_EXCHANGE: "교환 대기 중",
  };

  const soldoutMap = {
    SELLING: "판매 중",
    SOLDOUT: "판매 완료",
  };

  const getOptionsByType = () => {
    switch (type) {
      case "장르":
        return ["PORTRAIT", "LANDSCAPE", "ANIMAL", "OBJECT", "FOOD", "ETC"].map(
          (genre) => [genre, genreChange(genre)],
        );
      case "판매방법":
        return Object.entries(sellingTypeMap);
      case "매진여부":
        return Object.entries(soldoutMap);
      case "등급":
      default:
        return ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"].map((item) => [
          item,
          item,
        ]);
    }
  };

  const handleClick = (value, label) => {
    setChoice(label);
    onSelect?.(value); // 영어 value를 부모로 전달
    setOpenDropdown(null);
  };

  return (
    <div className="w-full flex flex-row gap-[5px]">
      <div className="relative flex items-center gap-1">
        <div
          className={`font-bold text-[14px] md:text-[16px] whitespace-nowrap cursor-pointer ${
            type === "판매방법" || type === "매진여부" ? "min-w-[60px]" : ""
          }`}
          onClick={() => setOpenDropdown(isOpen ? null : type)}
        >
          {choice}
        </div>
        <button
          className="cursor-pointer min-w-[24px] min-h-[10px]"
          onClick={() => setOpenDropdown(isOpen ? null : type)}
        >
          <Image alt="down" width={24} height={24} src={isOpen ? up : down} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 z-10 max-w-45 border border-gray-200 bg-black">
            {getOptionsByType().map(([value, label]) => (
              <div
                key={value}
                className="py-2 px-4 hover:bg-gray-800 cursor-pointer whitespace-nowrap"
                onClick={() => handleClick(value, label)}
              >
                {label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
