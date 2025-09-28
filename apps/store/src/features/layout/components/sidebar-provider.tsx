"use client";

import { useSidebarStore } from "@/features/layout/store/sidebar-store";
import { SheetMenu } from "./sidebar/sheet-menu";

type SidebarProviderProps = {
  children: React.ReactNode;
};

export function SidebarProvider({ children }: SidebarProviderProps) {
  const { isOpen, close } = useSidebarStore();

  return (
    <>
      <SheetMenu isOpen={isOpen} onClose={close} />
      {children}
    </>
  );
}
