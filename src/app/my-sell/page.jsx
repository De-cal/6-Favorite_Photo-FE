"use client";
import React from "react";
import TopSection from "./_components/TopSection";
import RankSection from "./_components/RankSection";
import SortAndSearchSection from "./_components/SortAndSearchSection";
import { useState, useEffect } from "react";
import PhotoCardSection from "./_components/PhotoCardSection";
import PageNation from "./_components/PageNation";

export default function MySellPage() {
  const [searchFilter, setSearchFilter] = useState({
    keyword: "",
    grade: null,
    genre: null,
    sellingType: null,
    soldout: null,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    //(page);
  }, [page]);

  const filteredCards = mockCards.filter((card) => {
    const matchesKeyword =
      !searchFilter.keyword ||
      card.name.toLowerCase().includes(searchFilter.keyword.toLowerCase());

    const matchesGrade =
      !searchFilter.grade || card.rank === searchFilter.grade;

    const matchesGenre =
      !searchFilter.genre || card.genre === searchFilter.genre;

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
        <RankSection data="" />
        <SortAndSearchSection onSearch={setSearchFilter} />
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
    name: "How Far I'll Go",
    rank: "RARE",
    genre: "PORTRAIT",
    owner: "김숲안",
    price: 4,
    quantity: 1,
    image: "",
    status: "SELLING",
    totalQuantity: 5,
  },

  {
    name: "고양이",
    rank: "SUPER RARE",
    genre: "ANIMAL",
    owner: "김숲안",
    price: 6,
    quantity: 2,
    image: "",
    status: "WAITING_EXCHANGE",
    totalQuantity: 5,
  },

  {
    name: "강아지",
    rank: "COMMON",
    genre: "ANIMAL",
    owner: "김숲안",
    price: 3,
    quantity: 2,
    image: "",
    status: "WAITING_EXCHANGE",
    totalQuantity: 5,
  },
  {
    name: "거리를 걷는 남자",
    rank: "LEGENDARY",
    genre: "PORTRAIT",
    owner: "김숲안",
    price: 10,
    quantity: 1,
    image: "",
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    name: "창밖을 보는 여인",
    rank: "LEGENDARY",
    genre: "PORTRAIT",
    owner: "김숲안",
    price: 11,
    quantity: 3,
    image: "",
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    name: "캐논 DSLR 카메라",
    rank: "SUPER RARE",
    genre: "OBJECT",
    owner: "김숲안",
    price: 7,
    quantity: 3,
    image: "",
    status: "WAITING_EXCHANGE",
    totalQuantity: 5,
  },
  {
    name: "아이패드와 맥북",
    rank: "SUPER RARE",
    genre: "OBJECT",
    owner: "김숲안",
    price: 9,
    quantity: 3,
    image: "",
    status: "WAITING_EXCHANGE",
    totalQuantity: 5,
  },
  {
    name: "그냥 하얀바탕 사진",
    rank: "COMMON",
    genre: "ETC",
    owner: "김숲안",
    price: 2,
    quantity: 3,
    image: "",
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    name: "코드 샘플 캡쳐본",
    rank: "COMMON",
    genre: "ETC",
    owner: "김숲안",
    price: 3,
    quantity: 3,
    image: "",
    status: "WAITING_EXCHANGE",
    totalQuantity: 5,
  },
  {
    name: "솔드아웃 테스트 1",
    rank: "COMMON",
    genre: "ETC",
    owner: "김숲안",
    price: 3,
    quantity: 0,
    image: "",
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    name: "솔드아웃 테스트 2",
    rank: "COMMON",
    genre: "ETC",
    owner: "김숲안",
    price: 3,
    quantity: 0,
    image: "",
    status: "SELLING",
    totalQuantity: 5,
  },
  {
    name: "솔드아웃 테스트 3",
    rank: "COMMON",
    genre: "ETC",
    owner: "김숲안",
    price: 3,
    quantity: 0,
    image: "",
    status: "SELLING",
    totalQuantity: 5,
  },
];
