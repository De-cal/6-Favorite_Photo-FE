"use client";
import React, { useEffect, useRef, useState } from "react";
import down from "@/assets/icons/ic-down.svg";
import Image from "next/image";

function Dropdown({ type, value, onChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const GENRES = ["PORTRAIT", "LANDSCAPE", "ANIMAL", "OBJECT", "FOOD", "ETC"];
  const RANKS = ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (item) => {
    onChange(item);
    setIsModalOpen(false);
  };
  return (
    <div className="w-full relative cursor-pointer" ref={dropdownRef}>
      <div className="font-bold md:text-[20px]">{type}</div>
      <div
        className=" flex py-4 px-5 mt-[10px] text-gray-200 justify-between border-1 border-gray-200"
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        {value}
        <Image alt="down" src={down} className="w-5 h-5 " />
      </div>
      {isModalOpen && (
        <div className="absolute z-10 w-full border-1 border-gray-200 mt-[5px]">
          {(type === "등급" ? RANKS : GENRES).map((item) => (
            <div
              className=" py-4 pl-5 bg-black w-full"
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
