import { z } from 'zod';

// Course validation schemas
export const createCourseSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  slug: z
    .string()
    .min(1, 'El slug es requerido')
    .regex(
      /^[a-z0-9-]+$/,
      'El slug solo puede contener letras minúsculas, números y guiones'
    ),
  visibility: z.enum(['PUBLIC', 'PRIVATE']),
  tags: z.array(z.string()).optional().default([]),
});

export const updateCourseSchema = createCourseSchema.partial();

// Infer types from schemas
export type CreateCourseData = z.infer<typeof createCourseSchema>;
export type UpdateCourseData = z.infer<typeof updateCourseSchema>;
