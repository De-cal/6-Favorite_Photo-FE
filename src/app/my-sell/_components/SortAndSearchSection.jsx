"use client";
import search from "../../../assets/icons/ic-search.svg";
import Image from "next/image";
import filter from "../../../assets/icons/ic-filter.svg";
import Dropdown from "@/app/my-sell/_components/Dropdown";
import { useState, useEffect } from "react";
import { useModal } from "@/providers/ModalProvider";
import MobileFilter from "@/app/my-sell/_components/MobileFilter";
// props: onSearch (부모에게 검색 조건 전달)
export default function SortAndSearchSection({ onSearch, data }) {
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
  const { openModal, closeModal } = useModal();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 744) {
        closeModal(); // sm 이상이면 모달 닫기
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [closeModal]);

  return (
    <>
      <section className="sm:hidden pt-[15px] flex flex-row gap-[10px] items-center justify-start w-full">
        <button
          className="flex flex-row w-[45px] h-[45px] items-center justify-center p-3 border-1 cursor-pointer"
          onClick={() => {
            openModal(
              <MobileFilter
                data={data}
                onSelectFilter={(selected) => {
                  if (selected.rank) setSelectedGrade(selected.rank);
                  if (selected.genre) setSelectedGenre(selected.genre);
                  if (selected.sellingType) setSelectedSellingType(selected.sellingType);
                  if (selected.soldout) setSelectedSoldout(selected.soldout);
                }}
              />,
              "bottom",
              "center",
            );
          }}
        >
          <Image src={filter} width={24} height={24} alt="검색버튼" />
        </button>
        <form onSubmit={handleSubmit} className="flex items-center border border-gray-200 w-full  h-[45px]  px-5">
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
          <Dropdown type="판매방법" onSelect={setSelectedSellingType} />
          <Dropdown type="매진여부" onSelect={setSelectedSoldout} />
        </div>
      </section>
    </>
  );
}
