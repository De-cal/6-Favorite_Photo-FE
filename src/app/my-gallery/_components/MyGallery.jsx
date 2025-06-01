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
import Loading from "@/components/common/Loading";
import { useAuth } from "@/providers/AuthProvider";
import TsetModal from "@/app/modal-test/TsetModal";

export default function MyGallery() {
  const { user } = useAuth();
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
    enabled: !!searchFilter && !!user, // 유저 없으면 쿼리도 막음
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

  if (!user) return <TsetModal />;
  if (!searchFilter || isPending) return <Loading />;
  if (isError) return <div>에러 발생</div>;

  const cards = data.list;
  const totalCount = data.totalCount.totalCount;
  const ranks = data.rankCounts;

  return (
    <div className="flex flex-col px-[15px] sm:px-[20px] items-center justify-center max-w-[1480px] mx-auto">
      <div className="flex flex-col w-full max-w-[356px] sm:max-w-[700px] md:max-w-[1480px] items-center justify-center">
        <TopSection user={user} />
        <RankSection totalCount={totalCount} rankCounts={ranks} />
        <SortAndSearchSection
          onSearch={updateQuery}
          data={data}
          selectedFilter={searchFilter}
        />
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
