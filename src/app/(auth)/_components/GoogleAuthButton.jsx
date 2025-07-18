import Image from "next/image";
import React from "react";
import googleIcon from "@/assets/icons/ic-google.svg";

export default function GoogleAuthButton({ label = "", onClick }) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center justify-center w-full rounded-xs h-[55px] text-base font-normal md:text-lg md:h-[60px] bg-white text-black cursor-pointer"
      >
        <div className="relative w-[32px] h-[32px] mr-3">
          <Image src={googleIcon} alt="구글아이콘" />
        </div>
        {label}
      </button>
    </>
  );
}
