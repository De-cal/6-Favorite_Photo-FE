"use client";

import ExchangeCard from "@/app/marketplace/_components/ExchangeCard";
import articleApi from "@/lib/api/article.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

export default function MyExchangeOffer() {
  const { id: articleId } = useParams();

  const { data: cardArticle, isPending } = useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => articleApi.getArticle(articleId),
  });

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  return <ExchangeCard type="buyer" cardArticle={cardArticle} />;
}
