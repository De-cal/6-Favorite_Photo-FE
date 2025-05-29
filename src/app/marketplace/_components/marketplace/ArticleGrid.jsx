import React from "react";
import Card from "@/components/common/Card";
import Link from "next/link";

export default function ArticleGrid({
  articles,
  searchKeyWord,
  filterSettings,
  sortOption,
}) {
  const filtered = articles
    .filter((article) =>
      searchKeyWord
        ? article.photoCard.title
            .toLowerCase()
            .includes(searchKeyWord.toLowerCase())
        : true,
    )
    .filter((article) => {
      if (!filterSettings) return true;
      const matchRank = filterSettings.rank
        ? article.photoCard.rank === filterSettings.rank
        : true;
      const matchGenre = filterSettings.genre
        ? article.photoCard.genre === filterSettings.genre
        : true;
      const matchSoldout = filterSettings.soldout
        ? article.status === filterSettings.soldout
        : true;
      return matchRank && matchGenre && matchSoldout;
    })
    .sort((a, b) => {
      if (sortOption === "낮은 가격순") return a.price - b.price;
      if (sortOption === "높은 가격순") return b.price - a.price;
      if (sortOption === "최신순")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-[5px] sm:gap-[20px] md:gap-[80px] mt-[20px] justify-items-center">
      {filtered.map((article) => (
        <Link key={article.id} href={`/buyers/${article.id}`}>
          <Card
            type="for_sale"
            onClick={() => Router.push}
            card={{
              photoCard: {
                title: article.photoCard.title,
                rank: article.photoCard.rank,
                genre: article.photoCard.genre,
                imgURL: article.photoCard.imgUrl,
                creator: {
                  nickname: article.user.nickname,
                },
              },
              price: article.price,
              quantity: article.quantity,
              status: article.status,
              totalQuantity: article.totalQuantity,
            }}
          />
        </Link>
      ))}
    </div>
  );
}
