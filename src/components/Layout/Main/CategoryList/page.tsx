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
    <section>
      <NavigationMenu className="container mx-auto px-4 py-8">
        <NavigationMenuList className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <NavigationMenuItem key={category} className="text-lg font-bold">
              <NavigationMenuLink href={`/category/${category}`}>
                {category}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </section>
  );
}
