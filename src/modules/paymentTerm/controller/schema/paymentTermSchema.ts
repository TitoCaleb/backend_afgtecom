import { Status } from 'src/utils/enums';
import { z } from 'zod';

export const createPaymentTermSchema = z
  .object({
    condition: z.string().min(1).max(255),
  })
  .strict()
  .transform((data) => ({
    ...data,
  }));

export const updatePaymentTermSchema = z
  .object({
    id: z.string().uuid(),
    condition: z.string().min(1).max(255).optional(),
    status: z.enum([Status.ACTIVE, Status.DELETED, Status.INACTIVE]).optional(),
  })
  .strict();
