import React from "react";
import featImg1 from "@/assets/images/img-landing-feature-1.avif";
import featImg1Bg from "@/assets/images/img-landing-feature-1-bg.avif";
import Image from "next/image";
export default function LandingFeatFirst() {
  return (
    <div>
      <section className="relative flex flex-col items-center justify-center w-full h-[440px] sm:h-[744px] md:h-[800px] overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute top-[319px] sm:top-[459px] md:top-[438px] left-[131px] sm:left-[193px] flex items-center justify-center w-full h-[140px] sm:h-[300px] md:h-[740px] overflow-x-hidden z-0">
          <Image
            src={featImg1Bg}
            alt="배경 이미지"
            fill
            className="object-cover"
          />
        </div>
        {/* 텍스트 */}
        <div className="absolute top-[67px] sm:top-[110px] md:top-[138px] left-[32px] sm:left-[61px] md:left-1/2 md:-translate-x-1/2 flex flex-col items-center md:items-center justify-center w-full gap-3 sm:gap-[14px] z-15">
          <h1 className="text-white font-bold text-[20px] sm:text-4xl">
            포인트로 <span className="text-main">안전하게 거래</span>하세요
          </h1>
          <p className="text-left text-sm sm:text-lg text-[#9f9f9f] font-normal">
            내 포토카드를 포인트로 팔고, 원하는 포토카드를
            <br />
            포인트로 안전하게 교환하세요
          </p>
        </div>
        {/* 포토카드 상세 페이지 이미지 */}
        <div
          className="absolute top-[155px] left-[32px] sm:top-[233px] sm:left-[61px] md:top-[247px] md:left-[428px] overflow-hidden
                         w-full max-w-[1068px] h-[231px] sm:h-[384px] md:h-[518px] z-20"
        >
          <Image
            src={featImg1}
            alt="포인트로 안전하게 거래하세요"
            fill
            className="object-contain"
          />
        </div>
      </section>
    </div>
  );
}
