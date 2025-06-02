// components/FileUploadInput.jsx
"use client";

import clsx from "clsx";

export default function FileUploadInput({ file, setFile, errorMessage }) {
  const handleBlur = () => {
    // 파일이 없을 때 에러 메시지를 표시하기 위해 빈 함수로 두고
    // 실제 검증은 useCardCreateForm 훅에서 처리됨
  };

  return (
    <div className="flex flex-col gap-2.5 w-full mt-[25px] sm:mt-[50px] md:mt-[50px]">
      <label className="block mb-1 font-bold text-[20px] text-white">사진 업로드</label>
      <div className="flex items-center">
        <input
          type="text"
          readOnly
          placeholder="사진 업로드"
          value={file?.name || ""}
          onBlur={handleBlur}
          className={clsx(
            "w-full h-[55px] md:h-[60px] rounded-xs bg-black border px-4 py-2 placeholder-gray-200 text-white",
            errorMessage ? "border-red-500" : "border-gray-200"
          )}
        />
        <label htmlFor="file-upload" className="ml-2 cursor-pointer">
          <div
            className={clsx(
              "w-[120px] h-[55px] md:h-[60px] flex justify-center items-center",
              "border border-main text-main rounded-xs"
            )}
          >
            파일 선택
          </div>
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
      </div>
      {errorMessage && (
        <p className="text-red text-sm font-semibold leading-6">{errorMessage}</p>
      )}
    </div>
  );
}