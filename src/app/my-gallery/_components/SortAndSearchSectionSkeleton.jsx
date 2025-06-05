"use client";
import Image from "next/image";
import search from "../../../assets/icons/ic-search.svg";
import filter from "../../../assets/icons/ic-filter.svg";
import Dropdown from "@/app/my-sell/_components/Dropdown";

export default function SortAndSearchSectionSkeleton() {
  return (
    <>
      {/* ✅ 모바일 */}
      <section className="sm:hidden pt-[15px] flex flex-row gap-[10px] items-center justify-start w-full">
        <button className="flex flex-row w-[45px] h-[45px] items-center justify-center p-3 border-1 cursor-pointer">
          <Image src={filter} width={24} height={24} alt="검색버튼" />
        </button>
        <form className="flex items-center border border-gray-200 w-full sm:max-w-[250px] h-[45px] md:max-w-[320px] md:h-[50px] px-5">
          <input
            type="text"
            placeholder="검색"
            className="bg-transparent outline-none flex-grow text-sm text-white"
          />
          <button type="submit" className="cursor-pointer">
            <Image src={search} width={17} height={17} alt="검색버튼" />
          </button>
        </form>
      </section>

      {/* 데스크탑 */}
      <section className="pt-[15px] sm:flex flex-row gap-[30px] items-center w-full hidden">
        <form className="flex items-center border border-gray-200 w-full sm:max-w-[250px] h-[45px] px-5">
          <input
            type="text"
            placeholder="검색"
            className="bg-transparent outline-none flex-grow text-sm text-white"
          />
          <button type="submit" className="cursor-pointer">
            <Image src={search} width={17} height={17} alt="검색버튼" />
          </button>
        </form>

        <div className="flex flex-row gap-[25px]">
          {[
            { type: "등급", key: "rank" },
            { type: "장르", key: "genre" },
          ].map(({ type, key }) => (
            <Dropdown key={key} type={type} />
          ))}
        </div>
      </section>
    </>
  );
}
