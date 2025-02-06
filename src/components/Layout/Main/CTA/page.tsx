import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const cta = {
  subTitle: "Desafie-se!",
  title: "Desafios de programação",
  description:
    "Participe dos nossos desafios e melhore suas habilidades. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  button: "Iniciar Desafio",
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
            <Image
              src="/eu.png"
              width={200}
              height={200}
              alt="Desafioo.Tech"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
