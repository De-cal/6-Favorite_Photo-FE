import React from "react";
import Image from "next/image";
import close from "@/assets/icons/ic-close.svg";
import Link from "next/link";

export default function LoginNeed({ onClose }) {
  return (
    <div
      className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                    w-[345px] sm:w-[400px] h-[291px] md:w-[560px] md:h-[375px] 
                    bg-gray-500 rounded-lg shadow-lg"
    >
      <Image
        onClick={onClose}
        src={close}
        width={28}
        height={28}
        alt="closeIcon"
        className="md:hidden absolute top-[15px] right-[15px] cursor-pointer z-50"
      />
      <Image
        onClick={onClose}
        src={close}
        width={28}
        height={28}
        alt="closeIcon"
        className="hidden md:block absolute top-[15px] right-[15px] cursor-pointer z-50"
      />
      <div className="flex flex-col items-center mt-[60px] md:mt-[80px]">
        <p className="font-noto font-bold text-[18px] md:text-[20px] leading-[100%] tracking-[0%] text-center text-white">
          로그인이 필요합니다.
        </p>

        <div className="flex flex-col items-center mt-[30px] md:mt-[40px]">
          <p className="font-noto font-normal text-[14px] md:text-[16px] leading-[100%] tracking-[0%] text-center text-gray-300">
            로그인 하시겠습니까?
          </p>
          <p className="mt-[3px] font-noto font-normal text-[14px] md:text-[16px] leading-[100%] tracking-[0%] text-center text-gray-300">
            다양한 서비스를 편리하게 이용하실 수 있습니다.
          </p>
          <div className="cursor-pointer mt-[40px] md:mt-[60px] w-[120px] sm:w-[140px] h-[55px] rounded-[2px] bg-[#EFFF04] flex justify-center items-center">
            <Link href="/login">
              <p className="font-[700] text-[16px] leading-[100%] tracking-[0%] text-black text-center">
                확인
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
