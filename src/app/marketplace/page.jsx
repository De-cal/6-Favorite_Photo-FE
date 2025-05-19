import React from "react";
import Image from "next/image";
import searchIcon from "../../assets/icons/ic-search.svg";
import filterIcon from "../../assets/icons/ic-filter.svg";
import downIcon from "../../assets/icons/ic-down.svg";
import Card from "@/components/common/Card";
import Filter from "@/components/common/filter";
export default function MarketplacePage() {
  return (
    <>
      {/* w-375px */}

      <div className="flex flex-col items-center">
        <div className="w-full px-[15px] flex flex-col items-center">
          <div className="w-full max-w-[1480px]">
            <div className="flex items-center mt-[20px] h-[45px] border border-gray-200 rounded-[2px] px-[20px] py-[11px]">
              <input
                type="text"
                className="
          flex-1 outline-none border-none
          font-noto text-[14px] leading-[14px] font-light tracking-[0px]
          placeholder:font-noto placeholder:text-[14px] placeholder:leading-[14px]
          placeholder:font-light placeholder:tracking-[0px]
        "
                placeholder="검색"
              />
              <Image alt="searchIcon" src={searchIcon} width={22} height={22} />
            </div>

            <div className="w-full h-[1px] border-b border-gray-400 mt-[15px]" />
          </div>
        </div>

        <div className="px-[15px] mb-[20px] flex justify-between w-full mt-[15px]">
          <div className="rounded-[2px] flex items-center justify-center border border-gray-200 w-[35px] h-[35px]">
            <Image alt="filerIcon" src={filterIcon} width={20} height={20} />
          </div>
          <div className="flex items-center justify-around rounded-[2px] border border-gray-200 w-[130px] h-[35px]">
            <p className="font-noto text-[12px] leading-[12px] font-normal tracking-[0px]">
              낮은 가격순
            </p>
            <Image alt="downIcon" src={downIcon} width={20} height={20} />
          </div>
        </div>
        <div className="flex flex-wrap mt-[20px] gap-[5px] justify-center">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <Filter />
      </div>
    </>
  );
}
