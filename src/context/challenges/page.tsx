"use client";

import { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
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

type CreateChallengeRequest = {
  title: string;
  description: string;
  dificulty: string;
  category: string[];
  links?: string[];
};

type EditChallengeRequest = {
  title?: string;
  description?: string;
  dificulty?: string;
  category?: string[];
  links?: string[];
};

type ChallengeContextType = {
  useFetchChallenge: () => {
    data: ChallengeResponse[] | undefined;
    isLoading: boolean;
  };
  useFetchChallengeUser: () => {
    data: ChallengeResponse[] | undefined;
    isLoading: boolean;
  };
  useFetchChallengeById: (id: string) => {
    data: ChallengeResponse | undefined;
    isLoading: boolean;
  };
  useFetchAuthorsChallenges: () => {
    data: [] | undefined;
    isLoading: boolean;
  };
  useStartChallenge: {
    mutate: (variables: StartsChallengeRequest) => void;
    isLoading: boolean;
  };
  isSuccess: boolean;
  resetSuccess: () => void;
  useCreateChallenge: {
    mutate: (variables: CreateChallengeRequest) => void;
    isLoading: boolean;
  };

  useEditChallenge: {
    mutate: (variables: { id: string } & EditChallengeRequest) => void;
    isLoading: boolean;
  };
};

const ChallengeContext = createContext<ChallengeContextType | undefined>(
  undefined
);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:62747/api",
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

  const useFetchChallengeUser = () => {
    const token = Cookies.get("token-desafioo.tech");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const { data, isLoading } = useQuery<ChallengeResponse[]>(
      "challenges",
      async () => {
        const response = await api.get("/Challenge/ListChallengeUser", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
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

  const useFetchAuthorsChallenges = () => {
    const { data, isLoading } = useQuery<[]>(
      "AuthorsChallenges",
      async () => {
        const response = await api.get("/Challenge/ListAuthorsChallenge");
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

  const useCreateChallenge = useMutation<
    ChallengeResponse,
    Error,
    CreateChallengeRequest
  >(
    async (data) => {
      const token = Cookies.get("token-desafioo.tech");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.post(
        "/Challenge/CreateNewChallenge",
        {
          title: data.title,
          description: data.description,
          dificulty: data.dificulty,
          category: data.category,
          links: data.links || [],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
        console.error("Error creating challenge:", error);
        setIsSuccess(false);
      },
    }
  );

  const useEditChallenge = useMutation<
    ChallengeResponse,
    Error,
    { id: string } & EditChallengeRequest
  >(
    async ({ id, ...data }) => {
      const token = Cookies.get("token-desafioo.tech");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.put(
        `/Challenge/UpdateChallenge?challengeId=${id}`,
        {
          title: data.title,
          description: data.description,
          dificulty: data.dificulty,
          category: data.category,
          links: data.links,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    {
      onSuccess: () => {
        alert("Desafio editado com sucesso!");
      },
      onError: (error) => {
        console.error("Error editing challenge:", error);
      },
    }
  );

  return (
    <ChallengeContext.Provider
      value={{
        useFetchChallenge,
        useFetchChallengeUser,
        useFetchChallengeById,
        useFetchAuthorsChallenges,
        isSuccess,
        resetSuccess,
        useStartChallenge,
        useCreateChallenge,
        useEditChallenge,
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
