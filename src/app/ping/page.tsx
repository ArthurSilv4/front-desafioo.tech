"use client";

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

  const { data: pingData } = useFetchPing();

  if (pingData) {
    localStorage.setItem("lastPing", pingData);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1>Ping</h1>
      <p>
        Ultimo ping: {localStorage.getItem("lastPing") || "No ping saved yet."}
      </p>
    </main>
  );
}
