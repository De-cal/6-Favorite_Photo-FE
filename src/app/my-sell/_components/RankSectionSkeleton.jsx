import React from "react";
import RankDiv from "./RankDiv";

export default function RankSectionSkeleton() {
  return (
    <section className="flex flex-col gap-5 py-10 border-b border-gray-400 w-full md:max-w-[1480px]">
      <div className="flex flex-row gap-2.5">
        <span className="text-[14px]">---님이 보유한 포토카드</span>
        <span className="text-[14px] text-gray-300">총 ???장</span>
      </div>

      {/* 👇 여기 수정: 부모에 overflow-x-auto, 자식에 w-max */}
      <div className="flex overflow-x-auto whitespace-nowrap gap-5 no-scrollbar w-full">
        <RankDiv rank={"COMMON"} />
        <RankDiv rank={"RARE"} />
        <RankDiv rank={"SUPER RARE"} />
        <RankDiv rank={"LEGENDARY"} />
      </div>
    </section>
  );
}
