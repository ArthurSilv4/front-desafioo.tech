"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { useChallenge } from "@/context/challenges/page";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { Pen } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const categorys = [
  "Backend",
  "Frontend",
  "Fullstack",
  "Mobile",
  "Ciência de Dados",
  "DevOps",
  "Segurança",
  "IA/ML",
  "Desenvolvimento de Jogos",
  "Sistemas Embarcados",
  "IoT",
  "Blockchain",
  "AR/VR",
  "Computação em Nuvem",
  "Redes",
  "Banco de Dados",
  "Desenvolvimento Web",
  "Teste de Software",
  "Design UI/UX",
  "Gestão de Projetos",
];

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "O título deve conter no mínimo 3 caracteres.",
    })
    .max(200, {
      message: "O título deve conter no máximo 200 caracteres.",
    }),
  description: z
    .string()
    .min(10, {
      message: "A descrição deve conter no mínimo 10 caracteres.",
    })
    .max(5000, {
      message: "A descrição deve conter no máximo 5000 caracteres.",
    }),
  dificulty: z.enum(["Facil", "Media", "Dificil"], {
    message: "Você deve escolher uma dificuldade entre as opções disponíveis.",
  }),
  category: z
    .array(
      z.enum(categorys as [string, ...string[]], {
        message:
          "Você deve escolher uma categoria entre as opções disponíveis.",
      })
    )
    .min(1, {
      message: "Você deve escolher pelo menos uma categoria.",
    }),
  links: z
    .array(z.string().url().min(1, "O link não pode estar vazio"))
    .max(5, {
      message: "A lista de links deve ter no máximo 5 elementos",
    })
    .optional(),
});

export default function DashboardChallengeId() {
  const { id } = useParams() as { id: string };

  const { useEditChallenge, useFetchChallengeById, useDeleteChallenge } =
    useChallenge();
  const { data } = useFetchChallengeById(id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      dificulty:
        (data?.dificulty as "Facil" | "Media" | "Dificil" | undefined) ||
        "Facil",
      category: Array.isArray(data?.category) ? data?.category : [],
      links: data?.links || [],
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title || "",
        description: data.description || "",
        dificulty: (data.dificulty as "Facil" | "Media" | "Dificil") || "Facil",
        category: Array.isArray(data.category) ? data.category : [],
        links: data.links || [],
      });
    }
  }, [data, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    useEditChallenge.mutate({
      id,
      title: values.title,
      description: values.description,
      dificulty: values.dificulty,
      category: values.category,
      links: values.links,
    });
  }

  function handleDelete() {
    useDeleteChallenge.mutate({ id });
  }

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="mx-auto p-4 max-w-5xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Pen />
                <h1 className="text-2xl font-bold md:text-4xl">
                  Editar Desafio
                </h1>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Deletar</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Deletar Desafio</DialogTitle>
                      <DialogDescription>
                        Tem Certeza que deseja deletar esse desafio?
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button>Voltar</Button>
                      </DialogClose>
                      <Button variant="destructive" onClick={handleDelete}>
                        Deletar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardTitle>
          </CardHeader>

          <Separator className="h-[1px] bg-gray-300 my-2" />

          <CardContent className="space-y-4">
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Título*</Label>
                      <FormMessage />
                      <FormControl>
                        <Input
                          placeholder="Título Do Desafio"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Escreva um título para o seu desafio.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Descrição Do Desafio*</Label>
                      <FormMessage />
                      <FormControl>
                        <Textarea {...field} className="min-h-64" />
                      </FormControl>
                      <FormDescription>
                        Escreva uma descrição para o seu desafio.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dificulty"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Dificuldade do desafio*</Label>
                      <FormMessage />
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex gap-2"
                        >
                          <ToggleGroupItem
                            value="Facil"
                            aria-label="Toggle bold"
                            className={
                              field.value === "Facil"
                                ? "bg-blue-500 text-white p-2 rounded-xl"
                                : ""
                            }
                          >
                            Facil
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="Media"
                            className={
                              field.value === "Media"
                                ? "bg-blue-500 text-white p-2 rounded-xl"
                                : ""
                            }
                          >
                            Media
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="Dificil"
                            className={
                              field.value === "Dificil"
                                ? "bg-blue-500 text-white p-2 rounded-xl"
                                : ""
                            }
                          >
                            Dificil
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                      <FormDescription>
                        Escolha a dificuldade do seu desafio.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Categoria do desafio*</Label>
                      <FormMessage />
                      <FormControl>
                        <ToggleGroup
                          type="multiple"
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-wrap gap-2"
                        >
                          {categorys.map((category) => (
                            <ToggleGroupItem
                              key={category}
                              value={category}
                              className={
                                field.value.includes(category)
                                  ? "bg-blue-500 text-white p-2 rounded-xl"
                                  : ""
                              }
                            >
                              {category}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </FormControl>
                      <FormDescription>
                        Escolha a categoria do desafio.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="links"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Adicione links de apoio</Label>
                      <FormMessage />

                      {(field.value || []).map((link, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              placeholder="Link"
                              type="url"
                              value={link}
                              onChange={(e) => {
                                const newLinks = [...(field.value || [])];
                                newLinks[index] = e.target.value;
                                field.onChange(newLinks);
                              }}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            onClick={() => {
                              const newLinks = (field.value || []).filter(
                                (_, i) => i !== index
                              );
                              field.onChange(newLinks);
                            }}
                          >
                            Remover
                          </Button>
                        </div>
                      ))}

                      {field.value && field.value.length < 5 && (
                        <Button
                          className="mx-2"
                          type="button"
                          onClick={() =>
                            field.onChange([...(field.value || []), ""])
                          }
                        >
                          Adicionar Link
                        </Button>
                      )}

                      <FormDescription>
                        Você pode adicionar até 5 links de apoio.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={useEditChallenge.isLoading}
                >
                  {useEditChallenge.isLoading ? "Salvando..." : "Salvar"}
                </Button>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
