import { getBrands } from "@renovabit/db/queries/brands";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@renovabit/ui/components/ui/navigation-menu";
import { ListItem } from "./list-item";

export async function BrandMenu() {
  const brands = await getBrands();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Marcas</NavigationMenuTrigger>

      <NavigationMenuContent className="p-8">
        <h6 className="px-2 font-semibold text-muted-foreground text-sm uppercase">
          Marcas
        </h6>
        <ul className="mt-2.5 grid w-[200px] gap-3 px-2 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
          {brands.length === 0 ? (
            <EmptyBrands />
          ) : (
            brands.map((item) => (
              <ListItem
                href={`/marca/${item.slug}`}
                key={item.id}
                title={item.name}
              />
            ))
          )}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function EmptyBrands() {
  return (
    <p className="text-muted-foreground text-sm">No hay marcas disponibles</p>
  );
}
