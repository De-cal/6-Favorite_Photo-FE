import { cookieFetch } from "@/lib/api/fetchClient.api";
import {
  validateEmail,
  validatePassword,
  validateNickname,
  validateConfirmPassword,
} from "@/lib/utils/authValidators";

export const signUpApi = async ({ email, nickname, password, passwordConfirm }) => {
  // 유효성 검사
  const emailValidationResult = validateEmail(email);
  if (!emailValidationResult.isValid)
    throw new Error(emailValidationResult.message);

  const nicknameValidationResult = validateNickname(nickname);
  if (!nicknameValidationResult.isValid)
    throw new Error(nicknameValidationResult.message);

  const passwordValidationResult = validatePassword(password);
  if (!passwordValidationResult.isValid)
    throw new Error(passwordValidationResult.message);

  const confirmPasswordValidationResult = validateConfirmPassword(
    password,
    passwordConfirm,
  );
  if (!confirmPasswordValidationResult.isValid)
    throw new Error(confirmPasswordValidationResult.message);

  // API 요청
  return cookieFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      nickname,
      password,
      passwordConfirmation: passwordConfirm,
    }),
  });
}
export const loginApi = async ({ email, password }) => {
  const emailValidationResult = validateEmail(email);
  if (!emailValidationResult.isValid)
    throw new Error(emailValidationResult.message);

  const passwordValidationResult = validatePassword(password);
  if (!passwordValidationResult.isValid)
    throw new Error(passwordValidationResult.message);

  return cookieFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export const logoutApi = async () => {
  return cookieFetch("/auth/logout", {
    method: "POST",
  });
}

export const getMeApi= async () => {
  return cookieFetch("/auth/me", {
    method: "GET",
  });
}
