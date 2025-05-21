"use client";
import React, { useState } from "react";
import down from "@/assets/icons/ic-down.svg";
import up from "@/assets/icons/ic-up.svg";
import Image from "next/image";

export default function Dropdown({ type, onSelect }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const genre = ["PORTRAIT", "LANDSCAPE", "ANIMAL", "OBJECT", "FOOD", "ETC"];
  const grade = ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"];
  const [choice, setChoice] = useState(
    `${type}${type === "등급" ? "을" : "를"} 선택해 주세요`
  );

  const handleClick = (item) => {
    setChoice(item);
    setIsModalOpen(false);
    onSelect?.(item); // 선택 값 부모에 전달
  };

  return (
    <div className="w-full flex flex-row gap-[5px] ">
      <div className="relative flex items-center gap-1">
        <div className="font-bold md:text-[20px]">{type}</div>
        <button
          className="cursor-pointer"
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <Image alt="down" src={isModalOpen ? up : down} />
        </button>

        {isModalOpen && (
          <div className="absolute top-full left-0 mt-2 z-10 w-40 border border-gray-200 bg-black">
            {(type === "등급" ? grade : genre).map((item) => (
              <div
                key={item}
                className="py-2 px-4 hover:bg-gray-800 cursor-pointer"
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
