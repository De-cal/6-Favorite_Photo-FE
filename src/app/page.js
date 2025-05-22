import React from "react";
import Image from "next/image";
import Link from "next/link";
import ActionButton from "@/components/ui/buttons/ActionButton";
import heroImg from "@/assets/images/img-landing-hero.svg";
import heroBgImg from "@/assets/images/img-landing-hero-bg.svg";
import logoImg from "@/assets/images/img-logo.svg";
import featImg1 from "@/assets/images/img-landing-feature-1.svg";
import featImg1Bg from "@/assets/images/img-landing-feature-1-bg.svg";
import featImg2Bg from "@/assets/images/img-landing-feature-2-bg.svg";
import featImg2 from "@/assets/images/img-landing-feature-2.svg";
import grayComment from "@/assets/images/img-comment-gray.avif";
import blueComment from "@/assets/images/img-comment-blue.avif";
// import blueBox from "@/assets/images/img-landing-feature-3-blue-box.svg";
// import redBox from "@/assets/images/img-landing-feature-3-red-box.svg";
import boxesImg from "@/assets/images/img-landing-feature-3.svg";

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

      {/* 랜딩페이지 전체 */}
      <div className="flex flex-col items-center justify-center w-full max-w-[1920px] overflow-x-hidden">
        {/* ▶ 랜딩 히어로 */}
        <section
          className="relative flex flex-col items-center justify-center
          w-full h-[457px] sm:h-[745px] md:h-[1101px]"
        >
          {/* 배경 이미지 */}
          <div
            className="absolute top-[33px] left-[16px] right-[16px] bottom-[12px]
            sm:left-[33px] sm:right-[33px] sm:top-[23px] sm:bottom-0
            md:left-[58px] md:right-[61px] md:top-[13px]
            flex items-center justify-center w-auto rounded-2xl overflow-hidden z-0"
          >
            <Image
              src={heroBgImg}
              alt="히어로 백그라운드 이미지"
              fill
              className="object-cover"
            />
          </div>

          {/* 텍스트 & CTA 버튼 */}
          <div className="absolute top-[70px] left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-30">
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
              <br />
              <span className="text-main">나의 최애</span>가 여기에!
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

          {/* 히어로 메인 이미지 */}
          <div
            className="absolute top-[100px] sm:top-[180px] md:top-[250px] left-1/2 transform -translate-x-1/2
                       w-full h-[457px] sm:h-[745px] md:h-[765px] z-20"
          >
            <Image
              src={heroImg}
              alt="히어로 이미지"
              fill
              className="object-contain"
            />
          </div>
        </section>

        {/* ▶ Feature 1 Section */}
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
          <div className="absolute top-[67px] sm:top-[110px] md:top-[138px] left-[32px] sm:left-[61px] md:left-[428px] flex flex-col items-start justify-center w-full  gap-3 sm:gap-[14px] z-15">
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

        {/*  ▶ Feature 2 Section */}
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
          <div className="absolute top-[67px] left-[32px] sm:top-[110px] sm:left-[61px] md:top-[138px] md:left-[428px] flex flex-col items-start justify-center w-full gap-3 sm:gap-[14px] z-10">
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
            className="absolute top-[283px] left-[38x] sm:top-[353px] sm:left-[96px] md:top-[231px] md:left-[427px] w-full h-[226px] sm:h-[383px] md:h-[518px]
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
            className="absolute top-[223px] left-[118px] w-[180px] h-[36px] sm:top-[339px] sm:left-[139px] sm:w-[218px] sm:h-[54px] md:top-[219px] md:left-[106px] md:w-[284px] md:h-[70px]
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
            className="absolute top-[174px] left-[61px] w-[135px] h-[36px] sm:top-[270px] sm:left-[70px] sm:w-[164px] sm:h-[53px] md:top-[129px] md:left-[16px] md:w-[214px] md:h-[70px]
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

        {/*  ▶ Feature 3 Section */}
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
          <div className="absolute top-[67px] sm:top-[110px] md:top-[133px] left-[32px] sm:left-[61px] md:left-[428px] flex flex-col items-start justify-center w-full gap-3 sm:gap-[14px] z-15">
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
              src={boxesImg}
              alt="랜덤 상자 이미지 기능 페이지"
              fill
              className="object-contain"
            />
          </div>
        </section>

        {/*  ▶ Call to Action Section */}
        <section className="relative flex flex-col items-center justify-center w-full h-[390px] sm:h-[667px] md:h-[900px]">
          <div className="flex flex-col items-center justify-center">
            {/* 텍스트 & 버튼 */}
            <h1 className="text-white text-center text-[20px] h-12 font-bold sm:h-[96px] sm:text-[40px]">
              나의 최애를 지금 찾아보세요!
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
          {/* 포토 카드 이미지 */}
        </section>
      </div>
    </>
  );
}
