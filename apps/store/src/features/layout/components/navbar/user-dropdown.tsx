import type { auth } from "@renovabit/auth/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@renovabit/ui/components/ui/avatar";
import { Button } from "@renovabit/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@renovabit/ui/components/ui/dropdown-menu";
import { Files, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/features/auth/actions/auth-actions";

type Session = typeof auth.$Infer.Session;

export default function UserDropdown({ session }: { session: Session }) {
  const { user } = session;
  const { image, name } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-8.5" shape="circle" size="icon">
          <Avatar className="size-8.5">
            <AvatarImage
              alt={`imagen de ${name}`}
              fetchPriority="high"
              src={image ?? ""}
            />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        {/* Account Section */}
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/perfil">
              <User />
              <span>Perfil</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/ordenes">
              <Files />
              <span>Ordenes</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/preferencias">
              <Settings />
              <span>Preferencias</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* Logout */}
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          <LogOut className="text-red-800" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
