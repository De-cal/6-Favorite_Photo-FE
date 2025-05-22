"use client";
import search from "../../../assets/icons/ic-search.svg";
import Image from "next/image";
import Dropdown from "@/app/my-sell/_components/Dropdown";
import { useState } from "react";
// props: onSearch (부모에게 검색 조건 전달)
export default function SortAndSearchSection({ onSearch }) {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedSellingType, setSelectedSellingType] = useState(null);
  const [selectedSoldout, setSelectedSoldout] = useState(null);
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.({
      keyword,
      rank: selectedGrade,
      genre: selectedGenre,
      sellingType: selectedSellingType,
      soldout: selectedSoldout,
    });
  };

  return (
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
        <Dropdown type="판매방법" onSelect={setSelectedSellingType} />
        <Dropdown type="매진여부" onSelect={setSelectedSoldout} />
      </div>
    </section>
  );
}
