import { ArtCollection } from './artCollections';
import { apiFetch } from './client';

export interface Artwork {
  _id: string;
  image: string;
  artCollection: string | ArtCollection;
}

export type CreateArtworkPayload = {
  image: string;
  artCollection: string;
};

export type UpdateArtworkPayload = Partial<CreateArtworkPayload>;

export type CreateMultipleArtworksPayload = CreateArtworkPayload[];

export const getArtworks = () => apiFetch<Artwork[]>('/retrieve-artworks', { cache: 'no-store' });

export const createArtwork = (payload: CreateArtworkPayload) =>
  apiFetch<Artwork>('/create-artwork', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const createMultipleArtworks = (payload: CreateMultipleArtworksPayload) =>
  apiFetch<Artwork[]>('/create-multiple-artworks', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateArtwork = (artworkId: string, payload: UpdateArtworkPayload) =>
  apiFetch<Artwork>(`/update-artwork/${artworkId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteArtwork = (artworkId: string) =>
  apiFetch<{ message: string }>(`/delete-artwork/${artworkId}`, {
    method: 'DELETE',
  });

export const artworkKeys = {
  all: ['artworks'] as const,
  list: () => [...artworkKeys.all, 'list'] as const,
  detail: (id: string) => [...artworkKeys.all, 'detail', id] as const,
};

export function getArtCollectionMeta(artwork?: Artwork | null): {
  id?: string;
  title?: string;
} {
  if (!artwork || !artwork.artCollection) return {};

  const ac = artwork.artCollection;

  if (typeof ac === 'string') {
    return { id: ac };
  }
  return { id: ac._id, title: ac.title };
}
