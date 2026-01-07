'use client';
import type { ReactNode } from 'react';
import Loader from '@/components/commons/Loader';
import WarningAlert from '@/components/commons/WarningAlert';

export type AdminTableColumn<T> = {
  id: string;
  header: string;
  cell: (item: T) => ReactNode;
  isPrimary?: boolean;
};

type AdminTableProps<T> = {
  data: T[];
  loading: boolean;
  errorMessage?: string;
  emptyMessage: string;
  columns: AdminTableColumn<T>[];
  getRowId: (item: T) => string;
  getRowLabel?: (item: T) => string;
  renderActions?: (item: T) => ReactNode;
};

export default function AdminTable<T>({
  data,
  columns,
  loading,
  errorMessage,
  emptyMessage,
  getRowId,
  getRowLabel,
  renderActions,
}: AdminTableProps<T>) {
  if (loading) return <Loader />;

  if (errorMessage) {
    return <p className="text-red-600">Failed to load items: {errorMessage}</p>;
  }

  if (data.length === 0) {
    return <WarningAlert message={emptyMessage} />;
  }

  const hasActions = typeof renderActions === 'function';

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="divide-foreground min-w-full divide-y md:w-full md:table-fixed">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={col.id}
                    scope="col"
                    className={
                      col.isPrimary || index === 0
                        ? 'py-3.5 pr-3 pl-4 text-left text-sm font-semibold sm:pl-0'
                        : 'px-3 py-3.5 text-left text-sm font-semibold'
                    }
                  >
                    {col.header}
                  </th>
                ))}

                {hasActions && (
                  <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-foreground/30 divide-y">
              {data.map((item) => {
                const rowId = getRowId(item);
                const rowLabel = getRowLabel?.(item) ?? rowId;

                return (
                  <tr key={rowId}>
                    {columns.map((col, index) => (
                      <td
                        key={col.id}
                        className={
                          col.isPrimary || index === 0
                            ? 'py-4 pr-3 pl-4 text-sm font-medium sm:pl-0'
                            : 'text-neutral max-w-64 px-3 py-4 text-sm md:max-w-fit'
                        }
                      >
                        <div className="truncate">{col.cell(item)}</div>
                      </td>
                    ))}

                    {hasActions && (
                      <td className="relative inline-flex items-center gap-2 py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                        {renderActions?.(item) ?? null}
                        <span className="sr-only">{rowLabel}</span>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
