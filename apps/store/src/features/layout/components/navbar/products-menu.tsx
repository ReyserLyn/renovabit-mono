import { getCategoryNavigationData } from "@renovabit/db/queries/categories";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@renovabit/ui/components/ui/navigation-menu";
import { ListItem } from "./list-item";

export async function ProductsMenu() {
  const navigationData = await getCategoryNavigationData();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Productos</NavigationMenuTrigger>

      <NavigationMenuContent className="p-4">
        <div className="grid grid-cols-1 gap-3 p-4 md:w-[600px] md:grid-cols-3 lg:w-[800px] lg:grid-cols-4">
          {navigationData.length === 0 ? (
            <EmptyProducts />
          ) : (
            navigationData.map((group) => (
              <div className="px-2" key={group.title}>
                <h6 className="font-semibold text-muted-foreground text-sm uppercase">
                  {group.title}
                </h6>
                <ul className="mt-2.5 grid gap-3">
                  {group.items.map((category) => (
                    <ListItem
                      href={`/categoria/${category.slug}`}
                      key={category.slug}
                      title={category.title}
                    />
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function EmptyProducts() {
  return (
    <p className="text-muted-foreground text-sm">
      No hay productos disponibles
    </p>
  );
}
