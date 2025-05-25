"use client";
import React from "react";

export default function AuthModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className="flex items-center justify-center bg-black rounded-[8px] w-[327px] md:w-[540px] h-[220px] md:h-[250px] relative border border-gray-200"
        style={{ boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex flex-col gap-[40px] items-center justify-center">
          <p className="font-medium text-white text-lg text-center leading-[26px]">{children}</p>
          <button
            className="w-[120px] md:w-[165px] h-[48px] flex items-center justify-center bg-main hover:bg-main/80 active:bg-main/60 cursor-pointer text-black font-semibold rounded-lg"
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
