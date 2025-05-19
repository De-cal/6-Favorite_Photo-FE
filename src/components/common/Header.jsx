import Image from "next/image";
import Link from "next/link";
import React from "react";
import ic_menu from "@/assets/icons/ic-menu.svg";
import img_logo from "@/assets/images/img-logo.svg";
export default function Header() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-between items-center w-full max-w-[1920px] h-[60px] px-[20px] sm:h-[70px] sm:px-[40px] md:h-[80px] md:px-[220px]">
        <div className="relative w-[22px] h-[22px] sm:hidden">
          <Image src={ic_menu} alt="메뉴" fill className="object-cover" />
        </div>
        <Link
          href="/"
          className="absolute left-[50%] translate-x-[-50%] w-[83.37px] h-[15.12px] sm:static sm:left-auto sm:translate-x-0"
        >
          <Image
            src={img_logo}
            alt="최애의 포토"
            fill
            className="object-cover"
          />
        </Link>
        <div className="flex justify-center items-center gap-[30px]">
          <Link
            href="/login"
            className="font-medium text-[14px]/[17px] text-gray-200"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="font-medium text-[14px]/[17px] text-gray-200 hidden sm:block"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
