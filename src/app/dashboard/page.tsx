"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useChallenge } from "@/context/challenges/page";
import { Separator } from "@radix-ui/react-separator";
import { Camera, Code2Icon, Swords } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { useFetchChallengeUser } = useChallenge();

  const myChallenges = useFetchChallengeUser().data;

  if (!myChallenges) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto p-4">
        <div className="flex items-center gap-2">
          <Swords />
          <h1 className="text-4xl font-bold">Meus Desafios</h1>
        </div>
        <Separator className="h-[1px] bg-gray-300 my-2" />

        <div className="flex flex-wrap gap-4 justify-center items-center">
          {myChallenges.map((challenge, index) => (
            <Link href={`/dashboard/${challenge.id}`} key={index}>
              <Card className="hover:shadow-lg transition-shadow mb-4 w-72 2xl:w-80">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 w-full">
                    <div className="rounded-lg p-2 bg-teal-100">
                      <Code2Icon />
                    </div>
                    <div className="space-y-1 w-full truncate">
                      <h2 className="text-base font-medium text-blue-950 truncate">
                        {challenge.title}
                      </h2>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Camera className="w-4 h-4" />
                        <span className="inline-block">
                          Mais de {challenge.starts} pessoas já começaram
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
