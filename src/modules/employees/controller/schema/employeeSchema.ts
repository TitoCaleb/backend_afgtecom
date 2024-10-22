import { Provider } from 'src/domain/Provider';
import { Status } from 'src/utils/enums';
import { z } from 'zod';

export const createEmployeeSchema = z
  .object({
    name: z.string().min(3).max(100),
    middleName: z.string().min(3).max(100).optional(),
    lastName: z.string().min(3).max(100),
    motherLastName: z.string().min(3).max(100).optional(),
    cellphone: z
      .string()
      .regex(/^\+\d{4,}$/, 'Invalid field mobile')
      .optional(),
    email: z.string().email().optional(),
    position: z.string().min(3).max(100).optional(),
    comments: z.string().min(3).max(450).optional(),
    provider: z.string().uuid(),
  })
  .strict()
  .transform((data) => ({
    ...data,
    provider: new Provider({ id: data.provider }),
  }));

export const deleteEmployeeSchema = z
  .object({
    id: z.string().uuid(),
    provider: z.string().uuid(),
  })
  .transform((data) => ({
    ...data,
    provider: new Provider({ id: data.provider }),
  }));

export const updateEmployeeSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(3).max(100).optional(),
    middleName: z.string().min(3).max(100).optional(),
    lastName: z.string().min(3).max(100).optional(),
    motherLastName: z.string().min(3).max(100).optional(),
    phone: z
      .string()
      .regex(/^\+\d{4,}$/, 'Invalid field mobile')
      .optional(),
    cellphone: z
      .string()
      .regex(/^\+\d{4,}$/, 'Invalid field mobile')
      .optional(),
    email: z.string().email().optional(),
    position: z.string().min(3).max(100).optional(),
    comments: z.string().min(3).max(450).optional(),
    status: z.enum([Status.ACTIVE, Status.DELETED, Status.INACTIVE]).optional(),
  })
  .strict();
