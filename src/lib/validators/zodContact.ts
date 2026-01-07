import { z } from 'zod';

export const contactMessageSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(80),
  lastName: z.string().trim().min(1, 'Last name is required').max(80),
  email: z.email('Email is invalid').trim().max(254),
  subject: z.string().trim().min(1, 'Subject is required').max(120),
  message: z.string().trim().min(1, 'Message is required').max(2000),
});

export type ContactMessageFormValues = z.infer<typeof contactMessageSchema>;
