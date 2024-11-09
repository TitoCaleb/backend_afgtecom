import { BusinessSector } from 'src/domain/BusinessSector';
import { PaymentTerm } from 'src/domain/PaymentTerm';
import { Country } from 'src/domain/Country';
import { z } from 'zod';
import { Status } from 'src/utils/enums';
import { Phone } from 'src/domain/Phone';

export const createProviderSchema = z
  .object({
    name: z.string().min(3).max(100),
    phone: z
      .array(
        z
          .string()
          .regex(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            'Invalid field mobile',
          ),
      )
      .min(1),
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
    phone: data.phone.map((phone) => new Phone({ number: phone })),
  }));

export const updateProviderSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(3).max(100).optional(),
    documentNumber: z.string().length(11).optional(),
    email: z.string().email().optional(),
    country: z.string().optional(),
    address: z.string().min(3).max(100).optional(),
    creditLine: z.string().min(3).max(50).optional(),
    paymentTerm: z.string().uuid().optional(),
    businessSector: z.array(z.string().uuid()).optional(),
    status: z.enum([Status.ACTIVE, Status.DELETED, Status.INACTIVE]).optional(),
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
