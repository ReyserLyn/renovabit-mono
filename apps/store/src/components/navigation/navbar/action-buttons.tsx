import { Button } from "@renovabit/ui/components/ui/button";
import Link from "next/link";

export function ActionButtons() {
  return (
    <div className="flex items-center gap-4">
      <Button asChild>
        <Link href="/proformas">Proformas</Link>
      </Button>

      <Button asChild>
        <Link href="/ofertas">Ofertas!</Link>
      </Button>
    </div>
  );
}
