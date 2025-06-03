"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ic_menu from "@/assets/icons/ic-menu.svg";
import img_logo from "@/assets/images/img-logo.avif";
import MobileProfileModal from "./MobileProfileModal";
import TabletAndDesktopProfileModal from "./TabletAndDesktopProfileModal";
import { useModal } from "@/providers/ModalProvider";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Notification from "../modal/notification/Notification";
import { useAuth } from "@/providers/AuthProvider";

export default function HeaderLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { openModal } = useModal();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const path = usePathname();

  // 태블릿 -> 모바일로 가면 모달 자동 닫기
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 744px)");

    const handleMediaChange = (e) => {
      if (e.matches) {
        setIsModalVisible(false);
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  // 모바일 모달 열기
  const handleMobileModalOpen = () => {
    openModal(<MobileProfileModal />);
  };

  // 태블릿, PC 프로필 모달 토글
  const handleTabletAndDesktopModalOpen = () => {
    setIsNotificationModalOpen(false);

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
            !["/marketplace", "/"].includes(path) && "hidden sm:flex",
            "flex justify-center items-center font-notoSans",
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
            {user ? (
              <div className="flex justify-center items-center gap-[30px]">
                <p className="font-bold text-[14px]/[17px] text-gray-200 hidden sm:block">
                  {new Intl.NumberFormat().format(user.pointAmount)} P
                </p>
                <div>
                  <Notification
                    isNotificationModalOpen={isNotificationModalOpen}
                    setIsNotificationModalOpen={setIsNotificationModalOpen}
                    handleTabletAndDesktopModalClose={
                      handleTabletAndDesktopModalClose
                    }
                  />
                </div>
                <div className="relative hidden sm:block">
                  <button
                    onClick={handleTabletAndDesktopModalOpen}
                    className="font-baskinRobbins font-normal text-[18px]/[18px] tracking-[-3%] text-gray-200 cursor-pointer"
                  >
                    {user.nickname}
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
                <button
                  onClick={logout}
                  className="font-notoSans font-normal text-[14px]/[17px] text-gray-400 hidden sm:block cursor-pointer"
                >
                  로그아웃
                </button>
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
