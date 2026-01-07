'use client';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CaretDown, Check } from '@phosphor-icons/react';

type CollectionOption = {
  _id: string;
  title: string;
};

interface CollectionSelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  collections: CollectionOption[];
  required?: boolean;
}

export default function CollectionSelect({
  label,
  value,
  onChange,
  error,
  collections,
  required,
}: CollectionSelectProps) {
  const selected = collections.find((c) => c._id === value) ?? null;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-neutral block text-sm leading-6 font-medium">
          {label}
          {required && ' *'}
        </label>
      )}

      <Listbox
        value={selected}
        onChange={(option: CollectionOption | null) => option && onChange?.(option._id)}
      >
        <div className="relative mt-1">
          <ListboxButton className="border-element bg-element relative w-full cursor-default rounded-md py-2 pr-10 pl-3 text-left text-sm shadow-sm focus:ring-0 focus:outline-none">
            <span className="block truncate">
              {selected ? selected.title : 'Select a collection'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <CaretDown size={20} />
            </span>
          </ListboxButton>

          <ListboxOptions
            transition
            className="bg-element absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in data-[closed]:data-[leave]:opacity-0 sm:text-sm"
          >
            {collections.map((collection) => (
              <ListboxOption
                key={collection._id}
                value={collection}
                className="group text-foreground data-[focus]:bg-accent relative cursor-default py-2 pr-9 pl-3 select-none data-[focus]:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {collection.title}
                </span>

                <span className="text-accent absolute inset-y-0 right-0 flex items-center pr-4 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <Check aria-hidden="true" size={20} />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
