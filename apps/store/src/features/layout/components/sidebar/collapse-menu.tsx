import { Button } from "@renovabit/ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@renovabit/ui/components/ui/collapsible";
import { ChevronDown, Dot, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type CollapseMenuProps = {
  icon: LucideIcon;
  label: string;
  active: boolean;
  submenus: Submenu[];
  onLinkClick?: () => void;
};

export function CollapseMenu({
  icon: Icon,
  label,
  active: _,
  submenus,
  onLinkClick,
}: CollapseMenuProps) {
  const pathname = usePathname();
  const isSubmenuActive = submenus.some((submenu) =>
    submenu.active === undefined ? submenu.href === pathname : submenu.active
  );
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

  return (
    <Collapsible
      className="w-full"
      onOpenChange={setIsCollapsed}
      open={isCollapsed}
    >
      <CollapsibleTrigger
        asChild
        className="mb-1 [&[data-state=open]>div>div>svg]:rotate-180"
      >
        <Button
          className="h-10 w-full justify-start"
          variant={isSubmenuActive ? "secondary" : "ghost"}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <span className="mr-4">
                <Icon size={18} />
              </span>
              <p className="max-w-[150px] translate-x-0 truncate opacity-100">
                {label}
              </p>
            </div>
            <div className="translate-x-0 whitespace-nowrap opacity-100">
              <ChevronDown
                className="transition-transform duration-200"
                size={18}
              />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {/** biome-ignore lint/nursery/noShadow: <Is component> */}
        {submenus.map(({ href, label, active }) => (
          <Button
            asChild
            className="mb-1 h-10 w-full justify-start"
            key={href}
            variant={
              (active === undefined && pathname === href) || active
                ? "secondary"
                : "ghost"
            }
          >
            <Link href={href} onClick={onLinkClick}>
              <span className="mr-4 ml-2">
                <Dot size={18} />
              </span>
              <p className="max-w-[170px] translate-x-0 truncate opacity-100">
                {label}
              </p>
            </Link>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
