import { Brand } from 'src/domain/Brand';
import { Factoring } from 'src/domain/factoring';
import { Group } from 'src/domain/Group';
import { Pricing } from 'src/domain/Pricing';
import { Subgroup } from 'src/domain/Subgroup';
import { z } from 'zod';

export const createProductSchema = z
  .object({
    code: z.string().min(1).max(100),
    description: z.string().min(1).max(100),
    serie: z.string().min(1).max(100),
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

export const updateProductSchema = z.object({});
