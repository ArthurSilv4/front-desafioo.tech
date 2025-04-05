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
import { useChallenge } from "@/context/challenges/page";
import Link from "next/link";
import { z } from "zod";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type ChallengeIdFormsProps = {
  id: string;
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

export function ChallengeIdForms({ id }: ChallengeIdFormsProps) {
  const { useStartChallenge } = useChallenge();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    useStartChallenge.mutate({
      id,
      name: values.name,
      email: values.email,
    });
  }

  useEffect(() => {
    if (useStartChallenge.isSuccess) {
      form.reset({
        name: "",
        email: "",
        terms: false,
      });
    }
  }, [form, useStartChallenge.isSuccess]);

  return (
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
                <Link href="/TermsofUse" className="text-blue-500">
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
        <Button
          type="submit"
          className="w-full mt-4"
          disabled={useStartChallenge.isLoading}
        >
          {useStartChallenge.isLoading ? "Enviando..." : "Começar"}
        </Button>
      </form>
    </FormProvider>
  );
}
