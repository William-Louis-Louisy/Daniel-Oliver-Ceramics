'use client';
import {
  galleryKeys,
  getGalleries,
  updateGallery,
  createGallery,
  deleteGallery,
  getPublishedGalleries,
  type Gallery,
  type CreateGalleryPayload,
  type UpdateGalleryPayload,
} from '@/lib/api/galleries';
import { ApiError } from '@/lib/api/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGalleries(publishedOnly = false) {
  return useQuery<Gallery[], ApiError>({
    queryKey: [...galleryKeys.list(), { publishedOnly }],
    queryFn: publishedOnly ? getPublishedGalleries : getGalleries,
    staleTime: 30_000,
  });
}

export function useGallery(galleryId: string | undefined) {
  return useQuery<Gallery, ApiError>({
    queryKey: galleryKeys.detail(galleryId || 'unknown'),
    queryFn: () =>
      getGalleries().then((galleries) => {
        const gallery = galleries.find((g) => g._id === galleryId);
        if (!gallery) {
          throw new Error('Gallery not found');
        }
        return gallery;
      }),
    enabled: !!galleryId,
    staleTime: 30_000,
  });
}

export function useCreateGallery() {
  const qc = useQueryClient();
  return useMutation<Gallery, ApiError, CreateGalleryPayload>({
    mutationFn: createGallery,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: galleryKeys.list() });
    },
  });
}

export function useUpdateGallery(galleryId: string) {
  const qc = useQueryClient();
  return useMutation<Gallery, ApiError, UpdateGalleryPayload>({
    mutationFn: (payload) => updateGallery(galleryId, payload),
    onSuccess: async (updated) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: galleryKeys.list() }),
        qc.invalidateQueries({ queryKey: galleryKeys.detail(galleryId) }),
      ]);
      qc.setQueryData(galleryKeys.detail(galleryId), updated);
    },
  });
}

export function useDeleteGallery() {
  const qc = useQueryClient();
  return useMutation<{ message: string }, ApiError, { galleryId: string }, { prev?: Gallery[] }>({
    mutationFn: async ({ galleryId }) => deleteGallery(galleryId),
    onMutate: async ({ galleryId }) => {
      await qc.cancelQueries({ queryKey: galleryKeys.list() });

      const prev = qc.getQueryData<Gallery[]>(galleryKeys.list());

      if (prev) {
        qc.setQueryData<Gallery[]>(
          galleryKeys.list(),
          prev.filter((g) => g._id !== galleryId),
        );
      }

      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) {
        qc.setQueryData<Gallery[]>(galleryKeys.list(), context.prev);
      }
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: galleryKeys.list() });
    },
  });
}

export function useAdminGalleries() {
  return useGalleries(false);
}

export function usePublishedGalleries() {
  return useGalleries(true);
}
