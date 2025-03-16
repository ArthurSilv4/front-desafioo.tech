"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

export function DashboardHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="p-4">
        <div className="flex gap-4 items-center">
          <Button onClick={toggleSidebar} size={"icon"}>
            {useSidebar().open ? <PanelRightClose /> : <PanelRightOpen />}
          </Button>
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
      </div>
    </header>
  );
}

