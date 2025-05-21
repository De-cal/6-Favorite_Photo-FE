"use client";
import React, { useState } from "react";
import ActionButton from "@/components/ui/buttons/ActionButton";

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
    name &&
    grade &&
    genre &&
    price &&
    totalQuantity &&
    !error &&
    description &&
    file;

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-start p-8">
      <form className="w-[345px] sm:w-[440px] md:w-[520px] space-y-6">
        <div>
          <label className="block mb-1">포토카드 이름</label>
          <input
            type="text"
            placeholder="포토카드 이름을 입력해 주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black border border-gray-400 px-4 py-2 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1">등급</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full bg-black border border-gray-400 px-4 py-2"
          >
            <option value="">등급을 선택해 주세요</option>
            <option value="legendary">LEGENDARY</option>
            <option value="epic">EPIC</option>
            <option value="rare">RARE</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">장르</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full bg-black border border-gray-400 px-4 py-2"
          >
            <option value="">장르를 선택해 주세요</option>
            <option value="풍경">풍경</option>
            <option value="음식">음식</option>
            <option value="인물">인물</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">가격</label>
          <input
            type="number"
            placeholder="가격을 입력해 주세요"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-black border border-gray-400 px-4 py-2 placeholder-gray-400"
          />
        </div>

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

        <div>
          <label className="block mb-1">사진 업로드</label>
          <div className="flex">
            <input
              type="text"
              readOnly
              placeholder="사진 업로드"
              value={file?.name || ""}
              className="w-full bg-black border border-gray-400 px-4 py-2 placeholder-gray-400"
            />
            <label className="ml-2">
              <ActionButton variant="upload" className="px-4 py-2">
                파일 선택
              </ActionButton>
              <input type="file" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-1">포토카드 설명</label>
          <textarea
            placeholder="설명을 입력해 주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full bg-black border border-gray-400 px-4 py-2 placeholder-gray-400"
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
  );
}
