import React from "react";
import PhotoCardBuyerDetail from "./_components/PhotoCardBuyerDetail";
import MyExchangeOffers from "./_components/MyExchangeOffers";
import SellerExchangeInfo from "./_components/SellerExchangeInfo";

export default function BuyerPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1920px] w-[345px] mx-auto py-[20px] sm:w-full sm:mx-0 sm:px-[20px] sm:py-[40px] md:px-[220px] md:py-[60px]">
        <PhotoCardBuyerDetail />
        <SellerExchangeInfo />
        <MyExchangeOffers />
      </div>
    </div>
  );
}
