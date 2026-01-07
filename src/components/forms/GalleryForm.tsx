import { useEffect } from 'react';
import FormActions from './FormActions';
import TextField from './fields/TextField';
import { ModalMode } from '@/types/modalMode';
import { zodResolver } from '@hookform/resolvers/zod';
import PublishedToggle from './fields/PublishedToggle';
import { FormProvider, useForm } from 'react-hook-form';

import { galleryValidator, GalleryFormInput, GalleryFormValues } from '@/lib/validators/zodGallery';

type GalleryFormProps = {
  mode: ModalMode;
  initialValues?: Partial<GalleryFormValues>;
  onSubmit: (values: GalleryFormValues) => Promise<void> | void;
  onCancel: () => void;
  loading?: boolean;
};

export default function GalleryForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}: GalleryFormProps) {
  const isEdit = mode === 'edit';

  const methods = useForm<GalleryFormInput, unknown, GalleryFormValues>({
    resolver: zodResolver(galleryValidator),
    defaultValues: {
      name: '',
      location: '',
      website: '',
      isPublished: initialValues?.isPublished ?? true,
      ...initialValues,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset({
      name: initialValues?.name ?? '',
      location: initialValues?.location ?? '',
      website: initialValues?.website ?? '',
      isPublished: initialValues?.isPublished ?? true,
    });
  }, [initialValues, reset]);

  async function handleFormSubmit(values: GalleryFormValues) {
    await onSubmit(values);
  }

  const busy = isSubmitting || loading;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid max-h-[60vh] gap-2 overflow-y-auto">
          <TextField name="name" label="Gallery Name" placeholder="Enter gallery name" required />
          <TextField
            name="location"
            label="Location"
            placeholder="Enter gallery location"
            required
          />
          <TextField name="website" label="Website" placeholder="Enter gallery website URL" />
          <PublishedToggle />
        </div>

        <FormActions
          isSubmitting={busy}
          onCancel={onCancel}
          submitLabel={isEdit ? 'Save changes' : 'Create'}
        />
      </form>
    </FormProvider>
  );
}
