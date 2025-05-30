import React from "react";
import MySell from "./_components/MySell";
import { Suspense } from "react";
import Loading from "../Loading";

export default function MySellPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MySell />
    </Suspense>
  );
}
