import React from "react";
import clsx from "clsx"; // 조건부 클래스 적용을 더 깔끔하게

export default function RankDiv({ rank, amount }) {
  const rankStyles = {
    COMMON: "border-main text-main",
    RARE: "border-blue text-blue",
    "SUPER RARE": "border-purple text-purple",
    LEGENDARY: "border-pink text-pink",
  };

  return (
    <div
      className={clsx(
        "h-7.5 sm:h-8 md:h-10 w-auto border flex justify-center items-center font-light text-[12px] sm:text-[14px] md:text-[16px] px-2.5",
        rankStyles[rank] || "border-gray-300 text-gray-500",
      )}
    >
      <span>{rank}</span>
      <span className="ml-[5px] md:ml-[20px]">{`${amount ?? "???"}장`}</span>{" "}
      {/* 12px = 3칸 정도 */}
    </div>
  );
}
