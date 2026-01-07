import React from 'react';
import { IAdminSection } from '@/lib/adminSections';
import Link from 'next/link';

export default function AdminSection({ section }: { section: IAdminSection }) {
  const Icon = section.icon;

  return (
    <Link
      href={section.href}
      className="group bg-element from-element to-background/50 flex flex-col gap-4 rounded-lg from-70% p-4 shadow-lg duration-200 ease-in-out hover:bg-gradient-to-b md:p-8"
    >
      <div className="flex items-start gap-4">
        <div
          className="flex aspect-square size-14 items-center justify-center rounded-md p-3"
          style={{ backgroundColor: section.color }}
        >
          <Icon
            size={28}
            weight="duotone"
            className="text-white transition-transform duration-200 group-hover:scale-115"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{section.name}</h3>
          <p className="text-muted-foreground text-sm">{section.description}</p>
        </div>
      </div>
    </Link>
  );
}
