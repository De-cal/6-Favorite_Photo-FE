import search from "../../../assets/icons/ic-search.svg";
import dropdown from "../../../assets/icons/ic-down.svg";
import dropup from "../../../assets/icons/ic-up.svg";
import filter from "../../../assets/icons/ic-filter.svg";
import Image from "next/image";
export default function SortAndSearchSection() {
  return (
    <div>
      <section className="flex flex-row gap-2.5 pt-[15px] sm:hidden">
        {/* 모바일 검색 */}
        <div className="w-[45px] h-[45px] border-1 border-gray-200 ">
          <Image src={filter} width={45} height={45} alt="필터버튼" />
        </div>
        <div className="flex items-center border border-gray-200 w-full sm:w-[250px] h-[45px] px-5 ">
          <input
            type="text"
            placeholder="검색"
            className="bg-transparent outline-none flex-grow text-sm text-white"
          />
          <button type="submit" className="cursor-pointer">
            <Image src={search} width={17} height={17} alt="검색버튼" />
          </button>
        </div>
      </section>

      <section className="pt-[15px] hidden sm:flex sm:flex-row gap-[30px] items-center">
        <div className="flex items-center border border-gray-200 w-full sm:max-w-[250px] h-[45px]  md:max-w-[320px] md:h-[50px] px-5 ">
          <input
            type="text"
            placeholder="검색"
            className="bg-transparent outline-none flex-grow text-sm text-white"
          />
          <button type="submit" className="cursor-pointer">
            <Image src={search} width={17} height={17} alt="검색버튼" />
          </button>
        </div>
        <div className="flex flex-row gap-[25px]">
          <div className="flex flex-row gap-2.5">
            등급
            <button className="cursor-pointer">
              <Image src={dropdown} width={16} height={16} alt="드롭다운" />
            </button>
          </div>
          <div className="flex flex-row gap-2.5">
            장르
            <button className="cursor-pointer">
              <Image src={dropdown} width={16} height={16} alt="드롭다운" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
