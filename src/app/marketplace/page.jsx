"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import filterIcon from "../../assets/icons/ic-filter.svg";
import marketplace from "../../assets/images/img-marketplace.svg";
import { getAllArticles } from "@/api/article";
import MobileFilter from "../my-gallery/_components/MobileFilter";
import ActionButton from "@/components/ui/buttons/ActionButton";
import Search from "./_components/Search";
import SelectPhotoCardsModal from "./_components/SelectPhotoCardsModal";
import Card from "@/components/common/Card";
import Dropdowns from "./_components/Dropdowns";
import SortDropdown from "./_components/SortDropdown";

export default function MarketplacePage() {
  const [showFilter, setShowFilter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [filterSettings, setFilterSettings] = useState(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("낮은 가격순");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const LIMIT = 12;

  const getArticles = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await getAllArticles(page, LIMIT, searchKeyWord);
      if (data && Array.isArray(data.articles)) {
        setArticles((prev) => {
          const existingIds = new Set(prev.map((article) => article.id));
          const newArticles = data.articles.filter(
            (article) => !existingIds.has(article.id),
          );
          return [...prev, ...newArticles];
        });
        setHasMore(page < data.totalPages);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, searchKeyWord, hasMore, loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
  }, [searchKeyWord]);

  useEffect(() => {
    getArticles();
  }, [page, searchKeyWord]);

  const handleSelectFilter = (selectedFilters) => {
    setFilterSettings(selectedFilters);
    setShowFilter(false);
  };

  const searchedCards = articles.filter((article) => {
    if (!searchKeyWord) return true;
    return article.photoCard.title
      .toLowerCase()
      .includes(searchKeyWord.toLowerCase());
  });

  const filteredCards = searchedCards.filter((article) => {
    if (!filterSettings) return true;
    const matchRank = filterSettings.rank
      ? article.photoCard.rank === filterSettings.rank
      : true;
    const matchGenre = filterSettings.genre
      ? article.photoCard.genre === filterSettings.genre
      : true;
    const matchSoldout = filterSettings.soldout
      ? article.status === filterSettings.soldout
      : true;
    return matchRank && matchGenre && matchSoldout;
  });

  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sortOption === "낮은 가격순") return a.price - b.price;
    if (sortOption === "높은 가격순") return b.price - a.price;
    if (sortOption === "최신순")
      return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  return (
    <div className="relative">
      {showFilter && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowFilter(false)}
        />
      )}
      <div
        className={`flex flex-col items-center ${
          showFilter ? "pointer-events-none" : ""
        }`}
      >
        <div className="px-[15px] sm:px-[20px] md:px-[0px] mt-[40px]">
          <div className="hidden sm:flex sm:gap-[114px] md:gap-[650px]">
            <Image
              src={marketplace}
              width={248}
              height={49}
              alt="marketplace"
              className="md:hidden"
            />
            <Image
              src={marketplace}
              width={320}
              height={63}
              alt="marketplace"
              className="hidden md:block"
            />
            <ActionButton
              className="w-[342px] h-[60px] md:w-[440px]"
              onClick={() => setIsModalOpen(true)}
            >
              나의 포토카드 판매하기
            </ActionButton>
          </div>
        </div>
        <div className="w-[704px] md:w-[1490px]">
          <div className="w-full mt-[15px] hidden sm:block">
            <div className="w-full h-[1px] border-b border-gray-400 sm:border-gray-100 sm:h-[2px]" />
          </div>
        </div>
        <div className="w-[704px] md:w-[1480px]">
          <div className="w-full">
            <div className="flex mt-[20px] justify-center sm:justify-between md:justify-between">
              <div className="flex items-center">
                <Search onSearch={setSearchKeyWord} />
                <Dropdowns onSearch={setFilterSettings} />
              </div>
              <SortDropdown
                className="hidden sm:flex md:flex"
                isOpen={sortOpen}
                onToggle={setSortOpen}
                selected={sortOption}
                onSelect={setSortOption}
              />
            </div>
          </div>
        </div>
        <div className="w-[347px]">
          <div className="w-full px-[10px] sm:px-[20px] mt-[15px] block sm:hidden">
            <div className="w-full h-[1px] border-b border-gray-400 sm:border-gray-100 sm:h-[2px]" />
          </div>
        </div>
        <div className="w-[347px]">
          <div className=" px-[10px] mb-[20px] flex justify-between w-full mt-[15px]">
            <button
              onClick={() => setShowFilter(true)}
              className=" sm:hidden cursor-pointer rounded-[2px] flex items-center justify-center border border-gray-200 w-[35px] h-[35px]"
            >
              <Image alt="filerIcon" src={filterIcon} width={20} height={20} />
            </button>
            <SortDropdown
              className="flex sm:hidden md:hidden"
              isOpen={sortOpen}
              onToggle={setSortOpen}
              selected={sortOption}
              onSelect={setSortOption}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-[5px] sm:gap-[20px] md:gap-[80px] mt-[20px] justify-items-center">
          {sortedCards.map((article) => (
            <Card
              key={article.id}
              type="for_sale"
              card={{
                photoCard: {
                  title: article.photoCard.title,
                  rank: article.photoCard.rank,
                  genre: article.photoCard.genre,
                  imgURL: article.photoCard.imgUrl,
                  creator: {
                    nickname: article.user.nickname,
                  },
                },
                price: article.price,
                quantity: article.quantity,
                status: article.status,
                totalQuantity: article.totalQuantity,
              }}
            />
          ))}
        </div>
      </div>
      {showFilter && (
        <div className="fixed bottom-0 left-0 w-full z-50 animate-slide-up">
          <MobileFilter data={articles} onSelectFilter={handleSelectFilter} />
        </div>
      )}
      {isModalOpen && <SelectPhotoCardsModal setIsModalOpen={setIsModalOpen} />}
      {loading && (
        <div className="text-center py-4 text-gray-500">로딩 중...</div>
      )}
    </div>
  );
}
