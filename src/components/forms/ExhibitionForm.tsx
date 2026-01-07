import { useEffect } from 'react';
import {
  ExhibitionFormInput,
  ExhibitionFormValues,
  exhibitionValidator,
} from '@/lib/validators/zodExhibition';
import { ModalMode } from '@/types/modalMode';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import FormActions from './FormActions';
import PublishedToggle from './fields/PublishedToggle';
import TextField from './fields/TextField';

type ExhibitionFormProps = {
  mode: ModalMode;
  initialValues?: Partial<ExhibitionFormValues>;
  onSubmit: (values: ExhibitionFormValues) => Promise<void> | void;
  onCancel: () => void;
  loading?: boolean;
};

export default function ExhibitionForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}: ExhibitionFormProps) {
  const isEdit = mode === 'edit';

  const methods = useForm<ExhibitionFormInput, unknown, ExhibitionFormValues>({
    resolver: zodResolver(exhibitionValidator),
    defaultValues: {
      title: '',
      date: '',
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
      title: initialValues?.title ?? '',
      date: initialValues?.date ?? '',
      location: initialValues?.location ?? '',
      website: initialValues?.website ?? '',
      isPublished: initialValues?.isPublished ?? true,
    });
  }, [initialValues, reset]);

  async function handleFormSubmit(values: ExhibitionFormValues) {
    await onSubmit(values);
  }

  const busy = isSubmitting || loading;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid max-h-[60vh] gap-2 overflow-y-auto">
          <TextField name="title" label="Title" placeholder="Enter exhibition title" required />
          <TextField name="date" label="Date" placeholder="Enter exhibition date" required />
          <TextField name="location" label="Location" placeholder="Enter exhibition location" />
          <TextField name="website" label="Website" placeholder="Enter exhibition website URL" />

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
