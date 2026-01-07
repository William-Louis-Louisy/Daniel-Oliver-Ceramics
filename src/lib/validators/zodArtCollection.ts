import { z } from 'zod';
import { emptyStringToUndefined } from '../utils';

export const artCollectionValidator = z.object({
  title: z
    .string()
    .min(2, 'Art collection title must be at least 2 characters long')
    .max(120, 'Art collection title must be at most 120 characters long'),
  image: z.url('Art collection image must be a valid URL'),
  description: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .min(5, 'Art collection description must be at least 5 characters long')
      .max(1000, 'Art collection description must be at most 1000 characters long')
      .optional(),
  ),
  isPublished: z.boolean(),
  translationKey: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .min(2, 'Translation key must be at least 2 characters long')
      .max(100, 'Translation key must be at most 100 characters long')
      .optional(),
  ),
});

export type ArtCollectionFormValues = z.infer<typeof artCollectionValidator>;
export type ArtCollectionFormInput = z.input<typeof artCollectionValidator>;
