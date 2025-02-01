import React from "react";
import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { CategoryList } from "./CategoryList/page";
import { Creators } from "./Creators/page";
import { CTA } from "./CTA/page";
import FAQ from "./FAQ/page";
import { StartProgramming } from "./StartProgramming/page";

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <main className="max-w-screen-2xl mx-auto">
      <CategoryList />
      <CTA />
      {children}
      <StartProgramming />
      <Creators />
      <FAQ />
      <Separator className="bg-gray-300 h-[1px]" />
    </main>
  );
}
