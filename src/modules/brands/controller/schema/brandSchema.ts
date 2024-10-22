import { Status } from 'src/utils/enums';
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
    };
  });

export const updateBrandSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(3).max(255).optional(),
    status: z.enum([Status.ACTIVE, Status.DELETED, Status.INACTIVE]).optional(),
  })
  .strict();
