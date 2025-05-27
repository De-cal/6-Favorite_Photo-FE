"use client";

import React, { useState } from "react";
import downIcon from "../../../assets/icons/ic-down.svg";
import Image from "next/image";
import up from "@/assets/icons/ic-up.svg";

function Sort({ className, type }) {
  const [choice, setChoice] = useState(type);

  return (
    <div>
      <div
        className={`cursor-pointer flex items-center justify-around
           rounded-[2px] border border-gray-200 w-[130px] h-[35px]
           ${className}`}
      >
        <p
          className="font-noto text-[12px] leading-[12px] 
        font-normal tracking-[0px]"
        >
          낮은 가격순
        </p>
        <Image alt="downIcon" src={downIcon} width={20} height={20} />
      </div>
    </div>
  );
}

export default Sort;
