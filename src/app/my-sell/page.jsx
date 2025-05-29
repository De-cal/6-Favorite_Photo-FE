"use client";
import React, { useState } from "react";
import TopSection from "./_components/TopSection";
import RankSection from "./_components/RankSection";
import SortAndSearchSection from "./_components/SortAndSearchSection";
import PhotoCardSection from "./_components/PhotoCardSection";
import PageNation from "./_components/PageNation";
import { useQuery } from "@tanstack/react-query";
import { getUserArticles } from "@/lib/api/article.api.js";
import { useRouter, useSearchParams } from "next/navigation";

export default function MySellPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchFilter, setSearchFilter] = useState({
    keyword: searchParams.get("keyword") ?? "",
    rank: searchParams.get("rank") ?? null,
    genre: searchParams.get("genre") ?? null,
    sellingType: searchParams.get("sellingType") ?? null,
    soldout: searchParams.get("soldout") ?? null,
  });

  const [page, setPage] = useState(Number(searchParams.get("page") ?? "1"));
  const pageSize = 15;

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
        soldOut:
          searchFilter.soldout === "SOLDOUT"
            ? true
            : searchFilter.soldout === "SELLING"
            ? false
            : undefined,
      }),
  });

  if (isError) return <div>에러 발생</div>;

  const cards = data.list;
  const totalCount = data.totalCount.total;
  const articleCount = data.totalCount.articleCount;
  const ranks = data.rankCounts;

  const filteredCards = cards.filter((card) => {
    const photoCard = card.userPhotoCard?.photoCard;
    if (!photoCard) return false;

    const matchesKeyword =
      !searchFilter.keyword ||
      photoCard.title
        .toLowerCase()
        .includes(searchFilter.keyword.toLowerCase());

    const matchesGrade =
      !searchFilter.rank || photoCard.rank === searchFilter.rank;

    const matchesGenre =
      !searchFilter.genre || photoCard.genre === searchFilter.genre;

    const matchesSellingType =
      !searchFilter.sellingType || card.status === searchFilter.sellingType;

    const matchesSoldout =
      !searchFilter.soldout ||
      (searchFilter.soldout === "SELLING"
        ? card.remainingQuantity > 0
        : card.remainingQuantity === 0);

    return (
      matchesKeyword &&
      matchesGrade &&
      matchesGenre &&
      matchesSellingType &&
      matchesSoldout
    );
  });
  console.log("data:", data);

  return (
    <div className="flex flex-col px-[15px] sm:px-[20px] items-center justify-center max-w-[1480px] mx-auto">
      <div className="flex flex-col w-full max-w-[1480px] items-center justify-center">
        <TopSection />
        <RankSection totalCount={totalCount} rankCounts={ranks} />
        <SortAndSearchSection
          onSearch={setSearchFilter}
          data={cards}
          selectedFilter={searchFilter}
        />

        <PhotoCardSection dataLists={filteredCards} />

        <PageNation
          count={Math.ceil(data.totalCount.articleCount / pageSize)}
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
