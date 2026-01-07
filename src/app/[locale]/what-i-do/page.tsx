'use client';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';
import { cards } from '@/lib/motionVariants';
import Loader from '@/components/commons/Loader';
import CategoryCard from '@/components/commons/CategoryCard';
import { usePublishedArtCollections } from '@/hooks/useArtCollections';

export default function WhatIDoPage() {
  const { data, isLoading, error } = usePublishedArtCollections();

  useEffect(() => {
    if (error) toast.error('Unable to load session.');
  }, [error]);

  if (!data || isLoading) return <Loader />;

  return (
    <div className="min-h-page relative flex flex-col items-center justify-start overflow-hidden shadow-lg md:justify-center">
      <div className="fixed inset-0 -z-10 bg-[url('/images/what-i-do.jpg')] bg-cover bg-center" />
      <div className="from-background/80 to-alternative/60 fixed inset-0 -z-10 bg-gradient-to-b" />

      <div className="min-h-page w-full p-4 md:p-0">
        <motion.div
          variants={cards}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center gap-4 overflow-x-auto md:flex-row md:justify-center md:gap-0"
        >
          {data.map((collection) => {
            const href = `/what-i-do/${collection._id}`;
            return (
              <CategoryCard
                key={collection._id}
                image={collection.image}
                title={collection.title}
                href={href}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
