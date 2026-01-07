import ArtCollectionClient from '@/components/commons/ArtCollectionClient';

type PageProps = {
  params: Promise<{ locale: string; artCollectionId: string }>;
};

export default async function ArtCollectionPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ArtCollectionClient artCollectionId={resolvedParams.artCollectionId} />;
}
