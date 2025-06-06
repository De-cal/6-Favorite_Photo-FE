import Image from "next/image";
import clsx from "clsx";
import left from "@/assets/icons/ic-left.svg";
import right from "@/assets/icons/ic-right.svg";
import leftGray from "@/assets/icons/ic-left-gray.svg";
import rightGray from "@/assets/icons/ic-right-gray.svg";

export default function PageNation({ count, currentPage, onClick }) {
  const renderPages = () => {
    const pages =
      count <= 7
        ? Array.from({ length: count }, (_, i) => i + 1)
        : [1, 2, 3, "...", count - 2, count - 1, count];

    return pages.map((page, i) =>
      page === "..." ? (
        <span
          key={`dot-${i}`}
          className="w-[45px] h-[45px] flex items-center justify-center text-white"
        >
          ...
        </span>
      ) : (
        <button
          key={page}
          className={clsx(
            "cursor-pointer w-[45px] h-[45px] text-white",
            currentPage === page ? "border border-white" : "border-none",
          )}
          onClick={() => onClick(page)}
        >
          {page}
        </button>
      ),
    );
  };

  return (
    <div className="flex flex-row w-full max-w-[480px] h-[45px] gap-[10px] items-center justify-center pt-15 pb-45">
      {count === 0 ? null : (
        <button
          className={`w-[20px] h-[45px] flex flex-row justify-start ${
            currentPage === 1 ? "cursor-default opacity-50" : "cursor-pointer"
          }`}
          onClick={() => {
            if (currentPage !== 1) onClick(currentPage - 1);
          }}
        >
          <Image src={currentPage === 1 ? leftGray : left} alt="이전페이지" />
        </button>
      )}
      {renderPages()}
      {count === 0 ? null : (
        <button
          className={`w-[20px] h-[45px] flex flex-row justify-end ${
            currentPage === count
              ? "cursor-default opacity-50"
              : "cursor-pointer"
          }`}
          onClick={() => {
            if (currentPage !== count) onClick(currentPage + 1);
          }}
        >
          <Image
            src={currentPage === count ? rightGray : right}
            alt="다음페이지"
          />
        </button>
      )}
    </div>
  );
}
