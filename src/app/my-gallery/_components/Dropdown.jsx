"use client";
import React, { useState } from "react";
import down from "@/assets/icons/ic-down.svg";
import up from "@/assets/icons/ic-up.svg";
import Image from "next/image";

export default function Dropdown({ type, value, setValue }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const genre = ["PORTRAIT", "LANDSCAPE", "ANIMAL", "OBJECT", "FOOD", "ETC"];
  const grade = ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"];

  const placeholder = `${type}${type === "등급" ? "을" : "를"} 선택해 주세요`;

  const handleClick = (item) => {
    setValue(item); // 부모 상태 업데이트
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="w-full h-[60px] flex justify-between items-center bg-black border border-gray-400 px-4 py-2 text-left"
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        <span className={`text-white ${!value && "text-gray-400"}`}>{value || placeholder}</span>
        <Image alt="arrow" src={isModalOpen ? up : down} />
      </button>

      {isModalOpen && (
        <div className="absolute top-full left-0 mt-1 w-full border border-gray-400 bg-black z-10">
          {(type === "등급" ? grade : genre).map((item) => (
            <div key={item} className="px-4 py-2 hover:bg-gray-800 cursor-pointer" onClick={() => handleClick(item)}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
