import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Formato de email inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
      'La contraseña contiene caracteres no válidos'
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
