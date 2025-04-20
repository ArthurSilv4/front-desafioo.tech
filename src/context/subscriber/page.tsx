import axios from "axios";
import { createContext, useContext } from "react";
import { useMutation, UseMutationResult } from "react-query";
import { toast } from "sonner";

export type SubscriberResponse = {
  message: string;
};

export type SubscriberRequest = {
  email: string;
};

export type SubscriberContextType = {
  useSubscriber: UseMutationResult<
    SubscriberResponse,
    Error,
    SubscriberRequest,
    unknown
  >;
};

const SubscriberContext = createContext<SubscriberContextType | undefined>(
  undefined
);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const SubscriberProvider = ({ children }: { children: React.ReactNode }) => {
  const useSubscriber = useMutation<
    SubscriberResponse,
    Error,
    SubscriberRequest
  >(
    async (data) => {
      const response = await api.post(
        `/Subscriber`,
        {
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
        toast.success("Inscrição Realizada com sucesso!", {
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

  return (
    <SubscriberContext.Provider
      value={{
        useSubscriber,
      }}
    >
      {children}
    </SubscriberContext.Provider>
  );
};

const useSubscriberContext = () => {
  const context = useContext(SubscriberContext);
  if (!context) {
    throw new Error(
      "useSubscriberContext must be used within a SubscriberProvider"
    );
  }
  return context;
};

export { SubscriberProvider, useSubscriberContext };
