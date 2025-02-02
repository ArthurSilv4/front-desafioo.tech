import { ReactNode } from "react";
import { Header } from "./Header/page";
import { Footer } from "./Footer/page";

interface LayoutProps {
  children: ReactNode;
}

export function Latout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
