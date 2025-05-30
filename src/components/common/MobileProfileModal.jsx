"use client";

import { useModal } from "@/providers/ModalProvider";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/providers/AuthProvider";

export default function MobileProfileModal() {
  const { closeModal } = useModal();
  const { user, logout } = useAuth();

  // 모바일 모달 닫기
  const handleMobileModalClose = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleLogoutAndClose = async () => {
    await logout();
    closeModal();
  };

  return (
    <div
      onClick={handleMobileModalClose}
      className="fixed top-0 right-0 bottom-0 left-0 bg-transparent z-1 sm:hidden"
    >
      <div className="fixed flex flex-col justify-between min-h-screen min-w-[260px] bg-gray-500 z-2">
        <div className="font-notoSans flex flex-col pt-[40px] px-[20px] pb-[27px] gap-[20px] border-b-[1px] border-gray-400">
          <h1 className="font-bold text-[18px]/[22px]">
            {user ? `안녕하세요, ${user.nickname}님!` : "로그인이 필요합니다"}
          </h1>

          {user && (
            <div className="flex justify-between items-center">
              <p className="font-light text-[12px]/[14px] text-gray-300">
                보유 포인트
              </p>
              <p className="font-normal text-[12px]/[14px] text-main">
                {new Intl.NumberFormat().format(user.pointAmount)} P
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 justify-between items-start pt-[20px] px-[20px] pb-[40px]">
          {user ? (
            <>
              <div className="flex flex-col justify-center items-start gap-[15px]">
                <Link
                  href="/marketplace"
                  onClick={handleMobileModalClose}
                  className="font-bold text-[14px]/[17px]"
                >
                  마켓플레이스
                </Link>
                <Link
                  href="/my-gallery"
                  onClick={handleMobileModalClose}
                  className="font-bold text-[14px]/[17px]"
                >
                  마이갤러리
                </Link>
                <Link
                  href="/my-sell"
                  onClick={handleMobileModalClose}
                  className="font-bold text-[14px]/[17px]"
                >
                  판매 중인 포토카드
                </Link>
              </div>
              <button
                onClick={handleLogoutAndClose}
                className="font-notoSans font-normal text-[14px]/[17px] text-gray-400"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              onClick={handleMobileModalClose}
              href="/login"
              className="font-notoSans font-normal text-[14px]/[17px] text-main underline"
            >
              로그인 하러가기
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
