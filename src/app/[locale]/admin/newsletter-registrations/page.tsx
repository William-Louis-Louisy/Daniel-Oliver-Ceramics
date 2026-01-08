'use client';
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Loader from '@/components/commons/Loader';
import MaxWidthWrapper from '@/components/commons/MaxWidthWrapper';
import { useContacts } from '@/hooks/useContacts';
import AdminTable, { AdminTableColumn } from '@/components/admin/AdminTable';
import { Contact } from '@/lib/api/contact';

export default function NewsletterRegistrations() {
  const { user, isLoading: authLoading } = useAuth(false);
  const { data, isLoading, error } = useContacts();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) router.replace('/admin');
  }, [user, authLoading, router]);

  const columns: AdminTableColumn<Contact>[] = [
    {
      id: 'firstName',
      header: 'First Name',
      isPrimary: true,
      cell: (item) => item.firstName,
    },
    {
      id: 'lastName',
      header: 'Last Name',
      cell: (item) => item.lastName ?? 'N/A',
    },
    {
      id: 'email',
      header: 'Email',
      cell: (item) => item.email,
    },
  ];

  if (authLoading || isLoading) return <Loader />;

  return (
    <div className="from-background to-element min-h-page bg-gradient-to-b pb-12">
      <MaxWidthWrapper className="pt-8">
        <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl leading-6 font-semibold">Newsletter Registrations</h1>
            <p className="text-neutral mt-2 text-sm">
              Here you will find users registered on your mailing list.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 md:mt-0 md:ml-4">
            {/* <button
              type="button"
              onClick={() => console.log('Add subscribers')}
              className="border-accent hover:border-drk-accent hover:text-drk-accent text-accent block cursor-pointer rounded-md border-2 px-3 py-2 text-center text-sm font-semibold shadow-sm"
            >
              Add subscribers
            </button>
            <button
              type="button"
              onClick={() => console.log('Get list')}
              className="bg-accent hover:bg-accent/80 block cursor-pointer rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm"
            >
              Get list
            </button> */}
          </div>
        </div>

        {data && (
          <AdminTable<Contact>
            data={data}
            loading={isLoading}
            errorMessage={error ? (error.message as string) : undefined}
            emptyMessage="No newsletter registrations found."
            columns={columns}
            getRowId={(item) => item._id}
            getRowLabel={(item) => item.email}
          />
        )}
      </MaxWidthWrapper>
    </div>
  );
}
