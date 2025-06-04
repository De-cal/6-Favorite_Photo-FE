import Card from "@/components/common/Card";
import Link from "next/link";
import React from "react";
import CardSkeleton from "./CardSkeleton";

export default function PhotoCardSection({ dataLists }) {
  console.log(dataLists);
  return dataLists.length === 0 ? (
    <div className="font-baskinRobbins text-xl text-main pt-20">
      검색 및 필터링을 적용한 카드가 존재하지 않습니다.
    </div>
  ) : (
    <section className="grid grid-cols-2 md:gap-y-20 md:grid-cols-3 gap-4 w-full md:max-w-[1480px] mt-[20px] sm:mt-[60px]">
      {dataLists.map((dataList, i) => {
        let mdJustify = "md:justify-start";
        if (i % 3 === 1) mdJustify = "md:justify-center";
        else if (i % 3 === 2) mdJustify = "md:justify-end";

        const cardType =
          dataList.userPhotoCard.status === "EXCHANGE_REQUESTED"
            ? "for_sale"
            : dataList.remainingQuantity === 0
            ? "for_sale_soldout"
            : "for_sale";
        console.log("넘겨주는 카드 값:", dataList.userPhotoCard);
        return (
          <div
            key={dataList.id}
            className={`w-full flex ${
              i % 2 === 1 ? "justify-start" : "justify-end"
            } ${mdJustify}`}
          >
            <Link href={`/marketplace/${dataList.id}/seller`}>
              <Card card={dataList.userPhotoCard} type={cardType} />
              {/* <CardSkeleton /> */}
            </Link>
          </div>
        );
      })}
    </section>
  );
}
