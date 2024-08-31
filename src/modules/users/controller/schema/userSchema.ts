import { CivilStatus } from 'src/domain/CivilStatus';
import { DocumentType } from 'src/domain/DocumentType';
import { Rol } from 'src/domain/Rol';
import { Department } from 'src/domain/Ubigeo/Department';
import { District } from 'src/domain/Ubigeo/District';
import { Province } from 'src/domain/Ubigeo/Province';
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
    district: z.string(),
    province: z.string(),
    department: z.string(),
    email: z.string().email(),
  })
  .strict()
  .transform((data) => ({
    ...data,
    documentType: new DocumentType({ id: data.documentType }),
    civilStatus: new CivilStatus({ id: data.civilStatus }),
    rol: new Rol({ id: data.rol }),
    district: new District({ id: data.district }),
    province: new Province({ id: data.province }),
    department: new Department({ id: data.department }),
    status: 'ACTIVE',
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
    district: z.string().optional(),
    province: z.string().optional(),
    department: z.string().optional(),
    civilStatus: z.string().optional(),
    rol: z.string().optional(),
    email: z.string().email().optional(),
    status: z.string().optional(),
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
    ...(data.district && {
      district: new District({ id: data.district }),
    }),
    ...(data.province && {
      province: new Province({ id: data.province }),
    }),
    ...(data.department && {
      department: new Department({ id: data.department }),
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
