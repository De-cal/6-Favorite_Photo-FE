"use client";

import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import MarketplaceHeader from "./_components/marketplace/MarketplaceHeader";
import ArticleGrid from "./_components/marketplace/ArticleGrid";
import MobileSortAndFilter from "./_components/marketplace/MobileSortAndFilter";
import MobileFilter from "../my-sell/_components/MobileFilter";
import SelectPhotoCardsModal from "./_components/SelectPhotoCardsModal";
import { getAllArticles } from "@/lib/api/article.api";
import LoginNeed from "./_components/marketplace/LoginNeed";
import MyCardSellBtn from "./_components/marketplace/MyCardSellBtn";
import PhotoCardSkeleton from "../my-sell/_components/PhotoCardSkeleton";

const LIMIT = 12;

export default function MarketplacePage() {
  const [showFilter, setShowFilter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [filterSettings, setFilterSettings] = useState(null);
  const [sortOption, setSortOption] = useState("낮은 가격순");
  const [sortOpen, setSortOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["articles", searchKeyWord],
    queryFn: ({ pageParam = 1 }) =>
      getAllArticles(pageParam, LIMIT, searchKeyWord),
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined,
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  useEffect(() => {
    refetch();
  }, [searchKeyWord]);

  const allArticles = data?.pages.flatMap((page) => page.articles) ?? [];

  const handleSelectFilter = (selectedFilters) => {
    setFilterSettings(selectedFilters);
    setShowFilter(false);
  };

  return (
    <div className="relative">
      {showFilter && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={() => setShowFilter(false)}
        />
      )}

      <div
        className={`flex flex-col items-center ${
          showFilter ? "pointer-events-none" : ""
        }`}
      >
        <MarketplaceHeader
          setIsModalOpen={setIsModalOpen}
          setSearchKeyWord={setSearchKeyWord}
          setFilterSettings={setFilterSettings}
          sortOption={sortOption}
          setSortOption={setSortOption}
          sortOpen={sortOpen}
          setSortOpen={setSortOpen}
          onRequireLogin={() => setLoginModalOpen(true)}
        />

        <MobileSortAndFilter
          sortOption={sortOption}
          setSortOption={setSortOption}
          setShowFilter={setShowFilter}
          sortOpen={sortOpen}
          setSortOpen={setSortOpen}
        />

        {isPending && <PhotoCardSkeleton />}

        {!isPending && (
          <ArticleGrid
            articles={allArticles}
            searchKeyWord={searchKeyWord}
            filterSettings={filterSettings}
            sortOption={sortOption}
            onRequireLogin={() => setLoginModalOpen(true)}
          />
        )}

        <div ref={ref} className="h-10" />

        {isFetchingNextPage && (
          <div className="w-full flex justify-center items-center col-span-2 mt-[40px]">
            <div className="loader" />
          </div>
        )}
      </div>

      {showFilter && (
        <div className="fixed bottom-0 left-0 w-full z-50 animate-slide-up">
          <MobileFilter
            datas={allArticles}
            onSelectFilter={handleSelectFilter}
            where="marketplace"
            close={() => setShowFilter(false)}
          />
        </div>
      )}

      {isModalOpen && <SelectPhotoCardsModal setIsModalOpen={setIsModalOpen} />}

      {!showFilter && !isModalOpen && (
        <MyCardSellBtn
          setIsModalOpen={setIsModalOpen}
          onRequireLogin={() => setLoginModalOpen(true)}
        />
      )}

      {loginModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setLoginModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <LoginNeed onClose={() => setLoginModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
