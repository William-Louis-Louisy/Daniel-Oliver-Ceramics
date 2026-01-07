import { z } from 'zod';
import { emptyStringToUndefined } from '../utils';

export const exhibitionValidator = z.object({
  date: z.string().min(4, 'Exhibition date must be provided'),
  title: z
    .string()
    .min(2, 'Exhibition title must be at least 2 characters long')
    .max(120, 'Exhibition title must be at most 120 characters long'),
  location: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .min(2, 'Exhibition location must be at least 2 characters long')
      .max(120, 'Exhibition location must be at most 120 characters long')
      .optional(),
  ),
  website: z.preprocess(
    emptyStringToUndefined,
    z.url('Exhibition website must be a valid URL').optional(),
  ),
  isPublished: z.boolean().optional(),
});

export type ExhibitionFormValues = z.infer<typeof exhibitionValidator>;
export type ExhibitionFormInput = z.input<typeof exhibitionValidator>;
