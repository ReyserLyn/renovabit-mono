"use client";

import { NavigationMenuLink } from "@renovabit/ui/components/ui/navigation-menu";
import { cn } from "@renovabit/ui/lib/utils";
import Link from "next/link";

export function ListItem({
  className,
  title,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { href: string }) {
  return (
    <li>
      <NavigationMenuLink
        render={
          <Link
            className={cn(
              "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            href={href}
            {...props}
          />
        }
      >
        <div className="flex items-center gap-2 leading-none tracking-tight">
          {title}
        </div>
      </NavigationMenuLink>
    </li>
  );
}
