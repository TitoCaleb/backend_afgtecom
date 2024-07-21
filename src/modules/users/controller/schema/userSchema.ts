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
