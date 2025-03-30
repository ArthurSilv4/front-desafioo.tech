import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ProfileForms } from "@/components/Forms/ProfileForms/page";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            <span>Editar Perfil</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProfileForms />
          <Separator />
          <div>
            <Link
              href={"/newPassword"}
              className="text-sm underline text-blue-500"
            >
              Mudar Senha
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
