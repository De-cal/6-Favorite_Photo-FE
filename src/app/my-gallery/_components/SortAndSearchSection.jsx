"use client";
import search from "../../../assets/icons/ic-search.svg";
import filter from "../../../assets/icons/ic-filter.svg";
import Image from "next/image";
import Dropdown from "@/app/my-sell/_components/Dropdown";
import { useEffect, useState } from "react";
import { useModal } from "@/providers/ModalProvider";
import MobileFilter from "@/app/my-sell/_components/MobileFilter";

export default function SortAndSearchSection({
  onSearch,
  data,
  selectedFilter,
}) {
  const [keyword, setKeyword] = useState("");

  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    setKeyword(selectedFilter.keyword || "");
  }, [selectedFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.({
      keyword,
      rank: selectedFilter.rank,
      genre: selectedFilter.genre,
    });
  };

  const { openModal, closeModal } = useModal();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 744) closeModal();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeModal]);

  return (
    <>
      {/*  모바일 */}
      <section className="sm:hidden pt-[15px] flex flex-row gap-[10px] items-center justify-start w-full">
        <button
          className="flex flex-row w-[45px] h-[45px] items-center justify-center p-3 border-1 cursor-pointer"
          onClick={() => {
            openModal(
              <MobileFilter
                datas={data}
                onSelectFilter={(selected) => {
                  if (selected.rank) setSelectedGrade(selected.rank);
                  if (selected.genre) setSelectedGenre(selected.genre);
                  onSearch?.({
                    keyword,
                    rank: selected.rank,
                    genre: selected.genre,
                  });
                }}
                where="mygallery"
              />,
              "bottom",
              "center",
            );
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
          <Dropdown
            type="등급"
            isOpen={openDropdown === "등급"}
            setOpenDropdown={setOpenDropdown}
            selectedValue={selectedFilter.rank}
            onSelect={(value) =>
              onSearch?.({
                keyword,
                rank: value,
                genre: selectedFilter.genre,
              })
            }
          />
          <Dropdown
            type="장르"
            isOpen={openDropdown === "장르"}
            setOpenDropdown={setOpenDropdown}
            selectedValue={selectedFilter.genre}
            onSelect={(value) =>
              onSearch?.({
                keyword,
                rank: selectedFilter.rank,
                genre: value,
              })
            }
          />
        </div>
      </section>
    </>
  );
}
