import React from "react";
import Image from "next/image";
import filterIcon from "@/assets/icons/ic-filter.svg";
import SortDropdown from "./SortDropdown";
export default function MobileSortAndFilter({
  sortOption,
  setSortOption,
  setShowFilter,
  sortOpen,
  setSortOpen,
}) {
  return (
    <div className="w-[345px] sm:hidden">
      <div className="w-full sm:px-[20px] mt-[15px] block sm:hidden">
        <div className="w-full h-[1px] border-b border-gray-400 sm:border-gray-100 sm:h-[2px]" />
      </div>
      <div className="flex justify-between w-full mt-[15px]">
        <button
          onClick={() => setShowFilter(true)}
          className="sm:hidden cursor-pointer rounded-[2px] flex items-center justify-center border border-gray-200 w-[35px] h-[35px]"
        >
          <Image alt="filterIcon" src={filterIcon} width={20} height={20} />
        </button>
        <SortDropdown
          className="flex sm:hidden md:hidden"
          isOpen={sortOpen}
          onToggle={setSortOpen}
          selected={sortOption}
          onSelect={setSortOption}
        />
      </div>
    </div>
  );
}
