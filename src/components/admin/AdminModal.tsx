import React from 'react';
import { X } from '@phosphor-icons/react';

type AdminModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  labelledby?: string;
};

export default function AdminModal({
  open,
  title,
  onClose,
  children,
  labelledby,
}: AdminModalProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledby}
      className="fixed inset-0 z-50 flex flex-col items-center justify-end bg-black/30 pt-6 backdrop-blur-xs md:justify-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Modal content */}
      <div
        className="from-background to-element w-full max-w-lg rounded-t-xl bg-gradient-to-b p-6 shadow-xl md:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 id="exhibition-modal-title" className="text-lg font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer text-gray-600 hover:text-black"
          >
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
