'use client';
import type { Exhibition } from '@/lib/api/exhibitions';
import AdminTable, { AdminTableColumn } from '../admin/AdminTable';

interface ExhibitionsListProps {
  data: Exhibition[];
  loading: boolean;
  errorMessage?: string;
  onEdit: (e: Exhibition) => void;
  onDelete: (id: string) => void;
}

export default function ExhibitionsList({
  data,
  loading,
  errorMessage,
  onEdit,
  onDelete,
}: ExhibitionsListProps) {
  const columns: AdminTableColumn<Exhibition>[] = [
    {
      id: 'title',
      header: 'Title',
      isPrimary: true,
      cell: (item) => item.title,
    },
    {
      id: 'date',
      header: 'Date',
      cell: (item) => item.date,
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
    <AdminTable<Exhibition>
      data={data}
      loading={loading}
      errorMessage={errorMessage}
      emptyMessage="Oops, it seems there are no exhibitions in the database. To create one, please click on the “New exhibition” button."
      columns={columns}
      getRowId={(item) => item._id}
      getRowLabel={(item) => item.title}
      renderActions={(item) => (
        <div className="flex gap-2">
          <button onClick={() => onEdit(item)} className="edit-button shrink-0">
            Edit<span className="sr-only">, {item.title}</span>
          </button>
          <button onClick={() => onDelete(item._id)} className="delete-button shrink-0">
            Delete<span className="sr-only">, {item.title}</span>
          </button>
        </div>
      )}
    />
  );
}
