"use client";

import { MarkdownEditor } from "@/components/Markdown/MarkdownEditor/page";
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
import { useChallenge } from "@/context/challenges/page";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

interface ChallengeEditFormsProps {
  id: string;
}

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

export function ChallengeEditForms({ id }: ChallengeEditFormsProps) {
  const { useEditChallenge, useFetchChallengeById } = useChallenge();
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

  if (!data) {
    return <div>Carregando...</div>;
  }
  return (
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
                <Input placeholder="Título Do Desafio" type="text" {...field} />
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
                <MarkdownEditor {...field} />
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
              <FormDescription>Escolha a categoria do desafio.</FormDescription>
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
                  onClick={() => field.onChange([...(field.value || []), ""])}
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
  );
}
