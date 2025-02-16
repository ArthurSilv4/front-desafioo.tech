"use client";

import Main from "@/components/Layout/Main/page";
import { Card, CardContent } from "@/components/ui/card";
import { Challenge } from "@/context/challenges/page";
import { Separator } from "@radix-ui/react-separator";
import { Camera, Code2Icon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data: challengeList, isLoading } = Challenge();

  if (isLoading || !challengeList) {
    return (
      <Main>
        <section className="min-h-screen" id="challenge">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">Desafios</h1>
            <Separator className="bg-gray-300 h-[1px] my-4" />

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
              <Link href={""}>
                <Card className="hover:shadow-lg transition-shadow mb-4 w-72 2xl:w-80">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 w-full">
                      <div className="rounded-lg p-2 bg-teal-100">
                        <Code2Icon />
                      </div>
                      <div className="space-y-1 w-full truncate">
                        <h2 className="text-base font-medium text-blue-950 truncate">
                          Carregando...
                        </h2>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <Camera className="w-4 h-4" />
                          <span className="inline-block">Carregando...</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </Main>
    );
  }
  return (
    <Main>
      <section className="min-h-screen" id="challenge">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Desafios</h1>
          <Separator className="bg-gray-300 h-[1px] my-4" />

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
            {challengeList.map((challenge, index) => (
              <Link href={`/${challenge.id}`} key={index}>
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
                            Mais de 10 pessoas já começaram
                            {/* Mais de {challenge.startCount} pessoas já começaram */}
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
      </section>
    </Main>
  );
}
