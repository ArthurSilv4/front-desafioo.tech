"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, User, Sword, Plus } from "lucide-react";
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
import { useAuth } from "@/context/users/auth/page";

const menuItemsContent = [
  { name: "Home", icon: Home, href: "/dashboard" },
  { name: "Criar Desafio", icon: PlusCircle, href: "/dashboard/newChallenge" },
  { name: "Perfil", icon: User, href: "/dashboard/profile" },
  { name: "Criar Usuario", icon: Plus, href: "/dashboard/newUser" },
];

export function AppSideBar() {
  const { logout } = useAuth();
  const pathname = usePathname();

  function handleLogout() {
    logout();
  }

  const menuItemsFooter = [
    {
      name: "FeedBack",
      icon: MessageCircle,
      href: "https://forms.gle/PU8eiH8GpPSmPfrA8",
    },
    { name: "Apoiar", icon: Heart, href: "/sobre" },
    { name: "Sair", icon: LogOut, href: "", onClick: handleLogout },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton className="hover:bg-transparent">
          <Link href="/" className="flex items-center gap-2">
            <Sword color="white" />
            <span className="text-xl font-bold hover:text-white">
              Desafioo.Tech
            </span>
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
              <SidebarMenuButton asChild tooltip={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2"
                  onClick={item.onClick} // Aqui, se item.onClick existir, ele será acionado
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <Separator orientation="horizontal" className="h-[1px] bg-gray-300" />
        </SidebarMenu>

        <SidebarMenuButton className="flex items-center gap-3 cursor-auto hover:bg-transparent hover:text-white">
          <span>&copy;</span>
          <p className="text-xs">
            {new Date().getFullYear()} Desafioo.Tech. Todos os direitos
            reservados.
          </p>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
