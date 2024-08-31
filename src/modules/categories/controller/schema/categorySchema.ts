import { z } from 'zod';

export const createCategorySchema = z
  .object({
    name: z.string().min(3).max(255),
  })
  .strict()
  .transform((data) => {
    return {
      ...data,
      status: 'ACTIVE',
    };
  });

export const updateCategorySchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(3).max(255).optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED']).optional(),
  })
  .strict();
