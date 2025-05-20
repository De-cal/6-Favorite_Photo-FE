import Image from "next/image";
import Link from "next/link";
import React from "react";
import ActionButton from "@/components/ui/buttons/ActionButton";
import heroImg from "@/assets/images/img-landing-hero.svg";

export default function LandingPage() {
  return (
    <>
      {/* <div className="flex justify-center items-center flex-wrap">
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
      </div> */}

      {/* 랜딩페이지 시작 */}
      <div className="flex flex-col items-center justify-center">
        {/* 랜딩 히어로*/}
        <div className="">
          <Image
            src={heroImg}
            alt="히어로 이미지"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center items-center">
          {/* <Image src={} alt="" fill className="object-cover"/> */}
          <h1 className="text-white">구하기 어려웠던 나의 최애가 여기에!</h1>
          <ActionButton variant="primary" className="w-[150px] h-[40px]">
            최애 찾으러 가기
          </ActionButton>
          <ActionButton variant="primary" className="w-[150px] h-[40px]">
            포토카드 구매하기
          </ActionButton>
        </div>

        {/* feature - 1 */}
        <h1>포인트로 안전하게 거래하세요</h1>
      </div>
      {/* <div className="relative w-[] h-[] sm:w-[] sm:h-[] md:w-[] md:h-[]">
        <Image src={} alt="" fill className="object-cover" />
      </div>
      <div className="relative w-[] h-[] sm:w-[] sm:h-[] md:w-[] md:h-[]">
        <Image src={} alt="" fill className="object-cover" />
      </div>
      <div className="relative w-[] h-[] sm:w-[] sm:h-[] md:w-[] md:h-[]">
        <Image src={} alt="" fill className="object-cover" />
      </div> */}
    </>
  );
}
