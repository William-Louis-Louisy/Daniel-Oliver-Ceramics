'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { ArrowRight } from '@phosphor-icons/react';
import { uploadcareLoader } from '@/lib/uploadcareLoader';

interface CategoryCardProps {
  image: string;
  title: string;
  href: string;
}

const MotionLink = motion.create(Link);

export default function CategoryCard({ image, title, href }: CategoryCardProps) {
  const optimizedImage = uploadcareLoader(image);

  return (
    <MotionLink
      href={href}
      className={cn('group md:h-page relative h-108 w-full overflow-hidden shadow-lg')}
      initial="rest"
      whileHover="hover"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center duration-300 will-change-transform"
        style={{ backgroundImage: `url(${optimizedImage})`, transformOrigin: 'center' }}
        variants={{
          rest: { scale: 1.08 },
          hover: { scale: 1 },
        }}
        transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />

      <div
        className={cn(
          'absolute bottom-0 z-10 flex w-full items-center justify-between px-6 pt-12 pb-6 md:justify-start md:gap-4 md:pb-16',
          'bg-gradient-to-t from-black via-black/60 to-transparent text-center text-sm uppercase',
          'group-hover:from-accent group-hover:via-accent/60 text-white duration-300',
        )}
      >
        <span className="font-inter font-bold lg:text-lg">{title}</span>
        <ArrowRight size={24} weight="bold" className="animate-pulse group-hover:block md:hidden" />
      </div>
    </MotionLink>
  );
}
