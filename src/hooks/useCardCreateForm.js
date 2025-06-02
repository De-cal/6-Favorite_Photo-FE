// hooks/useCardCreateForm.jsx
"use client";
import { useState } from "react";

export default function useCardCreateForm() {
  const [title, setTitle] = useState("");
  const [rank, setRank] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [rankError, setRankError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [fileError, setFileError] = useState("");

  const handlePriceChange = (e) => {
  const value = e.target.value;
  const numeric = value.replace(/[^0-9]/g, "");
  setPrice(numeric); // 숫자만 허용

  if (!numeric) {
    setPriceError("가격을 입력해주세요");
  } else if (+numeric > 999) {
    setPriceError("999 이하로 입력해주세요");
  } else {
    setPriceError("");
  }
};


  const handleQuantityChange = (e) => {
  const value = e.target.value;
  const numeric = value.replace(/[^0-9]/g, "");
  setTotalQuantity(numeric); // 숫자만 허용

  if (!numeric) {
    setQuantityError("총 발행량을 입력해주세요");
  } else if (+numeric > 10) {
    setQuantityError("총 발행량은 10장 이하로만 가능합니다.");
  } else {
    setQuantityError("");
  }
};

  const handleTitleBlur = () => {
    if (!title.trim()) {
      setTitleError("이름을 입력해주세요");
    } else {
      setTitleError("");
    }
  };

  const handleDescriptionBlur = () => {
    if (!description.trim()) {
      setDescriptionError("설명을 입력해주세요");
    } else {
      setDescriptionError("");
    }
  };

  const handleFileBlur = () => {
    if (!file) {
      setFileError("파일을 업로드해주세요");
    } else {
      setFileError("");
    }
  };

  const handleRankBlur = (currentValue = rank) => {
    if (!currentValue) {
      setRankError("등급을 선택해주세요");
    } else {
      setRankError("");
    }
  };

  const handleGenreBlur = (currentValue = genre) => {
    if (!currentValue) {
      setGenreError("장르를 선택해주세요");
    } else {
      setGenreError("");
    }
  };

  const validate = () => {
    let valid = true;
    if (!title) {
      setTitleError("이름을 입력해주세요");
      valid = false;
    } else {
      setTitleError("");
    }

    if (!rank) {
      setRankError("등급을 선택해주세요");
      valid = false;
    } else {
      setRankError("");
    }

    if (!genre) {
      setGenreError("장르를 선택해주세요");
      valid = false;
    } else {
      setGenreError("");
    }

    if (!description) {
      setDescriptionError("설명을 입력해주세요");
      valid = false;
    } else {
      setDescriptionError("");
    }

    if (!file) {
      setFileError("파일을 업로드해주세요");
      valid = false;
    } else {
      setFileError("");
    }

    return valid;
  };

  const isValid =
    title &&
    rank &&
    genre &&
    price &&
    totalQuantity &&
    !priceError &&
    !quantityError &&
    description &&
    file;

  return {
    form: {
      title,
      rank,
      genre,
      price,
      totalQuantity,
      description,
      file,
    },
    error: {
      priceError,
      quantityError,
      titleError,
      descriptionError,
      rankError,
      genreError,
      fileError,
    },
    set: {
      setTitle,
      setRank,
      setGenre,
      setDescription,
      setFile,
    },
    handler: {
      handlePriceChange,
      handleQuantityChange,
      handleTitleBlur,
      handleDescriptionBlur,
      handleFileBlur,
      handleRankBlur,
      handleGenreBlur,
    },
    isValid,
    validate,
  };
}