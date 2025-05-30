"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import TopSection from "./TopSection";
import RankSection from "./RankSection";
import SortAndSearchSection from "./SortAndSearchSection";
import PhotoCardSection from "./PhotoCardSection";
import PageNation from "./PageNation";
import { getUserArticles } from "@/lib/api/article.api.js";

export default function MySell() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchFilter, setSearchFilter] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 15;
  //진짜
  useEffect(() => {
    const keyword = searchParams.get("keyword") ?? "";
    const rank = searchParams.get("rank")?.replace(/\s+/g, "") ?? null;
    const genre = searchParams.get("genre") ?? null;
    const sellingType = searchParams.get("sellingType") ?? null;
    const soldout = searchParams.get("soldout") ?? null;
    const curruntPage = Number(searchParams.get("page") ?? "1");

    setSearchFilter({ keyword, rank, genre, sellingType, soldout });
    setPage(curruntPage);
  }, [searchParams.toString()]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["my-user-articles", page, searchFilter],
    queryFn: () =>
      getUserArticles({
        page,
        pageSize,
        rank: searchFilter?.rank,
        genre: searchFilter?.genre,
        keyword: searchFilter?.keyword,
        sellingType: searchFilter?.sellingType,
        soldOut:
          searchFilter?.soldout === "SOLDOUT"
            ? true
            : searchFilter?.soldout === "SELLING"
            ? false
            : undefined,
      }),
    enabled: !!searchFilter, // 필터 초기화될 때까지 API 호출 막음
    enabled: !!searchFilter, // 필터 초기화될 때까지 API 호출 막음
  });

  if (!searchFilter || isPending) return <div>로딩 중...</div>;
  if (!searchFilter || isPending) return <div>로딩 중...</div>;
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

  console.log(data);

  console.log(data);

  return (
    <div className="flex flex-col px-[15px] sm:px-[20px] items-center justify-center max-w-[1480px] mx-auto">
      <div className="flex flex-col w-full max-w-[356px] sm:max-w-[700px] md:max-w-[1480px] items-center justify-center">
        <TopSection />
        <RankSection
          totalCount={data.totalCount.totalCount}
          rankCounts={ranks}
        />

        {/* 서스팬스로 감싸기 */}
        <SortAndSearchSection
          onSearch={setSearchFilter}
          data={data}
          selectedFilter={searchFilter}
        />
        {/* 서스팬스로 감싸기 */}
        {/* 서스팬스로 감싸기 */}
        <PhotoCardSection dataLists={filteredCards} />
        <PageNation
          count={Math.ceil(articleCount / pageSize)}
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
