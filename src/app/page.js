import Image from "next/image";
import Link from "next/link";
import React from "react";
import ActionButton from "@/components/ui/buttons/ActionButton";
import heroImg from "@/assets/images/img-landing-hero.svg";
import heroBgImg from "@/assets/images/img-landing-hero-bg.svg";
import logoImg from "@/assets/images/img-logo.svg";
import featImg1 from "@/assets/images/img-landing-page-feature-1.svg";
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

      {/* 랜딩페이지 전체 파트 */}
      <div className="flex flex-col items-center justify-center w-full">
        {/* 랜딩 히어로*/}
        <div
          className="flex flex-col items-center justify-center w-full
          px-[16px] pt-[33px] pb-[12px] 
          sm:px-[33px] sm:pt-[23px]
          md:px-[61px] md:pt-[13px]
          relative"
        >
          {/* 히어로 이미지 background */}
          <div
            className="relative flex items-center justify-center
  w-full h-[412px] sm:h-[722px] md:h-[1088px]
  rounded-2xl overflow-hidden z-0"
          >
            <Image
              src={heroBgImg}
              alt="히어로 백그라운드 이미지"
              fill
              className="object-cover"
            />
          </div>
          {/* text wrapper */}
          <div className="absolute top-[70px] left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center z-10">
            <div className="relative overflow-hidden hidden sm:block sm:w-[138px] sm:h-[25px] sm:mb-[23px]">
              <Image
                src={logoImg}
                alt="최애의 포토 로고"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-white text-center text-[20px] leading-[26px] sm:leading-[48px] h-12 mb-6 font-bold sm:h-[96px] sm:text-[40px] sm:mb-[38px] md:mb-[33px]">
              구하기 어려웠던
              <br /> <span className="text-main">나의 최애</span>가 여기에!
            </h1>
            <Link href="/marketplace">
              <ActionButton
                variant="primary"
                className="w-[150px] h-[40px] sm:w-[226px] sm:h-[55px] text-xs sm:text-base"
              >
                최애 찾으러 가기
              </ActionButton>
            </Link>
          </div>

          {/* 히어로 이미지 */}
          <div
            className="absolute top-[100px] sm:top-[180px] md:top-[250px] left-1/2 transform -translate-x-1/2 
           w-full h-[457px] sm:h-[745px] md:h-[765px]
           z-20"
          >
            <Image
              src={heroImg}
              alt="히어로 이미지"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* feat - 1 wrapper */}
        <div className="relative  flex flex-col items-center justify-center w-full">
          {/* feat - 1 text wrapper */}
          <div className="flex flex-col items-start justify-center w-full pt-[67px] pl-[32px] sm:pl-[61px] gap-3 sm:gap-[14px]">
            <h1 className="text-white font-bold text-[20px] sm:text-4xl ">
              포인트로 <span className="text-main">안전하게 거래</span>하세요
            </h1>
            <p className="text-left text-sm sm:text-lg md:text-[#9f9f9f] font-normal">
              내 포토카드를 포인트로 팔고, 원하는 포토카드를
              <br />
              포인트로 안전하게 교환하세요
            </p>
          </div>
          {/* feat - 1 img */}
          <div className="absolute top-[150px] left-[32px] sm:top-[200px] sm:left-[61px] md:top-[250px] overflow-hidden w-full h-[231px]">
            <Image
              src={featImg1}
              alt="포인트로 안전하게 거래하세요"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      
    </>
  );
}
