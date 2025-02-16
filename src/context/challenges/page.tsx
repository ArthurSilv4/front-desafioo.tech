"use client";

import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

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

type StartChallengeResponse = {
  message: string;
  dto: {
    name: string;
    email: string;
    challenge: ChallengeResponse;
  };
};

type StartsChallengeRequest = {
  id: string;
  name: string;
  email: string;
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
  useStartChallenge: {
    mutate: (variables: StartsChallengeRequest) => void;
    isLoading: boolean;
  };
  isSuccess: boolean;
  resetSuccess: () => void;
};

const ChallengeContext = createContext<ChallengeContextType | undefined>(
  undefined
);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:62005/api",
});

const ChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const resetSuccess = () => setIsSuccess(false);

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

  const useStartChallenge = useMutation<
    StartChallengeResponse,
    Error,
    StartsChallengeRequest
  >(
    async (data) => {
      const response = await api.post(
        `/Challenge/StartChallenge?challengeId=${data.id}`,
        {
          name: data.name,
          email: data.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return (
    <ChallengeContext.Provider
      value={{
        useFetchChallenge,
        useFetchChallengeById,
        isSuccess,
        resetSuccess,
        useStartChallenge,
      }}
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
