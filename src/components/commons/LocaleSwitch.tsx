'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { routing } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { CaretUpDown } from '@phosphor-icons/react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export default function LocaleSwitch() {
  const router = useRouter();
  const params = useParams();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations('LocaleSwitch');
  const [isPending, startTransition] = useTransition();

  const locales = routing.locales.map((loc, index) => ({
    id: index,
    code: loc,
    label: t('locale', { locale: loc }),
  }));

  const defaultLocale = locales.find((l) => l.code === currentLocale) || locales[0];
  const [selected, setSelected] = useState(defaultLocale);

  const handleChange = (localeOption: typeof defaultLocale) => {
    setSelected(localeOption);
    startTransition(() => {
      router.replace({ pathname, query: params }, { locale: localeOption.code });
    });
  };

  return (
    <div>
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative text-sm">
          <ListboxButton
            aria-busy={isPending}
            className="bg-element/60 relative w-full cursor-default rounded-full py-2 pr-10 pl-3 text-left shadow-sm ring-0 focus:ring-0 focus:outline-none"
          >
            <span className="block truncate">{selected.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <CaretUpDown aria-hidden="true" className="size-4" />
            </span>
          </ListboxButton>
          <ListboxOptions
            modal={false}
            className={cn(
              'bg-element/90 absolute z-10 max-h-60 w-full overflow-auto rounded-md py-1 text-sm shadow-lg focus:outline-none sm:text-sm',
              isMobile ? 'bottom-full mb-1' : 'top-full mt-1',
            )}
          >
            {locales.map((loc) => (
              <ListboxOption
                key={loc.id}
                value={loc}
                title={loc.label}
                className={({ focus }) =>
                  cn(
                    'relative cursor-default py-2 pr-9 pl-4 text-xs select-none',
                    focus ? 'bg-foreground text-background' : 'text-foreground',
                  )
                }
              >
                {({ selected: isSelected }) => (
                  <span className={`block ${isSelected ? 'font-bold' : 'font-normal'}`}>
                    {loc.label}
                  </span>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
