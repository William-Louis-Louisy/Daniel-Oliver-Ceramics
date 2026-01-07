import {
  ArtCollectionFormInput,
  artCollectionValidator,
  ArtCollectionFormValues,
} from '@/lib/validators/zodArtCollection';
import { useEffect } from 'react';
import FormActions from './FormActions';
import TextField from './fields/TextField';
import ImageInput from './fields/ImageInput';
import { ModalMode } from '@/types/modalMode';
import TextAreaField from './fields/TextAreaField';
import { zodResolver } from '@hookform/resolvers/zod';
import PublishedToggle from './fields/PublishedToggle';
import { Controller, FormProvider, useForm } from 'react-hook-form';

type ArtCollectionFormProps = {
  mode: ModalMode;
  loading?: boolean;
  onCancel: () => void;
  initialValues?: Partial<ArtCollectionFormValues>;
  onSubmit: (values: ArtCollectionFormValues) => Promise<void> | void;
};

export default function ArtCollectionForm({
  mode,
  onSubmit,
  onCancel,
  initialValues,
  loading = false,
}: ArtCollectionFormProps) {
  const isEdit = mode === 'edit';

  const methods = useForm<ArtCollectionFormInput, unknown, ArtCollectionFormValues>({
    resolver: zodResolver(artCollectionValidator),
    defaultValues: {
      title: '',
      image: '',
      description: '',
      artworks: [],
      isPublished: initialValues?.isPublished ?? true,
      ...initialValues,
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset({
      title: initialValues?.title ?? '',
      image: initialValues?.image ?? '',
      description: initialValues?.description ?? '',
      artworks: initialValues?.artworks ?? [],
      isPublished: initialValues?.isPublished ?? true,
    });
  }, [initialValues, reset]);

  async function handleFormSubmit(values: ArtCollectionFormValues) {
    await onSubmit(values);
  }

  const busy = isSubmitting || loading;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid max-h-[70vh] gap-2 overflow-y-auto">
          <TextField name="title" label="Title" placeholder="Enter collection title" required />
          <TextAreaField
            name="description"
            label="Description"
            placeholder="Enter collection description"
          />

          <div className="mb-4 flex justify-between">
            <Controller
              name="image"
              control={control}
              render={({ field, fieldState }) => (
                <ImageInput
                  name={field.name}
                  label="Collection Image"
                  value={field.value || null}
                  onChange={(val) => field.onChange(val || '')}
                  error={fieldState.error?.message}
                />
              )}
            />
            <PublishedToggle />
          </div>

          <TextField
            name="translationKey"
            label="Translation Key"
            placeholder="This field is for developers only"
          />
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
