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
import { PhoneInput } from "@renovabit/ui/components/ui/phone-input";
import { Separator } from "@renovabit/ui/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { registerSubmitHandler } from "@/features/auth/actions/register/submit";
import { LoginWithGoogle } from "@/features/auth/components/login-with-google";
import {
  type RegisterFormSchemaType,
  registerFormSchema,
} from "@/features/auth/schema/register-schema";
import { LogoMonogramLight } from "@/logo/logo-ts";

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const router = useRouter();
  const [callback] = useQueryState("callback", parseAsString.withDefault("/"));

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: { password: "", password2: "" },
      name: "",
      lastname: "",
      phone: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(data: RegisterFormSchemaType) {
    setIsLoading(true);
    const response = await registerSubmitHandler(data);

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
              Registrarse en Renovabit
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
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombres</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombres" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellidos</FormLabel>
                      <FormControl>
                        <Input placeholder="Apellidos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <PhoneInput placeholder="Teléfono" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                name="password.password"
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

              <FormField
                control={form.control}
                name="password.password2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
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
                {isLoading ? "Registrando..." : "Registrarse"}
              </Button>
            </form>
          </Form>

          <p className="mt-5 text-center text-sm">
            Ya tienes una cuenta?
            <Link
              className="ml-1 text-muted-foreground underline"
              href={`/iniciar-sesion?callback=${encodeURIComponent(callback)}`}
            >
              Iniciar sesión
            </Link>
          </p>
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
