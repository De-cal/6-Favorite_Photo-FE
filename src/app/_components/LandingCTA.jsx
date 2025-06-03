import React from "react";
import ActionButton from "@/components/ui/buttons/ActionButton";
import Link from "next/link";
import ctaImg from "@/assets/images/img-landing-cta.avif";
import Image from "next/image";

export default function LandingCTA() {
  return (
    <div>
      <section className="relative flex flex-col items-center justify-center w-full h-[390px] sm:h-[667px] md:h-[900px]">
        <div className="flex flex-col items-center justify-center">
          {/* 이미지 */}
          <div className="relative w-[78px] h-[114px] sm:w-[130px] sm:h-[150px]">
            <Image
              src={ctaImg}
              alt="포토카드"
              fill
              className="object-contain"
            />
          </div>
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
      </section>
    </div>
  );
}
