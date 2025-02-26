"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/users/page";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().nonempty({
    message: "Por favor, insira seu nome.",
  }),
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }),
  password: z.string().min(8, {
    message: "A senha deve ter no mínimo 8 caracteres.",
  }),
});

export default function NewUser() {
  const { useCreateNewUser } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    useCreateNewUser.mutate(values);
  }

  useEffect(() => {
    if (useCreateNewUser.isSuccess) {
      form.reset({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [useCreateNewUser.isSuccess, form]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="mx-auto p-4 max-w-5xl">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Nome:</Label>
                  <FormControl>
                    <Input type="text" placeholder="Nome" {...field} />
                  </FormControl>
                  <FormDescription>
                    Insira seu nome para começar o desafio
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label>Email:</Label>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Insira seu email para começar o desafio
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label>Senha:</Label>
                  <FormControl>
                    <Input type="password" placeholder="Senha" {...field} />
                  </FormControl>
                  <FormDescription>
                    Insira sua senha para começar o desafio
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={useCreateNewUser.isLoading}
            >
              {useCreateNewUser.isLoading ? "Enviando..." : "Começar"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
