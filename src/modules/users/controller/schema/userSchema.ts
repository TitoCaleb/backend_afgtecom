import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
    motherLastName: z.string(),
    phone: z.string().regex(/^\+\d{4,}$/, 'Invalid field mobile'),
    address: z.string(),
    documentTypeId: z.string(),
    documentNumber: z.string(),
    birthdate: z.coerce.date(),
    civilStatusId: z.string(),
    rolId: z.string(),
    email: z.string().email(),
    password: z.string(),
    status: z.boolean(),
  })
  .strict();

export const updateUserSchema = z
  .object({
    id: z.string(),
    name: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    motherLastName: z.string().optional(),
    phone: z
      .string()
      .regex(/^\+\d{4,}$/, 'Invalid field mobile')
      .optional(),
    address: z.string().optional(),
    documentTypeId: z.string().optional(),
    documentNumber: z.string().optional(),
    birthdate: z.coerce.date().optional(),
    civilStatusId: z.string().optional(),
    rolId: z.string().optional(),
    email: z.string().email().optional(),
    status: z.boolean().optional(),
  })
  .strict();
