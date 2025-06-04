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
import { useAuth } from "@/providers/AuthProvider";
import LoginNeed from "@/app/marketplace/_components/marketplace/LoginNeed";
import RankSectionSkeleton from "./RankSectionSkeleton";
import SortAndSearchSectionSkeleton from "./SortAndSearchSectionSkeleton";
import PageNationSkeleton from "./PageNationSkeleton";
import PhotoCardSkeleton from "./PhotoCardSkeleton";

export default function MySell() {
  const { user, isLoading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchFilter, setSearchFilter] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 15;

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
  //리렌더링 4회 수정하기
  //유즈이펙트 대신 유즈메모 사용법
  //라우터점 푸시 대신 라우터.replace사용하기.

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
    enabled: !!searchFilter && !!user, // 필터 초기화될 때까지 API 호출 막음
  });

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
  // if (!searchFilter || isPending) return <Loading />
  if (isError) return <div>에러 발생</div>;

  return (
    <div className="flex flex-col px-[15px] sm:px-[20px] items-center justify-center max-w-[1480px] w-full mx-auto">
      <div className="flex flex-col max-w-[344px] sm:max-w-[700px] md:max-w-[1480px] w-full items-center justify-center">
        <TopSection />

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
            onSearch={setSearchFilter}
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
            count={Math.ceil(data.totalCount.articleCount / pageSize)}
            currentPage={page}
            onClick={(newPage) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", newPage);
              router.push(`?${params.toString()}`);
              setPage(newPage);
            }}
          />
        )}
        {/* 
        <RankSectionSkeleton />
        <SortAndSearchSectionSkeleton />
        <PhotoCardSkeleton /> */}
      </div>
    </div>
  );
}
