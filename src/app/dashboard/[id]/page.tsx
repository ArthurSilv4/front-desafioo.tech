"use client";

import { ChallengeEditForms } from "@/components/Forms/ChallengeEditForms/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Pen } from "lucide-react";
import { useParams } from "next/navigation";
import { useChallenge } from "@/context/challenges/page";

export default function DashboardChallengeId() {
  const { id } = useParams() as { id: string };

  const { useDeleteChallenge } = useChallenge();

  function handleDelete() {
    useDeleteChallenge.mutate({ id });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="mx-auto p-4 max-w-5xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Pen />
                <h1 className="text-2xl font-bold md:text-4xl">
                  Editar Desafio
                </h1>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Deletar</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Deletar Desafio</DialogTitle>
                      <DialogDescription>
                        Tem Certeza que deseja deletar esse desafio?
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button>Voltar</Button>
                      </DialogClose>
                      <Button variant="destructive" onClick={handleDelete}>
                        Deletar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardTitle>
          </CardHeader>

          <Separator className="h-[1px] bg-gray-300 my-2" />

          <CardContent className="space-y-4">
            <ChallengeEditForms id={id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
