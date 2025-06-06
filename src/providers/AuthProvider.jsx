"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getMeApi, loginApi, logoutApi, signUpApi } from "@/lib/api/auth.api.js";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  user: null,
  signUp: () => {},
  getUser: () => {},
  isLoading: true,
  refreshUser: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 는 AuthProvider 내부에서만 사용되야 합니다!");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getUser = async () => {
    try {
      setIsLoading(true);
      const { data: userData } = await getMeApi();
      setUser(userData);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email, nickname, password, passwordConfirm) => {
    await signUpApi(email, nickname, password, passwordConfirm);
    await getUser();
  };

  const login = async (email, password) => {
    await loginApi(email, password);
    await getUser();
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const updatedUser = await getUser(); // getUser 함수 재사용
      return updatedUser;
    } catch (error) {
      console.error("사용자 정보 새로고침 실패:", error);
      return null;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signUp, getUser, isLoading, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
