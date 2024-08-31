import { z } from 'zod';

export const createBankSchema = z
  .object({
    name: z.string().min(3).max(100),
  })
  .strict()
  .transform((data) => {
    return {
      ...data,
      status: 'ACTIVE',
    };
  });

export const updateBankSchema = z
  .object({
    id: z.string(),
    name: z.string().min(3).max(100),
    status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED']).optional(),
  })
  .strict();
