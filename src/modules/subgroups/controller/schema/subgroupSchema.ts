import { Group } from 'src/domain/Group';
import { Status } from 'src/utils/enums';
import { z } from 'zod';

export const createSubgroupSchema = z
  .object({
    name: z.string().min(3).max(255),
    group: z.string().uuid(),
  })
  .strict()
  .transform((data) => {
    return {
      ...data,
      group: new Group({ id: data.group }),
    };
  });

export const updateSubgroupSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(3).max(255).optional(),
    group: z.string().uuid().optional(),
    status: z.enum([Status.ACTIVE, Status.INACTIVE, Status.DELETED]).optional(),
  })
  .strict()
  .transform((data) => {
    return {
      ...data,
      group: new Group({ id: data.group }),
    };
  });
