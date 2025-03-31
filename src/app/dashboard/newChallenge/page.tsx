import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShieldPlus } from "lucide-react";
import { NewChallengeForms } from "@/components/Forms/NewChallengeForms/page";

export default function NewChallenge() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="mx-auto p-4 max-w-5xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldPlus />
              <h1 className="text-2xl font-bold md:text-4xl">
                Publicar Novo Desafio
              </h1>
            </CardTitle>
          </CardHeader>

          <Separator className="h-[1px] bg-gray-300 my-2" />

          <CardContent className="space-y-4">
            <NewChallengeForms />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
