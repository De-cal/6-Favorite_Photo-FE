"use client";

import React from "react";
import downIcon from "@/assets/icons/ic-down.svg";
import Image from "next/image";
import upIcon from "@/assets/icons/ic-up.svg";

export default function SortDropdown({
  className,
  isOpen,
  onToggle,
  selected,
  onSelect,
}) {
  const choiceType = ["낮은 가격순", "높은 가격순", "최신순"];

  const handleSelect = (choice) => {
    onSelect(choice);
    onToggle(false);
  };
  return (
    <div className={`${className} relative`}>
      <div
        onClick={() => onToggle(!isOpen)}
        className="cursor-pointer flex items-center justify-around
        rounded-[2px] border border-gray-200 w-[130px] h-[35px]
        "
      >
        <p className="font-noto text-[12px] leading-[12px] font-normal tracking-[0px]">
          {selected}
        </p>
        <Image
          alt="toggleIcon"
          src={isOpen ? upIcon : downIcon}
          width={20}
          height={20}
        />
      </div>
      {isOpen && (
        <div className="absolute top-[40px] w-[130px] bg-black border border-gray-200 z-10 rounded-[2px]">
          {choiceType.map((choice) => (
            <div
              key={choice}
              className="px-4 py-2 text-[12px] cursor-pointer hover:bg-gray-800"
              onClick={() => handleSelect(choice)}
            >
              {choice}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
