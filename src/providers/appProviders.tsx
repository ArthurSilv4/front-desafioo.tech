"use client";

import { QueryClientProvider } from "react-query";
import { AuthProvider } from "@/context/users/auth/page";
import { ReactNode } from "react";
import { queryClient } from "@/services/queryClient";
import { ChallengeProvider } from "@/context/challenges/page";
import { UserProvider } from "@/context/users/page";

interface ProviderProps {
  children: ReactNode;
}

export function AppProviders({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChallengeProvider>
          <UserProvider>{children}</UserProvider>
        </ChallengeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
