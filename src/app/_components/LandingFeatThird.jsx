import React from "react";
import blueBox from "@/assets/images/img-landing-feature-3-blue-box.avif";
import redBox from "@/assets/images/img-landing-feature-3-red-box.avif";
import featImg3 from "@/assets/images/img-landing-feature-3.avif";
import Image from "next/image";
export default function LandingFeatThird() {
  return (
    <div>
      <section className="relative flex flex-col items-center justify-center w-full h-[390px] sm:h-[667px] md:h-[900px] overflow-hidden">
        {/* 노란색 gradient background */}
        <div className="absolute top-[181px] w-full h-[337px] sm:h-[486px] md:h-[594px] bg-[linear-gradient(180deg,_#0F0F0F_0%,_#252800_100%)] z-0"></div>
        {/* 선물상자 background */}
        <div
          className="absolute -rotate-4 w-[69px] h-[54px] top-[194px] left-[313px]
          sm:w-[129px] sm:h-[100px] sm:top-[361px] sm:left-[640px]
          md:w-[280px] md:h-[216px] md:top-[384px] md:left-[1366px]
          z-10"
        >
          <Image
            src={redBox}
            alt="빨간 선물상자 배경"
            fill
            className="object-cover"
          />
        </div>
        {/* 선물상자 background  2*/}
        <div
          className="absolute -rotate-12 w-[200px] h-[162px] top-[326px] left-[-75px]
          sm:w-[352px] sm:h-[273px] sm:top-[538px] sm:left-[-80px]
          md:w-[685px] md:h-[530px] md:top-[714px] md:left-[26px]
          z-10"
        >
          <Image
            src={blueBox}
            alt="파란 선물상자 배경"
            fill
            className="object-cover"
          />
        </div>
        {/* 텍스트 */}
        <div className="absolute top-[67px] sm:top-[110px] md:top-[133px] left-[32px] sm:left-[61px] md:left-1/2 md:-translate-x-1/2 flex flex-col items-start md:items-center justify-center w-full gap-3 sm:gap-[14px] z-15">
          <h1 className="text-white text-center text-[20px] h-12 font-bold sm:h-[96px] sm:text-[40px]">
            랜덤 상자로 <span className="text-main">포인트 받자!</span>
            🎉
          </h1>
          <p className="text-left text-sm sm:text-lg text-[#9f9f9f] font-normal">
            한 시간마다 주어지는 랜덤 상자를 열고,
            <br /> 포인트를 획득하세요
          </p>
        </div>

        {/* 랜덤 상자 이미지 */}
        <div
          className="absolute top-[166px] left-[38px] sm:top-[257px] sm:left-[94px] md:top-[274px] md:left-[515px] overflow-hidden
                       w-full max-w-[1068px] h-[198px] sm:h-[357px] md:h-[570px] z-20"
        >
          <Image
            src={featImg3}
            alt="랜덤 상자 이미지 기능 페이지"
            fill
            className="object-contain"
          />
        </div>
      </section>
    </div>
  );
}
