'use client';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import Loader from '@/components/commons/Loader';
import { Exhibition } from '@/lib/api/exhibitions';
import { adminSections } from '@/lib/adminSections';
import ConfirmModal from '@/components/modals/ConfirmModal';
import ExhibitionsList from '@/components/lists/ExhibitionsList';
import MaxWidthWrapper from '@/components/commons/MaxWidthWrapper';
import AdminPageHeading from '@/components/admin/AdminPageHeading';
import ExhibitionFormModal from '@/components/modals/ExhibitionFormModal';
import { useAdminExhibitions, useDeleteExhibition } from '@/hooks/useExhibitions';

export default function ManageExhibitions() {
  const { user, isLoading: authLoading, error: authError } = useAuth(true);
  const { data, isLoading, error } = useAdminExhibitions();
  const deleteMutation = useDeleteExhibition();
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editing, setEditing] = useState<Exhibition | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (authError) toast.error('Unable to load session.');
  }, [authError]);

  const exhibitionSection = adminSections.find((section) => section.id === 'exhibitions');

  const onAdd = () => {
    setEditing(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const onEdit = (p: Exhibition) => {
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
      await deleteMutation.mutateAsync({ exhibitionId: toDeleteId });
      toast.success('Exhibition deleted');
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
          title={exhibitionSection?.name || ''}
          description={exhibitionSection?.description || ''}
          onAddClick={onAdd}
          buttonLabel="New Exhibition"
          currentPage="/admin/manage-exhibitions"
        />

        <ExhibitionsList
          data={data || []}
          loading={isLoading}
          errorMessage={error ? (error.message as string) : undefined}
          onEdit={onEdit}
          onDelete={onAskDelete}
        />

        {/* Exhibition Form Modal */}
        <ExhibitionFormModal
          open={formOpen}
          mode={formMode}
          onClose={() => setFormOpen(false)}
          exhibitionId={editing?._id}
          initialValues={
            editing
              ? {
                  title: editing.title,
                  date: editing.date,
                  location: editing.location,
                  website: editing.website,
                  isPublished: editing.isPublished,
                }
              : {
                  title: '',
                  date: '',
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
          description="Are you sure you want to delete this exhibition? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={onConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </MaxWidthWrapper>
    </div>
  );
}
