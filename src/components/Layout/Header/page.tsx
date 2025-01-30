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
        <Link href="/como-funciona" legacyBehavior passHref>
          <NavigationMenuLink>COMO FUNCIONA</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/apoiar" legacyBehavior passHref>
          <NavigationMenuLink>APOIAR</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/feedback" legacyBehavior passHref>
          <NavigationMenuLink>FEEDBACK</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </>
  );

  return (
    <header>
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
            <Button variant="outline" asChild>
              <Link href="/entrar">Entrar</Link>
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
                <Button variant="outline" asChild className="w-full">
                  <Link href="/entrar" onClick={() => setIsOpen(false)}>
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
