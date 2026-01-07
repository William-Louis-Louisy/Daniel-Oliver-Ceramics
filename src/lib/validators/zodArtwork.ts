import { z } from 'zod';

export const artworkFormValidator = z
  .object({
    mode: z.enum(['single', 'multiple']),
    artCollection: z.string().min(1, 'Please select a collection'),
    image: z.string().optional(),
    images: z.array(z.string().min(1)).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.mode === 'single') {
      if (!data.image || data.image.length === 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['image'],
          message: 'Please select an image',
        });
      }
    } else {
      if (!data.images || data.images.length === 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['images'],
          message: 'Please add at least one image',
        });
      }
    }
  });

export type ArtworkFormValues = z.infer<typeof artworkFormValidator>;
