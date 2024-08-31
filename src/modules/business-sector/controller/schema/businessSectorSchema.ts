import { z } from 'zod';

export const createBusinessSectorSchema = z
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

export const updateBusinessSectorSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(3).max(255),
    status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED']).optional(),
  })
  .strict();
