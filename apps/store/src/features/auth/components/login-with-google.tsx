"use client";
import { LogoGoogle } from "@renovabit/ui/components/logo/logo-google";
import { Button } from "@renovabit/ui/components/ui/button";
import { parseAsString, useQueryState } from "nuqs";
import { signInSocial } from "../actions/auth-actions";

export function LoginWithGoogle() {
  const [callback] = useQueryState("callback", parseAsString.withDefault("/"));

  const handleSignIn = async () => {
    await signInSocial("google", callback);
  };

  return (
    <Button
      className="w-full bg-white text-gray-850 hover:bg-gray-100"
      onClick={handleSignIn}
      type="button"
    >
      <LogoGoogle />
      Iniciar sesión con Google
    </Button>
  );
}
