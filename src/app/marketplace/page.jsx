"use client";
import React, { useState } from "react";
import Image from "next/image";
import filterIcon from "../../assets/icons/ic-filter.svg";
import Card from "@/components/common/Card";
import Filter from "./_components/Filter";
import Search from "./_components/Search";
import Sort from "./_components/SortDropdown";
import marketplace from "../../assets/images/img-marketplace.svg";
import ActionButton from "@/components/ui/buttons/ActionButton";
import FilterDropdown from "./_components/FilerDropdown";

export default function MarketplacePage() {
  const [showFilter, setShowFilter] = useState(false);
  return (
    // w-375px
    <div className="relative">
      {showFilter && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowFilter(false)}
        />
      )}
      <div
        className={`flex flex-col items-center ${
          showFilter ? "pointer-events-none" : ""
        }`}
      >
        <div className="px-[15px] sm:px-[20px] md:px-[220px] mt-[40px]">
          <div className="hidden sm:flex sm:gap-[114px] md:gap-[720px]">
            <Image
              src={marketplace}
              width={248}
              height={49}
              alt="marketplace"
            />
            <ActionButton variant="primary">포토카드 교환하기</ActionButton>
          </div>
        </div>

        <div className="w-full px-[15px] sm:px-[20px] md:px-[220px] mt-[15px] hidden sm:block">
          <div className="w-full h-[1px] border-b border-gray-400 sm:border-gray-100 sm:h-[2px]" />
        </div>
        <div className="w-full">
          <div className="flex mt-[20px] justify-center sm:justify-between sm:px-[20px] md:px-[220px] ">
            <div className="flex items-center">
              <Search />
              <FilterDropdown />
            </div>
            <Sort className="hidden sm:flex md:flex" />
          </div>
        </div>

        <div className="w-full px-[15px] sm:px-[20px] mt-[15px] block sm:hidden">
          <div className="w-full h-[1px] border-b border-gray-400 sm:border-gray-100 sm:h-[2px]" />
        </div>

        <div className="px-[15px] mb-[20px] flex justify-between w-full mt-[15px]">
          <button
            onClick={() => setShowFilter(true)}
            className="sm:hidden sm:hidden cursor-pointer
rounded-[2px] flex items-center justify-center border border-gray-200 w-[35px] h-[35px]"
          >
            <Image alt="filerIcon" src={filterIcon} width={20} height={20} />
          </button>
          <Sort className="flex sm:hidden md:hidden" />
        </div>
        <div className="flex flex-wrap mt-[20px] gap-[5px] justify-center">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      {showFilter && (
        <div className="fixed bottom-0 left-0 w-full z-50 animate-slide-up">
          <Filter />
        </div>
      )}
    </div>
  );
}
