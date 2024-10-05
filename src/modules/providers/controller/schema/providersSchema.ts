import { BusinessSector } from 'src/domain/BusinessSector';
import { PaymentTerm } from 'src/domain/PaymentTerm';
import { Country } from 'src/domain/Country';
import { z } from 'zod';

export const createProviderSchema = z
  .object({
    name: z.string().min(3).max(100),
    phone: z.string().length(7),
    documentNumber: z.string().length(11),
    email: z.string().email(),
    country: z.string(),
    address: z.string().min(3).max(100),
    creditLine: z.string().min(3).max(50),
    paymentTerm: z.string().uuid(),
    businessSector: z.array(z.string().uuid()).min(1),
  })
  .strict()
  .transform((data) => ({
    ...data,
    businessSector: data.businessSector.map((id) => new BusinessSector({ id })),
    paymentTerm: new PaymentTerm({ id: data.paymentTerm }),
    country: new Country({ id: data.country }),
  }));

export const updateProviderSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(3).max(100).optional(),
    phone: z.string().length(7).optional(),
    documentNumber: z.string().length(11).optional(),
    email: z.string().email().optional(),
    country: z.string().optional(),
    address: z.string().min(3).max(100).optional(),
    creditLine: z.string().min(3).max(50).optional(),
    paymentTerm: z.string().uuid().optional(),
    businessSector: z.array(z.string().uuid()).optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED']).optional(),
  })
  .strict()
  .transform((data) => ({
    ...data,
    ...(data.businessSector &&
      data.businessSector.length > 1 && {
        businessSector: data.businessSector.map(
          (id) => new BusinessSector({ id }),
        ),
      }),
    ...(data.paymentTerm && {
      paymentTerm: new PaymentTerm({ id: data.paymentTerm }),
    }),
    ...(data.country && { country: new Country({ id: data.country }) }),
  }));
