"use client";

import React from "react";
import Main from "@/components/Layout/Main/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const challenge = {
  id: 1,
  title: "Fazer um crud com c#",
  description:
    "lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur",
  author: "Author",
  starts: 10,
};

const formSchema = z.object({
  name: z.string().nonempty({
    message: "Por favor, insira seu nome.",
  }),
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos e condições.",
  }),
});

export default function ChallengeId() {
  // const { id } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Main>
      <section className="min-h-screen ">
        <Separator className="h-[1px] w-full bg-gray-300 " />
        <div className="container mx-auto p-4">
          <div className="flex justify-between gap-4 flex-col items-start lg:flex-row">
            <div className="lg:max-w-[50%]">
              <h1 className="text-3xl font-bold">{challenge.title}</h1>
              <p className="text-justify mt-4">{challenge.description}</p>
            </div>
            <div className="flex flex-col items-center gap-4 w-full lg:w-fit">
              <div>
                <div className="flex items-center justify-center gap-1 mt-4">
                  <Users fill="true" size={20} />
                  <span className="font-semibold">
                    {challenge.starts} Pessoas Já Iniciaram Esse Desafio
                  </span>
                </div>
                <Card className="w-full min-w- max-w-sm mt-4">
                  <CardHeader>
                    <CardTitle>Iniciar Desafio</CardTitle>
                    <CardDescription>
                      Preencha com suas informacoes para receber o desafio
                      completo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormProvider {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <Label>Nome:</Label>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Nome"
                                  {...field}
                                />
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
                                <Input
                                  type="email"
                                  placeholder="Email@example.com"
                                  {...field}
                                />
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
                          name="terms"
                          render={({ field }) => (
                            <FormItem>
                              <Label>
                                Aceito os{" "}
                                <Link
                                  href="/TermsofUse"
                                  className="text-blue-500"
                                >
                                  termos e condições
                                </Link>
                              </Label>
                              <FormControl>
                                <Checkbox
                                  className="mx-2"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full mt-4">
                          Começar
                        </Button>
                      </form>
                    </FormProvider>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col items-center mt-8 p-8 text-white bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg">
                <span className="font-bold text-xl lg:text-2xl">
                  Desafio Criado Por
                </span>
                <span className="font-bold text-xl lg:text-3xl">
                  {challenge.author}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
}
