"use client";

import React from "react";
import downIcon from "@/assets/icons/ic-down.svg";
import upIcon from "@/assets/icons/ic-up.svg";
import Image from "next/image";

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
        className="cursor-pointer flex items-center justify-between rounded-[2px] border border-gray-200 w-[130px] h-[35px] px-[15px] sm:px-[20px] sm:w-[140px] sm:h-[45px] md:w-[180px] md:h-[50px]"
      >
        <p className="font-noto text-[12px] sm:text-[14px] md:text-[16px] leading-[1] font-normal tracking-[0px]">
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
        <div className="absolute top-full mt-1 w-full bg-black border border-gray-200 z-20 rounded-[2px]">
          {choiceType.map((choice) => (
            <div
              key={choice}
              className="px-[15px] sm:px-[20px] py-2 
             text-[12px] sm:text-[14px] md:text-[16px] 
             cursor-pointer hover:bg-gray-800"
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
