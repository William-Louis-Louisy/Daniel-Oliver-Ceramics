'use client';

import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import ProductsDisplay from './ProductsDisplay';
import MaxWidthWrapper from './MaxWidthWrapper';
import Loader from '@/components/commons/Loader';
import { useArtCollectionById } from '@/hooks/useArtCollections';

type Props = { artCollectionId: string };

export default function ArtCollectionClient({ artCollectionId }: Props) {
  const { data, isLoading, error } = useArtCollectionById(artCollectionId);
  const t = useTranslations('WhatIdo');

  if (isLoading) return <Loader />;
  if (error || !data) {
    toast.error('Unable to load art collection.');
    return null;
  }

  const key = data.translationKey;

  if (!key) {
    return (
      <div className="from-background to-element md:h-page overflow-y-hidden bg-gradient-to-b">
        <MaxWidthWrapper className="pt-8">
          <ProductsDisplay
            title={data.title}
            description={data.description}
            products={data.artworks ?? []}
          />
        </MaxWidthWrapper>
      </div>
    );
  }

  const titleKey = `${key}.title`;
  const descriptionKey = `${key}.description`;

  const title = t.has(titleKey) ? t(titleKey) : data.title;
  const description = t.has(descriptionKey) ? t(descriptionKey) : data.description;

  return (
    <div className="from-background to-element md:h-page overflow-y-hidden bg-gradient-to-b">
      <MaxWidthWrapper className="pt-8">
        <ProductsDisplay title={title} description={description} products={data?.artworks ?? []} />
      </MaxWidthWrapper>
    </div>
  );
}
