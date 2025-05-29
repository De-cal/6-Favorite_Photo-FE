"use client";
import { createContext, useContext, useEffect, useState } from "react";
import authService from "@/lib/api/auth.api.js";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  user: null,
  signUp: () => {},
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
  const getUser = async () => {
    try {
      const userData = await authService.getMe();
      setUser(userData);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };
  const signUp = async (name, email, password) => {
    await authService.signUp(name, email, password);
  };

  const login = async (email, password) => {
    await authService.login(email, password);
    await getUser();
  };

  const logout = async () => {
    console.log("로그아웃");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
