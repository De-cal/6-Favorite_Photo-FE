import React from "react";
import PhotoCardBuyerDetail from "./_components/PhotoCardBuyerDetail";
import MyExchangeOffers from "./_components/MyExchangeOffers";
import SellerExchangeInfo from "./_components/SellerExchangeInfo";
import MobileHeader from "@/components/common/MobileHeader";

export default function BuyerPage() {
  return (
    <>
      <MobileHeader src="/marketplace" title="마켓플레이스" />
      <div className="flex justify-center items-center">
        <div className="max-w-[1920px] w-[345px] mx-auto py-[20px] sm:w-full sm:mx-0 sm:px-[20px] sm:pt-0 sm:pb-[60px] md:px-[220px]">
          <PhotoCardBuyerDetail />
          <SellerExchangeInfo />
          <MyExchangeOffers />
        </div>
      </div>
    </>
  );
}
