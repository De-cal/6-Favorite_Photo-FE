"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function AuthNavigation() {
  const pathName = usePathname();
  const isLoginPage = pathName === "/login";
  const isSignUpPage = pathName === "/signup";
  return (
    <div className="flex justify-center items-center">
      {isSignUpPage && (
        <div className="flex gap-[10px] justify-center items-center text-sm md:text-base font-normal leading-[20px]">
          <span className="text-white">이미 최애의 포토 회원이신가요?</span>
          <Link href="/login" className="text-main underline ">
            로그인하기
          </Link>
        </div>
      )}

      {isLoginPage && (
        <div className="flex gap-[10px] justify-center items-center text-sm md:text-base font-normal leading-[20px]">
          <span className="text-white">최애의 포토가 처음이신가요?</span>
          <Link href="/signup" className="text-main underline ">
            회원가입하기
          </Link>
        </div>
      )}
    </div>
  );
}
