"use client";

import React from "react";
import Dropdown from "@/app/my-sell/_components/Dropdown";
import { useState } from "react";

function FilterDropdown({ onSearch }) {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedSellingType, setSelectedSellingType] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  return (
    <div>
      <div className="pl-[30px] md:pl-[60px] gap-[25px] md:gap-[45px] items-center hidden sm:flex md:flex">
        <div className="flex w-[58px] h-[22px] gap-[10px]">
          <Dropdown
            type="등급"
            isOpen={openDropdown === "등급"}
            setOpenDropdown={setOpenDropdown}
            onSelect={(value) => {
              setSelectedGrade(value);
              onSearch?.({
                rank: value,
                genre: selectedGenre,
                sellingType: selectedSellingType,
              });
            }}
          />
        </div>
        <div className="flex w-[58px] h-[22px] gap-[10px]">
          <Dropdown
            type="장르"
            isOpen={openDropdown === "장르"}
            setOpenDropdown={setOpenDropdown}
            onSelect={(value) => {
              setSelectedGenre(value);
              onSearch?.({
                rank: selectedGrade,
                genre: value,
                sellingType: selectedSellingType,
              });
            }}
          />
        </div>
        <div className="flex w-[84px] h-[22px] gap-[10px]">
          <Dropdown
            type="매진여부"
            isOpen={openDropdown === "매진여부"}
            setOpenDropdown={setOpenDropdown}
            onSelect={(value) => {
              setSelectedSellingType(value);
              onSearch?.({
                rank: selectedGrade,
                genre: selectedGenre,
                sellingType: value,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterDropdown;
