import { apiFetch } from './client';

export interface Gallery {
  _id: string;
  name: string;
  location?: string;
  website?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateGalleryPayload = {
  name: string;
  location?: string;
  website?: string;
  isPublished?: boolean;
};

export type UpdateGalleryPayload = Partial<CreateGalleryPayload>;

export const getGalleries = () =>
  apiFetch<Gallery[]>('/retrieve-gallery-items', { cache: 'no-store' });

export const getPublishedGalleries = () =>
  apiFetch<Gallery[]>('/retrieve-published-gallery-items', {
    cache: 'no-store',
  });

export const createGallery = (payload: CreateGalleryPayload) =>
  apiFetch<Gallery>('/create-gallery-item', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateGallery = (galleryId: string, payload: UpdateGalleryPayload) =>
  apiFetch<Gallery>(`/update-gallery-item/${galleryId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteGallery = (galleryId: string) =>
  apiFetch<{ message: string }>(`/delete-gallery-item/${galleryId}`, {
    method: 'DELETE',
  });

export const galleryKeys = {
  all: ['galleries'] as const,
  list: () => [...galleryKeys.all, 'list'] as const,
  detail: (id: string) => [...galleryKeys.all, 'detail', id] as const,
};
