"use client";

import { DashboardHeader } from "@/components/Dashboard/Header/page";
import { AppSideBar } from "@/components/SideBar/page";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode, useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSideBar />
      <SidebarInset>
        <DashboardHeader />
        <main>
          {children}
          <Toaster position="top-right" />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
