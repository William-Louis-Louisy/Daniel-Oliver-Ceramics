import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.email('This email is invalid'),
  password: z.string().min(8, 'At least 8 characters'),
});

export type LoginForm = z.infer<typeof LoginSchema>;
