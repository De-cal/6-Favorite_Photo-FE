import React from "react";
import searchIcon from "../../../assets/icons/ic-search.svg";
import Image from "next/image";

function Search() {
  return (
    <div>
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
    </div>
  );
}

export default Search;
