"use client";
import search from "../../../assets/icons/ic-search.svg";
import filter from "../../../assets/icons/ic-filter.svg";
import Image from "next/image";
import Dropdown from "@/app/my-sell/_components/Dropdown";
import { useState } from "react";
import { useModal } from "@/providers/ModalProvider";
import MobileFilter from "./MobileFilter";
// props: onSearch (부모에게 검색 조건 전달)
export default function SortAndSearchSection({ onSearch, data }) {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.({
      keyword,
      rank: selectedGrade,
      genre: selectedGenre,
    });
  };
  const { openModal, closeModal } = useModal();

  return (
    <>
      <section className="pt-[15px] flex flex-row gap-[10px] items-center justify-start w-full">
        <button
          className="flex flex-row w-[45px] h-[45px] items-center justify-center p-3 border-1 cursor-pointer"
          onClick={() => {
            openModal(<MobileFilter />);
          }}
        >
          <Image src={filter} width={24} height={24} alt="검색버튼" />
        </button>
        <form
          onSubmit={handleSubmit}
          className="flex items-center border border-gray-200 w-full sm:max-w-[250px] h-[45px] md:max-w-[320px] md:h-[50px] px-5"
        >
          <input
            type="text"
            placeholder="검색"
            className="bg-transparent outline-none flex-grow text-sm text-white"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="cursor-pointer">
            <Image src={search} width={17} height={17} alt="검색버튼" />
          </button>
        </form>

        <div className="flex flex-row gap-[25px]"></div>
      </section>

      <section className="pt-[15px] hidden sm:flex sm:flex-row gap-[30px] items-center md:max-w-[1480px] justify-start w-full">
        <form
          onSubmit={handleSubmit}
          className="flex items-center border border-gray-200 w-full sm:max-w-[250px] h-[45px] md:max-w-[320px] md:h-[50px] px-5"
        >
          <input
            type="text"
            placeholder="검색"
            className="bg-transparent outline-none flex-grow text-sm text-white"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="cursor-pointer">
            <Image src={search} width={17} height={17} alt="검색버튼" />
          </button>
        </form>

        <div className="flex flex-row gap-[25px]">
          <Dropdown type="등급" onSelect={setSelectedGrade} />
          <Dropdown type="장르" onSelect={setSelectedGenre} />
        </div>
      </section>
    </>
  );
}
