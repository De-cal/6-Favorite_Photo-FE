"use client";

import React, { useState, useEffect, useCallback } from "react";
import MarketplaceHeader from "./_components/marketplace/MarketplaceHeader";
import ArticleGrid from "./_components/marketplace/ArticleGrid";
import MobileSortAndFilter from "./_components/marketplace/MobileSortAndFilter";
import MobileFilter from "../my-sell/_components/MobileFilter";
import SelectPhotoCardsModal from "./_components/SelectPhotoCardsModal";
import { getAllArticles } from "@/lib/api/article.api";

import LoginNeed from "./_components/marketplace/LoginNeed";
import MyCardSellBtn from "./_components/marketplace/MyCardSellBtn";

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
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const LIMIT = 12;

  //동일한 값이면 재사용
  const getArticles = useCallback(async () => {
    //요청중이거나 더 남아있지 않으면 종료
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await getAllArticles(page, LIMIT, searchKeyWord);
      if (data?.articles?.length) {
        //데이터의 article이 하나라도 있으면 진행
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

  //검색어가 바뀔때 각 상태 값을 초기화
  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
  }, [searchKeyWord]);

  //검색이나 페이지가 바뀔때 데이터 불러오기
  useEffect(() => {
    getArticles();
  }, [page, searchKeyWord]);

  // 화면 크기가 sm 이상으로 커질 때 showFilter 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setShowFilter(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectFilter = (selectedFilters) => {
    setFilterSettings(selectedFilters);
    setShowFilter(false);
  };

  return (
    <div className="relative">
      {/* 오버레이 직접 렌더링 */}
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
        <ArticleGrid
          articles={articles}
          searchKeyWord={searchKeyWord}
          filterSettings={filterSettings}
          sortOption={sortOption}
          onRequireLogin={() => setLoginModalOpen(true)}
        />
      </div>

      {showFilter && (
        <div className="fixed bottom-0 left-0 w-full z-50 animate-slide-up">
          <MobileFilter
            datas={articles.userPhotoCard}
            onSelectFilter={handleSelectFilter}
          />
        </div>
      )}

      {isModalOpen && <SelectPhotoCardsModal setIsModalOpen={setIsModalOpen} />}

      {loading && (
        <div className="text-center py-4 text-gray-500">로딩 중...</div>
      )}

      {!showFilter && !isModalOpen && (
        <MyCardSellBtn
          setIsModalOpen={setIsModalOpen}
          onRequireLogin={() => setLoginModalOpen(true)}
        />
      )}

      {loginModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setLoginModalOpen(false)} // 배경 클릭 시 닫힘
        >
          <div onClick={(e) => e.stopPropagation()}>
            {/* 내부 클릭은 무시 */}
            <LoginNeed onClose={() => setLoginModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
