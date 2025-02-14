"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {

  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>404 - Página não encontrada</h1>
    </div>
  );
}
