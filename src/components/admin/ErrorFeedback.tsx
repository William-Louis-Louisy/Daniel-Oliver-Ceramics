import React from 'react';

type FormError = {
  message?: string;
};

export default function ErrorFeedback({ errors }: { errors?: FormError }) {
  return errors?.message ? (
    <p className="text-xs text-red-600">{errors.message}</p>
  ) : (
    <p className="text-xs text-transparent">Placeholder</p>
  );
}
