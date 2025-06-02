"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import example from "@/assets/images/img-card-placeholder-1.svg";
import Image from "next/image";
import SellerCardInfo from "./_components/SellerCardInfo";
import MobileHeader from "@/components/common/MobileHeader";
import ExchangeCards from "./_components/ExchangeCards";
import { getArticleById } from "@/lib/api/article.api";

export default function SellerPage() {
  const params = useParams();
  const articleId = params.id;
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      if (!articleId) return;
      
      try {
        setLoading(true);
        
        // 아티클 상세 정보
        const [articleData] = await Promise.all([
          getArticleById(articleId),
        ]);
        console.log("imgUrl:", articleData?.userPhotoCard?.photoCard?.imgUrl);
        console.log("Fetched data:", articleData);

        
        setArticle(articleData);
      } catch (err) {
        console.error("Failed to fetch article data:", err);
        setError("아티클을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-lg">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-lg text-red-400">{error || "아티클을 찾을 수 없습니다."}</div>
          <button 
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  const SERVER_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + "/uploads/";

const resolvedImgUrl =
  article?.userPhotoCard?.photoCard?.imgUrl?.startsWith("http")
    ? article.userPhotoCard.photoCard.imgUrl
    : SERVER_IMAGE_BASE_URL + article.userPhotoCard.photoCard.imgUrl;

  return (
    <>
      <MobileHeader src="/marketplace" title="마켓플레이스" />
      <div className="min-h-screen flex flex-col items-center bg-black text-white p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-[1480px]">
          <h1 className="w-[345px] sm:w-full md:w-full mx-auto text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b border-gray-100 pb-2">
            {article.userPhotoCard?.photoCard?.title || "포토카드"}
          </h1>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mt-13">
            {/* 왼쪽 이미지 */}
            <div className="w-[345px] sm:w-full md:w-full mx-auto">
              <Image 
                src={resolvedImgUrl}
                alt="판매 이미지" 
                className="w-full object-cover"
                width={345}
                height={400}
              />
            </div>

            {/* 오른쪽 카드 정보 */}
            <SellerCardInfo
              cardArticle={{
                id: article.id,
                photoCard: {
                  title: article.userPhotoCard?.photoCard?.title,
                  description: article.userPhotoCard?.photoCard?.description,
                  rank: article.userPhotoCard?.photoCard?.rank,
                  genre: article.userPhotoCard?.photoCard?.genre,
                },
                user: {
                  nickname: article.userPhotoCard?.user?.nickname,
                },
                price: article.price,
                totalQuantity: article.totalQuantity,
                remainingQuantity: article.remainingQuantity,
                exchangeText: article.exchangeText,
                exchangeRank: article.exchangeRank,
                exchangeGenre: article.exchangeGenre,
              }}
              onUpdate={() => {
                // 수정 후 데이터 새로고침
                fetchArticleData();
              }}
            />
          </div>
        </div>
        <br />
        <br />
        <ExchangeCards />
      </div>
    </>
  );
}
