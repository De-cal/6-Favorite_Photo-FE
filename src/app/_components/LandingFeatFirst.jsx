import React from "react";
export default function LandingFeatFirst() {
  return (
    <div>
      <section className="bg-landing-feat1 flex flex-col justify-start w-full h-[440px] sm:h-[707px] md:h-[800px]">
        {/* 텍스트 */}
        <div className="flex flex-col items-start justify-center mt-[67px] ml-[32px] sm:mt-[110px] sm:ml-[61px] md:mt-[138px] md:ml-[428px] w-full gap-3 sm:gap-[14px]">
          <h1 className="text-white font-bold text-[20px] sm:text-4xl">
            포인트로 <span className="text-main">안전하게 거래</span>하세요
          </h1>
          <p className="text-left text-sm sm:text-lg text-[#9f9f9f] font-normal">
            내 포토카드를 포인트로 팔고, 원하는 포토카드를
            <br />
            포인트로 안전하게 교환하세요
          </p>
        </div>
      </section>
    </div>
  );
}
