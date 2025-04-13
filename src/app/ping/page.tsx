"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default function Ping() {
  const useFetchPing = () => {
    return useQuery<string>(
      "ping",
      async () => {
        const response = await api.get("/Ping");
        return response.data;
      },
      {
        enabled: true,
        refetchOnWindowFocus: true,
        refetchInterval: 300000,
        staleTime: 300000,
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  const { data: pingData, isLoading, error } = useFetchPing();

  useEffect(() => {
    if (pingData) {
      localStorage.setItem("lastPing", pingData);
    }
  }, [pingData]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading ping.</p>;

  const lastPing =
    typeof window !== "undefined"
      ? localStorage.getItem("lastPing") || "No ping saved yet."
      : "No ping saved yet.";

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1>Ping</h1>
      <p>Ultimo ping: {lastPing}</p>
    </main>
  );
}
