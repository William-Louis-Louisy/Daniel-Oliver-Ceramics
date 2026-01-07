'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { X } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Artwork } from '@/lib/api/artworks';
import { fromBottomFadeIn, fromLeftFadeIn } from '@/lib/motionVariants';

interface ProductsDisplayProps {
  title: string;
  description?: string;
  products: Artwork[];
}

export default function ProductsDisplay({ title, description, products }: ProductsDisplayProps) {
  const [selectedProduct, setSelectedProduct] = useState<Artwork | null>(null);
  useEffect(() => {
    if (!selectedProduct) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProduct(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct]);

  useEffect(() => {
    if (!selectedProduct) return;

    if (typeof document !== 'undefined') {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedProduct]);

  const paragraphs = description?.split(/\n{2,}/) ?? [];

  return (
    <div className="flex w-full flex-col items-center gap-8">
      {!description && (
        <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <h1 className="text-2xl md:text-3xl">{title}</h1>
        </div>
      )}
      <div
        className={cn(
          'grid w-full grid-cols-1 gap-8 pb-8',
          description ? 'md:h-[calc(100dvh-6rem)] md:grid-cols-2 lg:grid-cols-3' : '',
        )}
      >
        <motion.div
          className={cn(
            'grid w-full grid-cols-1 gap-4',
            description
              ? 'custom-scrollbar overflow-y-auto md:grid-cols-2 lg:col-span-2 lg:grid-cols-3'
              : 'md:grid-cols-4',
          )}
          variants={fromLeftFadeIn}
          initial="initial"
          whileInView="inView"
          viewport={{ once: true }}
        >
          {products.map((product, idx) => (
            <button
              key={product._id}
              type="button"
              className="relative aspect-[3/4] size-full cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <Image
                src={product.image}
                alt={product._id}
                fill
                className="object-cover transition-transform duration-300"
                sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 25vw"
                priority={idx === 0}
              />
            </button>
          ))}
        </motion.div>

        {description && (
          <motion.div
            className="flex flex-col gap-4"
            variants={fromBottomFadeIn}
            initial="initial"
            whileInView="inView"
            viewport={{ once: true }}
          >
            <h1 className="text-3xl">{title}</h1>
            <div className="flex flex-col gap-4 font-normal lg:max-w-3xl">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-pointer"
            onClick={() => setSelectedProduct(null)}
            aria-label="Close image"
          />

          <div className="relative max-h-[90vh] w-full max-w-5xl px-4">
            <button
              type="button"
              className="absolute -top-10 right-4 scale-95 cursor-pointer text-2xl text-white duration-200 hover:scale-100"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close image"
            >
              <X size={32} weight="thin" />
            </button>

            <div className="relative h-[70vh] w-full md:h-[80vh]">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct._id}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
