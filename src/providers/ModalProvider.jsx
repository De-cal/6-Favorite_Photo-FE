"use client";
import React, { createContext, useRef, useEffect, useContext, useState } from "react";

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [modalAlign, setModalAlign] = useState({ col: "center", row: "center" });
  //col = [top,centet,bottom] //row = [left,centet,right]
  const modalRef = useRef();

  const openModal = (content, col = "center", row = "center") => {
    setModalContent(() => content);
    setModalAlign({ col, row });
  };
  const closeModal = () => setModalContent(null);

  //모달 위치에 따른 css 지정 함수
  const getWrapperClass = () => {
    const colMap = {
      top: "items-start",
      center: "items-center",
      bottom: "items-end",
    };

    const rowMap = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    };

    return `${colMap[modalAlign.col] || "items-center"} ${rowMap[modalAlign.row] || "justify-center"}`;
  };

  //ESC 키로 닫기
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (modalContent) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalContent]);

  // 바깥 클릭으로 닫기
  useEffect(() => {
    const onClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (modalContent) {
      document.addEventListener("mousedown", onClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [modalContent]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modalContent && (
        <div className={`fixed inset-0 z-50 bg-black/80 flex ${getWrapperClass()}`}>
          <div ref={modalRef} className="relative" onClick={(e) => e.stopPropagation()}>
            {typeof modalContent === "function" ? modalContent() : modalContent}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal은 ModalProvider 안에서 사용해야 해요!");
  }
  return context;
};

export default ModalProvider;
