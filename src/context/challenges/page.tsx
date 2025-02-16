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
  starts: number;
};

type ChallengeContextType = {
  useFetchChallenge: () => {
    data: ChallengeResponse[] | undefined;
    isLoading: boolean;
  };
  useFetchChallengeById: (id: string) => {
    data: ChallengeResponse | undefined;
    isLoading: boolean;
  };
};

const ChallengeContext = createContext<ChallengeContextType | undefined>(
  undefined
);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:62005/api",
});

const ChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const useFetchChallenge = () => {
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
    return { data, isLoading };
  };

  const useFetchChallengeById = (id: string) => {
    const { data, isLoading } = useQuery<ChallengeResponse>(
      ["challenge", id],
      async () => {
        const response = await api.get(
          `/Challenge/ChallengeId?challengeId=${id}`
        );
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

    return { data, isLoading };
  };

  return (
    <ChallengeContext.Provider
      value={{ useFetchChallenge, useFetchChallengeById }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

const useChallenge = () => {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { ChallengeProvider, useChallenge };
