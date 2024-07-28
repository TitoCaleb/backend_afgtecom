import { z } from 'zod';

export const createBrandSchema = z
  .object({
    name: z.string().min(3).max(255),
  })
  .required()
  .strict()
  .transform((data) => {
    return {
      ...data,
      status: true,
    };
  });

export const updateBrandSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(3).max(255).optional(),
    status: z.boolean().optional(),
  })
  .strict();
