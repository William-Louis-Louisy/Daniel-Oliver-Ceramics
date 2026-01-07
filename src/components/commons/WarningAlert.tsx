import { Warning } from '@phosphor-icons/react';

export default function WarningAlert({ message }: { message: string | undefined }) {
  return (
    <div className="mt-8 border-l-4 border-yellow-600 bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <Warning aria-hidden="true" className="h-5 w-5 text-yellow-600" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-900">{message}</p>
        </div>
      </div>
    </div>
  );
}
