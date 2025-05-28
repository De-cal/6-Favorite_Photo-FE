"use client";
import React from "react";
import TopSection from "./_components/TopSection";
import RankSection from "./_components/RankSection";
import SortAndSearchSection from "./_components/SortAndSearchSection";
import { useState, useEffect } from "react";
import PhotoCardSection from "./_components/PhotoCardSection";
import PageNation from "./_components/PageNation";
import { useQuery } from "@tanstack/react-query";
import { getUserArticles } from "@/api/article.js";

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
  console.log("데이터", data);

  const filteredCards = mockCards.filter((card) => {
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
        <RankSection data={mockCards} />
        <SortAndSearchSection onSearch={setSearchFilter} data={mockCards} />
        <PhotoCardSection dataLists={filteredCards} />
        <PageNation
          count={filteredCards.length}
          currentPage={page}
          onClick={setPage}
        />
      </div>
    </div>
  );
}
const mockCards = [
  {
    photoCard: {
      title: "How Far I'll Go",
      rank: "RARE",
      genre: "PORTRAIT",
      imgURL: "",
      creator: { nickname: "프로여행러" },
    },
    price: 4,
    quantity: 1,
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    photoCard: {
      title: "고양이",
      rank: "SUPERRARE",
      genre: "ANIMAL",
      imgURL: "",
      creator: { nickname: "김숲안" },
    },
    price: 6,
    quantity: 2,
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    photoCard: {
      title: "강아지",
      rank: "COMMON",
      genre: "ANIMAL",
      imgURL: "",
      creator: { nickname: "김숲안" },
    },
    price: 3,
    quantity: 2,
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    photoCard: {
      title: "거리를 걷는 남자",
      rank: "LEGENDARY",
      genre: "PORTRAIT",
      imgURL: "",
      creator: { nickname: "김숲안" },
    },
    price: 10,
    quantity: 1,
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    photoCard: {
      title: "창밖을 보는 여인",
      rank: "LEGENDARY",
      genre: "PORTRAIT",
      imgURL: "",
      creator: { nickname: "김숲안" },
    },
    price: 11,
    quantity: 3,
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    photoCard: {
      title: "캐논 DSLR 카메라",
      rank: "SUPERRARE",
      genre: "OBJECT",
      imgURL: "",
      creator: { nickname: "김숲안" },
    },
    price: 7,
    quantity: 3,
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    photoCard: {
      title: "아이패드와 맥북",
      rank: "SUPERRARE",
      genre: "OBJECT",
      imgURL: "",
      creator: { nickname: "김숲안" },
    },
    price: 9,
    quantity: 3,
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    photoCard: {
      title: "그냥 하얀바탕 사진",
      rank: "COMMON",
      genre: "ETC",
      imgURL: "",
      creator: { nickname: "김숲안" },
    },
    price: 2,
    quantity: 3,
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    photoCard: {
      title: "코드 샘플 캡쳐본",
      rank: "COMMON",
      genre: "ETC",
      imgURL: "",
      creator: { nickname: "김숲안" },
    },
    price: 3,
    quantity: 3,
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    photoCard: {
      title: "테스트 1",
      rank: "COMMON",
      genre: "ETC",
      imgURL: "",
      creator: { nickname: "김숲안" },
    },
    price: 3,
    quantity: 0,
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    photoCard: {
      title: "고급 테스트 1",
      rank: "SUPERRARE",
      genre: "ETC",
      imgURL: "",
      creator: { nickname: "김숲안" },
    },
    price: 3,
    quantity: 0,
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    photoCard: {
      title: "최고급 테스트 1",
      rank: "LEGENDARY",
      genre: "ETC",
      imgURL: "",
      creator: { nickname: "김숲안" },
    },
    price: 3,
    quantity: 0,
    status: "SELLING",
    totalQuantity: 5,
  },

  {
    photoCard: {
      title: "테스트 2",
      rank: "COMMON",
      genre: "ETC",
      imgURL: "",
      creator: { nickname: "김숲안" },
    },
    price: 3,
    quantity: 1,
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    photoCard: {
      title: "고급 테스트 2",
      rank: "SUPERRARE",
      genre: "ETC",
      imgURL: "",
      creator: { nickname: "김숲안" },
    },
    price: 3,
    quantity: 2,
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    photoCard: {
      title: "최고급 테스트 2",
      rank: "LEGENDARY",
      genre: "ETC",
      imgURL: "",
      creator: { nickname: "김숲안" },
    },
    price: 3,
    quantity: 3,
    status: "SELLING",
    totalQuantity: 5,
  },
];
