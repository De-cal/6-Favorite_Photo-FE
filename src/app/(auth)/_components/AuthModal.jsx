"use client";
import React from "react";
import Image from "next/image";
import closeIcon from "@/assets/icons/ic-close.svg";

export default function AuthModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className="relative flex flex-col items-center justify-center bg-gray-500 rounded-lg 
                   w-[345px] sm:w-[400px] h-[240px] md:w-[560px] md:h-[375px] shadow-lg"
        style={{ boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)" }}
      >
        <Image
          onClick={onClose}
          src={closeIcon}
          width={28}
          height={28}
          alt="닫기 아이콘"
          className="md:hidden absolute top-[15px] right-[15px] cursor-pointer z-50"
        />
        <Image
          onClick={onClose}
          src={closeIcon}
          width={28}
          height={28}
          alt="닫기 아이콘"
          className="hidden md:block absolute top-[15px] right-[15px] cursor-pointer z-50"
        />

        <div className="flex flex-col items-center mt-[20px] md:mt-[80px] gap-[30px] md:gap-[40px]">
          <p className="font-noto font-bold text-[18px] md:text-[20px] leading-[100%] tracking-[0%] text-center text-white">
            {children}
          </p>

          <div className="cursor-pointer mt-[10px] md:mt-[20px] w-[120px] sm:w-[140px] h-[55px] rounded-[2px] bg-main flex justify-center items-center">
            <button
              onClick={onClose}
              className="font-[700] text-[16px] leading-[100%] tracking-[0%] text-black text-center w-full h-full cursor-pointer"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
