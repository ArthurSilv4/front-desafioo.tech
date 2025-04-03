"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { LoginCredentials, LoginResponse} from "@/types/authType"

type AuthContextType = {
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const loginMutation = useMutation<LoginResponse, Error, LoginCredentials>(
    async (credentials) => {
      const response = await api.post("/Auth/Login", credentials);
      return response.data;
    },
    {
      onSuccess: (data) => {
        Cookies.set("token-desafioo.tech", data.token, { expires: 0.33 }); // 8 horas
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

  const logout = useCallback(() => {
    Cookies.remove("token-desafioo.tech");
    setIsAuthenticated(false);
    router.push("/singIn");
  }, [router]);

  const checkTokenExpiration = useCallback(() => {
    const token = Cookies.get("token-desafioo.tech");
    if (!token) {
      logout();
      return;
    }
    const tokenExpiration = JSON.parse(atob(token.split(".")[1])).exp * 1000;
    if (Date.now() >= tokenExpiration) {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    if (pathname && pathname.startsWith("/dashboard")) {
      checkTokenExpiration();
      const interval = setInterval(() => {
        checkTokenExpiration();
      }, 30000); // Verifica a cada 30 segundos
      return () => clearInterval(interval);
    }
  }, [pathname, router, checkTokenExpiration]);

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
