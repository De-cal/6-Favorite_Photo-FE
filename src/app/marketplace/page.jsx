"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getAllArticles } from "@/api/article";
import MarketplaceHeader from "./_components/marketplace/MarketplaceHeader";
import ArticleGrid from "./_components/marketplace/ArticleGrid";
import MobileSortAndFilter from "./_components/marketplace/MobileSortAndFilter";
import MobileFilter from "../my-gallery/_components/MobileFilter";
import SelectPhotoCardsModal from "./_components/SelectPhotoCardsModal";

export default function MarketplacePage() {
  const [showFilter, setShowFilter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [filterSettings, setFilterSettings] = useState(null);
  const [sortOption, setSortOption] = useState("낮은 가격순");
  const [sortOpen, setSortOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const LIMIT = 12;

  const getArticles = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await getAllArticles(page, LIMIT, searchKeyWord);
      if (data?.articles?.length) {
        setArticles((prev) => {
          const existingIds = new Set(prev.map((a) => a.id));
          const newArticles = data.articles.filter(
            (a) => !existingIds.has(a.id),
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

  return (
    <div className="relative">
      {/* 오버레이 직접 렌더링 */}
      {showFilter && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-30"
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
        />
        <MobileSortAndFilter
          sortOption={sortOption}
          setSortOption={setSortOption}
          setShowFilter={setShowFilter}
          sortOpen={sortOpen}
          setSortOpen={setSortOpen}
        />
        <ArticleGrid
          articles={articles}
          searchKeyWord={searchKeyWord}
          filterSettings={filterSettings}
          sortOption={sortOption}
        />
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
