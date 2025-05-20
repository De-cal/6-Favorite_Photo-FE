import ActionButton from "@/components/ui/buttons/ActionButton";
import Image from "next/image";
import Link from "next/link";
import back from "../../../assets/icons/ic-back.svg";

export default function TopSection() {
  return (
    <div className="w-full h-[60px] sm:h-[80px] md:h-[85px] sm:border-b-2 border-b-gray-100 flex justify-center items-center sm:justify-between relative">
      {/* ⬅️ 모바일 전용 back 아이콘 */}
      <Link href="/marketplace/">
        <div className="absolute left-[15px]  sm:hidden">
          <Image src={back} width={18} height={18} alt="뒤로가기?" />
        </div>
      </Link>

      {/* 🎯 중앙 타이틀 */}
      <h1 className="font-baskinRobbins text-[20px] sm:text-[48px] md:text-[62px]">
        마이갤러리
      </h1>

      {/* ⬇️ 하단 고정 버튼 (모바일 전용) */}
      <div className="fixed bottom-0 left-0 w-full px-[15px] py-4 z-50 sm:hidden bg-black">
        <Link href="/my-gallery/create">
          <ActionButton variant="primary" className="w-full h-15">
            포토카드 생성하기 (0/3)
          </ActionButton>
        </Link>
      </div>

      {/* ✅ 데스크탑 전용 우측 버튼/날짜 */}
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
