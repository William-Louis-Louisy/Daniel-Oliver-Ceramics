'use client';
import { useCreateExhibition, useUpdateExhibition } from '@/hooks/useExhibitions';
import toast from 'react-hot-toast';
import AdminModal from '../admin/AdminModal';
import { ModalMode } from '@/types/modalMode';
import ExhibitionForm from '../forms/ExhibitionForm';
import { ExhibitionFormValues } from '@/lib/validators/zodExhibition';

interface ExhibitionFormModalProps {
  open: boolean;
  mode: ModalMode;
  onClose: () => void;
  exhibitionId?: string;
  initialValues?: Partial<ExhibitionFormValues>;
}

export default function ExhibitionFormModal({
  open,
  mode,
  onClose,
  exhibitionId,
  initialValues,
}: ExhibitionFormModalProps) {
  const isEdit = mode === 'edit';

  const createMutation = useCreateExhibition();
  const updateMutation = useUpdateExhibition(exhibitionId || '');

  async function handleSubmit(values: ExhibitionFormValues) {
    try {
      if (isEdit && exhibitionId) {
        await updateMutation.mutateAsync(values);
        toast.success('Exhibition updated');
      } else {
        await createMutation.mutateAsync(values);
        toast.success('Exhibition created');
      }
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error';
      toast.error(message || (isEdit ? 'Update failed' : 'Create failed'));
    }
  }

  const loading = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      labelledby="exhibition-modal"
      title={isEdit ? 'Edit Exhibition' : 'Add new Exhibition'}
    >
      <ExhibitionForm
        mode={mode}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={onClose}
        loading={loading}
      />
    </AdminModal>
  );
}
