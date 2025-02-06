import Link from "next/link";

const creators = [
  {
    id: 1,
    name: "Ana Silva",
    challenges: 15,
  },
  {
    id: 2,
    name: "Carlos Oliveira",
    challenges: 8,
  },
];

const getSize = (challenges: number) => {
  if (challenges >= 20) return "xl";
  if (challenges >= 10) return "lg";
  if (challenges >= 5) return "md";
  return "sm";
};

const sizeClasses = {
  sm: "w-16 h-16 md:w-24 md:h-24",
  md: "w-24 h-24 md:w-32 md:h-32",
  lg: "w-32 h-32 md:w-40 md:h-40",
  xl: "w-40 h-40 md:w-48 md:h-48",
};

const fontSizeClasses = {
  sm: "text-sm md:text-base",
  md: "text-base md:text-lg",
  lg: "text-lg md:text-xl",
  xl: "text-xl md:text-2xl",
};

export function Creators() {
  return (
    <section className="py-12 mb-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-8">
          Mentes por trás dos desafios
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {creators.map((creator, index) => {
            const size = getSize(creator.challenges);
            return (
              <Link href={`cretors/${creator.id}`}>
                <div key={index} className="min-w-56 flex flex-col items-center border border-white rounded-lg p-1 bg-blue-400 text-white">
                  <h3
                    className={`${fontSizeClasses[size]} font-semibold text-center`}
                  >
                    {creator.name}
                  </h3>
                  <p className="font-semibold">
                    <span>
                      {creator.challenges}
                    </span>{" "}
                    desafios
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
