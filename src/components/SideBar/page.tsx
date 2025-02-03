"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, List, Settings, User, Sword } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { MessageCircle, Heart, LogOut } from "lucide-react";

const menuItemsContent = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Criar Desafio", icon: PlusCircle, href: "/criar-desafio" },
  { name: "Meus Desafios", icon: List, href: "/meus-desafios" },
  { name: "Configurações", icon: Settings, href: "/configuracoes" },
  { name: "Perfil", icon: User, href: "/perfil" },
];

const menuItemsFooter = [
  { name: "FeedBack", icon: MessageCircle, href: "" },
  { name: "Apoiar", icon: Heart, href: "/sobre" },
  { name: "Sair", icon: LogOut, href: "/sair" },
];

export function AppSideBar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton>
          <Link href="/" className="flex items-center gap-2">
            <Sword color="white" />
            <span className="text-xl font-bold">Desafioo.Tech</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="m-2">
        <SidebarMenu>
          {menuItemsContent.map((item) => (
            <SidebarMenuItem key={item.name} className="font-semibold">
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.name}
              >
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {menuItemsFooter.map((item) => (
            <SidebarMenuItem key={item.name} className="font-semibold">
              <SidebarMenuButton asChild>
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <Separator orientation="horizontal" className="h-[1px] bg-gray-300" />
        </SidebarMenu>

        <SidebarMenuButton className="flex items-center gap-3 cursor-auto">
          <span>&copy;</span>
          <p className="text-xs text-muted-foreground">
            {new Date().getFullYear()} Desafioo.Tech. Todos os direitos
            reservados.
          </p>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
