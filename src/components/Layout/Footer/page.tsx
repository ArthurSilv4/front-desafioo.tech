import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Sword } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { SubscriberForms } from "@/components/Forms/SubscriberForms/page";

export function Footer() {
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
                <Link href="/TermsofUse" legacyBehavior passHref>
                  <NavigationMenuLink className="hover:underline">
                    {" "}
                    Termos de Uso
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/PrivacyPolicy" legacyBehavior passHref>
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
            <SubscriberForms />
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
