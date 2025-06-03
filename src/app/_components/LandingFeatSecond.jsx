import React from "react";
import featImg2Bg from "@/assets/images/img-landing-feature-2-bg.avif";
import featImg2 from "@/assets/images/img-landing-feature-2.avif";
import grayComment from "@/assets/images/img-comment-gray.avif";
import blueComment from "@/assets/images/img-comment-blue.avif";
import Image from "next/image";

export default function LandingFeatSecond() {
  return (
    <div>
      <section className="relative flex flex-col items-center justify-center w-full h-[519px] sm:h-[776px] md:h-[800px]">
        {/* 배경 이미지 */}
        <div
          className="
          absolute top-[334px] sm:top-[548px] md:top-[407px] left-[-55px] md:left-[83px] w-full h-[135px] sm:h-[260px] md:h-[400px] overflow-hidden z-0"
        >
          <Image
            src={featImg2Bg}
            alt="배경 이미지"
            fill
            className="object-cover"
          />
        </div>
        {/* 텍스트 */}
        <div className="absolute top-[67px] left-[32px] sm:top-[110px] sm:left-[61px] md:top-[138px] md:left-1/2 md:-translate-x-1/2 flex flex-col items-start md:items-center justify-center w-full gap-3 sm:gap-[14px] z-10">
          <h1 className="text-white font-bold text-[20px] sm:text-4xl">
            알림으로 보다 <span className="text-blue">빨라진 거래</span>
          </h1>
          <p className="text-left text-sm sm:text-lg text-[#9f9f9f] font-normal">
            내 포토카드를 포인트로 팔고, 원하는 포토카드를
            <br />
            포인트로 안전하게 교환하세요
          </p>
        </div>

        {/* 알림 이미지 */}
        <div
          className="absolute top-[283px] left-[38x] sm:top-[353px] sm:left-[96px]
            md:top-[237px] md:left-[427px] w-full h-[226px] sm:h-[383px] md:h-[518px]
              z-20"
        >
          <Image
            src={featImg2}
            alt="마켓플레이스 페이지 알림 화면"
            fill
            className="object-contain"
          />
        </div>
        {/* comments */}
        <div
          className="absolute top-[223px] left-[118px] w-[180px] h-[36px]
            sm:top-[339px] sm:left-[139px] sm:w-[218px] sm:h-[54px]
            md:top-[450px] md:left-[533px] md:w-[284px] md:h-[70px]
              z-20"
        >
          <Image
            src={grayComment}
            alt="포카 사고싶어요 코멘트"
            fill
            className="object-contain"
          />
        </div>
        <div
          className="absolute top-[174px] left-[61px] w-[135px] h-[36px]
            sm:top-[270px] sm:left-[70px] sm:w-[164px] sm:h-[53px]
            md:top-[359px] md:left-[443px] md:w-[214px] md:h-[70px]
              z-20"
        >
          <Image
            src={blueComment}
            alt="제 포카랑 교환해요 코멘트"
            fill
            className="object-contain"
          />
        </div>
      </section>
    </div>
  );
}
