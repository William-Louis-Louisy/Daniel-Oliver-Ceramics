import { useFormContext } from 'react-hook-form';
import ErrorFeedback from '@/components/admin/ErrorFeedback';

type TextAreaFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
};

export default function TextAreaField({ name, label, placeholder, required }: TextAreaFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors?.[name];

  return (
    <div>
      <label className="text-neutral block text-sm leading-6 font-medium">
        {label}
        {required && ' *'}
      </label>
      <div className="mt-1">
        <textarea
          {...register(name)}
          placeholder={placeholder}
          rows={4}
          className="border-neutral block w-full rounded-md border px-3 py-1.5 shadow-sm ring-0 placeholder:text-gray-500 sm:text-sm sm:leading-6"
        />
      </div>
      <ErrorFeedback errors={fieldError} />
    </div>
  );
}
