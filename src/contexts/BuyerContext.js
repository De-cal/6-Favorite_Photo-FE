"use client";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/common/Loading";
import { getArticle } from "@/lib/api/article.api";

const BuyerContext = createContext();

export const useBuyer = () => {
  const context = useContext(BuyerContext);

  if (!context) {
    throw new Error("useBuyer는 반드시 BuyerProvider 안에서 사용해야 합니다.");
  }

  return context;
};

export default function BuyerProvider({ children }) {
  const { id: articleId } = useParams();

  const { data: cardArticle, isPending } = useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => getArticle(articleId),
  });

  if (isPending) {
    return <Loading />;
  }

  return (
    <BuyerContext.Provider value={{ cardArticle }}>
      {children}
    </BuyerContext.Provider>
  );
}
