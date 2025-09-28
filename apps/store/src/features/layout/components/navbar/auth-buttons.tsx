"use client";
import type { auth } from "@renovabit/auth/index";
import { Button } from "@renovabit/ui/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import UserDropdown from "./user-dropdown";

type Session = typeof auth.$Infer.Session;

export function AuthButtons({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const back = search ? `${pathname}?${search}` : pathname;

  const [callback] = useQueryState("callback", parseAsString.withDefault(back));

  return (
    <>
      {session ? (
        <UserDropdown session={session} />
      ) : (
        <Button asChild>
          <Link
            href={`/iniciar-sesion?callback=${encodeURIComponent(callback)}`}
          >
            <span className="hidden items-center gap-2 md:flex">
              <LogIn />
              Iniciar Sesión
            </span>
            <span className="flex md:hidden">
              <span className="sr-only">Iniciar Sesión</span>
              <LogIn />
            </span>
          </Link>
        </Button>
      )}
    </>
  );
}
