'use client';
import {
  artCollectionKeys,
  getArtCollections,
  getPublishedArtCollections,
  createArtCollection,
  updateArtCollection,
  deleteArtCollection,
  type ArtCollection,
  type CreateArtCollectionPayload,
  type UpdateArtCollectionPayload,
  getArtCollectionById,
} from '@/lib/api/artCollections';
import type { ApiError } from '@/lib/api/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useArtCollections(publishedOnly = false) {
  return useQuery<ArtCollection[], ApiError>({
    queryKey: [...artCollectionKeys.list(), { publishedOnly }],
    queryFn: publishedOnly ? getPublishedArtCollections : getArtCollections,
    staleTime: 30_000,
  });
}

export function useArtCollection(artCollectionId: string | undefined) {
  return useQuery<ArtCollection, ApiError>({
    queryKey: artCollectionKeys.detail(artCollectionId || 'unknown'),
    queryFn: () =>
      getArtCollections().then((collections) => {
        const collection = collections.find((ac) => ac._id === artCollectionId);
        if (!collection) {
          throw new Error('Art Collection not found');
        }
        return collection;
      }),
    enabled: !!artCollectionId,
    staleTime: 30_000,
  });
}

export function useArtCollectionById(artCollectionId: string) {
  return useQuery<ArtCollection, ApiError>({
    queryKey: artCollectionKeys.detail(artCollectionId),
    queryFn: () => getArtCollectionById(artCollectionId),
    enabled: typeof artCollectionId === 'string' && artCollectionId.length > 0,
    staleTime: 30_000,

    // debug
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useCreateArtCollection() {
  const qc = useQueryClient();
  return useMutation<ArtCollection, ApiError, CreateArtCollectionPayload>({
    mutationFn: createArtCollection,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: artCollectionKeys.list() });
    },
  });
}

export function useUpdateArtCollection(artCollectionId: string) {
  const qc = useQueryClient();
  return useMutation<ArtCollection, ApiError, UpdateArtCollectionPayload>({
    mutationFn: (payload) => updateArtCollection(artCollectionId, payload),
    onSuccess: async (updated) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: artCollectionKeys.list() }),
        qc.invalidateQueries({
          queryKey: artCollectionKeys.detail(artCollectionId),
        }),
      ]);
      qc.setQueryData(artCollectionKeys.detail(artCollectionId), updated);
    },
  });
}

export function useDeleteArtCollection() {
  const qc = useQueryClient();
  return useMutation<
    { message: string },
    ApiError,
    { artCollectionId: string },
    { prev?: ArtCollection[] }
  >({
    mutationFn: ({ artCollectionId }) => deleteArtCollection(artCollectionId),
    onMutate: async ({ artCollectionId }) => {
      await qc.cancelQueries({ queryKey: artCollectionKeys.list() });

      const prev = qc.getQueryData<ArtCollection[]>(artCollectionKeys.list());

      if (prev) {
        qc.setQueryData<ArtCollection[]>(
          artCollectionKeys.list(),
          prev.filter((ac) => ac._id !== artCollectionId),
        );
      }

      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) {
        qc.setQueryData<ArtCollection[]>(artCollectionKeys.list(), context.prev);
      }
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: artCollectionKeys.list() });
    },
  });
}

export function useAdminArtCollections() {
  return useArtCollections(false);
}

export function usePublishedArtCollections() {
  return useArtCollections(true);
}
