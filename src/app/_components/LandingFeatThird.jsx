import React from "react";
export default function LandingFeatThird() {
  return (
    <div>
      <section className="bg-landing-feat3 flex flex-col justify-start w-full h-[390px] sm:h-[667px] md:h-[900px]">
        {/* 텍스트 */}
        <div className="flex flex-col items-start justify-center mt-[67px] ml-[32px] sm:mt-[110px] sm:ml-[61px] md:mt-[115px] md:ml-[370px] w-full gap-3 sm:gap-[14px]">
          <h1 className="text-white text-center text-[20px] font-bold sm:text-[40px]">
            랜덤 상자로 <span className="text-main">포인트 받자!</span>
            🎉
          </h1>
          <p className="text-left text-sm sm:text-lg text-[#9f9f9f] font-normal">
            한 시간마다 주어지는 랜덤 상자를 열고,
            <br /> 포인트를 획득하세요
          </p>
        </div>
      </section>
    </div>
  );
}
