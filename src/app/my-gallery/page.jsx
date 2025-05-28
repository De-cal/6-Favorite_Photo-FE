"use client";
import React from "react";
import TopSection from "./_components/TopSection";
import RankSection from "./_components/RankSection";
import SortAndSearchSection from "./_components/SortAndSearchSection";
import { useState, useEffect } from "react";
import PhotoCardSection from "./_components/PhotoCardSection";
import PageNation from "./_components/PageNation";
import { useQuery } from "@tanstack/react-query";
import { getAllCards } from "@/lib/api/card.api.js";

export default function MyGalleryPage() {
  const [searchFilter, setSearchFilter] = useState({
    keyword: "",
    rank: null,
    genre: null,
  });
  const [page, setPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    // 원하는 로직 실행 ( API 호출)
  }, [page, searchFilter]);
  //리액트 쿼리
  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-gallery-cards", page, searchFilter],
    queryFn: () =>
      getAllCards({
        page,
        pageSize,
        rank: searchFilter.rank,
        genre: searchFilter.genre,
        keyword: searchFilter.keyword,
        status: "OWNED", // 고정값이라면
      }),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  const cards = data.list;
  const totalCount = data.totalCount.totalCount;
  const cardCount = data.totalCount.cardCount;
  const ranks = data.rankCounts;
  console.log("데이터", data);
  //리액트 쿼리
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

    return matchesKeyword && matchesGrade && matchesGenre;
  });

  return (
    <div className=" flex flex-col px-[15px] sm:px-[20px] items-center justify-center max-w-[1480px] mx-auto">
      <div className="flex flex-col w-full max-w-[356px] sm:max-w-[700px] md:max-w-[1480px] items-center justify-center">
        <TopSection />
        <RankSection totalCount={totalCount} rankCounts={ranks} />
        <SortAndSearchSection onSearch={setSearchFilter} data={cards} />
        <PhotoCardSection dataLists={filteredCards} />
        <PageNation
          count={Math.ceil(cardCount / pageSize)}
          currentPage={page}
          onClick={setPage}
        />
      </div>
    </div>
  );
}
