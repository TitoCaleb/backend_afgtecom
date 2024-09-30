import { BusinessSector } from 'src/domain/BusinessSector';
import { CustomerType } from 'src/domain/Customer';
import { PaymentTerm } from 'src/domain/PaymentTerm';
import { Country } from 'src/domain/Ubigeo/Country';
import { z } from 'zod';

export const createCustomerSchema = z
  .object({
    type: z.enum([CustomerType.INDIVIDUAL, CustomerType.BUSINESS]),
    name: z.string().min(3).max(100),
    documentNumber: z.string(), // falta validar si es un DNI o RUC
    phone: z.string().regex(/^\+51[9]\d{8}$/, 'Invalid field mobile'),
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
  }));

export const updateCustomerSchema = z
  .object({
    id: z.string().uuid(),
    type: z.enum([CustomerType.INDIVIDUAL, CustomerType.BUSINESS]),
    name: z.string().min(3).max(100),
    documentNumber: z.string(), // falta validar si es un DNI o RUC
    phone: z.string().regex(/^\+51[9]\d{8}$/, 'Invalid field mobile'),
    email: z.string().email(),
    country: z.string(),
    address: z.string().min(3).max(100),
    paymentTerm: z.string().uuid(),
    businessSector: z.array(z.string().uuid()).min(1),
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
