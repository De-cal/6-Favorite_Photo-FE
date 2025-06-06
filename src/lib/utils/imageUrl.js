// lib/utils/imageUrl.js
import example from "../../assets/images/img-card-placeholder-1.webp";

export const getImageUrl = (imgUrl) => {
  if (!imgUrl || imgUrl === "") {
    return example.src || example;
  }

  if (imgUrl.startsWith("http")) {
    return imgUrl;
  }

  if (imgUrl.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_BASE_URL}${encodeURI(imgUrl)}`;
  }

  // 파일명만 있는 경우
  const encodedFileName = encodeURIComponent(imgUrl);
  return `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${encodedFileName}`;
};


// 카드 컴포넌트에서 사용 예시:
// import { getImageUrl } from '@/utils/imageUrl';
//
// <Image
//   src={getImageUrl(card.photoCard.imgUrl)}
//   alt={card.photoCard.title}
//   width={300}
//   height={400}
// />
