import React from "react";
import RankDiv from "./RankDiv";

export default function RankSection({ data }) {
  const totalAmount = data.length;
  const common = data.filter((card) => card.photoCard.rank === "COMMON").length;
  const rare = data.filter((card) => card.photoCard.rank === "RARE").length;
  const superrare = data.filter(
    (card) => card.photoCard.rank === "SUPER RARE"
  ).length;
  const legendary = data.filter(
    (card) => card.photoCard.rank === "LEGENDARY"
  ).length;
  return (
    <section className="flex flex-col gap-5 py-10 border-b border-gray-400 w-full md:max-w-[1480px]">
      <div className="flex flex-row gap-2.5">
        <span className="text-[14px]">
          {data.user
            ? `${data.user}님이 보유한 포토카드`
            : "유디 님이 보유한 포토카드"}
        </span>
        <span className="text-[14px] text-gray-300">
          {totalAmount ? `총 ${totalAmount}장` : "(총 ???장)"}
        </span>
      </div>

      {/* 👇 여기 수정: 부모에 overflow-x-auto, 자식에 w-max */}
      <div className="flex overflow-x-auto whitespace-nowrap gap-5 no-scrollbar w-full">
        <RankDiv rank={"COMMON"} amount={common} />
        <RankDiv rank={"RARE"} amount={rare} />
        <RankDiv rank={"SUPERRARE"} amount={superrare} />
        <RankDiv rank={"LEGENDARY"} amount={legendary} />
      </div>
    </section>
  );
}
