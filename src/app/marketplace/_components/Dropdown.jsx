"use client";
import React, { useState } from "react";
import down from "@/assets/icons/ic-down.svg";
import Image from "next/image";

function Dropdown({ type }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const genre = ["PORTRAIT", "LANDSCAPE", "ANIMAL", "OBJECT", "FOOD", "ETC"];
  const grade = ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"];
  const [choice, setChoice] = useState(
    `${type}${type === "등급" ? "을" : "를"} 선택해 주세요`
  );

  const handleClick = (item) => {
    setChoice(item);
    setIsModalOpen(false);
  };
  return (
    <div className="w-full relative">
      <div className="font-bold md:text-[20px]">{type}</div>
      <div
        className="border-1 border-gray-200 flex py-4 px-5 mt-[10px] text-gray-200 justify-between"
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        {choice}
        <Image alt="down" src={down} />
      </div>
      {isModalOpen && (
        <div className="absolute z-10 w-full">
          {(type === "등급" ? grade : genre).map((item) => (
            <div
              className="border-1 border-gray-200 py-4 pl-5 bg-black w-full"
              onClick={() => handleClick(item)}
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
