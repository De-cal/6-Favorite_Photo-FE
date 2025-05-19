"use client";
import CommonModal from "@/components/ui/CommonModal";
import { useModal } from "@/providers/ModalProvider";
import React from "react";

function page() {
  const { openModal } = useModal();

  const data = { rank: "SuperRare", title: "스페인풍경", quantity: 2 };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl ">판매 등록 성공 실패</h1>
        <div className="flex flex-row justify-between items-center gap-10">
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(<CommonModal type="판매" result="성공" data={data} />)
            }
          >
            성공
          </button>
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(<CommonModal type="판매" result="성공" data={data} />)
            }
          >
            실패
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl ">구매 성공 실패</h1>
        <div className="flex flex-row justify-between items-center gap-10">
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(<CommonModal type="구매" result="성공" data={data} />)
            }
          >
            성공
          </button>
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(<CommonModal type="구매" result="성공" data={data} />)
            }
          >
            실패
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl ">교환 성공 실패</h1>
        <div className="flex flex-row justify-between items-center gap-10">
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(
                <CommonModal type="교환 제시" result="성공" data={data} />
              )
            }
          >
            성공
          </button>
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(
                <CommonModal type="교환 제시" result="성공" data={data} />
              )
            }
          >
            실패
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl ">생성 성공 실패</h1>
        <div className="flex flex-row justify-between items-center gap-10">
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(
                <CommonModal type="포토카드 생성" result="성공" data={data} />
              )
            }
          >
            성공
          </button>
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(
                <CommonModal type="포토카드 생성" result="성공" data={data} />
              )
            }
          >
            실패
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
