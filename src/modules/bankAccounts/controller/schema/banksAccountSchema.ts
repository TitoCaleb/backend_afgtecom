import { Bank } from 'src/domain/Banks';
import { Provider } from 'src/domain/Provider';
import { z } from 'zod';

export const createBankAccountSchema = z
  .object({
    accountNumber: z.string().min(3).max(100),
    CCI: z.string().min(3).max(100).optional(),
    type: z.enum(['SAVING', 'CURRENT']),
    provider: z.string().uuid(),
    bank: z.string().uuid(),
  })
  .strict()
  .transform((data) => ({
    ...data,
    provider: new Provider({ id: data.provider }),
    bank: new Bank({ id: data.bank }),
  }));

export const updateBankAccountSchema = z
  .object({
    id: z.string().uuid(),
    accountNumber: z.string().min(3).max(100).optional(),
    CCI: z.string().min(3).max(100).optional(),
    type: z.enum(['SAVING', 'CURRENT']).optional(),
  })
  .strict();
