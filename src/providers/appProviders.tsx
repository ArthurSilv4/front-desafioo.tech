"use client";

import { QueryClientProvider } from "react-query";
import { AuthProvider } from "@/context/users/auth/page";
import { ReactNode } from "react";
import { queryClient } from "@/services/queryClient";

interface ProviderProps {
  children: ReactNode;
}

export function AppProviders({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
