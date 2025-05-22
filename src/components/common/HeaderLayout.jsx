"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ic_menu from "@/assets/icons/ic-menu.svg";
import img_logo from "@/assets/images/img-logo.svg";
import MobileProfileModal from "./MobileProfileModal";
import TabletAndDesktopProfileModal from "./TabletAndDesktopProfileModal";
import { useModal } from "@/providers/ModalProvider";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Notification from "../modal/notification/Notification";

export default function HeaderLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { openModal } = useModal();

  const path = usePathname();

  // 모바일 모달 열기
  const handleMobileModalOpen = () => {
    openModal(<MobileProfileModal />);
  };

  // 태블릿, PC 프로필 모달 토글
  const handleTabletAndDesktopModalOpen = () => {
    setIsModalVisible(!isModalVisible);
  };

  // 태블릿, PC 프로필 모달 닫기
  const handleTabletAndDesktopModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {!["/login", "/signup"].includes(path) && (
        <div
          className={clsx(
            !["/marketplace", "/"].includes(path)
              ? "hidden sm:block"
              : "flex justify-center items-center font-notoSans"
          )}
        >
          <div className="flex justify-between items-center w-full max-w-[1920px] h-[60px] px-[20px] sm:h-[70px] sm:px-[40px] md:h-[80px] md:px-[220px]">
            <button
              onClick={handleMobileModalOpen}
              className="relative w-[22px] h-[22px] cursor-pointer sm:hidden"
            >
              <Image src={ic_menu} alt="메뉴" fill className="object-cover" />
            </button>
            <Link
              href="/"
              className="absolute left-[50%] translate-x-[-50%] w-[83.37px] h-[15.12px] sm:relative sm:left-auto sm:translate-x-0"
            >
              <Image
                src={img_logo}
                alt="최애의 포토"
                fill
                className="object-cover"
              />
            </Link>
            {/* 지수님 TODO: 인증/인가 하실 때 true 부분 변경하시면 됩니다. */}
            {true ? (
              <div className="flex justify-center items-center gap-[30px]">
                <p className="font-bold text-[14px]/[17px] text-gray-200 hidden sm:block">
                  1,540 P
                </p>
                <div>
                  <Notification />
                </div>
                <div className="relative hidden sm:block">
                  <button
                    onClick={handleTabletAndDesktopModalOpen}
                    className="font-baskinRobbins font-normal text-[18px]/[18px] tracking-[-3%] text-gray-200 cursor-pointer"
                  >
                    유디
                  </button>
                  {isModalVisible && (
                    <TabletAndDesktopProfileModal
                      handleTabletAndDesktopModalClose={
                        handleTabletAndDesktopModalClose
                      }
                    />
                  )}
                </div>
                <div className="border-l-[1.5px] border-gray-400 h-[17px] hidden sm:block"></div>
                <Link
                  href="/"
                  className="font-notoSans font-normal text-[14px]/[17px] text-gray-400 hidden sm:block"
                >
                  로그아웃
                </Link>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-[30px]">
                <Link
                  href="/login"
                  className="font-medium text-[14px]/[17px] text-gray-200"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="font-medium text-[14px]/[17px] text-gray-200 hidden sm:block"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
