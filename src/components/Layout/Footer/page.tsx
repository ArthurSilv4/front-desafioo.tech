"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Linkedin, Sword } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { z } from "zod";
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

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }),
});

export function Footer() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sword color="white" />
              <span className="text-xl font-bold">Desafioo.Tech</span>
            </Link>
            <p className="text-sm mb-4">
              Desafie-se e evolua suas habilidades técnicas com nossa plataforma
              inovadora.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/ArthurSilv4/front-desafioo.tech"
                target="_blank"
              >
                <Button variant="outline" size="icon">
                  <Github className="text-blue-500" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link
                href="https://www.linkedin.com/in/arthur-souza-dev/"
                target="_blank"
              >
                <Button variant="outline" size="icon">
                  <Linkedin className="text-blue-500" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
            </div>
          </div>

          <NavigationMenu className="flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <NavigationMenuList className="flex flex-col items-start space-y-2">
              <NavigationMenuItem>
                <Link href="/#faq" legacyBehavior passHref>
                  <NavigationMenuLink className="hover:underline">
                    Como funciona
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="https://apoia.se/desafiootech"
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink className="hover:underline">
                    Apoiar{" "}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="https://forms.gle/PU8eiH8GpPSmPfrA8"
                  legacyBehavior
                  passHref
                  target="_blank"
                >
                  <NavigationMenuLink className="hover:underline">
                    Feedback
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/termos" legacyBehavior passHref>
                  <NavigationMenuLink className="hover:underline">
                    {" "}
                    Termos de Uso
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/privacidade" legacyBehavior passHref>
                  <NavigationMenuLink className="hover:underline">
                    Política de Privacidade
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div>
            <h3 className="text-lg font-semibold mb-4">Fique por dentro</h3>
            <p className="text-sm mb-4">
              Inscreva-se para receber nossas novidades e dicas.
            </p>
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
                <Button type="submit">Inscrever-se</Button>
              </form>
            </FormProvider>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-300 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Desafioo.Tech. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
