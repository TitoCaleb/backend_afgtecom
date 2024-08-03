import { z } from 'zod';

export const createProviderSchema = z.object({
  name: z.string().min(3).max(100),
  phone: z.string().regex(/^\+\d{4,}$/, 'Invalid field mobile'),
  documentNumber: z.string().length(12),
  email: z.string().email(),
  country: z.string().min(3).max(100),
  address: z.string().min(3).max(100),
});

export const updateProviderSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(100).optional(),
  phone: z
    .string()
    .regex(/^\+\d{4,}$/, 'Invalid field mobile')
    .optional(),
  documentNumber: z.string().length(12).optional(),
  email: z.string().email().optional(),
  country: z.string().min(3).max(100).optional(),
  address: z.string().min(3).max(100).optional(),
});
