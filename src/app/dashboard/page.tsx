"use client";

import { CardChallengeList } from "@/components/CardChallengeList/page";
import { useChallenge } from "@/context/challenges/page";
import { Separator } from "@radix-ui/react-separator";
import { Swords } from "lucide-react";

export default function Dashboard() {
  const { useFetchChallengeUser } = useChallenge();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto p-4">
        <div className="flex items-center gap-2">
          <Swords />
          <h1 className="text-4xl font-bold">Meus Desafios</h1>
        </div>
        <Separator className="h-[1px] bg-gray-300 my-2" />

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <CardChallengeList
            challengeList={useFetchChallengeUser().data}
            isLoading={useFetchChallengeUser().isLoading}
            page="/dashboard/"
          />
        </div>
      </div>
    </div>
  );
}
