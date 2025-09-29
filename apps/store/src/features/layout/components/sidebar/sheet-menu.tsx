"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@renovabit/ui/components/ui/sheet";
import Link from "next/link";
import { Menu } from "@/features/layout/components/sidebar/menu";
import { useSidebarStore } from "@/features/layout/store/sidebar-store";
import { LogoHorizontalLight } from "@/logo/logo-ts";
import type { Group } from "../../lib/menu-list";

type SheetMenuProps = {
  data: Group[];
};

export function SheetMenu({ data }: SheetMenuProps) {
  const { isOpen, close } = useSidebarStore();

  return (
    <Sheet onOpenChange={(open) => !open && close()} open={isOpen}>
      <SheetContent className="flex h-full flex-col px-3 sm:w-72" side="left">
        <SheetHeader className="flex items-center justify-center">
          <Link
            className="mt-2 flex items-center gap-2"
            href="/"
            onClick={close}
          >
            <SheetTitle className="sr-only">Renovabit</SheetTitle>
            <LogoHorizontalLight className="w-[170px]" />
          </Link>
        </SheetHeader>

        <Menu data={data} onLinkClick={close} />
      </SheetContent>
    </Sheet>
  );
}
