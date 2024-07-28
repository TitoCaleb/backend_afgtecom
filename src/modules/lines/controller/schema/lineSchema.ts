import { z } from 'zod';

export const createLineSchema = z.object({
  name: z.string().min(3).max(255),
  brandId: z.string().uuid(),
});

export const updateBrandSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(255).optional(),
  brandId: z.string().uuid().optional(),
});
