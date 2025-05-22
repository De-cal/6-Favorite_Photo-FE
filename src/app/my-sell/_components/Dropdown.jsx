"use client";
import React, { useState } from "react";
import down from "@/assets/icons/ic-down.svg";
import up from "@/assets/icons/ic-up.svg";
import Image from "next/image";

export default function Dropdown({ type, onSelect }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const genre = ["PORTRAIT", "LANDSCAPE", "ANIMAL", "OBJECT", "FOOD", "ETC"];
  const grade = ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"];
  const sellingType = ["SELLING", "WAITING_EXCHANGE"];
  const soldout = ["SELLING", "SOLDOUT"];

  const [choice, setChoice] = useState(
    `${type}${type === "등급" ? "을" : "를"} 선택해 주세요`
  );

  const handleClick = (item) => {
    setChoice(item);
    setIsModalOpen(false);
    onSelect?.(item); // 선택 값 부모에 전달
  };

  // ✅ type에 따라 배열 매핑
  const getOptionsByType = () => {
    switch (type) {
      case "등급":
        return grade;
      case "장르":
        return genre;
      case "판매방법":
        return sellingType;
      case "매진여부":
        return soldout;
      default:
        return [];
    }
  };

  return (
    <div className="w-full flex flex-row gap-[5px] ">
      <div className="relative flex items-center gap-1">
        <div
          className={`font-bold text-[14px] md:text-[16px] whitespace-nowrap ${
            type === "판매방법" || type === "매진여부" ? "min-w-[60px]" : ""
          }`}
        >
          {type}
        </div>
        <button
          className="cursor-pointer min-w-[24px] min-h-[10px]"
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <Image
            alt="down"
            width={24}
            height={24}
            src={isModalOpen ? up : down}
          />
        </button>

        {isModalOpen && (
          <div className="absolute top-full left-0 mt-2 z-10 max-w-45 border border-gray-200 bg-black">
            {getOptionsByType().map((item) => (
              <div
                key={item}
                className="py-2 px-4 hover:bg-gray-800 cursor-pointer whitespace-nowrap"
                onClick={() => handleClick(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
