'use client';

import AdminModal from '../admin/AdminModal';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <AdminModal open={open} onClose={onCancel} labelledby="confirm-modal" title={title}>
      <p className="mt-2 text-sm text-gray-800">{description}</p>
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="cursor-pointer rounded-md border px-5 py-1.5 text-sm leading-6 font-semibold shadow-sm"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className="cursor-pointer rounded-md border border-red-600 bg-red-600 px-5 py-1.5 text-sm leading-6 font-semibold text-white shadow-sm hover:bg-red-900"
        >
          {confirmText}
        </button>
      </div>
    </AdminModal>
  );
}
