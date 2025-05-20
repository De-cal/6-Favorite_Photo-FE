import ActionButton from "@/components/ui/buttons/ActionButton";
import Link from "next/link";
import MobileHeader from "@/components/common/MobileHeader";

export default function TopSection() {
  return (
    <div className="w-full h-[60px] sm:h-[80px] md:h-[85px] sm:border-b-2 border-b-gray-100 flex justify-center items-center sm:justify-between relative sm:pb-[20px] md:pb-[21.5px]">
      <MobileHeader title={"마이갤러리"} src="/" />

      {/* 하단 고정 버튼 (모바일 전용) */}
      <div className="fixed bottom-0 left-0 w-full px-[15px] py-4 z-50 sm:hidden bg-black">
        <Link href="/my-gallery/create">
          <ActionButton variant="primary" className="w-full h-15">
            포토카드 생성하기 (0/3)
          </ActionButton>
        </Link>
      </div>

      <h1 className="font-baskinRobbins text-[20px] sm:text-[48px] md:text-[62px] hidden sm:block">
        마이갤러리
      </h1>

      {/* 데스크탑 전용 우측 버튼/날짜 */}
      <div className="hidden sm:flex flex-row items-end gap-3">
        <span className="text-[14px] text-gray-300">2025년 5월</span>
        <Link href="/my-gallery/create">
          <ActionButton variant="primary" className="w-75 h-15">
            포토카드 생성하기 (0/3)
          </ActionButton>
        </Link>
      </div>
    </div>
  );
}

//
//
//
//
//
