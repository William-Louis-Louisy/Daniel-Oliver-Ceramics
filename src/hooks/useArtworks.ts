'use client';
import {
  artworkKeys,
  getArtworks,
  createArtwork,
  updateArtwork,
  deleteArtwork,
  createMultipleArtworks,
  type Artwork,
  type CreateArtworkPayload,
  type UpdateArtworkPayload,
  type CreateMultipleArtworksPayload,
} from '../lib/api/artworks';
import type { ApiError } from '../lib/api/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useArtworks() {
  return useQuery<Artwork[], ApiError>({
    queryKey: artworkKeys.list(),
    queryFn: getArtworks,
    staleTime: 30_000,
  });
}

export function useArtwork(artworkId: string | undefined) {
  return useQuery<Artwork, ApiError>({
    queryKey: artworkKeys.detail(artworkId || 'unknown'),
    queryFn: () =>
      getArtworks().then((artworks) => {
        const artwork = artworks.find((a) => a._id === artworkId);
        if (!artwork) {
          throw new Error('Artwork not found');
        }
        return artwork;
      }),
    enabled: !!artworkId,
    staleTime: 30_000,
  });
}

export function useCreateArtwork() {
  const qc = useQueryClient();
  return useMutation<Artwork, ApiError, CreateArtworkPayload>({
    mutationFn: createArtwork,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: artworkKeys.list() });
    },
  });
}

export function useCreateMultipleArtworks() {
  const qc = useQueryClient();
  return useMutation<Artwork[], ApiError, CreateMultipleArtworksPayload>({
    mutationFn: createMultipleArtworks,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: artworkKeys.list() });
    },
  });
}

export function useUpdateArtwork(artworkId: string) {
  const qc = useQueryClient();
  return useMutation<Artwork, ApiError, UpdateArtworkPayload>({
    mutationFn: (payload) => updateArtwork(artworkId, payload),
    onSuccess: async (updated) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: artworkKeys.list() }),
        qc.invalidateQueries({ queryKey: artworkKeys.detail(artworkId) }),
      ]);
      qc.setQueryData(artworkKeys.detail(artworkId), updated);
    },
  });
}

export function useDeleteArtwork() {
  const qc = useQueryClient();
  return useMutation<{ message: string }, ApiError, { artworkId: string }, { prev?: Artwork[] }>({
    mutationFn: ({ artworkId }) => deleteArtwork(artworkId),
    onMutate: async ({ artworkId }) => {
      await qc.cancelQueries({ queryKey: artworkKeys.list() });

      const prev = qc.getQueryData<Artwork[]>(artworkKeys.list());

      if (prev) {
        qc.setQueryData<Artwork[]>(
          artworkKeys.list(),
          prev.filter((a) => a._id !== artworkId),
        );
      }

      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) {
        qc.setQueryData<Artwork[]>(artworkKeys.list(), context.prev);
      }
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: artworkKeys.list() });
    },
  });
}
