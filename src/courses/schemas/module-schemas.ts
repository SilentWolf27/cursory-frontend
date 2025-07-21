import { z } from 'zod';

// Module validation schemas
export const createModuleSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  order: z
    .number()
    .int('El orden debe ser un número entero')
    .min(1, 'El orden debe ser mayor a 0'),
  objectives: z.array(z.string()).optional().default([]),
});

export const updateModuleSchema = createModuleSchema.partial();

// Infer types from schemas
export type CreateModuleData = z.infer<typeof createModuleSchema>;
export type UpdateModuleData = z.infer<typeof updateModuleSchema>;
