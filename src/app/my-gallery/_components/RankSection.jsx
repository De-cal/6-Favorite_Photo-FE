import React from "react";
import RankDiv from "./RankDiv";

export default function RankSection({ data }) {
  const totalAmount = data.count;
  const common = data.common;
  const rare = data.rare;
  const superrare = data.superrare;
  const legendary = data.legendary;
  return (
    <section className="flex flex-col gap-5 py-10 border-b-1 border-gray-400">
      <div className="flex flex-row gap-2.5">
        <span className="text-[14px]">
          {data.user
            ? `${data.user}님이 보유한 포토카드`
            : "???님이 보유한 포토카드"}
        </span>
        <span className="text-[14px] text-gray-300">
          {totalAmount ? `총 ${totalAmount}장` : "(총 ???장)"}
        </span>
      </div>
      <div className="flex overflow-x-auto whitespace-nowrap gap-5 no-scrollbar">
        <RankDiv rank={"COMMON"} amount={common} />
        <RankDiv rank={"RARE"} amount={rare} />
        <RankDiv rank={"SUPERRARE"} amount={superrare} />
        <RankDiv rank={"LEGENDARY"} amount={legendary} />
      </div>
    </section>
  );
}
