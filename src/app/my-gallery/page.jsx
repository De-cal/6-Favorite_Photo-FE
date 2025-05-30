import React, { Suspense } from "react";
import MyGallery from "./_components/MyGallery";
import Loading from "../Loading";

export default function MyGalleryPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MyGallery />
    </Suspense>
  );
}
