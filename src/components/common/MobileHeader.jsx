import Image from "next/image";
import Link from "next/link";
import back from "../../assets/icons/ic-back.svg";

export default function MobileHeader({ title, src, onClick }) {
  return (
    <div className="w-full h-[60px] sm:hidden flex justify-center items-center relative">
      {/* 왼쪽 뒤로가기 버튼 */}
      {src ? (
        <Link href={src}>
          <button className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer">
            <Image src={back} width={22} height={22} alt="뒤로가기" />
          </button>
        </Link>
      ) : (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={onClick}
        >
          <Image src={back} width={22} height={22} alt="뒤로가기" />
        </button>
      )}

      {/* 중앙 타이틀 */}
      <h1 className="font-baskinRobbins text-[20px]">{title}</h1>
    </div>
  );
}
