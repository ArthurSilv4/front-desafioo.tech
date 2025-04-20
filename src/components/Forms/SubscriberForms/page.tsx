"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useSubscriberContext } from "@/context/subscriber/page";
import { useEffect } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }),
});

export function SubscriberForms() {
  const { useSubscriber } = useSubscriberContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    useSubscriber.mutate({ email: values.email });
  }

  useEffect(() => {
    if (useSubscriber.isSuccess) {
      form.reset({
        email: "",
      });
    }
  }, [useSubscriber, form]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Email</Label>
              <FormControl>
                <Input
                  className="bg-white text-black"
                  placeholder="Seu e-mail"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription className="sr-only">
                Digite seu e-mail para receber nossas novidades.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={useSubscriber.isLoading}>
          {useSubscriber.isLoading ? "Inscrevendo..." : "Inscrever-se"}
        </Button>
      </form>
    </FormProvider>
  );
}
