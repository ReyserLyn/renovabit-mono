import { z } from "zod";

const passwordSchema = z
  .string({
    error: "La contraseña no puede estar vacía.",
  })
  .regex(/^.{8,20}$/, {
    message: "Mínimo 8 y máximo 20 caracteres.",
  })
  .regex(/(?=.*\d)/, {
    message: "Al menos un dígito.",
  });

export const registerFormSchema = z.object({
  email: z.email("Correo electrónico inválido"),
  password: z
    .object({
      password: passwordSchema,
      password2: passwordSchema,
    })
    .refine(({ password, password2 }) => password === password2, {
      path: ["password2"],
      message: "Las contraseñas no coinciden.",
    }),
  name: z.string().min(1, "El nombre es requerido"),
  lastname: z.string().min(1, "El apellido es requerido"),
  phone: z.string().regex(/^\d{9}$/, {
    message: "El teléfono debe tener exactamente 9 números.",
  }),
});

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
