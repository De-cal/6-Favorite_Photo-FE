import Link from "next/link";
import React from "react";

function TopTitle({ data }) {
  return (
    <section className="sm:flex sm:flex-col items-start justify-center gap-10 w-full">
      <Link href={"/my-gallery"}>
        <div className="font-baskinRobbins text-gray-300 hidden sm:block">
          마이갤러리
        </div>
      </Link>
      <h1 className="text-[24px] pb-[10px] border-b-2 px- border-gray-100 w-full">
        {data.photoCard.title}
      </h1>
    </section>
  );
}

export default TopTitle;
