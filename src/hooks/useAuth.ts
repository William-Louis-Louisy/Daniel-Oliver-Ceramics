'use client';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logout as logoutApi } from '@/lib/api/user';
import { useUserStore } from '@/lib/store/userStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useAuth(redirectIfUnauth = false) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user: storeUser, setUser } = useUserStore();

  const { data, error, status, isFetching } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (status === 'success') {
      setUser(data ?? null);
      if (redirectIfUnauth && !data) router.replace('/admin');
    }

    if (status === 'error') {
      setUser(null);
    }
  }, [status, data, redirectIfUnauth, router, setUser]);

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
  });

  const logout = useCallback(
    async (redirectTo: string = '/admin') => {
      await logoutMutation.mutateAsync();

      setUser(null);

      queryClient.setQueryData(['currentUser'], null);
      queryClient.removeQueries({ queryKey: ['currentUser'], exact: true });

      router.replace(redirectTo);
    },
    [logoutMutation, queryClient, router, setUser],
  );

  const currentUser = data ?? storeUser;
  const isLoading = status === 'pending' || isFetching;
  return {
    user: currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    error,
    logout,
    isLoggingOut: logoutMutation.isPending,
    logoutError: logoutMutation.error,
  };
}
