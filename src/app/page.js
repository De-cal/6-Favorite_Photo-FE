import LandingHero from "./_components/LandingHero";
import LandingFeatFirst from "./_components/LandingFeatFirst";
import LandingCTA from "./_components/LandingCTA";
import LandingFeatSecond from "./_components/LandingFeatSecond";
import LandingFeatThird from "./_components/LandingFeatThird";

export default function LandingPage() {
  return (
    <>
      {/* 랜딩페이지 전체 */}
      <div className="mx-auto overflow-x-hidden max-w-[1798px] md:px-[32.5px]">
        <LandingHero />
        <LandingFeatFirst />
        <LandingFeatSecond />
        <LandingFeatThird />
        <LandingCTA />
      </div>
    </>
  );
}
