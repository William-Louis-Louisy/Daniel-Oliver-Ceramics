import { Artwork } from './artworks';
import { apiFetch } from './client';

export interface ArtCollection {
  _id: string;
  title: string;
  image: string;
  description?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  translationKey?: string;
  artworks?: Artwork[];
}

export type CreateArtCollectionPayload = {
  title: string;
  image: string;
  description?: string;
  isPublished: boolean;
  translationKey?: string;
};

export type UpdateArtCollectionPayload = Partial<CreateArtCollectionPayload>;

export const getArtCollections = () =>
  apiFetch<ArtCollection[]>('/retrieve-art-collections', { cache: 'no-store' });

export const getPublishedArtCollections = () =>
  apiFetch<ArtCollection[]>('/retrieve-published-art-collections', {
    cache: 'no-store',
  });

export const getArtCollectionById = (artCollectionId: string) =>
  apiFetch<ArtCollection>(`/retrieve-art-collection/${artCollectionId}`, { cache: 'no-store' });

export const createArtCollection = (payload: CreateArtCollectionPayload) =>
  apiFetch<ArtCollection>('/create-art-collection', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateArtCollection = (artCollectionId: string, payload: UpdateArtCollectionPayload) =>
  apiFetch<ArtCollection>(`/update-art-collection/${artCollectionId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteArtCollection = (artCollectionId: string) =>
  apiFetch<{ message: string }>(`/delete-art-collection/${artCollectionId}`, {
    method: 'DELETE',
  });

export const artCollectionKeys = {
  all: ['artCollections'] as const,
  list: () => [...artCollectionKeys.all, 'list'] as const,
  detail: (id: string) => [...artCollectionKeys.all, 'detail', id] as const,
};
