import { cookieFetch } from "@/lib/fetchClient";
import {
  validateEmail,
  validatePassword,
  validateNickname,
  validateConfirmPassword,
} from "@/utils/authValidators";

export async function signUp({ email, nickname, password, passwordConfirm }) {
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
export async function login({ email, password }) {
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

export async function logout() {
  return cookieFetch("/auth/logout", {
    method: "POST",
  });
}
