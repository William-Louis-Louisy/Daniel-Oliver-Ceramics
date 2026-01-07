import React from 'react';

type FormActionsProps = {
  isSubmitting?: boolean;
  submitLabel?: string;
  onCancel: () => void;
};

export default function FormActions({
  isSubmitting,
  submitLabel = 'Save changes',
  onCancel,
}: FormActionsProps) {
  return (
    <div className="mt-4 flex justify-between">
      <span className="flex items-end text-xs text-red-600">* required fields</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-md border px-5 py-1.5 text-sm leading-6 font-semibold shadow-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="border-accent bg-accent hover:bg-accent/80 cursor-pointer rounded-md border px-5 py-1.5 text-sm leading-6 font-semibold text-white shadow-sm disabled:opacity-50"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
