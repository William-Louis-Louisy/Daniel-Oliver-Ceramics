'use client';
import { artworkFormValidator, type ArtworkFormValues } from '@/lib/validators/zodArtwork';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import FormActions from './FormActions';
import ImageInput from './fields/ImageInput';
import CollectionSelect from './fields/CollectionSelect';
import { cn } from '@/lib/utils';

type ArtworkFormProps = {
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: ArtworkFormValues) => Promise<void> | void;
  collections: { _id: string; title: string }[];
  initialValues?: Partial<ArtworkFormValues>;
};

export default function ArtworkForm({
  loading = false,
  onCancel,
  onSubmit,
  collections,
  initialValues,
}: ArtworkFormProps) {
  const methods = useForm<ArtworkFormValues>({
    resolver: zodResolver(artworkFormValidator),
    defaultValues: {
      mode: 'single',
      artCollection: '',
      image: '',
      images: [],
      ...initialValues,
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (!initialValues) return;

    reset({
      mode: initialValues.mode ?? 'single',
      artCollection: initialValues.artCollection ?? '',
      image: initialValues.mode === 'single' ? (initialValues.image ?? '') : '',
      images: initialValues.mode === 'multiple' ? (initialValues.images ?? []) : [],
    });
  }, [initialValues, reset]);

  const formMode = watch('mode');
  const busy = isSubmitting || loading;

  async function handleFormSubmit(values: ArtworkFormValues) {
    await onSubmit(values);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex max-h-[70vh] min-h-[60vh] flex-col gap-4 overflow-y-auto">
          <div className="border-neutral/10 border-element flex items-center justify-center border-b">
            <div className="-mb-px flex space-x-8">
              <button
                type="button"
                onClick={() => setValue('mode', 'single')}
                className={cn(
                  formMode === 'single'
                    ? 'border-accent text-accent'
                    : 'text-foreground hover:border-foreground border-transparent',
                  'cursor-pointer border-b-3 px-1 py-4 text-sm font-medium whitespace-nowrap',
                )}
              >
                Single artwork
              </button>
              <button
                type="button"
                onClick={() => setValue('mode', 'multiple')}
                className={cn(
                  formMode === 'multiple'
                    ? 'border-accent text-accent'
                    : 'text-foreground hover:border-foreground border-transparent',
                  'cursor-pointer border-b-3 px-1 py-4 text-sm font-medium whitespace-nowrap',
                )}
              >
                Multiple artwork
              </button>
            </div>
          </div>

          <Controller
            name="artCollection"
            control={control}
            render={({ field, fieldState }) => (
              <CollectionSelect
                label="Art collection"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                collections={collections}
                required
              />
            )}
          />

          {formMode === 'single' && (
            <Controller
              name="image"
              control={control}
              render={({ field, fieldState }) => (
                <ImageInput
                  name={field.name}
                  label="Artwork image"
                  value={field.value || null}
                  onChange={(val) => field.onChange(val || '')}
                  error={fieldState.error?.message}
                />
              )}
            />
          )}

          {formMode === 'multiple' && (
            <Controller
              name="images"
              control={control}
              render={({ field, fieldState }) => (
                <ImageInput
                  multiple
                  name={field.name}
                  label="Artwork images"
                  value={field.value || []}
                  onChange={(val) => field.onChange(val)}
                  error={fieldState.error?.message}
                />
              )}
            />
          )}
        </div>

        <FormActions
          isSubmitting={busy}
          onCancel={onCancel}
          submitLabel={formMode === 'multiple' ? 'Create artworks' : 'Create artwork'}
        />
      </form>
    </FormProvider>
  );
}
