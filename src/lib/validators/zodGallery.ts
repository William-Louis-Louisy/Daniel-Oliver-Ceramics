import { z } from 'zod';
import { emptyStringToUndefined } from '../utils';

export const galleryValidator = z.object({
  name: z
    .string()
    .min(2, 'Gallery name must be at least 2 characters long')
    .max(120, 'Gallery name must be at most 120 characters long'),
  location: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .min(2, 'Gallery location must be at least 2 characters long')
      .max(120, 'Gallery location must be at most 120 characters long')
      .optional(),
  ),
  website: z.preprocess(
    emptyStringToUndefined,
    z.url('Gallery website must be a valid URL').optional(),
  ),
  isPublished: z.boolean().optional(),
});

export type GalleryFormValues = z.infer<typeof galleryValidator>;
export type GalleryFormInput = z.input<typeof galleryValidator>;
