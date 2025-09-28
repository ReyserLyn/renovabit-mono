"use client";
import type { auth } from "@renovabit/auth/index";
import { Button } from "@renovabit/ui/components/ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import LogoutButton from "@/features/auth/components/logout-button";

type Session = typeof auth.$Infer.Session;

export function ActionButtons({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const back = search ? `${pathname}?${search}` : pathname;

  const [callback] = useQueryState("callback", parseAsString.withDefault(back));

  return (
    <div className="flex items-center gap-4">
      <Button asChild variant="secondary">
        <Link href="/proformas">Proformas</Link>
      </Button>

      <Button asChild variant="secondary">
        <Link href="/ofertas">Ofertas!</Link>
      </Button>

      {session ? (
        <LogoutButton />
      ) : (
        <Button asChild>
          <Link
            href={`/iniciar-sesion?callback=${encodeURIComponent(callback)}`}
          >
            Iniciar Sesión
          </Link>
        </Button>
      )}
    </div>
  );
}
