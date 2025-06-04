"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import example from "@/assets/images/img-card-placeholder-1.webp";
import Image from "next/image";
import SellerCardInfo from "./_components/SellerCardInfo";
import MobileHeader from "@/components/common/MobileHeader";
import { getArticleById } from "@/lib/api/article.api";
import ExchangeCard from "../../_components/ExchangeCard";
import { getImageUrl } from "@/lib/utils/imageUrl";
import { useSeller } from "@/contexts/SellerContext";

export default function SellerPage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id;

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  // 이미지 src를 관리하는 state 추가
  const [imgSrc, setImgSrc] = useState(example);
  const { cardArticle } = useSeller();

  const fetchArticleData = async () => {
    if (!articleId) return;

    try {
      setLoading(true);

      // 아티클 상세 정보
      const [articleData] = await Promise.all([getArticleById(articleId)]);

      setArticle(articleData);

      // 이미지 src 설정 - 데이터가 있으면 해당 이미지, 없으면 기본 이미지
      setImgSrc(
        articleData?.userPhotoCard?.photoCard?.imgUrl
          ? getImageUrl(articleData.userPhotoCard.photoCard.imgUrl)
          : example,
      );
    } catch (err) {
      console.error("Failed to fetch article data:", err);
      setError("아티클을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 삭제 처리 함수
  const handleDelete = () => {
    setIsDeleted(true);
    setError("아티클이 삭제되었습니다.");
  };

  // 돌아가기 함수 (마켓플레이스로 이동)
  const handleGoBack = () => {
    router.push("/marketplace");
  };

  useEffect(() => {
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

  if (error || !article || isDeleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-lg text-red-400">
            {error || "아티클을 찾을 수 없습니다."}
          </div>
          <button
            onClick={handleGoBack}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="max-w-[1920px] w-[345px] pb-[20px] sm:w-full sm:mx-0 sm:px-[20px] sm:pt-0 md:px-[220px]">
          <p className="hidden font-baskinRobbins font-normal text-[16px]/[16px] text-gray-300 py-[40px] sm:block md:text-[24px]/[25px] md:py-[60px]">
            마켓플레이스
          </p>
          <MobileHeader title={"마켓플레이스"} src="/" />

          <div className="min-h-screen flex flex-col items-center bg-black text-white">
            <div className="w-[345px] sm:w-full sm:max-w-[1480px]">
              <h1 className="w-[345px] sm:w-full md:w-full mx-auto text-[24px] sm:text-[32px] md:text-[40px] font-bold mb-4 sm:mb-6 border-b border-gray-100 pb-2">
                {article.userPhotoCard?.photoCard?.title || "포토카드"}
              </h1>

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mt-13">
                {/* 왼쪽 이미지 - useState로 관리 */}
                <div className="w-[345px] sm:w-full md:w-full mx-auto">
                  <Image
                    src={imgSrc}
                    alt="판매 이미지"
                    className="w-full object-cover"
                    width={345}
                    height={400}
                    onError={() => setImgSrc(example)}
                  />
                </div>

                {/* 오른쪽 카드 정보 */}
                <SellerCardInfo
                  cardArticle={{
                    id: article.id,
                    photoCard: {
                      title: article.userPhotoCard?.photoCard?.title,
                      description:
                        article.userPhotoCard?.photoCard?.description,
                      rank: article.userPhotoCard?.photoCard?.rank,
                      genre: article.userPhotoCard?.photoCard?.genre,
                      creator: {
                        nickname:
                          article.userPhotoCard?.photoCard?.creator?.nickname,
                      },
                      imgUrl: imgSrc,
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
                  onUpdate={fetchArticleData}
                  onDelete={handleDelete}
                />
              </div>
              <ExchangeCard type="seller" cardArticle={cardArticle} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
