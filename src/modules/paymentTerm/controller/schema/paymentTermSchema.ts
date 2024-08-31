import { z } from 'zod';

export const createPaymentTermSchema = z
  .object({
    condition: z.string().min(1).max(255),
  })
  .strict();

export const updatePaymentTermSchema = z.object({
  id: z.string().uuid(),
  condition: z.string().min(1).max(255),
});
