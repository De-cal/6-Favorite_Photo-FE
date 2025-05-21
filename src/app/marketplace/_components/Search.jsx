import React from "react";
import searchIcon from "../../../assets/icons/ic-search.svg";
import Image from "next/image";

function Search() {
  return (
    <div>
      <div className="px-[8px] sm:px-[0px] w-[345px] h-[45px] sm:w-[200px] md:w-[320px] md:h-[50px]">
        <div className="flex items-center justify-between h-full border border-gray-200 rounded-[2px] px-[20px]">
          <input
            type="text"
            className="
              w-full max-w-[calc(100%-30px)] outline-none border-none bg-transparent
              font-noto text-[14px] leading-[14px] font-light tracking-[0px]
              placeholder:font-noto placeholder:text-[14px] placeholder:leading-[14px]
              placeholder:font-light placeholder:tracking-[0px]
            "
            placeholder="검색"
          />
          <Image
            className="cursor-pointer"
            alt="searchIcon"
            src={searchIcon}
            width={22}
            height={22}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
