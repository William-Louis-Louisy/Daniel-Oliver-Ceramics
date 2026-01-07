'use client';
import { useAdminArtCollections, useDeleteArtCollection } from '@/hooks/useArtCollections';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import Loader from '@/components/commons/Loader';
import { adminSections } from '@/lib/adminSections';
import { ArtCollection } from '@/lib/api/artCollections';
import ConfirmModal from '@/components/modals/ConfirmModal';
import MaxWidthWrapper from '@/components/commons/MaxWidthWrapper';
import AdminPageHeading from '@/components/admin/AdminPageHeading';
import ArtCollectionsList from '@/components/lists/ArtCollectionsList';
import ArtCollectionModal from '@/components/modals/ArtCollectionModal';

export default function ManageCollections() {
  const { user, isLoading: authLoading, error: authError } = useAuth(true);
  const { data, isLoading, error } = useAdminArtCollections();
  const deleteMutation = useDeleteArtCollection();
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editing, setEditing] = useState<ArtCollection | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (authError) toast.error('Unable to load session.');
  }, [authError]);

  const collectionSection = adminSections.find((section) => section.id === 'art-collections');

  const onAdd = () => {
    setEditing(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const onEdit = (p: ArtCollection) => {
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
      await deleteMutation.mutateAsync({ artCollectionId: toDeleteId });
      toast.success('Art collection deleted');
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
          title={collectionSection?.name || ''}
          description={collectionSection?.description || ''}
          onAddClick={onAdd}
          buttonLabel="New Collection"
          currentPage="/admin/manage-collections"
        />

        <ArtCollectionsList
          data={data || []}
          loading={isLoading}
          errorMessage={error ? (error.message as string) : undefined}
          onEdit={onEdit}
          onDelete={onAskDelete}
        />

        {/* Art Collection Form Modal */}
        <ArtCollectionModal
          open={formOpen}
          mode={formMode}
          onClose={() => setFormOpen(false)}
          artCollectionId={editing?._id}
          initialValues={
            editing
              ? {
                  title: editing.title,
                  description: editing.description,
                  image: editing.image,
                  isPublished: editing.isPublished,
                  translationKey: editing.translationKey,
                }
              : {
                  title: '',
                  isPublished: true,
                }
          }
        />

        {/* Confirm Delete Modal */}
        <ConfirmModal
          open={confirmOpen}
          title="Confirm Delete"
          description="Are you sure you want to delete this collection? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={onConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </MaxWidthWrapper>
    </div>
  );
}
