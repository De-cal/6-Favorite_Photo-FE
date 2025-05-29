"use client";
import React from "react";
import TopSection from "./_components/TopSection";
import RankSection from "./_components/RankSection";
import SortAndSearchSection from "./_components/SortAndSearchSection";
import { useState, useEffect } from "react";
import PhotoCardSection from "./_components/PhotoCardSection";
import PageNation from "./_components/PageNation";
import { useQuery } from "@tanstack/react-query";
import { getUserArticles } from "@/lib/api/article.api.js";

export default function MySellPage() {
  const [searchFilter, setSearchFilter] = useState({
    keyword: "",
    rank: null,
    genre: null,
    sellingType: null,
    soldout: null,
  });
  const [page, setPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    // 원하는 로직 실행 ( API 호출)
  }, [page, searchFilter]);
  //리액트 쿼리
  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-user-articles", page, searchFilter],
    queryFn: () =>
      getUserArticles({
        page,
        pageSize,
        rank: searchFilter.rank,
        genre: searchFilter.genre,
        keyword: searchFilter.keyword,
        sellingType: searchFilter.sellingType,
        soldOut: searchFilter.soldout,
      }),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  const cards = data.list;
  const totalCount = data.totalCount.total;
  const articleCount = data.totalCount.articleCount;
  const ranks = data.rankCounts;

  const filteredCards = cards.filter((card) => {
    const matchesKeyword =
      !searchFilter.keyword ||
      card.photoCard.title
        .toLowerCase()
        .includes(searchFilter.keyword.toLowerCase());

    const matchesGrade =
      !searchFilter.rank || card.photoCard.rank === searchFilter.rank;

    const matchesGenre =
      !searchFilter.genre || card.photoCard.genre === searchFilter.genre;

    const matchesSellingType =
      !searchFilter.sellingType || card.status === searchFilter.sellingType;

    const matchesSoldout =
      !searchFilter.soldout ||
      (searchFilter.soldout === "SELLING"
        ? card.quantity > 0
        : card.quantity === 0);

    return (
      matchesKeyword &&
      matchesGrade &&
      matchesGenre &&
      matchesSellingType &&
      matchesSoldout
    );
  });
  return (
    <div className=" flex flex-col px-[15px] sm:px-[20px] items-center justify-center max-w-[1480px] mx-auto">
      <div className="flex flex-col w-full max-w-[356px] sm:max-w-[700px] md:max-w-[1480px] items-center justify-center">
        <TopSection />
        <RankSection totalCount={totalCount} rankCounts={ranks} />
        <SortAndSearchSection onSearch={setSearchFilter} data={cards} />
        <PhotoCardSection dataLists={filteredCards} />
        <PageNation
          count={Math.ceil(articleCount / pageSize)}
          currentPage={page}
          onClick={setPage}
        />
      </div>
    </div>
  );
}
