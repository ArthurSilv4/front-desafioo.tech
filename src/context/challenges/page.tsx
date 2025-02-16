"use client";

import { createContext, useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";

type ChallengeResponse = {
  id: string;
  title: string;
  description: string;
  dificulty: string;
  category: string;
  author: string;
  links?: string[];
  startCount: number;
};

type ChallengeContextType = {
  data: ChallengeResponse[] | undefined;
  isLoading: boolean;
};

const ChallengeContext = createContext<ChallengeContextType | undefined>(
  undefined
);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:62005/api",
});

const ChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useQuery<ChallengeResponse[]>(
    "challenges",
    async () => {
      const response = await api.get("/Challenge/ListChallenge");
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,

      onError: (error) => {
        console.error(error);
      },
    }
  );

  return (
    <ChallengeContext.Provider value={{ data, isLoading }}>
      {children}
    </ChallengeContext.Provider>
  );
};

const Challenge = () => {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { ChallengeProvider, Challenge };
