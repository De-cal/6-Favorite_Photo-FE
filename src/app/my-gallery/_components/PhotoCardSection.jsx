import Card from "@/components/common/Card";
import React from "react";

export default function PhotoCardSection({ datas }) {
  console.log();
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:max-w-[1480px] mt-[20px] sm:mt-[60px]">
      {datas.map((data, i) => {
        // md 이상일 때만 카드 위치에 따라 정렬 클래스 다르게 지정
        let mdJustify = "md:justify-start";
        if (i % 3 === 1) mdJustify = "md:justify-center";
        else if (i % 3 === 2) mdJustify = "md:justify-end";

        return (
          <div
            key={data.name}
            className={`w-full flex ${
              i % 2 === 1 ? "justify-start" : "justify-end"
            } ${mdJustify}`}
          >
            <Card card={data} />
          </div>
        );
      })}
    </section>

    // <section className="flex flex-wrap w-full gap-4 items-center justify-between md:max-w-[1480px] mt-[20px] sm:mt-[60px]">
    //   {datas.map((data) => (
    //     <div key={data.name} className="w-[48%] md:w-[32%]">
    //       <Card card={data} />
    //     </div>
    //   ))}
    // </section>
  );
}
