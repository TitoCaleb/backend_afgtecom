import { boolean, date, object, string } from 'yup';

export const createUserSchema = object({
  name: string().required(),
  middleName: string().notRequired(),
  lastName: string().required(),
  motherLastName: string().required(),
  phone: string()
    .required()
    .matches(/^\+\d{4,}$/, 'Invalid field mobile'),
  address: string().required(),
  documentTypeId: string().required(),
  documentNumber: string().required(),
  birthdate: date().required(),
  civilStatusId: string().required(),
  rolId: string().defined(),
  email: string().email().required(),
  password: string().required(),
  status: boolean().required(),
});

export const updateUserSchema = object({
  id: string().defined(),
  name: string().optional(),
  middleName: string().optional(),
  lastName: string().optional(),
  motherLastName: string().optional(),
  phone: string()
    .optional()
    .matches(/^\+\d{4,}$/, 'Invalid field mobile'),
  address: string().optional(),
  documentTypeId: string().optional(),
  documentNumber: string().optional(),
  birthdate: date().optional(),
  civilStatusId: string().optional(),
  rolId: string().optional(),
  email: string().email().optional(),
  password: string().optional(),
  status: boolean().optional(),
});
