'use client';
import toast from 'react-hot-toast';
import AdminModal from '../admin/AdminModal';
import { ModalMode } from '@/types/modalMode';
import ArtCollectionForm from '../forms/ArtCollectionForm';
import { ArtCollectionFormValues } from '@/lib/validators/zodArtCollection';
import { useCreateArtCollection, useUpdateArtCollection } from '@/hooks/useArtCollections';

interface ArtCollectionModalProps {
  open: boolean;
  mode: ModalMode;
  onClose: () => void;
  artCollectionId?: string;
  initialValues?: Partial<ArtCollectionFormValues>;
}

export default function ArtCollectionModal({
  open,
  mode,
  onClose,
  artCollectionId,
  initialValues,
}: ArtCollectionModalProps) {
  const isEdit = mode === 'edit';

  const createMutation = useCreateArtCollection();
  const updateMutation = useUpdateArtCollection(artCollectionId || '');

  async function handleSubmit(values: ArtCollectionFormValues) {
    try {
      if (isEdit && artCollectionId) {
        await updateMutation.mutateAsync(values);
        toast.success('Art collection updated');
      } else {
        await createMutation.mutateAsync(values);
        toast.success('Art collection created');
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
      labelledby="art-collection-modal"
      title={isEdit ? 'Edit Art Collection' : 'Create Art Collection'}
    >
      <ArtCollectionForm
        mode={mode}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={onClose}
        loading={loading}
      />
    </AdminModal>
  );
}
