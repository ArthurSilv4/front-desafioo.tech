"use client";

import React from "react";
import Main from "@/components/Layout/Main/page";
import { useParams } from "next/navigation";

export default function ChallengeId() {
  const { id } = useParams();

  return (
    <Main>
      <section className="min-h-screen">
        <div className="container mx-auto p-4">
          <h1>titulo do desafio</h1>
          <span>id: {id}</span>
        </div>
      </section>
    </Main>
  );
}
