import { NewPasswordForms } from "@/components/Forms/NewPasswordForms/page";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function NewPassword() {
  return (
    <main className="min-h-screen flex items-center justify-center h-full bg-gradient-to-r from-blue-500 to-blue-700">
      <Card>
        <CardHeader>
          <CardTitle>Recuperar senha</CardTitle>
          <CardDescription>
            Digite o codigo que foi enviado para o seu email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewPasswordForms />
        </CardContent>
      </Card>
    </main>
  );
}
