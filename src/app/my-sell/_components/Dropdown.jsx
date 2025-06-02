"use client";
import down from "@/assets/icons/ic-down.svg";
import up from "@/assets/icons/ic-up.svg";
import Image from "next/image";
import { useMemo } from "react";
import { genreChange } from "@/lib/utils/genreChange";

export default function Dropdown({
  type,
  selectedValue,
  onSelect,
  isOpen,
  setOpenDropdown,
}) {
  const getOptionsByType = () => {
    switch (type) {
      case "장르":
        return ["PORTRAIT", "LANDSCAPE", "ANIMAL", "OBJECT", "FOOD", "ETC"].map(
          (genre) => [genre, genreChange(genre)],
        );
      case "판매방법":
        return [
          ["SELLING", "판매 중"],
          ["EXCHANGE_REQUESTED", "교환 대기 중"],
        ];
      case "매진여부":
        return [
          ["SELLING", "판매 중"],
          ["SOLDOUT", "판매 완료"],
        ];
      case "등급":
      default:
        return [
          ["COMMON", "COMMON"],
          ["RARE", "RARE"],
          ["SUPER RARE", "SUPER RARE"],
          ["LEGENDARY", "LEGENDARY"],
        ];
    }
  };

  const label = useMemo(() => {
    const options = getOptionsByType();
    const found = options.find(([val]) => val === selectedValue);
    return found ? found[1] : type;
  }, [selectedValue]);

  return (
    <div className="w-full flex flex-row gap-[5px]">
      <div className="relative flex items-center gap-1">
        <div
          className="font-bold text-[14px] md:text-[16px] whitespace-nowrap cursor-pointer"
          onClick={() => setOpenDropdown(isOpen ? null : type)}
        >
          {label}
        </div>
        <button
          className="cursor-pointer min-w-[24px] min-h-[10px]"
          onClick={() => setOpenDropdown(isOpen ? null : type)}
        >
          <Image alt="down" width={24} height={24} src={isOpen ? up : down} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 z-11 max-w-45 border border-gray-200 bg-black ">
            {getOptionsByType().map(([value, label]) => (
              <div
                key={value}
                className="py-2 px-4 hover:bg-gray-800 cursor-pointer whitespace-nowrap"
                onClick={() => {
                  onSelect(value);
                  setOpenDropdown(null);
                }}
              >
                {label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
