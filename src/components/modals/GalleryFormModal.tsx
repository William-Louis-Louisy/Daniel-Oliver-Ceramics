'use client';
import { useCreateGallery, useUpdateGallery } from '@/hooks/useGalleries';
import toast from 'react-hot-toast';
import AdminModal from '../admin/AdminModal';
import { ModalMode } from '@/types/modalMode';
import GalleryForm from '../forms/GalleryForm';
import { GalleryFormValues } from '@/lib/validators/zodGallery';

interface GalleryFormModalProps {
  open: boolean;
  mode: ModalMode;
  onClose: () => void;
  galleryId?: string;
  initialValues?: Partial<GalleryFormValues>;
}

export default function GalleryFormModal({
  open,
  mode,
  onClose,
  galleryId,
  initialValues,
}: GalleryFormModalProps) {
  const isEdit = mode === 'edit';

  const createMutation = useCreateGallery();
  const updateMutation = useUpdateGallery(galleryId || '');

  async function handleSubmit(values: GalleryFormValues) {
    try {
      if (isEdit && galleryId) {
        await updateMutation.mutateAsync(values);
        toast.success('Gallery updated');
      } else {
        await createMutation.mutateAsync(values);
        toast.success('Gallery created');
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
      labelledby="gallery-modal"
      title={isEdit ? 'Edit Gallery' : 'Create Gallery'}
    >
      <GalleryForm
        mode={mode}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={onClose}
        loading={loading}
      />
    </AdminModal>
  );
}
