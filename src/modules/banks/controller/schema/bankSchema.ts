import { Status } from 'src/utils/enums';
import { z } from 'zod';

export const createBankSchema = z
  .object({
    name: z.string().min(3).max(100),
  })
  .strict()
  .transform((data) => {
    return {
      ...data,
    };
  });

export const updateBankSchema = z
  .object({
    id: z.string(),
    name: z.string().min(3).max(100).optional(),
    status: z.enum([Status.ACTIVE, Status.DELETED, Status.INACTIVE]).optional(),
  })
  .strict();
