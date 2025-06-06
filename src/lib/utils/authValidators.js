export function isRequired(value) {
  if (value === null || value === undefined || String(value).trim() === "") {
    return { isValid: false, message: "필수 입력 항목입니다." };
  }
  return { isValid: true };
}

export function validateEmail(email) {
  if (!email) {
    return { isValid: false, message: "이메일을 입력해주세요." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { isValid: false, message: "잘못된 이메일 형식입니다." };
  }
  return { isValid: true };
}
export function validateNickname(nickname) {
  if (!nickname || nickname.trim().length < 2) {
    return { isValid: false, message: "닉네임은 최소 2자 이상이어야 합니다." };
  }
  return { isValid: true };
}

export function validatePassword(password) {
  if (!password || password.trim().length < 8) {
    return { isValid: false, message: "비밀번호를 8자 이상 입력해주세요." };
  }
  // 한글 포함 여부 검사
  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  if (koreanRegex.test(password)) {
    return {
      isValid: false,
      message: "비밀번호에 한글을 입력할 수 없습니다.",
    };
  }
  // 영문, 숫자, 특수문자 포함 요구
  if (
    !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
      password,
    )
  ) {
    return {
      isValid: false,
      message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
    };
  }

  return { isValid: true };
}

export function validateConfirmPassword(password, confirmPassword) {
  if (password !== confirmPassword) {
    return { isValid: false, message: "비밀번호가 일치하지 않습니다." };
  }
  return { isValid: true };
}
