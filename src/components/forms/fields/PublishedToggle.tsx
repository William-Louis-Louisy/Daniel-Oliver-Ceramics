'use client';

import { Controller, useFormContext } from 'react-hook-form';

export default function PublishedToggle() {
  const { control } = useFormContext();

  return (
    <Controller
      name="isPublished"
      control={control}
      defaultValue={true}
      render={({ field: { value, onChange } }) => (
        <div>
          <label className="text-neutral block text-sm leading-6 font-medium">Is Published ?</label>
          <fieldset className="flex items-center space-y-0 space-x-10">
            <div className="flex items-center">
              <input
                id="isPublished-yes"
                type="radio"
                className="text-accent focus:ring-accent h-4 w-4 border-gray-300"
                checked={value === true}
                onChange={() => onChange(true)}
              />
              <label
                htmlFor="isPublished-yes"
                className="text-neutral ml-3 block text-sm leading-6 font-medium"
              >
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="isPublished-no"
                type="radio"
                className="text-accent focus:ring-accent h-4 w-4 border-gray-300"
                checked={value === false}
                onChange={() => onChange(false)}
              />
              <label
                htmlFor="isPublished-no"
                className="text-neutral ml-3 block text-sm leading-6 font-medium"
              >
                No
              </label>
            </div>
          </fieldset>
        </div>
      )}
    />
  );
}
