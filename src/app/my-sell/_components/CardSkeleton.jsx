import React from "react";

function CardSkeleton() {
  return (
    <div className="bg-gray-500 border-1 border-white/10 flex flex-col items-center justify-center font-light cursor-pointer md:w-[440px] md:h-[600px] md:px-[40px]">
      <div className="relative sm:mt-0">
        <div className="bg-black/50 absolute top-[5px] left-[5px] py-[5px] px-2 rounded-[2px]"></div>
        <div className="md:w-[360px] md:h-[270px] w-[302px] h-[226px]" />
      </div>

      <div className="w-full flex flex-col">
        <p className="text-white truncate overflow-hidden whitespace-nowrap w-full font-bold">
          ---
        </p>
        <div className="flex justify-between w-full mt-[10px]">
          <div className="flex gap-[4px] items-center">
            <div className="border-l border-gray-400 h-3 mx-[10px]" />
            <p className="text-gray-300">---</p>
          </div>
          <p className="text-white underline font-normal">----</p>
        </div>

        <div className="border-b border-gray-400 h-[1px] w-full my-[20px]" />

        <div className="flex justify-between w-full">
          <p className="text-gray-300">가격</p>
          <p className="text-white font-normal"> ---P</p>
        </div>
        <div className="flex justify-between w-full mt-[10px]">
          <p className="text-gray-300">수량</p>
          <div className="flex gap-[2px]">
            <p className="text-white font-normal">---</p>

            <p className="text-gray-300">/ --- </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-[30px] md:mt-[40px]">
        <div className="block sm:block w-[100px] h-[18px]" />
      </div>
    </div>
  );
}

export default CardSkeleton;
