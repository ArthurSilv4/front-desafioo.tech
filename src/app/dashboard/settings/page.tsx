"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const user = {
  name: "John Doe",
};

const formSchema = z.object({
  name: z.string().min(2, "O nome deve conter no mínimo 2 caractere."),
});

export default function Settings() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <main>
      <div className="mx-auto p-4">
        <div className="flex items-center gap-2">
          <SettingsIcon />
          <h1 className="text-2xl font-bold md:text-4xl">Suas Configurações</h1>
        </div>
        <Separator className="h-[1px] bg-gray-300 my-2" />
      </div>

      <div className="w-96  m-auto">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-2"
          >
            <Label>Nome De Usuario Atual</Label>
            <Input value={user.name} disabled />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Alterar Nome De Usuario</Label>
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder="Título Do Desafio"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Escreva seu nome.</FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">Salvar</Button>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
