'use client';
import type { Gallery } from '@/lib/api/galleries';
import AdminTable, { AdminTableColumn } from '../admin/AdminTable';

interface GalleriesListProps {
  data: Gallery[];
  loading: boolean;
  errorMessage?: string;
  onEdit: (g: Gallery) => void;
  onDelete: (id: string) => void;
}

export default function GalleriesList({
  data,
  loading,
  errorMessage,
  onEdit,
  onDelete,
}: GalleriesListProps) {
  const columns: AdminTableColumn<Gallery>[] = [
    {
      id: 'name',
      header: 'Name',
      isPrimary: true,
      cell: (item) => item.name,
    },
    {
      id: 'location',
      header: 'Location',
      cell: (item) => item.location ?? 'N/A',
    },
    {
      id: 'website',
      header: 'Website',
      cell: (item) => item.website ?? 'N/A',
    },
    {
      id: 'isPublished',
      header: 'Is Published',
      cell: (item) => (item.isPublished ? 'Yes' : 'No'),
    },
  ];

  return (
    <AdminTable<Gallery>
      data={data}
      loading={loading}
      errorMessage={errorMessage}
      emptyMessage="Oops, it seems there are no galleries in the database. To create one, please click on the “New gallery” button."
      columns={columns}
      getRowId={(item) => item._id}
      getRowLabel={(item) => item.name}
      renderActions={(item) => (
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => onEdit(item)} className="edit-button">
            Edit<span className="sr-only">, {item.name}</span>
          </button>
          <button onClick={() => onDelete(item._id)} className="delete-button">
            Delete<span className="sr-only">, {item.name}</span>
          </button>
        </div>
      )}
    />
  );
}
