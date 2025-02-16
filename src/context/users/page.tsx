"use client";

import { createContext, useContext } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { useQuery } from "react-query";

type UserRequest = {
  name: string;
  email: string;
  description: string;
};

type UserContextType = {
  data: UserRequest | undefined;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:62005/api",
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const token = cookies.get("token-desafioo.tech");

  const { data, isLoading } = useQuery<UserRequest>(
    "user",
    async () => {
      const response = await api.get("/User", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1 minuto
      enabled: !!token,
    }
  );

  return (
    <UserContext.Provider value={{ data, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
