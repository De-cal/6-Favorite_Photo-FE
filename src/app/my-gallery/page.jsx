import ActionButton from "@/components/ui/buttons/ActionButton";
import Link from "next/link";
import React from "react";
import TopSection from "./_components/TopSection";

export default function MyGalleryPage() {
  return (
    <div className="flex flex-col px-[15px] sm:px-[20px] gap-[15px] sm:gap-[20px]">
      <TopSection />

      <section>
        <div className="flex flex-row">
          <span className="text-[14px]">???님이 보유한 포토카드</span>
          <span className="text-[14px] text-gray-300">총 ???장</span>
        </div>
      </section>
    </div>
  );
}

//생성횟수 -> 1시
