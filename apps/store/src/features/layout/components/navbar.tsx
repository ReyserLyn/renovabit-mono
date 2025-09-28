import { auth } from "@renovabit/auth/index";
import {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPositioner,
} from "@renovabit/ui/components/ui/navigation-menu";
import { headers } from "next/headers";
import Link from "next/link";
import { LogoHorizontalLight } from "@/logo/logo-bg";
import { AuthButtons } from "./navbar/auth-buttons";
import CartButton from "./navbar/cart-button";
import { ActionButtons, BrandMenu, InfoMenu } from "./navbar/index";
import InputSearch from "./navbar/input-search";
import { ProductsMenu } from "./navbar/products-menu";
import { SidebarToggle } from "./sidebar/sidebar-toggle";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="flex w-full flex-col items-center gap-4 py-4">
      <div className="flex w-full items-center justify-between">
        <SidebarToggle />

        <Link href="/">
          <LogoHorizontalLight className="w-[170px] md:w-[200px]" />
        </Link>

        <InputSearch className="hidden w-full max-w-xl md:block" />

        <div className="flex items-center gap-4">
          <CartButton />

          <AuthButtons session={session} />
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-4">
        <InputSearch className="block w-full max-w-xl md:hidden" />

        <NavigationMenu className="hidden md:flex">
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
