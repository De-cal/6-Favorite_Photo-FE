import Image from "next/image";
import leftGray from "@/assets/icons/ic-left-gray.svg";
import rightGray from "@/assets/icons/ic-right-gray.svg";

function PageNationSkeleton() {
  return (
    <div className="flex flex-row w-full max-w-[480px] h-[45px] gap-[10px] items-center justify-center pt-15 pb-45">
      <button className={`w-[20px] h-[45px] flex flex-row justify-start`}>
        <Image src={leftGray} alt="이전페이지" />
      </button>

      <button className={`w-[20px] h-[45px] flex flex-row justify-start`}>
        ---
      </button>

      <button className={`w-[20px] h-[45px] flex flex-row justify-start`}>
        <Image src={rightGray} alt="이전페이지" />
      </button>
    </div>
  );
}

export default PageNationSkeleton;
