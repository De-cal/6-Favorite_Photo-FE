"use client";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/common/Loading";
import { getArticleById } from "@/lib/api/article.api";

const SellerContext = createContext();

export const useSeller = () => {
  const context = useContext(SellerContext);

  if (!context) {
    throw new Error(
      "useSeller는 반드시 SellerProvider 안에서 사용해야 합니다.",
    );
  }

  return context;
};

export default function SellerProvider({ children }) {
  const { id: articleId } = useParams();

  const { data: cardArticle, isPending } = useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => getArticleById(articleId),
  });

  if (isPending) {
    return <Loading />;
  }

  return (
    <SellerContext.Provider value={{ cardArticle }}>
      {children}
    </SellerContext.Provider>
  );
}
