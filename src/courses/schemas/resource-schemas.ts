import { z } from 'zod';

// Resource validation schemas
const resourceTypes = [
  'PDF',
  'VIDEO',
  'WEBPAGE',
  'DOCUMENT',
  'PRESENTATION',
  'CODE_REPOSITORY',
  'BOOK',
  'ARTICLE',
  'WEBINAR',
  'TOOL',
  'COURSE_NOTES',
] as const;

export const createResourceSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().optional(),
  type: z.enum(resourceTypes),
  url: z.string().min(1, 'La URL es requerida').url('Debe ser una URL válida'),
});

export const updateResourceSchema = createResourceSchema.partial();

// Infer types from schemas
export type CreateResourceData = z.infer<typeof createResourceSchema>;
export type UpdateResourceData = z.infer<typeof updateResourceSchema>;
