import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { DisclosureButton } from '@headlessui/react';

export default function AdminMobileNav() {
  const { user, isLoading, logout, isLoggingOut } = useAuth(false);

  if (isLoading) return null;

  if (!user) return null;

  return (
    <div className="border-foreground/30 flex flex-col items-center gap-4 border-t pt-6">
      <DisclosureButton
        as={Link}
        href="/admin"
        className="block px-4 py-2 text-sm data-[focus]:text-white"
      >
        Admin Dashboard
      </DisclosureButton>

      <DisclosureButton
        as={Link}
        href="/admin/newsletter-registrations"
        className="block px-4 py-2 text-sm data-[focus]:text-white"
      >
        Newsletter Registrations
      </DisclosureButton>

      <DisclosureButton
        as="button"
        type="button"
        className="block cursor-pointer px-4 py-2 text-sm disabled:opacity-50 data-[focus]:text-white"
        onClick={() => logout()}
        disabled={isLoggingOut}
      >
        Logout
      </DisclosureButton>
    </div>
  );
}
