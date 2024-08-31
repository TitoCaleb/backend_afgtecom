import { Bank } from 'src/domain/Banks';
import { BusinessSector } from 'src/domain/BusinessSector';
import { PaymentTerm } from 'src/domain/PaymentTerm';
import { Provider } from 'src/domain/Provider';
import { z } from 'zod';

export const createProviderSchema = z
  .object({
    name: z.string().min(3).max(100),
    phone: z.string().length(7),
    documentNumber: z.string().length(11),
    email: z.string().email(),
    country: z.string().min(3).max(100),
    address: z.string().min(3).max(100),
    creditLine: z.string().min(3).max(50),
    paymentTerm: z.string().uuid(),
    businessSector: z.array(z.string().uuid()),
  })
  .strict()
  .transform((data) => ({
    ...data,
    businessSector: data.businessSector.map((id) => new BusinessSector({ id })),
    paymentTerm: new PaymentTerm({ id: data.paymentTerm }),
  }));

export const updateProviderSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(3).max(100).optional(),
    phone: z
      .string()
      .regex(/^\+\d{4,}$/, 'Invalid field mobile')
      .optional(),
    documentNumber: z.string().length(12).optional(),
    email: z.string().email().optional(),
    country: z.string().min(3).max(100).optional(),
    address: z.string().min(3).max(100).optional(),
    creditLine: z.string().min(3).max(50).optional(),
    paymentTerm: z.string().uuid().optional(),
    businessSector: z.array(z.string().uuid()),
  })
  .strict()
  .transform((data) => ({
    ...data,
    ...(data.businessSector && {
      businessSector: data.businessSector.map(
        (id) => new BusinessSector({ id }),
      ),
    }),
    ...(data.paymentTerm && {
      paymentTerm: new PaymentTerm({ id: data.paymentTerm }),
    }),
  }));

export const createBankAccountSchema = z
  .object({
    dolarAccountNumber: z.string().min(3).max(100).optional(),
    solesAccountNumber: z.string().min(3).max(100).optional(),
    provider: z.string().uuid(),
    bank: z.string().uuid(),
  })
  .strict()
  .transform((data) => ({
    ...data,
    provider: new Provider({ id: data.provider }),
    bank: new Bank({ id: data.bank }),
  }));

export const createBusinessSectorSchema = z
  .object({
    name: z.string().min(3).max(100),
    businessSector: z.string().uuid(),
  })
  .strict();

export const updateBankAccountSchema = z
  .object({
    id: z.string().uuid(),
    dolarAccountNumber: z.string().min(3).max(100).optional(),
    solesAccountNumber: z.string().min(3).max(100).optional(),
  })
  .strict();
