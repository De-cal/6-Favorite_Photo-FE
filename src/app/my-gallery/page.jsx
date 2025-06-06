import { Suspense } from "react";
import MyGallery from "./_components/MyGallery";
import Loading from "@/components/common/Loading";

export default function MyGalleryPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MyGallery />
    </Suspense>
  );
}
