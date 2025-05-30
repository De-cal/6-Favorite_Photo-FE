import React from "react";
import MySell from "./_components/MySell";
import { Suspense } from "react";
export default function MySellPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <MySell />
    </Suspense>
  );
}
