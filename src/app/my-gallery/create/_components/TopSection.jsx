import ActionButton from "@/components/ui/buttons/ActionButton";
import Link from "next/link";
import MobileHeader from "@/components/common/MobileHeader";

export default function TopSection() {
  return (
    <section className="w-full h-[60px] sm:h-[80px] md:h-[85px] sm:border-b-2 border-b-gray-100 flex justify-center items-center sm:justify-between relative md:max-w-[1480px]">
      <MobileHeader title={"포토카드 생성"} src="/" />

      {/* 하단 고정 버튼 (모바일 전용) */}
      <div className="fixed bottom-10 left-0 w-full px-[15px] z-50 sm:hidden bg-black flex justify-center  ">
      </div>

      <h1 className="font-baskinRobbins text-[20px] sm:text-[48px] md:text-[62px] hidden sm:block">
        포토카드 생성
      </h1>
    </section>
  );
}
