import heroImg from "@/assets/images/img-hero-bg.png";
import heroBgImg from "@/assets/images/img-landing-hero-bg.avif";
import logoImg from "@/assets/images/img-logo.avif";
import Link from "next/link";
import ActionButton from "@/components/ui/buttons/ActionButton";
import Image from "next/image";

export default function LandingHero() {
  return (
    <section className="relative">
      {/* 배경 이미지 */}
      <Image
        src={heroBgImg}
        alt="히어로 백그라운드 이미지"
        fill
        className="object-cover"
      />
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
        className="absolute top-[187px] sm:top-[364px] md:top-[319px] 
                       w-full min-h-[199px] sm:h-[352px] max-h-[765px] z-20"
      >
        <Image
          src={heroImg}
          alt="히어로 이미지"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
