'use client';
import Image from 'next/image';
import Loader from '../commons/Loader';
import { getArtCollectionMeta, type Artwork } from '@/lib/api/artworks';
import WarningAlert from '../commons/WarningAlert';

interface ArtworksListProps {
  data: Artwork[];
  loading: boolean;
  errorMessage?: string;
  onEdit: (a: Artwork) => void;
  onDelete: (id: string) => void;
}

export default function ArtworksList({
  data,
  loading,
  errorMessage,
  onEdit,
  onDelete,
}: ArtworksListProps) {
  if (loading) return <Loader />;
  if (errorMessage) return <p className="text-red-600">Failed to load products: {errorMessage}</p>;
  if (data.length === 0) {
    return (
      <WarningAlert
        message={
          'Oops, it seems there are no artworks in the database. To create one, please click on the “New artwork” button.'
        }
      />
    );
  }

  return (
    <div className="mx-auto mt-6 max-w-2xl lg:max-w-7xl">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
        {data.map((item, index) => {
          const meta = getArtCollectionMeta(item);
          return (
            <div key={item._id} className="group relative rounded-md bg-white">
              <div className="aspect-h-1 aspect-w-1 lg:aspect-none relative h-80 w-full overflow-hidden rounded-t-md duration-200 group-hover:opacity-75">
                <Image
                  alt={`collection: ${meta.title} - artwork #${index + 1}`}
                  src={item.image}
                  className="h-full w-full rounded-t-md object-cover object-center lg:h-full lg:w-full"
                  unoptimized
                  fill
                />
              </div>

              <div className="mt-4 flex flex-col space-y-2">
                <div className="flex flex-col px-4">
                  <div className="flex">
                    <h3 className="text-sm text-gray-700">
                      <span className="font-semibold">Collection: </span>
                      {meta.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col border-t border-gray-200">
                  <div className="grid grid-cols-2 border-t border-gray-200 text-sm">
                    <button
                      onClick={() => onDelete(item._id)}
                      className="cursor-pointer rounded-bl-md border-r border-gray-200 px-2 text-red-600 duration-200 hover:bg-gray-200 hover:text-red-900"
                    >
                      Delete<span className="sr-only">, this artwork</span>
                    </button>
                    <button
                      onClick={() => onEdit(item)}
                      className="cursor-pointer rounded-br-md px-3 py-2 text-blue-600 duration-200 hover:bg-gray-200 hover:text-blue-900"
                    >
                      Edit<span className="sr-only">, this artwork</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
