import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const categories = [
  "Algoritmos",
  "Estruturas de Dados",
  "Matemática",
  "Programação Funcional",
  "Programação Orientada a Objetos",
  "Programação Web",
];

export function CategoryList() {
  return (
    <section className="text-white bg-gradient-to-r from-blue-700 to-blue-900">
      <NavigationMenu className="container mx-auto px-4 py-8">
        <NavigationMenuList className="flex flex-wrap justify-center gap-8">
          {categories.map((category) => (
            <NavigationMenuItem key={category} className="text-lg font-bold">
              <NavigationMenuLink href={``} className="hover:underline">
                {category}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </section>
  );
}
