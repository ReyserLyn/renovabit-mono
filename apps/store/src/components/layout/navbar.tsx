import {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPositioner,
} from "@renovabit/ui/components/ui/navigation-menu";
import { ActionButtons, BrandMenu, InfoMenu } from "../navigation/navbar";
import { ProductsMenu } from "../navigation/navbar/products-menu";

export default function Navbar() {
  return (
    <nav className="container">
      <div className="flex w-full items-center justify-between py-2">
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            <ProductsMenu />

            <BrandMenu />

            <InfoMenu />
          </NavigationMenuList>

          <NavigationMenuPositioner>
            <NavigationMenuPopup>
              <NavigationMenuArrow />
            </NavigationMenuPopup>
          </NavigationMenuPositioner>
        </NavigationMenu>

        <ActionButtons />
      </div>
    </nav>
  );
}
