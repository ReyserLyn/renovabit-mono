"use server";

import { signUp } from "@/features/auth/actions/auth-actions";
import {
  type RegisterFormSchemaType,
  registerFormSchema,
} from "@/features/auth/schema/register-schema";

type FormResponse = {
  status: boolean;
  message: string;
};

export async function registerSubmitHandler(
  data: RegisterFormSchemaType
): Promise<FormResponse> {
  try {
    const validation = registerFormSchema.safeParse(data);

    if (!validation.success) {
      return {
        status: false,
        message: "Datos de formulario inválidos",
      };
    }

    const { email, password, name, lastname, phone } = validation.data;

    const result = await signUp(
      email,
      password.password,
      name,
      lastname,
      phone
    );

    if (!result) {
      return {
        status: false,
        message: "Error al registrar usuario",
      };
    }

    return {
      status: true,
      message: "Usuario registrado exitosamente",
    };
  } catch (error) {
    console.error("Error al registrar usuario", error);
    return {
      status: false,
      message: "Error al registrar usuario",
    };
  }
}
