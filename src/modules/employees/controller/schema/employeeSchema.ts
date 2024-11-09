import { Customer } from 'src/domain/Customer';
import { Phone } from 'src/domain/Phone';
import { Provider } from 'src/domain/Provider';
import { Status } from 'src/utils/enums';
import { z } from 'zod';

export const createEmployeeSchema = z
  .object({
    name: z.string().min(3).max(100),
    middleName: z.string().min(3).max(100).optional(),
    lastName: z.string().min(3).max(100),
    motherLastName: z.string().min(3).max(100).optional(),
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
    email: z.string().email().optional(),
    position: z.string().min(3).max(100).optional(),
    comments: z.string().min(3).max(450).optional(),
    provider: z.string().uuid().optional(),
    customer: z.string().uuid().optional(),
  })
  .strict()
  .transform((data) => ({
    ...data,
    phone: data.phone.map((phone) => new Phone({ number: phone })),
    ...(data.provider && { provider: new Provider({ id: data.provider }) }),
    ...(data.customer && { customer: new Customer({ id: data.customer }) }),
  }));

export const deleteEmployeeSchema = z
  .object({
    id: z.string().uuid(),
    provider: z.string().uuid().optional(),
    customer: z.string().uuid().optional(),
  })
  .transform((data) => ({
    ...data,
    ...(data.provider && { provider: new Provider({ id: data.provider }) }),
    ...(data.customer && { customer: new Customer({ id: data.customer }) }),
  }));

export const updateEmployeeSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(3).max(100).optional(),
    middleName: z.string().min(3).max(100).optional(),
    lastName: z.string().min(3).max(100).optional(),
    motherLastName: z.string().min(3).max(100).optional(),
    email: z.string().email().optional(),
    position: z.string().min(3).max(100).optional(),
    comments: z.string().min(3).max(450).optional(),
    status: z.enum([Status.ACTIVE, Status.DELETED, Status.INACTIVE]).optional(),
  })
  .strict();
