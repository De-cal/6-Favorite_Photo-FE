import React, { Suspense } from "react";
import MyGallery from "./_components/MyGallery";

export default function MyGalleryPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <MyGallery />
    </Suspense>
  );
}
