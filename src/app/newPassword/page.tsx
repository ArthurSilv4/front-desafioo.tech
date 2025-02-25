"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FormItem,
  FormMessage,
  FormControl,
  FormField,
  FormDescription,
} from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "@/context/users/page";

const formSchema = z.object({
  code: z.string().nonempty({
    message: "Por favor, insira seu código.",
  }),
  oldPassword: z.string().nonempty({
    message: "Por favor, insira sua senha antiga.",
  }),
  newPassword: z.string().nonempty({
    message: "Por favor, insira sua nova senha.",
  }),
  confirmPassword: z.string().nonempty({
    message: "Por favor, confirme sua nova senha.",
  }),
});

export default function NewPassword() {
  const { useUpdatePassword, useSendCode } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    useUpdatePassword.mutate(values);
  }

  function handleSendCode() {
    useSendCode.mutate();
  }

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
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Código:</Label>
                      <FormControl className="flex items-center gap-2">
                        <Input type="text" placeholder="Código" {...field} />
                      </FormControl>
                      <FormDescription>
                        Insira o código que foi enviado para o seu email
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button size={"sm"} onClick={handleSendCode}>
                  Enviar código
                </Button>
              </div>

              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <Label>Senha antiga:</Label>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Senha Antiga"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Insira sua senha antiga</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="mt-">
                    <Label>Senha nova:</Label>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nova Senha"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Insira sua nova senha</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mt-">
                    <Label>Confirme sua senha nova:</Label>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirme a senha"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Insira sua nova senha</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormControl className="mt-4">
                <Button type="submit">Mudar Senha</Button>
              </FormControl>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </main>
  );
}
