"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useChallenge } from "@/context/challenges/page";
import { ChallengeIdForms } from "@/components/Forms/ChallengeIdForms";
import { Skeleton } from "@/components/ui/skeleton";

type SectionChallengeIdProps = {
  id: string;
};

export function SectionChallengeId({ id }: SectionChallengeIdProps) {
  const { useFetchChallengeById } = useChallenge();

  const { data: challenge, isLoading } = useFetchChallengeById(id);

  if (!challenge || isLoading) {
    return (
      <section className="min-h-screen ">
        <Separator className="h-[1px] w-full bg-gray-300 " />
        <div className="container mx-auto p-4">
          <div className="flex justify-between gap-4 flex-col items-start lg:flex-row">
            <div className="lg:max-w-[50%]">
              <h1 className="text-3xl font-bold">Carregando...</h1>
              <div>Carregando...</div>
            </div>
            <div className="flex flex-col items-center gap-4 w-full lg:w-fit">
              <div>
                <div className="flex items-center justify-center gap-1 mt-4">
                  <Users fill="true" size={20} />
                  <span className="font-semibold">
                    0 Pessoas Já Iniciaram Esse Desafio
                  </span>
                </div>
                <Card className="w-full min-w- max-w-sm mt-4">
                  <CardHeader>
                    <CardTitle>Iniciar Desafio</CardTitle>
                    <CardDescription>
                      Preencha com suas informacoes para receber o desafio
                      completo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChallengeIdForms id={id} />
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col items-center mt-8 p-8 text-white bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg">
                <span className="font-bold text-xl lg:text-2xl">
                  Desafio Criado Por
                </span>
                <span className="font-bold text-xl lg:text-3xl">
                  <Skeleton className="w-36 h-6 mt-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen ">
      <Separator className="h-[1px] w-full bg-gray-300 " />
      <div className="container mx-auto p-4">
        <div className="flex justify-between gap-4 flex-col items-start lg:flex-row">
          <div className="lg:max-w-[50%]">
            <h1 className="text-3xl font-bold">{challenge.title}</h1>
            <div
              className="text-justify mt-4"
              dangerouslySetInnerHTML={{ __html: challenge.description }}
            />
          </div>
          <div className="flex flex-col items-center gap-4 w-full lg:w-fit">
            <div>
              <div className="flex items-center justify-center gap-1 mt-4">
                <Users fill="true" size={20} />
                <span className="font-semibold">
                  {challenge.starts} Pessoas Já Iniciaram Esse Desafio
                </span>
              </div>
              <Card className="w-full min-w- max-w-sm mt-4">
                <CardHeader>
                  <CardTitle>Iniciar Desafio</CardTitle>
                  <CardDescription>
                    Preencha com suas informacoes para receber o desafio
                    completo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChallengeIdForms id={id} />
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col items-center mt-8 p-8 text-white bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg">
              <span className="font-bold text-xl lg:text-2xl">
                Desafio Criado Por
              </span>
              <span className="font-bold text-xl lg:text-3xl">
                {challenge.author}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
