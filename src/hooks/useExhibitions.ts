'use client';
import {
  exhibitionKeys,
  getExhibitions,
  getPublishedExhibitions,
  createExhibition,
  updateExhibition,
  deleteExhibition,
  type Exhibition,
  type CreateExhibitionPayload,
  type UpdateExhibitionPayload,
} from '../lib/api/exhibitions';
import type { ApiError } from '../lib/api/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useExhibitions(publishedOnly = false) {
  return useQuery<Exhibition[], ApiError>({
    queryKey: [...exhibitionKeys.list(), { publishedOnly }],
    queryFn: publishedOnly ? getPublishedExhibitions : getExhibitions,
    staleTime: 30_000,
  });
}

export function useExhibition(exhibitionId: string | undefined) {
  return useQuery<Exhibition, ApiError>({
    queryKey: exhibitionKeys.detail(exhibitionId || 'unknown'),
    queryFn: () =>
      getExhibitions().then((exhibitions) => {
        const exhibition = exhibitions.find((ex) => ex._id === exhibitionId);
        if (!exhibition) {
          throw new Error('Exhibition not found');
        }
        return exhibition;
      }),
    enabled: !!exhibitionId,
    staleTime: 30_000,
  });
}

export function useCreateExhibition() {
  const qc = useQueryClient();
  return useMutation<Exhibition, ApiError, CreateExhibitionPayload>({
    mutationFn: createExhibition,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: exhibitionKeys.list() });
    },
  });
}

export function useUpdateExhibition(exhibitionId: string) {
  const qc = useQueryClient();
  return useMutation<Exhibition, ApiError, UpdateExhibitionPayload>({
    mutationFn: (payload) => updateExhibition(exhibitionId, payload),
    onSuccess: async (updated) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: exhibitionKeys.list() }),
        qc.invalidateQueries({ queryKey: exhibitionKeys.detail(exhibitionId) }),
      ]);
      qc.setQueryData(exhibitionKeys.detail(exhibitionId), updated);
    },
  });
}

export function useDeleteExhibition() {
  const qc = useQueryClient();
  return useMutation<
    { message: string },
    ApiError,
    { exhibitionId: string },
    { prev?: Exhibition[] }
  >({
    mutationFn: ({ exhibitionId }) => deleteExhibition(exhibitionId),
    onMutate: async ({ exhibitionId }) => {
      await qc.cancelQueries({ queryKey: exhibitionKeys.list() });

      const prev = qc.getQueryData<Exhibition[]>(exhibitionKeys.list());

      if (prev) {
        qc.setQueryData<Exhibition[]>(
          exhibitionKeys.list(),
          prev.filter((ex) => ex._id !== exhibitionId),
        );
      }

      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) {
        qc.setQueryData<Exhibition[]>(exhibitionKeys.list(), context.prev);
      }
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: exhibitionKeys.list() });
    },
  });
}

export function useAdminExhibitions() {
  return useExhibitions(false);
}

export function usePublishedExhibitions() {
  return useExhibitions(true);
}
