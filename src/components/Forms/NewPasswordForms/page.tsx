"use client";

import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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

export function NewPasswordForms() {
  const { useUpdatePassword, useSendCode } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const isLoading = useUpdatePassword.isLoading;

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
              <div className="flex justify-between items-center">
                <Label>Senha antiga:</Label>
                <Button
                  type="button"
                  className="w-12 h-10"
                  onClick={() => setShowPassword(!showPassword)}
                  size={"icon"}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>

              <FormControl>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...field}
                  disabled={isLoading}
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
                  type={showPassword ? "text" : "password"}
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
                  type={showPassword ? "text" : "password"}
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
  );
}
