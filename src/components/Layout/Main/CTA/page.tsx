import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const cta = {
  subTitle: "Desafie-se!",
  title: "Desafios de programação",
  description:
    "Desafie-se com nossos projetos de programação e construa um portfólio impressionante! Participe de desafios que vão desde o básico até o avançado, ganhe experiência prática e mostre suas habilidades no seu portfólio. Vamos começar?",
  button: "Iniciar Desafio Agora",
};

export function CTA() {
  return (
    <section className="bg-blue-500 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-12">
          <div className="text-center md:text-start py-12 md:max-w-[50%] w-full">
            <h1 className="text-4xl font-bold mb-4 flex flex-col">
              <span>{cta.subTitle}</span>
              <span> {cta.title}</span>
            </h1>
            <p className="text-lg mb-8">{cta.description}</p>
            <Link href={"/"}>
              <Button className="font-semibold py-2 px-4 rounded">
                {cta.button}
              </Button>
            </Link>
          </div>
          <div className="hidden md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="250"
              height="250"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-swords"
            >
              <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
              <line x1="13" x2="19" y1="19" y2="13" />
              <line x1="16" x2="20" y1="16" y2="20" />
              <line x1="19" x2="21" y1="21" y2="19" />
              <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
              <line x1="5" x2="9" y1="14" y2="18" />
              <line x1="7" x2="4" y1="17" y2="20" />
              <line x1="3" x2="5" y1="19" y2="21" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
