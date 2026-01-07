'use client';
import toast from 'react-hot-toast';
import AdminModal from '../admin/AdminModal';
import ArtworkForm from '../forms/ArtworkForm';
import { useCreateArtwork, useCreateMultipleArtworks } from '@/hooks/useArtworks';
import { useArtCollections } from '@/hooks/useArtCollections';
import type { ArtworkFormValues } from '@/lib/validators/zodArtwork';

interface ArtworkModalProps {
  open: boolean;
  onClose: () => void;
  defaultArtCollectionId?: string;
}

export default function ArtworkModal({ open, onClose, defaultArtCollectionId }: ArtworkModalProps) {
  const createMutation = useCreateArtwork();
  const createMultipleMutation = useCreateMultipleArtworks();
  const {
    data: collections = [],
    isLoading: collectionsLoading,
    error: collectionsError,
  } = useArtCollections();

  const loading =
    collectionsLoading || createMutation.isPending || createMultipleMutation.isPending;

  const initialValues: Partial<ArtworkFormValues> = {
    mode: 'single',
    artCollection: defaultArtCollectionId ?? '',
  };

  async function handleSubmit(values: ArtworkFormValues) {
    try {
      if (values.mode === 'single') {
        const { artCollection, image } = values;

        if (!image) {
          toast.error('Please select an image before submitting.');
          return;
        }

        await createMutation.mutateAsync({
          image,
          artCollection,
        });
        toast.success('Artwork created');
      } else {
        const { artCollection } = values;
        const images = values.images ?? [];

        if (images.length === 0) {
          toast.error('Please add at least one image before submitting.');
          return;
        }

        const payload = images.map((image) => ({
          image,
          artCollection,
        }));

        await createMultipleMutation.mutateAsync(payload);
        toast.success('Artworks created');
      }

      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error';
      toast.error(message || 'Artwork creation failed');
    }
  }

  if (collectionsError) {
    console.error(collectionsError);
  }

  return (
    <AdminModal open={open} onClose={onClose} labelledby="artwork-modal" title="Create Artwork">
      <ArtworkForm
        loading={loading}
        onCancel={onClose}
        onSubmit={handleSubmit}
        collections={collections}
        initialValues={initialValues}
      />
    </AdminModal>
  );
}
