import { Brand } from 'src/domain/Brand';
import { Status } from 'src/utils/enums';
import { z } from 'zod';

export const createGroupSchema = z
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

export const updateGroupSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(3).max(255).optional(),
    brand: z.string().uuid().optional(),
    status: z.enum([Status.ACTIVE, Status.INACTIVE, Status.DELETED]).optional(),
  })
  .strict()
  .transform((data) => {
    return {
      ...data,
      brand: new Brand({ id: data.brand }),
    };
  });
