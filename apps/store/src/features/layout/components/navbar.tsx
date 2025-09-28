import { auth } from "@renovabit/auth/index";
import {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPositioner,
} from "@renovabit/ui/components/ui/navigation-menu";
import { headers } from "next/headers";
import { LogoHorizontalLight } from "@/logo/logo-bg";
import { ActionButtons, BrandMenu, InfoMenu } from "./navbar/index";
import { ProductsMenu } from "./navbar/products-menu";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav>
      <div className="flex w-full items-center justify-between py-2">
        <div className="flex items-center gap-16">
          <LogoHorizontalLight className="w-[200px]" />
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
        <ActionButtons session={session} />
      </div>
    </nav>
  );
}
