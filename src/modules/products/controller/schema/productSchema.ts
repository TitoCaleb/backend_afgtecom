import { Brand } from 'src/domain/Brand';
import { Factoring } from 'src/domain/factoring';
import { Group } from 'src/domain/Group';
import { Pricing } from 'src/domain/Pricing';
import { Subgroup } from 'src/domain/Subgroup';
import { Status } from 'src/utils/enums';
import { z } from 'zod';

export const createProductSchema = z
  .object({
    code: z.string().min(1).max(100),
    description: z.string().min(1).max(100),
    currency: z.enum(['USD', 'PEN']),
    group: z.string().uuid(),
    subGroup: z.string().uuid(),
    brand: z.string().uuid(),
    cost: z.number(),
    factoring: z.object({
      wholesaler: z.number().positive(),
      distributor: z.number().positive(),
      public: z.number().positive(),
    }),
    pricing: z.object({
      wholesaler: z.number().positive(),
      distributor: z.number().positive(),
      public: z.number().positive(),
    }),
    observation: z.string().optional(),
  })
  .strict()
  .transform((data) => ({
    ...data,
    factoring: new Factoring(data.factoring),
    pricing: new Pricing(data.pricing),
    group: new Group({ id: data.group }),
    subGroup: new Subgroup({ id: data.subGroup }),
    brand: new Brand({ id: data.brand }),
  }));

export const updateProductSchema = z
  .object({
    id: z.string().uuid(),
    code: z.string().min(1).max(100).optional(),
    currency: z.enum(['USD', 'PEN']).optional(),
    description: z.string().min(1).max(100).optional(),
    group: z.string().uuid().optional(),
    subGroup: z.string().uuid().optional(),
    brand: z.string().uuid().optional(),
    observation: z.string().optional(),
    status: z.enum([Status.ACTIVE, Status.DELETED, Status.INACTIVE]).optional(),
  })
  .strict()
  .transform((data) => ({
    ...data,
    ...(data.group && { group: new Group({ id: data.group }) }),
    ...(data.subGroup && { subGroup: new Subgroup({ id: data.subGroup }) }),
    ...(data.brand && { brand: new Brand({ id: data.brand }) }),
  }));
