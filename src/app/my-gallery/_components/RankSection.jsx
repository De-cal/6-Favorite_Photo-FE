import React from "react";
import RankDiv from "./RankDiv";

export default function RankSection({ totalCount, rankCounts, user }) {
  return (
    <section className="flex flex-col gap-5 py-10 border-b border-gray-400 w-full md:max-w-[1480px]">
      <div className="flex flex-row gap-2.5">
        <span className="text-[14px]">
          {user ? `${user}님이 보유한 포토카드` : "유디 님이 보유한 포토카드"}
        </span>
        <span className="text-[14px] text-gray-300">
          {`총 ${totalCount}장`}
        </span>
      </div>

      {/* 👇 여기 수정: 부모에 overflow-x-auto, 자식에 w-max */}
      <div className="flex overflow-x-auto whitespace-nowrap gap-5 no-scrollbar w-full">
        <RankDiv rank={"COMMON"} amount={rankCounts?.COMMON ?? 0} />
        <RankDiv rank={"RARE"} amount={rankCounts?.RARE ?? 0} />
        <RankDiv rank={"SUPER RARE"} amount={rankCounts?.SUPERRARE ?? 0} />
        <RankDiv rank={"LEGENDARY"} amount={rankCounts?.LEGENDARY ?? 0} />
      </div>
    </section>
  );
}
