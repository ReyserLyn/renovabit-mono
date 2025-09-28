import { Button } from "@renovabit/ui/components/ui/button";
import { Cog, SquarePercent } from "lucide-react";
import Link from "next/link";

export function ActionButtons() {
  return (
    <div className="flex items-center gap-4">
      <Button asChild className="hidden md:flex" variant="secondary">
        <Link href="/arma-tu-pc">
          <Cog />
          Arma tu PC
        </Link>
      </Button>

      <Button asChild variant="secondary">
        <Link href="/ofertas">
          <SquarePercent />
          Ofertas!
        </Link>
      </Button>
    </div>
  );
}
