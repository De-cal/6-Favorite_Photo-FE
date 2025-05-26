"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import closeIcon from "@/assets/icons/ic-close.svg";

function CommonModal({ isOpen, onClose, children, className = "", overlayClassName = "" }) {
  const modalRef = useRef(null);

  const handleOverlayClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50 ${overlayClassName}`}
      onClick={handleOverlayClick}
    >
      <div className={`relative rounded-md shadow-lg ${className}`} ref={modalRef}>
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
          onClick={onClose}
        >
          <Image src={closeIcon} alt="closeModalButton" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default CommonModal;
