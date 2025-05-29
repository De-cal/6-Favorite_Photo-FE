"use client";

import React from "react";
import Dropdown from "@/app/my-sell/_components/Dropdown";
import { useState } from "react";

export default function Dropdowns({ onSearch }) {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedSoldout, setSelectedSoldout] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  return (
    <div>
      <div className="pl-[30px] md:pl-[60px] gap-[25px] md:gap-[45px] items-center hidden sm:flex md:flex">
        <Dropdown
          type="등급"
          isOpen={openDropdown === "등급"}
          setOpenDropdown={setOpenDropdown}
          onSelect={(value) => {
            setSelectedGrade(value);
            onSearch?.({
              rank: value,
              genre: selectedGenre,
              soldout: selectedSoldout,
            });
          }}
        />
        <Dropdown
          type="장르"
          isOpen={openDropdown === "장르"}
          setOpenDropdown={setOpenDropdown}
          onSelect={(value) => {
            setSelectedGenre(value);
            onSearch?.({
              rank: selectedGrade,
              genre: value,
              soldout: selectedSoldout,
            });
          }}
        />

        <Dropdown
          type="매진여부"
          isOpen={openDropdown === "매진여부"}
          setOpenDropdown={setOpenDropdown}
          onSelect={(value) => {
            setSelectedSoldout(value);
            onSearch?.({
              rank: selectedGrade,
              genre: selectedGenre,
              soldout: value,
            });
          }}
        />
      </div>
    </div>
  );
}
