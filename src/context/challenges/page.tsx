"use client";

import { createContext, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { queryClient } from "@/services/queryClient";
import { toast } from "sonner";
import {
  ChallengeResponse,
  StartChallengeResponse,
  StartsChallengeRequest,
  CreateChallengeRequest,
  EditChallengeRequest,
  AuthorInformationsResponse,
} from "@/types/challengeType";
import { UseMutationResult } from "react-query";

export type ChallengeContextType = {
  useFetchChallenge: () => {
    data: ChallengeResponse[] | undefined;
    isLoading: boolean;
  };

  useAuthorInformations: (id: string) => {
    data: AuthorInformationsResponse | undefined;
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

  useStartChallenge: UseMutationResult<
    StartChallengeResponse,
    Error,
    StartsChallengeRequest
  >;

  useCreateChallenge: UseMutationResult<
    ChallengeResponse,
    Error,
    CreateChallengeRequest
  >;

  useEditChallenge: UseMutationResult<
    ChallengeResponse,
    Error,
    { id: string } & EditChallengeRequest
  >;

  useDeleteChallenge: UseMutationResult<
    ChallengeResponse,
    Error,
    { id: string }
  >;
};

const ChallengeContext = createContext<ChallengeContextType | undefined>(
  undefined
);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const ChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const useFetchChallenge = () => {
    const { data, isLoading } = useQuery<ChallengeResponse[]>(
      "challenges",
      async () => {
        const response = await api.get("/Challenge/ListChallenge");
        return response.data;
      },
      {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60, // 1 minuto
        cacheTime: 1000 * 60 * 5, // 5 minutos
        onError: (error) => {
          console.error(error);
        },
      }
    );
    return { data, isLoading };
  };

  const useAuthorInformations = (id: string) => {
    const { data, isLoading } = useQuery<AuthorInformationsResponse>(
      ["author", id],
      async () => {
        const response = await api.get(
          `/Challenge/AuthorInformations?challengeId=${id}`
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

  const useFetchChallengeUser = () => {
    const { data, isLoading } = useQuery<ChallengeResponse[]>(
      "challenges",
      async () => {
        const token = Cookies.get("token-desafioo.tech");
        if (!token) {
          throw new Error("No authentication token found");
        }
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
        toast.success("Desafio iniciado com sucesso!", {
          duration: 5000,
          richColors: true,
          description: "Verifique seu email para mais informações.",
        });
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
        toast.success("Desafio Criado Com Sucesso!", {
          duration: 5000,
          richColors: true,
        });
        router.push("/dashboard");
        queryClient.invalidateQueries("challenges");
      },
      onError: (error) => {
        console.error("Error creating challenge:", error);
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
        toast.success("Desafio Editado Com Sucesso!", {
          duration: 5000,
          richColors: true,
        });
      },
      onError: (error) => {
        console.error("Error editing challenge:", error);
      },
    }
  );

  const useDeleteChallenge = useMutation<
    ChallengeResponse,
    Error,
    { id: string }
  >(
    async ({ id }) => {
      const token = Cookies.get("token-desafioo.tech");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.delete(
        `/Challenge/DeleteChallenge?challengeId=${id}`,
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
        toast.success("Desafio Excluído Com Sucesso!", {
          duration: 5000,
          richColors: true,
        });
        router.push("/dashboard");
        queryClient.invalidateQueries("challenges");
      },
      onError: (error) => {
        console.error("Error deleting challenge:", error);
      },
    }
  );

  return (
    <ChallengeContext.Provider
      value={{
        useFetchChallenge,
        useAuthorInformations,
        useFetchChallengeUser,
        useFetchChallengeById,
        useFetchAuthorsChallenges,
        useStartChallenge,
        useCreateChallenge,
        useEditChallenge,
        useDeleteChallenge,
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
