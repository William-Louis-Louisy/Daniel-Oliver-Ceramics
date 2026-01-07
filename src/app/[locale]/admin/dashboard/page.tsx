'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Loader from '@/components/commons/Loader';
import MaxWidthWrapper from '@/components/commons/MaxWidthWrapper';
import { adminSections } from '@/lib/adminSections';
import AdminSection from '@/components/admin/AdminSection';

export default function Dashboard() {
  const { user, isLoading } = useAuth(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.replace('/admin');
  }, [user, isLoading, router]);

  if (isLoading) return <Loader />;

  return (
    <div className="from-background to-element min-h-page bg-gradient-to-b">
      <div className="relative isolate overflow-hidden px-6 py-16 lg:px-8">
        <Image
          alt=""
          src="https://ucarecdn.com/6655ae8b-81ab-401e-8c3c-6c9eec9b0099/da.png"
          fill
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="from-accent to-complementary aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr opacity-30"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="from-accent to-complementary aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr opacity-30"
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase sm:text-6xl">
            Welcome Daniel
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Manage all the content of your website in one place: art collections, artworks,
            exhibitions, and galleries.
          </p>
        </div>
      </div>
      <MaxWidthWrapper className="flex flex-col gap-6 py-8">
        <div className="flex flex-1 items-center justify-center">
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {adminSections.map((section) => (
              <AdminSection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
