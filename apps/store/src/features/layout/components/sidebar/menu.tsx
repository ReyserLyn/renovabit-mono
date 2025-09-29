"use client";

import { Button } from "@renovabit/ui/components/ui/button";
import { ScrollArea } from "@renovabit/ui/components/ui/scroll-area";
import { cn } from "@renovabit/ui/lib/utils";
import { LogOut, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/features/auth/actions/auth-actions";
import { type Group, iconMap } from "@/features/layout/lib/menu-list";
import { CollapseMenu } from "./collapse-menu";

type MenuProps = {
  data: Group[];
  onLinkClick?: () => void;
};

function getIconComponent(iconName: string): LucideIcon {
  return (iconMap[iconName] || iconMap.Package) as LucideIcon;
}

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

export function Menu({ data, onLinkClick }: MenuProps) {
  const pathname = usePathname();
  const menuList = data;

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
                  (
                    { href, label, icon: iconName, active, submenus },
                    menuIndex
                  ) => {
                    const IconComponent = getIconComponent(iconName);
                    return !submenus || submenus.length === 0 ? (
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
                              <IconComponent size={18} />
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
                          icon={IconComponent}
                          label={label}
                          onLinkClick={onLinkClick}
                          submenus={submenus}
                        />
                      </div>
                    );
                  }
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
