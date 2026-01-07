'use client';
import type { ArtCollection } from '@/lib/api/artCollections';
import AdminTable, { AdminTableColumn } from '../admin/AdminTable';

interface ArtCollectionsListProps {
  data: ArtCollection[];
  loading: boolean;
  errorMessage?: string;
  onEdit: (a: ArtCollection) => void;
  onDelete: (id: string) => void;
}

export default function ArtCollectionsList({
  data,
  loading,
  errorMessage,
  onEdit,
  onDelete,
}: ArtCollectionsListProps) {
  const columns: AdminTableColumn<ArtCollection>[] = [
    {
      id: 'title',
      header: 'Title',
      isPrimary: true,
      cell: (item) => item.title,
    },
    {
      id: 'image',
      header: 'Image',
      cell: (item) => item.image,
    },
    {
      id: 'description',
      header: 'Description',
      cell: (item) => item.description ?? 'N/A',
    },
    {
      id: 'isPublished',
      header: 'Is Published',
      cell: (item) => (item.isPublished ? 'Yes' : 'No'),
    },
  ];
  return (
    <AdminTable<ArtCollection>
      data={data}
      loading={loading}
      errorMessage={errorMessage}
      emptyMessage="Oops, it seems there are no art collections in the database. To create one, please click on the “New collection” button."
      columns={columns}
      getRowId={(item) => item._id}
      getRowLabel={(item) => item.title}
      renderActions={(item) => (
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => onEdit(item)} className="edit-button">
            Edit<span className="sr-only">, {item.title}</span>
          </button>
          <button onClick={() => onDelete(item._id)} className="delete-button">
            Delete<span className="sr-only">, {item.title}</span>
          </button>
        </div>
      )}
    />
  );
}
