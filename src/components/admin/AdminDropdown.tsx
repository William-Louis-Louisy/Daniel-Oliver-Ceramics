import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';
import { SignOut, User } from '@phosphor-icons/react';

export default function AdminDropdown() {
  const { user, isLoading, logout, isLoggingOut } = useAuth(false);

  if (isLoading) return null;

  if (!user) return null;

  return (
    <Menu as="div" className="relative">
      <div>
        <MenuButton
          title="Admin menu"
          className="bg-element/60 hover:border-accent hover:text-accent relative flex cursor-pointer rounded-full border-4 border-transparent text-sm duration-150 focus:outline-none"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open admin menu</span>
          <User size={30} weight="bold" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="bg-element absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md py-1 shadow-lg ring-0 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
      >
        <MenuItem>
          <Link
            href="/admin"
            className="data-[focus]:bg-accent block px-4 py-2 text-sm data-[focus]:text-white"
          >
            Admin Dashboard
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href="/admin/newsletter-registrations"
            className="data-[focus]:bg-accent block px-4 py-2 text-sm data-[focus]:text-white"
          >
            Newsletter Registrations
          </Link>
        </MenuItem>

        <MenuItem>
          <button
            className="data-[focus]:bg-accent flex w-full cursor-pointer items-center gap-2 px-4 pt-2.5 pb-2 text-sm data-[focus]:text-white"
            onClick={() => logout()}
            disabled={isLoggingOut}
          >
            <SignOut size={20} weight="bold" />
            <span className="hidden md:flex">Logout</span>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
