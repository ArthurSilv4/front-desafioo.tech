"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CheckCircle, Users } from "lucide-react";
import { useChallenge } from "@/context/challenges/page";
import MarkdownRenderer from "@/components/Markdown/MarkdownRenderer/page";
import { ChallengeIdForms } from "@/components/Forms/ChallengeIdForms/page";

type SectionChallengeIdProps = {
  id: string;
};

export function SectionChallengeId({ id }: SectionChallengeIdProps) {
  const { useFetchChallengeById, useAuthorInformations } = useChallenge();
  const { data: challenge, isLoading } = useFetchChallengeById(id);
  const { data: author } = useAuthorInformations(id);

  if (!challenge || isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto py-12 px-4">
          <div className="lg:max-w-[50%]">
            <h1 className="text-3xl font-bold">Carregando...</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-2">
            <div className="lg:col-span-3">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div className="markdown-container">
                  <div>Carregando...</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card className="border-2 border-border/50 shadow-lg">
                <CardHeader className="bg-muted/50 rounded-t-lg">
                  <CardTitle className="flex items-center text-xl">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    Iniciar Desafio
                  </CardTitle>
                  <CardDescription>
                    Preencha com suas informações para receber o desafio
                    completo
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ChallengeIdForms id={id} />
                </CardContent>
              </Card>

              <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">
                    0 pessoas já iniciaram este desafio
                  </span>
                </div>
              </div>

              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6 text-primary-foreground">
                  <h3 className="text-lg font-medium opacity-90">
                    Desafio Criado Por
                  </h3>
                  <p className="text-2xl font-bold mt-1">Carregando...</p>
                </div>
                <CardContent className="bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">Sem descrição</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto py-12 px-4">
        <div className="lg:max-w-[50%]">
          <h1 className="text-3xl font-bold">{challenge.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-2">
          <div className="lg:col-span-3">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="markdown-container">
                <MarkdownRenderer content={challenge.description} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-border/50 shadow-lg">
              <CardHeader className="bg-muted/50 rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  Iniciar Desafio
                </CardTitle>
                <CardDescription>
                  Preencha com suas informações para receber o desafio completo
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ChallengeIdForms id={id} />
              </CardContent>
            </Card>

            <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">
                  {challenge.starts === 0
                    ? "Nenhuma pessoa iniciou este desafio ainda"
                    : challenge.starts === 1
                    ? `${challenge.starts.toLocaleString(
                        "pt-BR"
                      )} pessoa já iniciou este desafio`
                    : `${challenge.starts.toLocaleString(
                        "pt-BR"
                      )} pessoas já iniciaram este desafio`}
                </span>
              </div>
            </div>

            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6 text-primary-foreground">
                <h3 className="text-lg font-medium opacity-90">
                  Desafio Criado Por
                </h3>
                <p className="text-2xl font-bold mt-1">{challenge.author}</p>
              </div>
              <CardContent className="bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">
                  {author?.description || "Sem descrição"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
