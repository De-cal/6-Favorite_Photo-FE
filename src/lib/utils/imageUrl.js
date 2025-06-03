// lib/utils/imageUrl.js
import example from '../../assets/images/img-card-placeholder-1.svg';

export const getImageUrl = (imgUrl) => {
  // console.log('🖼️ getImageUrl 호출:', {
  //   original: imgUrl,
  //   baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  //   type: typeof imgUrl
  // });

  // imgUrl이 없거나 빈 문자열인 경우 기본 이미지
  if (!imgUrl || imgUrl === "") {
    // console.log('🖼️ 기본 이미지 사용');
    return example.src || example;
  }
  
  // 이미 전체 URL인 경우 (http:// 또는 https://)
  if (imgUrl.startsWith('http')) {
    // console.log('🖼️ 전체 URL 사용:', imgUrl);
    return imgUrl;
  }
  
  // 상대 경로인 경우 (예: "/uploads/image.jpg")
  if (imgUrl.startsWith('/')) {
    const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${imgUrl}`;
    // console.log('🖼️ 상대 경로 URL 생성:', fullUrl);
    return fullUrl;
  }
  
  // 파일명만 있는 경우 (예: "1703123456789-image.jpg")
  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${imgUrl}`;
  // console.log('🖼️ 파일명 URL 생성:', fullUrl);
  return fullUrl;
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