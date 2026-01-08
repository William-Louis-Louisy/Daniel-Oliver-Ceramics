'use client';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Loader from '@/components/commons/Loader';
import LoginScreen from '@/components/admin/LoginScreen';
import MaxWidthWrapper from '@/components/commons/MaxWidthWrapper';

export default function AdminPage() {
  const { user, isLoading } = useAuth(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) router.replace('/admin/dashboard');
  }, [user, isLoading, router]);

  if (isLoading) return <Loader />;
  if (user) return <Loader />;

  return (
    <div className="from-background to-element bg-gradient-to-b">
      <MaxWidthWrapper className="min-h-page flex flex-col items-center justify-center gap-8">
        <LoginScreen />
      </MaxWidthWrapper>
    </div>
  );
}
