import { Brand } from 'src/domain/Brand';
import { z } from 'zod';

export const createLineSchema = z
  .object({
    name: z.string().min(3).max(255),
    brand: z.string().uuid(),
  })
  .strict()
  .transform((data) => {
    return {
      ...data,
      brand: new Brand({ id: data.brand }),
    };
  });

export const updateBrandSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(3).max(255).optional(),
    brand: z.string().uuid().optional(),
  })
  .strict()
  .transform((data) => {
    return {
      ...data,
      brand: new Brand({ id: data.brand }),
    };
  });
