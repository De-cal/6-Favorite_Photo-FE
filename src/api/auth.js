import { validateEmail, validatePassword, validateNickname, validateConfirmPassword } from "@/utils/authValidators";
const AUTH_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";

export async function signUp({ email, nickname, password, passwordConfirm }) {
  //  유저인풋 유효성 검사먼저 실행
  const emailValidationResult = validateEmail(email);
  if (!emailValidationResult.isValid) {
    throw new Error(emailValidationResult.message);
  }

  const nicknameValidationResult = validateNickname(nickname);
  if (!nicknameValidationResult.isValid) {
    throw new Error(nicknameValidationResult.message);
  }

  const passwordValidationResult = validatePassword(password);
  if (!passwordValidationResult.isValid) {
    throw new Error(passwordValidationResult.message);
  }

  const confirmPasswordValidationResult = validateConfirmPassword(password, passwordConfirm);
  if (!confirmPasswordValidationResult.isValid) {
    throw new Error(confirmPasswordValidationResult.message);
  }

  // RequestData 를 stringify 하여 requestBody로 객체 생성, api 호출시 body에 담아 보냄
  const requestData = {
    email,
    nickname,
    password,
    passwordConfirmation: passwordConfirm,
  };

  const requestBody = JSON.stringify(requestData);

  try {
    const response = await fetch(`${AUTH_API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("Failed to fetch")) {
      throw new Error("Network error: 서버에 연결할 수 없습니다");
    }
    throw error;
  }
}

export async function login({ email, password }) {
  //  유저인풋 필드마다 유효성 검사먼저 실행
  const emailValidationResult = validateEmail(email);
  if (!emailValidationResult.isValid) {
    throw new Error(emailValidationResult.message);
  }

  const passwordValidationResult = validatePassword(password);
  if (!passwordValidationResult.isValid) {
    throw new Error(passwordValidationResult.message);
  }

  // RequestData 를 stringify 하여 requestBody로 객체 생성, api 호출시 body에 담아 보냄
  const requestData = { email, password };
  const requestBody = JSON.stringify(requestData);

  try {
    const response = await fetch(`${AUTH_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("Failed to fetch")) {
      throw new Error("Network error: 서버에 연결할 수 없습니다");
    }
    throw error;
  }
}

// 로그아웃
export async function logout() {}
