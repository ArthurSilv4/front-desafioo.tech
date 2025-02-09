"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";

const initialProfileData = {
  name: "John Doe",
  email: "email@gmail.com",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  roles: ["admin", "user"],
};

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "O nome deve conter no mínimo 2 caracteres.",
    })
    .nonempty({
      message: "O nome não pode estar vazio.",
    }),
  email: z.string().email({
    message: "O email deve ser válido.",
  }),
  description: z.string().optional(),
});

export default function Profile() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialProfileData,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            <span>Editar Perfil</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label>Nome*</Label>
                    <FormMessage />
                    <FormControl>
                      <Input placeholder="Nome" type="text" {...field} />
                    </FormControl>
                    <FormDescription>Escreva seu nome</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <Label>Email*</Label>
                    <FormMessage />
                    <FormControl>
                      <Input
                        placeholder="email@exemplo.com"
                        type="text"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Escreva seu email</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <Label>Descrição</Label>
                    <FormMessage />
                    <FormControl>
                      <Textarea
                        placeholder="Descrição"
                        className="h-64"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Escreva sua descrição</FormDescription>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-2">
                Salvar
              </Button>
            </form>
          </FormProvider>
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
