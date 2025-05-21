"use client";
import React from "react";
import TopSection from "./_components/TopSection";
import RankSection from "./_components/RankSection";
import SortAndSearchSection from "./_components/SortAndSearchSection";
import { useState } from "react";
import PhotoCardSection from "./_components/PhotoCardSection";
export default function MyGalleryPage() {
  const [searchFilter, setSearchFilter] = useState({
    keyword: "",
    grade: null,
    genre: null,
  });
  return (
    <div className=" flex flex-col px-[15px] sm:px-[20px] items-center justify-center max-w-[1480px] mx-auto">
      <div className="flex flex-col w-full max-w-[356px] sm:max-w-[700px] md:max-w-[1480px]">
        <TopSection />
        <RankSection data="" />
        <SortAndSearchSection onSearch={setSearchFilter} />
        <PhotoCardSection datas={mookCards} />
      </div>

      {/* 디버그용 출력
      <div className="mt-5 text-white text-sm">
        검색어: {searchFilter.keyword || "없음"} <br />
        선택된 등급: {searchFilter.grade || "없음"} <br />
        선택된 장르: {searchFilter.genre || "없음"}
      </div> */}
    </div>
  );
}

const mookCards = [
  {
    name: "How Far I'll Go",
    rank: "RARE",
    genre: "PORTRAIT",
    owner: "프로여행러",
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
    status: "SELLING",
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
    status: "SELLING",
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
    status: "SELLING",
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
    status: "SELLING",
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
    status: "SELLING",
    totalQuantity: 5,
  },
];

//태빈님질문 뷰포인트 1480아니였는지..?
//
