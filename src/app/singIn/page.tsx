import SingInForms from "@/components/Forms/SingInForms/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function SignIn() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-blue-700">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <User className="h-6 w-6" />
            Entrar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SingInForms />
        </CardContent>
      </Card>
    </main>
  );
}
