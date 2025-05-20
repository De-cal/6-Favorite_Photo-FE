"use client";
import React, { useState } from "react";

export default function MyGalleryCreatePage() {

  const [totalQuantity, setTotalQuantity] = useState("");
  const [error, setError] = useState("");

  const handleQuantityChange = (e) => {
    const value = e.target.value;

    if (value === "" || Number(value) <= 10) {
      setTotalQuantity(value);
      setError(""); // 경고 제거
    } else {
      setTotalQuantity(value);
      setError("총 발행량은 10장 이하로만 가능합니다.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-start p-8">
      <form className="w-full max-w-[400px] space-y-6">
        {/* 포토카드 이름 */}
        <div>
          <label className="block mb-1">포토카드 이름</label>
          <input
            type="text"
            placeholder="포토카드 이름을 입력해 주세요"
            className="w-full bg-black border border-gray-400 px-4 py-2 placeholder-gray-400"
          />
        </div>

        {/* 등급 */}
        <div>
          <label className="block mb-1">등급</label>
          <select className="w-full bg-black border border-gray-400 px-4 py-2">
            <option value="">등급을 선택해 주세요</option>
            <option value="legendary">LEGENDARY</option>
            <option value="epic">EPIC</option>
            <option value="rare">RARE</option>
          </select>
        </div>

        {/* 장르 */}
        <div>
          <label className="block mb-1">장르</label>
          <select className="w-full bg-black border border-gray-400 px-4 py-2">
            <option value="">장르를 선택해 주세요</option>
            <option value="풍경">풍경</option>
            <option value="음식">음식</option>
            <option value="인물">인물</option>
          </select>
        </div>

        {/* 가격 */}
        <div>
          <label className="block mb-1">가격</label>
          <input
            type="number"
            placeholder="가격을 입력해 주세요"
            className="w-full bg-black border border-gray-400 px-4 py-2 placeholder-gray-400"
          />
        </div>

        {/* 총 발행량 */}
        <div>
          <label className="block mb-1">총 발행량</label>
          <input
            type="number"
            placeholder="총 발행량을 입력해 주세요"
            value={totalQuantity}
            onChange={handleQuantityChange}
            className={`w-full bg-black border ${
              error ? "border-red-500" : "border-gray-400"
            } px-4 py-2 placeholder-gray-400`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        {/* 사진 업로드 */}
        <div>
          <label className="block mb-1">사진 업로드</label>
          <div className="flex">
            <input
              type="text"
              readOnly
              placeholder="사진 업로드"
              className="w-full bg-black border border-gray-400 px-4 py-2 placeholder-gray-400"
            />
            <label className="ml-2 bg-yellow-400 text-black px-4 py-2 cursor-pointer">
              파일 선택
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* 설명 */}
        <div>
          <label className="block mb-1">포토카드 설명</label>
          <textarea
            placeholder="설명을 입력해 주세요"
            rows={4}
            className="w-full bg-black border border-gray-400 px-4 py-2 placeholder-gray-400"
          />
        </div>

        {/* 생성 버튼 */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-3 font-semibold text-lg"
          disabled={!!error}
        >
          생성하기
        </button>
      </form>
    </div>
  );
}
