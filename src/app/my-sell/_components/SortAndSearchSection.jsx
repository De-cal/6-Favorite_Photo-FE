"use client";
import Image from "next/image";
import search from "../../../assets/icons/ic-search.svg";
import filter from "../../../assets/icons/ic-filter.svg";
import Dropdown from "@/app/my-sell/_components/Dropdown";
import { useState, useEffect } from "react";
import { useModal } from "@/providers/ModalProvider";
import MobileFilter from "@/app/my-sell/_components/MobileFilter";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortAndSearchSection({
  onSearch,
  data,
  selectedFilter,
}) {
  const [keyword, setKeyword] = useState(selectedFilter.keyword || "");
  const [openDropdown, setOpenDropdown] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
    onSearch((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateQuery("keyword", keyword);
  };

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 744) {
        closeModal();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeModal]);

  return (
    <>
      {/* 데스크탑 */}
      <section className="pt-[15px] sm:flex flex-row gap-[30px] items-center w-full hidden">
        <form
          onSubmit={handleSubmit}
          className="flex items-center border border-gray-200 w-full sm:max-w-[250px] h-[45px] px-5"
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
          {[
            { type: "등급", key: "rank" },
            { type: "장르", key: "genre" },
            { type: "판매방법", key: "sellingType" },
            { type: "매진여부", key: "soldout" },
          ].map(({ type, key }) => (
            <Dropdown
              key={key}
              type={type}
              isOpen={openDropdown === type}
              setOpenDropdown={setOpenDropdown}
              selectedValue={selectedFilter[key]}
              onSelect={(value) => updateQuery(key, value)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
