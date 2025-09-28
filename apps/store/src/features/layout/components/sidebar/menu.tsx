import { Button } from "@renovabit/ui/components/ui/button";
import { ScrollArea } from "@renovabit/ui/components/ui/scroll-area";
import { cn } from "@renovabit/ui/lib/utils";
import { LogOut, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "@/features/auth/actions/auth-actions";
import { getMenuList } from "@/features/layout/lib/menu-list";
import { CollapseMenu } from "./collapse-menu";

type MobileMenuProps = {
  onLinkClick?: () => void;
};

type Group = {
  groupLabel: string;
  menus: {
    href: string;
    label: string;
    active?: boolean;
    icon: LucideIcon;
    submenus?: { href: string; label: string; active?: boolean }[];
  }[];
};

function isMenuItemActive(
  pathname: string,
  href: string,
  active?: boolean
): boolean {
  if (active !== undefined) {
    return active;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function Menu({ onLinkClick }: MobileMenuProps) {
  const pathname = usePathname();
  const [menuList, setMenuList] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMenu() {
      try {
        setIsLoading(true);
        const data = await getMenuList();
        setMenuList(data);
      } catch (error) {
        console.error("Error cargando menú:", error);
        // El menú ya tiene fallback interno
      } finally {
        setIsLoading(false);
      }
    }

    loadMenu();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Cargando menú...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full max-h-full flex-col overflow-hidden">
      <ScrollArea>
        <nav className="w-full p-2">
          <ul className="flex flex-col items-start space-y-1">
            {menuList.map(({ groupLabel, menus }, groupIndex) => (
              <li
                className={cn("w-full", groupLabel ? "pt-5" : "")}
                key={`group-${groupIndex}-${groupLabel || "no-label"}`}
              >
                {groupLabel && (
                  <p className="max-w-[248px] truncate px-4 pb-2 font-medium text-muted-foreground text-sm">
                    {groupLabel}
                  </p>
                )}

                {menus.map(
                  ({ href, label, icon: Icon, active, submenus }, menuIndex) =>
                    !submenus || submenus.length === 0 ? (
                      <div className="w-full" key={`menu-${menuIndex}-${href}`}>
                        <Button
                          asChild
                          className="mb-1 h-10 w-full justify-start"
                          variant={
                            isMenuItemActive(pathname, href, active)
                              ? "secondary"
                              : "ghost"
                          }
                        >
                          <Link href={href} onClick={onLinkClick}>
                            <span className="mr-4">
                              <Icon size={18} />
                            </span>
                            <p className="max-w-[200px] translate-x-0 truncate opacity-100">
                              {label}
                            </p>
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="w-full"
                        key={`menu-${menuIndex}-${label}`}
                      >
                        <CollapseMenu
                          active={isMenuItemActive(pathname, href, active)}
                          icon={Icon}
                          label={label}
                          onLinkClick={onLinkClick}
                          submenus={submenus}
                        />
                      </div>
                    )
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 grow pt-4">
            <Button
              className="h-10 w-full justify-center"
              onClick={() => {
                signOut();
              }}
              variant="outline"
            >
              <span className="mr-2">
                <LogOut className="text-red-800" />
              </span>
              <p className="whitespace-nowrap opacity-100">Cerrar sesión</p>
            </Button>
          </div>
        </nav>
      </ScrollArea>
    </div>
  );
}
