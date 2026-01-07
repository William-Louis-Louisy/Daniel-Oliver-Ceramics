import { apiFetch } from './client';

export interface Exhibition {
  _id: string;
  date: string;
  title: string;
  location?: string;
  website?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateExhibitionPayload = {
  date: string;
  title: string;
  location?: string;
  website?: string;
  isPublished?: boolean;
};

export type UpdateExhibitionPayload = Partial<CreateExhibitionPayload>;

export const getExhibitions = () =>
  apiFetch<Exhibition[]>('/retrieve-exhibitions', { cache: 'no-store' });

export const getPublishedExhibitions = () =>
  apiFetch<Exhibition[]>('/retrieve-published-exhibitions', {
    cache: 'no-store',
  });

export const createExhibition = (payload: CreateExhibitionPayload) =>
  apiFetch<Exhibition>('/create-exhibition', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateExhibition = (exhibitionId: string, payload: UpdateExhibitionPayload) =>
  apiFetch<Exhibition>(`/update-exhibition/${exhibitionId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteExhibition = (exhibitionId: string) =>
  apiFetch<{ message: string }>(`/delete-exhibition/${exhibitionId}`, {
    method: 'DELETE',
  });

export const exhibitionKeys = {
  all: ['exhibitions'] as const,
  list: () => [...exhibitionKeys.all, 'list'] as const,
  detail: (id: string) => [...exhibitionKeys.all, 'detail', id] as const,
};
