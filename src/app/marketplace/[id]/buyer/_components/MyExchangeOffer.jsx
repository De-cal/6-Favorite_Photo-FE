"use client";

import ExchangeCard from "@/app/marketplace/_components/ExchangeCard";
import { useBuyer } from "@/contexts/BuyerContext";
import React from "react";

export default function MyExchangeOffer() {
  const { cardArticle } = useBuyer();

  return <ExchangeCard type="buyer" cardArticle={cardArticle} />;
}
