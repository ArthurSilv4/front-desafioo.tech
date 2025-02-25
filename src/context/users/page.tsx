"use client";

import { createContext, useContext } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { useMutation, UseMutationResult, useQuery } from "react-query";
import { useRouter } from "next/navigation";

type UserResponse = {
  name: string;
  email: string;
  description: string;
};

type UpdateUserNameRequest = {
  newName: string;
};

type UpdateUserDescriptionRequest = {
  newDescription: string;
};

type UpdatePasswordRequest = {
  code: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type UserContextType = {
  useFetchUser: () => {
    data: UserResponse | undefined;
    isLoading: boolean;
  };

  useUpdateUserName: UseMutationResult<
    UserResponse,
    Error,
    UpdateUserNameRequest
  >;

  useUpdateUserDescription: UseMutationResult<
    UserResponse,
    Error,
    UpdateUserDescriptionRequest
  >;

  useUpdatePassword: UseMutationResult<
    UserResponse,
    Error,
    UpdatePasswordRequest
  >;

  useSendCode: UseMutationResult<UserResponse, Error, void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:64071/api",
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const token = cookies.get("token-desafioo.tech");
  const router = useRouter();

  const useFetchUser = () => {
    const { data, isLoading } = useQuery<UserResponse>(
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
    return { data, isLoading };
  };

  const useUpdateUserName = useMutation<
    UserResponse,
    Error,
    UpdateUserNameRequest
  >(
    async (UserUpdateRequest) => {
      const { data: currentUser } = await api.get("/User", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (currentUser.name === UserUpdateRequest.newName) {
        throw new Error("O novo nome deve ser diferente do atual.");
      }

      const response = await api.put(
        "/User/UpdateUserName",
        UserUpdateRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    {
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const useUpdateUserDescription = useMutation<
    UserResponse,
    Error,
    UpdateUserDescriptionRequest
  >(
    async (UserUpdateRequest) => {
      const { data: currentUser } = await api.get("/User", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (currentUser.description === UserUpdateRequest.newDescription) {
        throw new Error("A nova descrição deve ser diferente da atual.");
      }

      const response = await api.put(
        "/User/UpdateDescription",
        UserUpdateRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    {
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const useSendCode = useMutation<UserResponse, Error, void>(
    async () => {
      const response = await api.post(
        "/User/SendConfirmationEmail",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        alert("Código enviado com sucesso");
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const useUpdatePassword = useMutation<
    UserResponse,
    Error,
    UpdatePasswordRequest
  >(
    async (UserUpdateRequest) => {
      const response = await api.put(
        "/User/UpdatePassword",
        UserUpdateRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        alert("Sua senha foi alterada com sucesso. Faça login novamente.");
        cookies.remove("token-desafioo.tech");
        router.push("/dashboard");
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  return (
    <UserContext.Provider
      value={{
        useFetchUser,
        useUpdateUserName,
        useUpdateUserDescription,
        useUpdatePassword,
        useSendCode,
      }}
    >
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
