"use client";
import React, { useState } from "react";
import ActionButton from "@/components/ui/buttons/ActionButton";
import Dropdown from "../_components/Dropdown";
import MobileHeader from "@/components/common/MobileHeader";

export default function MyGalleryCreatePage() {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) <= 10) {
      setTotalQuantity(value);
      setError("");
    } else {
      setTotalQuantity(value);
      setError("총 발행량은 10장 이하로만 가능합니다.");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const isFormValid =
    name && grade && genre && price && totalQuantity && !error && description && file;

  return (
    <>
    <MobileHeader src="/marketplace" title="마켓플레이스" />
    <div className="min-h-screen bg-black text-white flex justify-center items-start p-8">
      <form className="w-[345px] sm:w-[440px] md:w-[520px] space-y-6">
        <div>
          <label className="block mb-1 font-bold text-[20px]">포토카드 이름</label>
          <input
            type="text"
            placeholder="포토카드 이름을 입력해 주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[60px] bg-black border border-gray-400 px-4 py-2 placeholder-gray-200"
          />
        </div>

        <div>
          <label className="block mb-1 font-bold text-[20px]">등급</label>
          <Dropdown type="등급" value={grade} setValue={setGrade} />
        </div>

        <div>
          <label className="block mb-1 font-bold text-[20px]">장르</label>
          <Dropdown type="장르" value={genre} setValue={setGenre} />
        </div>



        <div>
          <label className="block mb-1 font-bold text-[20px]">가격</label>
          <input
            type="number"
            placeholder="가격을 입력해 주세요"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-[60px] bg-black border border-gray-400 px-4 py-2 placeholder-gray-200"
          />
        </div>

        <div>
          <label className="block mb-1 font-bold text-[20px]">총 발행량</label>
          <input
            type="number"
            placeholder="총 발행량을 입력해 주세요"
            value={totalQuantity}
            onChange={handleQuantityChange}
            className={`w-full h-[60px] bg-black border ${
              error ? "border-red-500" : "border-gray-400"
            } px-4 py-2 placeholder-gray-200`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div>
          <label className="block mb-1 font-bold text-[20px]">사진 업로드</label>
          <div className="flex">
            <input
              type="text"
              readOnly
              placeholder="사진 업로드"
              value={file?.name || ""}
              className="w-full min-h-[60px] bg-black border border-gray-400 px-4 py-2 placeholder-gray-200"
            />
            <label className="ml-2">
              <ActionButton variant="upload" className="w-[120px] h-[60px] px-4 py-2">
                파일 선택
              </ActionButton>
              <input type="file" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-bold text-[20px]">포토카드 설명</label>
          <textarea
            placeholder="설명을 입력해 주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full bg-black border border-gray-400 px-4 py-2 placeholder-gray-200"
          />
        </div>

        <ActionButton
          type="submit"
          variant="primary"
          disabled={!isFormValid}
          className="w-full py-3 text-lg"
        >
          생성하기
        </ActionButton>
      </form>
    </div>
    </>
  );
}
