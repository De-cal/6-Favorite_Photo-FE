// page.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import TopSection from "./_components/TopSection";
import RankSection from "./_components/RankSection";
import SortAndSearchSection from "./_components/SortAndSearchSection";
import PhotoCardSection from "./_components/PhotoCardSection";
import PageNation from "./_components/PageNation";
import { getAllCards } from "@/lib/api/card.api";

export default function MyGalleryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const pageSize = 15;

  const searchFilter = {
    keyword: searchParams.get("keyword") || "",
    rank: searchParams.get("rank") || null,
    genre: searchParams.get("genre") || null,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-gallery-cards", page, searchFilter],
    queryFn: () =>
      getAllCards({
        page,
        pageSize,
        ...searchFilter,
        status: "OWNED",
      }),
  });

  const updateQuery = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.keyword) params.set("keyword", newFilters.keyword);
    if (newFilters.rank) params.set("rank", newFilters.rank);
    if (newFilters.genre) params.set("genre", newFilters.genre);
    params.set("page", "1"); // 검색 후 페이지 초기화
    router.push(`?${params.toString()}`);
    setPage(1);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  const cards = data.list;
  const totalCount = data.totalCount.totalCount;
  const ranks = data.rankCounts;

  return (
    <div className="flex flex-col px-[15px] sm:px-[20px] items-center justify-center max-w-[1480px] mx-auto">
      <div className="flex flex-col w-full max-w-[356px] sm:max-w-[700px] md:max-w-[1480px] items-center justify-center">
        <TopSection />
        <RankSection totalCount={totalCount} rankCounts={ranks} />
        <SortAndSearchSection onSearch={updateQuery} data={cards} />

        <PhotoCardSection dataLists={cards} />
        <PageNation
          count={Math.ceil(data.totalCount.cardCount / pageSize)}
          currentPage={page}
          onClick={(newPage) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", newPage);
            router.push(`?${params.toString()}`);
            setPage(newPage);
          }}
        />
      </div>
    </div>
  );
}
