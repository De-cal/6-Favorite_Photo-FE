"use client";
import React, { useState } from "react";
import { createCard } from "@/api/card";
import ActionButton from "@/components/ui/buttons/ActionButton";
import Dropdown from "../_components/Dropdown";
import TopSection from "./_components/TopSection";
import CommonModal from "@/components/common/CommonModal";
import { useModal } from "@/providers/ModalProvider";

import clsx from "clsx";


export default function MyGalleryCreatePage() {
  const [title, setTitle] = useState("");
  const [rank, setRank] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  const { openModal } = useModal();

  const handlePriceChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    if (e.target.value !== numericValue || numericValue === "") {
      setPrice(e.target.value);
      setPriceError("숫자로 입력해주세요");
    } else if (Number(numericValue) > 999) {
      setPrice(numericValue);
      setPriceError("999 이하로 입력해주세요");
    } else {
      setPrice(numericValue);
      setPriceError("");
    }
  };

  const handleQuantityChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    if (e.target.value !== numericValue || numericValue === "") {
      setTotalQuantity(e.target.value);
      setQuantityError("숫자로 입력해주세요");
    } else if (Number(numericValue) > 10) {
      setTotalQuantity(numericValue);
      setQuantityError("총 발행량은 10장 이하로만 가능합니다.");
    } else {
      setTotalQuantity(numericValue);
      setQuantityError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("파일을 선택해 주세요");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("rank", rank);
    formData.append("genre", genre);
    formData.append("price", price);
    formData.append("totalQuantity", totalQuantity);
    formData.append("description", description);

    try {
      await createCard(formData);
      openModal(
        <CommonModal
          type="포토카드 생성"
          result="성공"
          data={{ rank, title }}
        />
      );
    } catch (err) {
      openModal(
        <CommonModal
          type="포토카드 생성"
          result="실패"
          data={{ rank, title }}
        />
      );
    }
  };


  const isFormValid =
    title && rank && genre && price && totalQuantity && !priceError && !quantityError && description && file;

  return (
    <div className="flex flex-col px-[15px] sm:px-[20px] items-center justify-center max-w-[1480px] mx-auto">
      <TopSection />
      <div className="min-h-screen bg-black text-white flex justify-center items-start p-8">
        <form onSubmit={handleSubmit} className="w-[345px] sm:w-[440px] md:w-[520px] space-y-6">
          <Input label="포토카드 이름" value={title} setValue={setTitle} placeholder="포토카드 이름을 입력해 주세요" />
          <label className="block mb-1 font-bold text-[20px]">등급</label>
          <Dropdown type="등급" value={rank} setValue={setRank} />
          <label className="block mb-1 font-bold text-[20px]">장르</label>
          <Dropdown type="장르" value={genre} setValue={setGenre} />

          <div>
            <label className="block mb-1 font-bold text-[20px]">가격</label>
            <input
              type="text"
              placeholder="가격을 입력해 주세요"
              value={price}
              onChange={handlePriceChange}
              className={`w-full h-[60px] bg-black border ${priceError ? "border-red-500" : "border-gray-400"} px-4 py-2 placeholder-gray-200`}
            />
            {priceError && <p className="text-red-500 text-sm mt-1">{priceError}</p>}
          </div>

          <div>
            <label className="block mb-1 font-bold text-[20px]">총 발행량</label>
            <input
              type="text"
              placeholder="총 발행량을 입력해 주세요"
              value={totalQuantity}
              onChange={handleQuantityChange}
              className={`w-full h-[60px] bg-black border ${quantityError ? "border-red-500" : "border-gray-400"} px-4 py-2 placeholder-gray-200`}
            />
            {quantityError && <p className="text-red-500 text-sm mt-1">{quantityError}</p>}
          </div>

          {/* 파일 업로드 */}
          <div>
            <label className="block mb-1 font-bold text-[20px]">사진 업로드</label>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                placeholder="사진 업로드"
                value={file?.name || ""}
                className="w-full min-h-[60px] bg-black border border-gray-400 px-4 py-2 placeholder-gray-200"
              />
              <label htmlFor="file-upload" className="ml-2 cursor-pointer">
                <div className={clsx("w-[120px] h-[60px] flex justify-center items-center", "border border-main text-main")}>
                  파일 선택
                </div>
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
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
    </div>
  );
}

const Input = ({ label, value, setValue, placeholder }) => (
  <div>
    <label className="block mb-1 font-bold text-[20px]">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full h-[60px] bg-black border border-gray-400 px-4 py-2 placeholder-gray-200"
    />
  </div>
);
