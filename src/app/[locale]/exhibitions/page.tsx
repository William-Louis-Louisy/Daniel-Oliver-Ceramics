'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { exhibit } from '@/lib/motionVariants';
import Loader from '@/components/commons/Loader';
import { ArrowSquareOut } from '@phosphor-icons/react';
import { usePublishedGalleries } from '@/hooks/useGalleries';
import WarningAlert from '@/components/commons/WarningAlert';
import { usePublishedExhibitions } from '@/hooks/useExhibitions';
import MaxWidthWrapper from '@/components/commons/MaxWidthWrapper';

export default function ExhibitionsPage() {
  const t = useTranslations('ExhibitionsPage');
  const currentYear = new Date().getFullYear();
  const {
    data: exhibitions,
    isLoading: exhibitionsLoading,
    error: exhibitionsError,
  } = usePublishedExhibitions();
  const {
    data: galleries,
    isLoading: galleriesLoading,
    error: galleriesError,
  } = usePublishedGalleries();

  if (exhibitionsLoading || galleriesLoading) return <Loader />;

  return (
    <div className="from-background to-element min-h-page bg-gradient-to-b">
      <div className="h-60 w-full bg-[url('/images/exhib.jpg')] bg-cover bg-center bg-no-repeat md:h-92"></div>
      <MaxWidthWrapper className="grid gap-8 py-8 md:grid-cols-2">
        {/* Galleries */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold uppercase">{t('galleries')}</h2>
          {galleries?.map((gallery, index) => (
            <motion.div
              key={index}
              className="border-foreground/20 border-l-2 pl-4"
              variants={exhibit}
              custom={index}
              initial="initial"
              animate="animate"
            >
              <h3 className="text-lg font-semibold">{gallery.name}</h3>
              <div className="flex flex-col lg:flex-row lg:items-center">
                <p className="">{gallery.location}</p>

                {gallery.website && (
                  <>
                    <span className="mx-2 hidden lg:inline">•</span>
                    <Link
                      href={gallery.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent inline-flex items-center gap-1 text-sm underline md:text-base"
                    >
                      <span className="underline-offset-2 duration-150 hover:font-medium hover:underline">
                        {gallery.website}
                      </span>
                      <ArrowSquareOut size={14} weight="thin" />
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        {/* Exhibitions */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold uppercase">
            {t('artFestival')} • {currentYear}
          </h2>
          {exhibitions?.map((exhibition, index) => (
            <motion.div
              key={index}
              className="border-foreground/20 border-l-2 pl-4"
              variants={exhibit}
              custom={index}
              initial="initial"
              animate="animate"
            >
              <div className="flex flex-col gap-1">
                <span className="mb-1 w-fit border-b pb-1 text-sm font-medium">
                  {exhibition.date}
                </span>
                <h3 className="text-lg font-semibold">{exhibition.title}</h3>
                <div className="flex flex-col lg:flex-row lg:items-center">
                  <p className="">{exhibition.location}</p>
                  {exhibition.website && (
                    <>
                      {exhibition.location && <span className="mx-2 hidden lg:inline">•</span>}
                      <Link
                        href={exhibition.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent inline-flex items-center gap-1 text-sm underline md:text-base"
                      >
                        <span className="underline-offset-2 duration-150 hover:font-medium hover:underline">
                          {exhibition.website}
                        </span>
                        <ArrowSquareOut size={14} weight="thin" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {(exhibitionsError?.message || galleriesError?.message) && (
          <WarningAlert message={exhibitionsError?.message || galleriesError?.message} />
        )}
      </MaxWidthWrapper>
    </div>
  );
}
