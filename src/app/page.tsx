"use client";

import Main from "@/components/Layout/Main/page";
import { CardChallengeList } from "@/components/CardChallengeList/page";
import { useChallenge } from "@/context/challenges/page";
import { Separator } from "@radix-ui/react-separator";

export default function Home() {
  const { useFetchChallenge } = useChallenge();
  const fetchChallenge = useFetchChallenge();

  return (
    <Main>
      <section className="min-h-screen" id="challenge">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Desafios</h1>
          <Separator className="bg-gray-300 h-[1px] my-4" />

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
            <CardChallengeList
              challengeList={fetchChallenge.data}
              isLoading={fetchChallenge.isLoading}
              page="/"
            />
          </div>
        </div>
      </section>
    </Main>
  );
}
