"use client";

import React from "react";
import Image from "next/image";
import marketplace from "@/assets/images/img-marketplace.webp";
import ActionButton from "@/components/ui/buttons/ActionButton";
import Search from "./Search";
import Dropdowns from "./Dropdowns";
import SortDropdown from "./SortDropdown";
import { useAuth } from "@/providers/AuthProvider";

export default function MarketplaceHeader({
  setIsModalOpen,
  setSearchKeyWord,
  setFilterSettings,
  sortOption,
  setSortOption,
  sortOpen,
  setSortOpen,
  onRequireLogin,
}) {
  const { user } = useAuth();
  const handleCardClick = async () => {
    if (user) {
      setIsModalOpen(true);
    } else {
      onRequireLogin?.();
    }
  };

  return (
    <>
      <div className="hidden sm:flex sm:w-full sm:max-w-[704px] sm:justify-between sm:items-center md:max-w-[1480px] mt-[40px]">
        <p className="font-baskinRobbins font-normal text-[48px]/[49px] min-w-[248px] tracking-[-3%] md:text-[62px]/[63px]">
          마켓플레이스
        </p>
        <ActionButton
          className="w-[342px] h-[60px] md:w-[440px]"
          onClick={handleCardClick}
        >
          나의 포토카드 판매하기
        </ActionButton>
      </div>
      <div className="w-[704px] md:w-[1480px] mt-[15px] hidden sm:block">
        <div className="w-full h-[1px] border-b border-gray-400 sm:border-gray-100 sm:h-[2px]" />
      </div>
      <div className="w-[345px] sm:w-[704px] md:w-[1480px] mt-[20px]">
        <div className="flex justify-center sm:justify-between">
          <div className="flex items-center w-full max-w-[345px]">
            <Search onSearch={setSearchKeyWord} />
            <Dropdowns onSearch={setFilterSettings} />
          </div>
          <SortDropdown
            className="hidden sm:flex md:flex"
            isOpen={sortOpen}
            onToggle={setSortOpen}
            selected={sortOption}
            onSelect={setSortOption}
          />
        </div>
      </div>
    </>
  );
}
