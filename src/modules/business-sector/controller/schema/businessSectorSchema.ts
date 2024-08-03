import { z } from 'zod';

export const createBusinessSectorSchema = z
  .object({
    name: z.string().min(3).max(255),
  })
  .strict();

export const updateBusinessSectorSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(3).max(255),
  })
  .strict();
