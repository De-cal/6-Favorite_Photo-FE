"use client";

import React, { useState } from "react";
import useCardCreateForm from "@/hooks/useCardCreateForm";
import FormInput from "./_components/FormInput";
import FileUploadInput from "./_components/FileUploadInput";
import Dropdown from "./_components/Dropdown";
import TopSection from "./_components/TopSection";
import ActionButton from "@/components/ui/buttons/ActionButton";
import CommonModal from "@/components/common/CommonModal";
import { createCard } from "@/lib/api/card.api";
import { useModal } from "@/providers/ModalProvider";
import { useAuth } from "@/providers/AuthProvider";
import { useCreateStatus } from "@/hooks/useCreateStatus";

  export default function MyGalleryCreatePage() {
  const { form, error, set, handler, isValid, validate } = useCardCreateForm();
  const { openModal } = useModal();
  const { createStatus, decrementCreateCount, refreshCreateStatus } = useCreateStatus();
  //const { user, refreshUser } = useAuth();
  //const [showNotice, setShowNotice] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // 생성 가능 여부 체크
    if (!createStatus.canCreate || createStatus.createCount === 0) {
      openModal(
        <CommonModal
          type="포토카드 생성"
          result="실패"
          data={{
            rank: form.rank,
            title: form.title,
            message: "이번달 모든 생성 기회를 소진했어요.",
          }}
        />
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("rank", form.rank);
    formData.append("genre", form.genre);
    formData.append("price", form.price);
    formData.append("totalQuantity", form.totalQuantity);
    formData.append("description", form.description);
    formData.append("file", form.file);

    try {
      const result = await createCard(formData);

      // refreshUser를 제거하고 모달에서만 처리
      // await refreshUser();

      // 성공 시 상태 업데이트 (optimistic update)
      decrementCreateCount();

      // 성공 모달 열기
      openModal(
        <CommonModal
          type="포토카드 생성"
          result="성공"
          data={{
            rank: form.rank,
            title: form.title,
            remainingCount: result.data?.userInfo?.remainingCreateCount
          }}
        />,
      );
    } catch (err) {
      console.error("카드 생성 오류:", err);

      // 실패 모달 열기
      openModal(
        <CommonModal
          type="포토카드 생성"
          result="실패"
          data={{
            rank: form.rank,
            title: form.title,
          }}
        />,
      );
    }
  };

  return (
    <div className="flex flex-col px-[15px] sm:px-[20px] items-center justify-center max-w-[356px] sm:max-w-[700px] md:max-w-[1480px] mx-auto mb-[50px]">
      <TopSection />
      <form
        onSubmit={handleSubmit}
        className="w-[345px] sm:w-[440px] md:w-[520px] space-y-6"
      >
        <FormInput
          id="title"
          label="포토카드 이름"
          value={form.title}
          onChange={(e) => set.setTitle(e.target.value)}
          onBlur={handler.handleTitleBlur}
          placeholder="포토카드 이름을 입력해 주세요"
          errorMessage={error.titleError}
        />

        <Dropdown
          type="등급"
          label="등급"
          value={form.rank}
          setValue={set.setRank}
          onBlur={handler.handleRankBlur}
          errorMessage={error.rankError}
        />
        <Dropdown
          type="장르"
          label="장르"
          value={form.genre}
          setValue={set.setGenre}
          onBlur={handler.handleGenreBlur}
          errorMessage={error.genreError}
        />

        <FormInput
          id="price"
          label="가격"
          value={form.price}
          onChange={handler.handlePriceChange}
          placeholder="가격을 입력해 주세요"
          errorMessage={error.priceError}
        />

        <FormInput
          id="totalQuantity"
          label="총 발행량"
          value={form.totalQuantity}
          onChange={handler.handleQuantityChange}
          placeholder="총 발행량을 입력해 주세요"
          errorMessage={error.quantityError}
        />

        <FileUploadInput
          file={form.file}
          setFile={set.setFile}
          onBlur={handler.handleFileBlur}
          errorMessage={error.fileError}
        />

        <div className="flex flex-col gap-2.5 w-full mt-[25px] sm:mt-[50px] md:mt-[50px] h-[140px] md:h-[180px]">
          <label
            htmlFor="description"
            className="block mb-1 font-bold text-[20px] text-white"
          >
            설명
          </label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => set.setDescription(e.target.value)}
            onBlur={handler.handleDescriptionBlur}
            placeholder="카드 설명을 입력해 주세요"
            rows={5}
            className="w-full border border-gray-300 rounded-xs  py-[18px] px-[20px] resize-none bg-black placeholder:text-gray-200 text-white"
          />
          {error.descriptionError && (
            <p className="text-red text-sm font-semibold leading-6">
              {error.descriptionError}
            </p>
          )}
        </div>

        <ActionButton
          type="submit"
          variant="primary"
          disabled={!isValid}
          className="w-full py-3 text-lg"
        >
          생성하기
        </ActionButton>
      </form>
    </div>
  );
}
