"use client";
import React, { useState } from "react";
import down from "@/assets/icons/ic-down.svg";
import up from "@/assets/icons/ic-up.svg";
import Image from "next/image";
import clsx from "clsx";

export default function Dropdown({ type, label, value, setValue, onBlur, errorMessage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const genre = ["PORTRAIT", "LANDSCAPE", "ANIMAL", "OBJECT", "FOOD", "ETC"];
  const grade = ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"];
  const options = type === "등급" ? grade : genre;

  const placeholder = `${type}${type === "등급" ? "을" : "를"} 선택해 주세요`;

  const handleClick = (item) => {
    setValue(item);
    setIsModalOpen(false);
  };

  const handleBlur = (e) => {
    // 드롭다운 내부 요소로 focus가 이동하는 경우는 제외
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsModalOpen(false);
      if (onBlur) {
        onBlur();
      }
    }
  };

  return (
    <div className="flex flex-col gap-2.5 w-full mt-[25px] sm:mt-[50px] md:mt-[50px]">
      {label && <label className="block mb-1 font-bold text-[20px] text-white">{label}</label>}

      <div className="relative" onBlur={handleBlur} tabIndex={-1}>
        <button
          type="button"
          className={clsx(
            "w-full h-[55px] md:h-[60px] flex justify-between items-center px-4 py-2 text-left cursor-pointer",
            "border rounded-xs bg-black",
            errorMessage ? "border-red-500" : "border-gray-200"
          )}
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <span className={clsx("text-sm", value ? "text-white" : "text-gray-200")}>
            {value || placeholder}
          </span>
          <Image
            alt="arrow"
            src={isModalOpen ? up : down}
            className={clsx("transition-transform duration-200", {
              "rotate-180": isModalOpen,
            })}
          />
        </button>

        {isModalOpen && (
          <div className="absolute top-full left-0 w-full mt-1 border border-gray-300 bg-black z-10 rounded-md overflow-hidden">
            {options.map((item) => (
              <div
                key={item}
                onClick={() => handleClick(item)}
                className={clsx(
                  "px-4 py-2 cursor-pointer hover:bg-gray-800 text-white",
                  value === item && "bg-gray-700 font-bold"
                )}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {errorMessage && (
        <p className="text-red text-sm font-semibold leading-6">{errorMessage}</p>
      )}
    </div>
  );
}