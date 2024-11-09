import { BusinessSector } from 'src/domain/BusinessSector';
import { CustomerType } from 'src/domain/Customer';
import { PaymentTerm } from 'src/domain/PaymentTerm';
import { Country } from 'src/domain/Country';
import { z } from 'zod';
import { Status } from 'src/utils/enums';
import { Phone } from 'src/domain/Phone';

export const createCustomerSchema = z
  .object({
    type: z.enum([CustomerType.INDIVIDUAL, CustomerType.BUSINESS]),
    name: z.string().min(3).max(100),
    documentNumber: z.string(),
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
    email: z.string().email(),
    country: z.string(),
    address: z.string().min(3).max(100),
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

export const updateCustomerSchema = z
  .object({
    id: z.string().uuid(),
    type: z.enum([CustomerType.INDIVIDUAL, CustomerType.BUSINESS]).optional(),
    name: z.string().min(3).max(100).optional(),
    documentNumber: z.string().optional(),
    email: z.string().email().optional(),
    country: z.string().optional(),
    address: z.string().min(3).max(100).optional(),
    paymentTerm: z.string().uuid().optional(),
    businessSector: z.array(z.string().uuid()).min(1).optional(),
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
