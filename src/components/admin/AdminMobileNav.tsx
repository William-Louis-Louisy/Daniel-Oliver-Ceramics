import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function AdminMobileNav() {
  const { user, isLoading, logout, isLoggingOut } = useAuth(false);

  if (isLoading) return null;

  if (!user) return null;

  return (
    <div className="border-foreground/30 flex flex-col items-center gap-4 border-t pt-6">
      <Link href="/admin" className="block px-4 py-2 text-sm data-[focus]:text-white">
        Admin Dashboard
      </Link>

      <Link
        href="/newsletter-registrations"
        className="block px-4 py-2 text-sm data-[focus]:text-white"
      >
        Newsletter Registrations
      </Link>

      <button
        className="block px-4 py-2 text-sm data-[focus]:text-white"
        onClick={() => logout()}
        disabled={isLoggingOut}
      >
        <span>Logout</span>
      </button>
    </div>
  );
}
