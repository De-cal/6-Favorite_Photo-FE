import ActionButton from "@/components/ui/buttons/ActionButton";
import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <>
      <div className="flex justify-center items-center flex-wrap">
        <div className="flex flex-wrap justify-center items-center gap-[8px] gap-y-[16px] md:grid md:grid-cols-3">
          <Link
            href="/login"
            className="flex justify-center items-center w-[240px] h-[30px] bg-main text-black font-bold text-[16px]"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="flex justify-center items-center w-[240px] h-[30px] bg-main text-black font-bold text-[16px]"
          >
            회원가입
          </Link>
          <Link
            href="/jaewook"
            className="flex justify-center items-center w-[240px] h-[30px] bg-main text-black font-bold text-[16px]"
          >
            재욱님
          </Link>
          <Link
            href="/marketplace"
            className="flex justify-center items-center w-[240px] h-[30px] bg-main text-black font-bold text-[16px]"
          >
            마켓플레이스
          </Link>
          <Link
            href="/marketplace/buyers/1"
            className="flex justify-center items-center w-[240px] h-[30px] bg-main text-black font-bold text-[16px]"
          >
            마켓플레이스 - 구매자
          </Link>
          <Link
            href="/marketplace/sellers/1"
            className="flex justify-center items-center w-[240px] h-[30px] bg-main text-black font-bold text-[16px]"
          >
            마켓플레이스 - 판매자
          </Link>
          <Link
            href="/my-gallery"
            className="flex justify-center items-center w-[240px] h-[30px] bg-main text-black font-bold text-[16px]"
          >
            마이 갤러리
          </Link>
          <Link
            href="/my-gallery/create"
            className="flex justify-center items-center w-[240px] h-[30px] bg-main text-black font-bold text-[16px]"
          >
            마이 갤러리 - 포토카드 생성
          </Link>
          <Link
            href="/my-sell"
            className="flex justify-center items-center w-[240px] h-[30px] bg-main text-black font-bold text-[16px]"
          >
            나의 판매 포토카드
          </Link>
        </div>
      </div>

      <h1>공용 컴포넌트 한눈에 보기</h1>
      <div className="bg-black flex flex-col gap-6">
        <h1>Landing Page</h1>
        <ActionButton variant="primary" label="포토카드 구매하기" />
        <ActionButton variant="primary" label="포토카드 교환하기" />
        <ActionButton variant="primary" label="포토카드 교환하기" disabled />
        <ActionButton variant="primary" label="승인" />

        <ActionButton variant="secondary" label="판매 내리기" />
        <ActionButton variant="secondary" label="포토카드 교환하기" />
        <ActionButton variant="secondary" label="거절" />
      </div>
    </>
  );
}
