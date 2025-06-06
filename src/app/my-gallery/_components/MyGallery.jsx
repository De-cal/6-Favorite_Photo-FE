"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import TopSection from "../_components/TopSection";
import RankSection from "../_components/RankSection";
import SortAndSearchSection from "../_components/SortAndSearchSection";
import PhotoCardSection from "../_components/PhotoCardSection";
import PageNation from "../_components/PageNation";
import { getAllCards } from "@/lib/api/card.api";
import { useAuth } from "@/providers/AuthProvider";

import { useModal } from "@/providers/ModalProvider";
import LoginNeed from "@/app/marketplace/_components/marketplace/LoginNeed";
import RankSectionSkeleton from "@/app/my-sell/_components/RankSectionSkeleton";

import PhotoCardSkeleton from "@/app/my-sell/_components/PhotoCardSkeleton";
import PageNationSkeleton from "@/app/my-sell/_components/PageNationSkeleton";
import SortAndSearchSectionSkeleton from "./SortAndSearchSectionSkeleton";

export default function MyGallery() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState(null);
  const pageSize = 15;

  useEffect(() => {
    const parsedPage = Number(searchParams.get("page") || "1");
    const keyword = searchParams.get("keyword") || "";
    const rank = searchParams.get("rank") || null;
    const genre = searchParams.get("genre") || null;

    setPage(parsedPage);
    setSearchFilter({ keyword, rank, genre });
  }, [searchParams.toString()]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["my-gallery-cards", page, searchFilter],
    queryFn: () =>
      getAllCards({
        page,
        pageSize,
        ...searchFilter,
        status: "OWNED",
      }),
    enabled: !!searchFilter && !!user,
  });

  const updateQuery = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.keyword) params.set("keyword", newFilters.keyword);
    if (newFilters.rank) {
      params.set("rank", newFilters.rank.replace(/\s+/g, ""));
    }
    if (newFilters.genre) params.set("genre", newFilters.genre);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
    setPage(1);
  };
  // 1. 인증 정보 로딩 중일 때는 로딩 스켈레톤을 보여줍니다.
  if (isLoading) {
    return (
      <div className="flex flex-col px-[15px] sm:px-[20px] items-center justify-center max-w-[1480px] mx-auto">
        <RankSectionSkeleton />
        <SortAndSearchSectionSkeleton />
        <PhotoCardSkeleton /> {/* 또는 CardSkeleton으로 변경 */}
        <PageNationSkeleton />
      </div>
    );
  }

  if (!user) return <LoginNeed />;
  if (isError) return <div>에러 발생</div>;

  return (
    <div className="flex flex-col px-[15px] sm:px-[20px] items-center justify-center max-w-[1480px] mx-auto">
      <div className="flex flex-col w-full max-w-[344px] sm:max-w-[700px] md:max-w-[1480px] items-center justify-center">
        <TopSection user={user} />

        {isPending ? (
          <RankSectionSkeleton />
        ) : (
          <RankSection
            totalCount={data.totalCount.totalCount}
            rankCounts={data.rankCounts}
            user={user.nickname}
          />
        )}
        {isPending ? (
          <SortAndSearchSectionSkeleton />
        ) : (
          <SortAndSearchSection
            onSearch={updateQuery}
            data={data}
            selectedFilter={searchFilter}
          />
        )}

        {isPending ? (
          <PhotoCardSkeleton />
        ) : (
          <PhotoCardSection dataLists={data.list} />
        )}

        {isPending ? (
          <PageNationSkeleton />
        ) : (
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
        )}
      </div>
    </div>
  );
}
