import { CivilStatus } from 'src/domain/CivilStatus';
import { DocumentType } from 'src/domain/DocumentType';
import { Rol } from 'src/domain/Rol';
import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
    motherLastName: z.string(),
    phone: z.string().regex(/^\+\d{4,}$/, 'Invalid field mobile'),
    address: z.string(),
    documentType: z.string(),
    documentNumber: z.string(),
    birthdate: z.coerce.date(),
    civilStatus: z.string(),
    rol: z.string(),
    email: z.string().email(),
    password: z.string(),
    status: z.boolean(),
  })
  .strict()
  .transform((data) => ({
    ...data,
    documentType: new DocumentType({ id: data.documentType }),
    civilStatus: new CivilStatus({ id: data.civilStatus }),
    rol: new Rol({ id: data.rol }),
  }));

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
    documentType: z.string().optional(),
    documentNumber: z.string().optional(),
    birthdate: z.coerce.date().optional(),
    civilStatus: z.string().optional(),
    rol: z.string().optional(),
    email: z.string().email().optional(),
    status: z.boolean().optional(),
  })
  .strict()
  .transform((data) => ({
    ...data,
    ...(data.documentType && {
      documentType: new DocumentType({ id: data.documentType }),
    }),
    ...(data.civilStatus && {
      civilStatus: new CivilStatus({ id: data.civilStatus }),
    }),
    ...(data.rol && {
      rol: new Rol({ id: data.rol }),
    }),
  }));

export const updateUserPasswordSchema = z
  .object({
    id: z.string(),
    oldPassword: z.string(),
    newPassword: z.string(),
  })
  .required()
  .strict();
