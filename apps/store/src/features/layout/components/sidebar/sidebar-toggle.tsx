"use client";

import { Button } from "@renovabit/ui/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebarStore } from "@/features/layout/store/sidebar-store";

export function SidebarToggle() {
  const toggle = useSidebarStore((state) => state.toggle);

  return (
    <Button
      aria-label="Abrir menú"
      className="md:hidden"
      onClick={toggle}
      size="icon"
      variant="outline"
    >
      <Menu className="h-4 w-4" />
    </Button>
  );
}
