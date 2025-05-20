import React from "react";
import downIcon from "../../../assets/icons/ic-down.svg";
import Image from "next/image";

function FilterDropdown() {
  return (
    <div>
      <div className="pl-[30px] md:pl-[60px] gap-[25px] md:gap-[45px] items-center hidden sm:flex md:flex">
        <div className="flex w-[58px] h-[22px] gap-[10px]">
          <p className="mt-[2px] text-gray-200 font-noto font-bold text-[14px] leading-[100%] tracking-[0%] text-right">
            등급
          </p>
          <Image src={downIcon} width={22} height={22} alt="downIcon" />
        </div>
        <div className="flex w-[58px] h-[22px] gap-[10px]">
          <p className="mt-[2px] text-gray-200 font-noto font-bold text-[14px] leading-[100%] tracking-[0%] text-right">
            장르
          </p>
          <Image src={downIcon} width={22} height={22} alt="downIcon" />
        </div>
        <div className="flex w-[84px] h-[22px] gap-[10px]">
          <p className="mt-[2px] text-gray-200 font-noto font-bold text-[14px] leading-[100%] tracking-[0%] text-right">
            매진여부
          </p>
          <Image src={downIcon} width={22} height={22} alt="downIcon" />
        </div>
      </div>
    </div>
  );
}

export default FilterDropdown;
