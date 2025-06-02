"use client";

import React from "react";
import Image from "next/image";
import marketplace from "@/assets/images/img-marketplace.svg";
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
      <div className="hidden sm:block px-[15px] sm:px-[20px] md:px-[0px] mt-[40px]">
        <div className="hidden sm:flex sm:gap-[114px] md:gap-[650px]">
          <Image
            src={marketplace}
            width={248}
            height={49}
            alt="marketplace"
            className="md:hidden"
          />
          <Image
            src={marketplace}
            width={320}
            height={63}
            alt="marketplace"
            className="hidden md:block"
          />
          <ActionButton
            className="w-[342px] h-[60px] md:w-[440px]"
            onClick={handleCardClick}
          >
            나의 포토카드 판매하기
          </ActionButton>
        </div>
      </div>
      <div className="w-[704px] md:w-[1490px] mt-[15px] hidden sm:block">
        <div className="w-full h-[1px] border-b border-gray-400 sm:border-gray-100 sm:h-[2px]" />
      </div>
      <div className="w-[704px] md:w-[1480px] mt-[20px]">
        <div className="flex justify-center sm:justify-between">
          <div className="flex items-center">
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
