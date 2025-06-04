import heroImg from "@/assets/images/img-hero-md.png";
import logoImg from "@/assets/images/img-logo.png";
import Link from "next/link";
import ActionButton from "@/components/ui/buttons/ActionButton";
import Image from "next/image";

export default function LandingHero() {
  return (
    <section className="flex flex-col items-center max-width-[1088px] bg-landing-hero rounded-3xl mx-[16px] mb-[12px] mt-[33px] sm:mx-[23px] sm:mb-[0px] sm:mt-[23px] md:mt-[13px] h-[412px] sm:h-[722px] md:h-[1088px] md:mx-0">
      {/* 텍스트 & CTA 버튼 */}
      <div className="flex flex-col items-center justify-center h-full mt-[40px]">
        <div className="flex flex-col items-center md:py-10 text-center">
          <div className="relative hidden sm:block sm:w-[138px] sm:h-[25px] sm:mb-[23px]">
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
        <div
          className="relative"
          style={{
            width: "clamp(375px, 100vw + 20px, 1917px)",
            height: "clamp(199px, 48vw, 765px)",
          }}
        >
          <Image
            src={heroImg}
            alt="히어로 메인 이미지"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
