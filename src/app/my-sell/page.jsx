import React, { Suspense } from "react";
import MySell from "./_components/MySell";
import Loading from "@/components/common/Loading";

export default function MySellPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MySell />;
    </Suspense>
  );
}
