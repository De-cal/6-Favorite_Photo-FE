import React from "react";
import TopSection from "./_components/TopSection";
import RankSection from "./_components/RankSection";
import SortAndSearchSection from "./_components/SortAndSearchSection";

export default function MyGalleryPage() {
  return (
    <div className="flex flex-col px-[15px] sm:px-[20px] ">
      <TopSection />
      <RankSection data="" />
      <SortAndSearchSection />
    </div>
  );
}

//생성횟수 -> 1시
