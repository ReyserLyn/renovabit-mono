"use client";

import { Button } from "@renovabit/ui/components/ui/button";
import { useState } from "react";
import { signOut } from "../actions/auth-actions";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  };
  return (
    <Button disabled={isLoading} onClick={handleLogout}>
      Cerrar sesión
    </Button>
  );
}
