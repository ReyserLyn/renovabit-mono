import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@renovabit/ui/components/ui/sheet";

import Link from "next/link";
import { Menu } from "@/features/layout/components/sidebar/menu";
import { LogoHorizontalLight } from "@/logo/logo-ts";

type SheetMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SheetMenu({ isOpen, onClose }: SheetMenuProps) {
  return (
    <Sheet onOpenChange={(open) => !open && onClose()} open={isOpen}>
      <SheetContent className="flex h-full flex-col px-3 sm:w-72" side="left">
        <SheetHeader className="flex items-center justify-center">
          <Link
            className="mt-2 flex items-center gap-2"
            href="/"
            onClick={onClose}
          >
            <SheetTitle className="sr-only">Renovabit</SheetTitle>
            <LogoHorizontalLight className="w-[170px]" />
          </Link>
        </SheetHeader>

        <Menu onLinkClick={onClose} />
      </SheetContent>
    </Sheet>
  );
}
