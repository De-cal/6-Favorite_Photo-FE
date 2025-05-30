"use client";
import React, {
  createContext,
  useRef,
  useEffect,
  useContext,
  useState,
} from "react";

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [modalAlign, setModalAlign] = useState({
    col: "center",
    row: "center",
  });
  const [pointModalAlign, setPointModalAlign] = useState({
    col: "center",
    row: "center",
  });
  const [pointModalContent, setPointModalContent] = useState(null);
  const modalRef = useRef();
  const pointModalRef = useRef();

  const openModal = (
    content,
    col = "center",
    row = "center",
    isPoint = false,
  ) => {
    if (isPoint) setPointModalContent(() => content);
    else setModalContent(() => content);
    if (isPoint) setPointModalAlign({ col, row });
    else setModalAlign({ col, row });
  };

  const closeModal = () => setModalContent(null);
  const closePointModal = () => setPointModalContent(null);

  const getWrapperClass = (isPoint) => {
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
    const align = isPoint ? pointModalAlign : modalAlign;
    return `${colMap[align.col] || "items-center"} ${
      rowMap[align.row] || "justify-center"
    }`;
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (pointModalContent) closePointModal();
        else closeModal();
        document.body.style.overflow = "auto";
      }
    };
    if (modalContent || pointModalContent) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalContent, pointModalContent]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (
        pointModalContent &&
        pointModalRef.current &&
        !pointModalRef.current.contains(e.target)
      ) {
        closePointModal();
        return;
      }
      if (
        modalContent &&
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !(pointModalRef.current && pointModalRef.current.contains(e.target))
      ) {
        closeModal();
        document.body.style.overflow = "auto";
      }
    };
    if (modalContent || pointModalContent) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [modalContent, pointModalContent]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closePointModal }}>
      {children}
      {modalContent && (
        <div
          className={`fixed inset-0 z-50 bg-black/80 flex ${getWrapperClass()}`}
        >
          <div ref={modalRef} className="relative max-h-screen">
            {typeof modalContent === "function" ? modalContent() : modalContent}
          </div>
        </div>
      )}
      {pointModalContent && (
        <div
          className={`fixed inset-0 z-60 bg-black/60 flex ${getWrapperClass(
            true,
          )}`}
        >
          <div ref={pointModalRef} className="relative">
            {typeof pointModalContent === "function"
              ? pointModalContent()
              : pointModalContent}
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
