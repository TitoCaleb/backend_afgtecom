import { z } from 'zod';

export const createBankSchema = z
  .object({
    name: z.string().min(3).max(100),
  })
  .strict();

export const updateBankSchema = z
  .object({
    id: z.string(),
    name: z.string().min(3).max(100),
  })
  .strict();