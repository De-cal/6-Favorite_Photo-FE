import Card from "@/components/common/Card";
import Link from "next/link";
import React from "react";

export default function PhotoCardSection({ dataLists }) {
  console.log("넘어온데이터", dataLists);
  return dataLists.length === 0 ? (
    <div className="font-baskinRobbins text-xl text-main pt-20">
      검색 및 필터링을 적용한 카드가 존재하지 않습니다.
    </div>
  ) : (
    <section className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:max-w-[1480px] mt-[20px] sm:mt-[60px]">
      {dataLists.map((dataList, i) => {
        let mdJustify = "md:justify-start";
        if (i % 3 === 1) mdJustify = "md:justify-center";
        else if (i % 3 === 2) mdJustify = "md:justify-end";

        const cardType = dataList.quantity === 0 ? "soldout" : "for_sale";

        return (
          <div
            key={dataList.userPhotoCard.photoCard.title}
            className={`w-full flex ${
              i % 2 === 1 ? "justify-start" : "justify-end"
            } ${mdJustify}`}
          >
            <Link href={"/marketplace/sellers/1"}>
              <Card card={dataList.userPhotoCard} type={cardType} />
            </Link>
          </div>
        );
      })}
    </section>
  );
}
