"use server";

import { signIn } from "@/features/auth/actions/auth-actions";
import {
  type LoginFormSchemaType,
  loginFormSchema,
} from "@/features/auth/schema/login-schema";

export type FormResponse = {
  status: boolean;
  message: string;
};

export async function loginSubmitHandler(
  data: LoginFormSchemaType
): Promise<FormResponse> {
  try {
    const validation = loginFormSchema.safeParse(data);

    if (!validation.success) {
      return {
        status: false,
        message: "Datos de formulario inválidos",
      };
    }

    const { email, password } = validation.data;

    const result = await signIn(email, password);

    if (!result.user) {
      return {
        status: false,
        message: "Usuario o contraseña incorrectos",
      };
    }

    return {
      status: true,
      message: "Inicio de sesión exitoso",
    };
  } catch (error) {
    console.error("Error al iniciar sesión", error);
    return {
      status: false,
      message: "Error al iniciar sesión",
    };
  }
}
