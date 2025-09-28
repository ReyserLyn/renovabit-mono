"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toastTemplates } from "@renovabit/ui/components/toast/templates";
import { Button } from "@renovabit/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@renovabit/ui/components/ui/form";
import { Input } from "@renovabit/ui/components/ui/input";
import { PasswordInput } from "@renovabit/ui/components/ui/password-input";
import { Separator } from "@renovabit/ui/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { loginSubmitHandler } from "@/features/auth/actions/login/submit";
import { LoginWithGoogle } from "@/features/auth/components/login-with-google";
import {
  type LoginFormSchemaType,
  loginFormSchema,
} from "@/features/auth/schema/login-schema";
import { LogoMonogramLight } from "@/logo/logo-ts";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const [callback] = useQueryState("callback", parseAsString.withDefault("/"));

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  async function onSubmit(data: LoginFormSchemaType) {
    setIsLoading(true);
    const response = await loginSubmitHandler(data);

    if (response.status) {
      toastTemplates.success(response.message);
      form.reset();

      router.push(callback);
    } else {
      toastTemplates.error(response.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <div className="grid h-full w-full lg:grid-cols-2">
        <div className="m-auto flex w-full max-w-xs flex-col items-center">
          <Link href="/">
            <LogoMonogramLight className="w-24" />
          </Link>
          <div className="flex w-full flex-col items-center gap-4">
            <p className="font-semibold text-xl tracking-tight">
              Iniciar sesión en Renovabit
            </p>

            <LoginWithGoogle />
          </div>

          <div className="my-4 flex w-full items-center justify-center overflow-hidden">
            <Separator />
            <span className="px-2 text-sm">O</span>
            <Separator />
          </div>

          <Form {...form}>
            <form
              className="w-full space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Correo electrónico"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Contraseña" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="mt-4 w-full"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </form>
          </Form>

          <div className="mt-5 space-y-5">
            <Link
              className="block text-center text-muted-foreground text-sm underline"
              href="/recuperar-contraseña"
            >
              ¿Olvidaste tu contraseña?
            </Link>

            <p className="text-center text-sm">
              ¿No tienes una cuenta?
              <Link
                className="ml-1 text-muted-foreground underline"
                href={`/registrarse?callback=${encodeURIComponent(callback)}`}
              >
                Crear cuenta
              </Link>
            </p>
          </div>
        </div>

        <div className="relative hidden h-full border-l bg-muted lg:block">
          <Image
            alt="Login background"
            className="object-cover transition-transform duration-1000 hover:scale-105"
            fill
            priority
            src="/images/auth/login.avif"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>
    </div>
  );
}
