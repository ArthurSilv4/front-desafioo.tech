import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

const creators = [
  {
    id: 1,
    name: "Ana Silva",
  },
  {
    id: 2,
    name: "Carlos Oliveira",
  },
];

export function Creators() {
  return (
    <section className="py-12 mb-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-8">
          Mentes por trás dos desafios
        </h2>
        <Separator className="h-[1px] bg-gray-300 mb-8" />

        <div className="flex flex-wrap justify-center gap-2">
          {creators.map((creator, index) => {
            return (
              <Link href={`cretors/${creator.id}`}>
                <div
                  key={index}
                  className="min-w-56 flex flex-col items-center"
                >
                  <h3
                    className={"text-2xl font-bold text-center text-blue-900"}
                  >
                    {creator.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
        <Separator className="h-[1px] bg-gray-300 mt-8" />
      </div>
    </section>
  );
}
