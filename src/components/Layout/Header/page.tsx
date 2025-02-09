"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sword, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const NavItems = () => (
    <>
      <NavigationMenuItem>
        <Link href="/#faq" legacyBehavior passHref scroll={true}>
          <NavigationMenuLink className="hover:underline font-bold">
            COMO FUNCIONA
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="https://apoia.se/desafiootech" legacyBehavior passHref>
          <NavigationMenuLink className="hover:underline font-bold">
            APOIAR
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
          <NavigationMenuLink className="hover:underline font-bold">
            FEEDBACK
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </>
  );

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <div className="container mx-auto flex items-center justify-between p-4 md:p-8">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Sword color="white" />
            <h1 className="text-2xl font-bold">Desafioo.Tech</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-bold">
          <NavigationMenu>
            <NavigationMenuList className="gap-8">
              <NavItems />
            </NavigationMenuList>
          </NavigationMenu>

          <div>
            <Button asChild>
              <Link href="/singIn">Entrar</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle>Menu de Navegação</SheetTitle>
              <SheetDescription>Selecione uma opção do menu</SheetDescription>

              <nav className="flex flex-col gap-4 mt-8">
                <NavigationMenu orientation="vertical">
                  <NavigationMenuList className="flex-col items-start gap-4">
                    <NavItems />
                  </NavigationMenuList>
                </NavigationMenu>
                <Button asChild className="w-full">
                  <Link href="/singIn" onClick={() => setIsOpen(false)}>
                    Entrar
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
