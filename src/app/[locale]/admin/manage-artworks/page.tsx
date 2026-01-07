'use client';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import Loader from '@/components/commons/Loader';
import { adminSections } from '@/lib/adminSections';
import AdminHeader from '@/components/admin/AdminHeader';
import ConfirmModal from '@/components/modals/ConfirmModal';
import SectionHeading from '@/components/admin/SectionHeading';
import MaxWidthWrapper from '@/components/commons/MaxWidthWrapper';
import { useArtworks, useDeleteArtwork } from '@/hooks/useArtworks';
import { Artwork, getArtCollectionMeta } from '@/lib/api/artworks';
import ArtworkModal from '@/components/modals/ArtworkModal';
import ArtworksList from '@/components/lists/ArtworksList';
import AdminPageHeading from '@/components/admin/AdminPageHeading';

export default function ManageArtworks() {
  const { user, isLoading: authLoading, error: authError } = useAuth(true);
  const { data, isLoading, error } = useArtworks();
  const deleteMutation = useDeleteArtwork();
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editing, setEditing] = useState<Artwork | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (authError) toast.error('Unable to load session.');
  }, [authError]);

  const artworkSection = adminSections.find((section) => section.id === 'artworks');

  const onAdd = () => {
    setEditing(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const onEdit = (p: Artwork) => {
    setEditing(p);
    setFormMode('edit');
    setFormOpen(true);
  };

  const onAskDelete = (id: string) => {
    setToDeleteId(id);
    setConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!toDeleteId) return;
    try {
      await deleteMutation.mutateAsync({ artworkId: toDeleteId });
      toast.success('Artwork deleted');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message || 'Delete failed');
    } finally {
      setConfirmOpen(false);
      setToDeleteId(null);
    }
  };

  if (authLoading) return <Loader />;

  if (!user) return null;

  return (
    <div className="from-background to-element min-h-page bg-gradient-to-b pb-12">
      <MaxWidthWrapper className="pt-8">
        <AdminPageHeading
          title={artworkSection?.name || ''}
          description={artworkSection?.description || ''}
          onAddClick={onAdd}
          buttonLabel="New Artwork"
          currentPage="/admin/manage-artworks"
        />

        <ArtworksList
          data={data || []}
          loading={isLoading}
          errorMessage={error ? (error.message as string) : undefined}
          onEdit={onEdit}
          onDelete={onAskDelete}
        />

        {/* Artwork Form Modal */}
        <ArtworkModal
          open={formOpen}
          onClose={() => setFormOpen(false)}
          defaultArtCollectionId={getArtCollectionMeta(editing).id}
        />

        {/* Confirm Delete Modal */}
        <ConfirmModal
          open={confirmOpen}
          title="Confirm Delete"
          description="Are you sure you want to delete this artwork? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={onConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </MaxWidthWrapper>
    </div>
  );
}
