import {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPositioner,
} from "@renovabit/ui/components/ui/navigation-menu";
import Image from "next/image";
import { ActionButtons, BrandMenu, InfoMenu } from "../navigation/navbar";
import { ProductsMenu } from "../navigation/navbar/products-menu";

export default function Navbar() {
  return (
    <nav>
      <div className="flex w-full items-center justify-between py-2">
        <div className="flex items-center gap-16">
          <Image
            alt="logo"
            height={36.5}
            priority
            src="/logo/ts/horizontal-light.svg"
            width={200}
          />
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
        </div>
        <ActionButtons />
      </div>
    </nav>
  );
}
