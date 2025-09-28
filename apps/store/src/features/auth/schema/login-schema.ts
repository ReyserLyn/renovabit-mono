import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
