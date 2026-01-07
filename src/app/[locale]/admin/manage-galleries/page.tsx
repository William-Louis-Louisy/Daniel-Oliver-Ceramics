'use client';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { Gallery } from '@/lib/api/galleries';
import Loader from '@/components/commons/Loader';
import React, { useEffect, useState } from 'react';
import { adminSections } from '@/lib/adminSections';
import ConfirmModal from '@/components/modals/ConfirmModal';
import GalleriesList from '@/components/lists/GalleriesList';
import MaxWidthWrapper from '@/components/commons/MaxWidthWrapper';
import AdminPageHeading from '@/components/admin/AdminPageHeading';
import GalleryFormModal from '@/components/modals/GalleryFormModal';
import { useAdminGalleries, useDeleteGallery } from '@/hooks/useGalleries';

export default function ManageGalleries() {
  const { user, isLoading: authLoading, error: authError } = useAuth(true);
  const { data, isLoading, error } = useAdminGalleries();
  const deleteMutation = useDeleteGallery();
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editing, setEditing] = useState<Gallery | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (authError) toast.error('Unable to load session.');
  }, [authError]);

  const galleriesSection = adminSections.find((section) => section.id === 'galleries');

  const onAdd = () => {
    setEditing(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const onEdit = (p: Gallery) => {
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
      await deleteMutation.mutateAsync({ galleryId: toDeleteId });
      toast.success('Gallery deleted');
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
          title={galleriesSection?.name || ''}
          description={galleriesSection?.description || ''}
          onAddClick={onAdd}
          buttonLabel="New Gallery"
          currentPage="/admin/manage-galleries"
        />

        <GalleriesList
          data={data || []}
          loading={isLoading}
          errorMessage={error ? (error.message as string) : undefined}
          onEdit={onEdit}
          onDelete={onAskDelete}
        />

        {/* Galleries Form Modal */}
        <GalleryFormModal
          open={formOpen}
          mode={formMode}
          onClose={() => setFormOpen(false)}
          galleryId={editing ? editing._id : undefined}
          initialValues={
            editing
              ? {
                  name: editing.name,
                  location: editing.location,
                  website: editing.website,
                  isPublished: editing.isPublished,
                }
              : {
                  name: '',
                  location: '',
                  website: '',
                  isPublished: true,
                }
          }
        />

        {/* Confirm Delete Modal */}
        <ConfirmModal
          open={confirmOpen}
          title="Confirm Delete"
          description="Are you sure you want to delete this gallery? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={onConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </MaxWidthWrapper>
    </div>
  );
}
