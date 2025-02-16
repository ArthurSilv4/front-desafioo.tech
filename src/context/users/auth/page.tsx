"use client";

import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

type AuthContextType = {
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:62005/api",
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const loginMutation = useMutation<LoginResponse, Error, LoginCredentials>(
    async (credentials) => {
      const response = await api.post("/Auth/Login", credentials);
      return response.data;
    },
    {
      onSuccess: (data) => {
        Cookies.set("token-desafioo.tech", data.token, {
          expires: 7,
        });
        setIsAuthenticated(true);
        router.push("/dashboard");
      },
      onError: (error) => {
        console.error(error);
        alert("Erro ao fazer login");
      },
    }
  );

  const login = (credentials: LoginCredentials) => {
    loginMutation.mutate(credentials);
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        isLoading: loginMutation.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
