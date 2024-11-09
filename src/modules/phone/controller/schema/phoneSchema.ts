import { z } from 'zod';

export const updatePhoneSchema = z.object({
  id: z.string().uuid(),
  number: z.string(),
});
