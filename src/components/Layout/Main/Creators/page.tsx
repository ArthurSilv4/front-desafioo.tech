import Image from "next/image";

const creators = [
  {
    name: "Ana Silva",
    image: "/eu.png",
    description: "Artista Digital",
    challenges: 15,
  },
  {
    name: "Carlos Oliveira",
    image: "/eu.png",
    description: "Fotógrafo",
    challenges: 8,
  },
  {
    name: "Mariana Santos",
    image: "/eu.png",
    description: "Designer Gráfica",
    challenges: 20,
  },
  {
    name: "Mariana Santos",
    image: "/eu.png",
    description: "Designer Gráfica",
    challenges: 20,
  },
  {
    name: "Mariana Santos",
    image: "/eu.png",
    description: "Designer Gráfica",
    challenges: 20,
  },
  {
    name: "Mariana Santos",
    image: "/eu.png",
    description: "Designer Gráfica",
    challenges: 20,
  },
  {
    name: "Mariana Santos",
    image: "/eu.png",
    description: "Designer Gráfica",
    challenges: 20,
  },
  {
    name: "Mariana Santos",
    image: "/eu.png",
    description: "Designer Gráfica",
    challenges: 20,
  },
  {
    name: "Mariana Santos",
    image: "/eu.png",
    description: "Designer Gráfica",
    challenges: 20,
  },
  {
    name: "Mariana Santos",
    image: "/eu.png",
    description: "Designer Gráfica",
    challenges: 20,
  },
  {
    name: "Mariana Santos",
    image: "/eu.png",
    description: "Professor universitário",
    challenges: 20,
  },
  {
    name: "Mariana Santos",
    image: "/eu.png",
    description: "Designer Gráfica",
    challenges: 20,
  },
  {
    name: "Mariana Santos",
    image: "/eu.png",
    description: "Designer Gráfica",
    challenges: 20,
  },
  {
    name: "Pedro Costa",
    image: "/eu.png",
    description: "Videomaker",
    challenges: 12,
  },
  {
    name: "Luísa Ferreira",
    image: "/eu.png",
    description: "Ilustradora",
    challenges: 18,
  },
  {
    name: "Rafael Mendes",
    image: "/eu.png",
    description: "Músico",
    challenges: 6,
  },
  {
    name: "Rafael Mendes",
    image: "/eu.png",
    description: "Músico",
    challenges: 6,
  },
  {
    name: "Rafael Mendes",
    image: "/eu.png",
    description: "Músico",
    challenges: 6,
  },
  {
    name: "Rafael Mendes",
    image: "/eu.png",
    description: "professor universitario",
    challenges: 1,
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
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`${sizeClasses[size]} relative rounded-full overflow-hidden mb-3 transition-transform duration-300 hover:scale-105`}
                >
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h3
                  className={`${fontSizeClasses[size]} font-semibold text-center`}
                >
                  {creator.name}
                </h3>
                <p className="text-xs font-semibold text-gray-600 text-center">
                  {creator.description}
                </p>
                <p>
                  <span className="text-gray-700 font-semibold">
                    {creator.challenges}
                  </span>{" "}
                  desafios
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
