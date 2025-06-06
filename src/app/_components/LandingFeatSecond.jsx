import React from "react";
export default function LandingFeatSecond() {
  return (
    <div>
      <section className="bg-landing-feat2 flex flex-col justify-start w-full h-[519px] sm:h-[776px] md:h-[800px]">
        {/* 텍스트 */}
        <div className="flex flex-col items-start justify-center mt-[67px] ml-[32px] sm:mt-[113px] sm:ml-[61px] md:mt-[128px] md:ml-[370px] w-full gap-3 sm:gap-[14px]">
          <h1 className="text-white font-bold text-[20px] sm:text-4xl">
            알림으로 보다 <span className="text-blue">빨라진 거래</span>
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
