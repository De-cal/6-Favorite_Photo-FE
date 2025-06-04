import React from "react";
import CardSkeleton from "./CardSkeleton";

export default function PhotoCardSkeleton() {
  const dummyArray = new Array(6).fill(0); // 카드 6개 분량

  return (

    <section className="grid grid-cols-2 md:gap-y-20 md:grid-cols-3 gap-[5px] sm:gap-[20px] md:gap-[80px] w-full md:max-w-[1480px] mt-[20px]">
      {dummyArray.map((_, i) => {
        let mdJustify = "md:justify-start";
        if (i % 3 === 1) mdJustify = "md:justify-center";
        else if (i % 3 === 2) mdJustify = "md:justify-end";

        return (
          <div
            key={i}
            className={`w-full flex ${
              i % 2 === 1 ? "justify-start" : "justify-end"
            } ${mdJustify}`}
          >
            <CardSkeleton />
          </div>
        );
      })}
    </section>
  );
}
