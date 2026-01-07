'use client';
import {
  fromLeftFadeIn,
  fromRightFadeIn,
  fromBottomFadeIn,
  horizontalExpand,
} from '@/lib/motionVariants';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import MaxWidthWrapper from '@/components/commons/MaxWidthWrapper';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.7;
  }, []);

  return (
    <>
      <section className="relative flex h-dvh snap-start snap-always items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 size-full object-cover"
          poster="/videos/hero_poster.png"
          src="/videos/hero.mp4"
          ref={videoRef}
          playsInline
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 flex size-full flex-col items-center justify-center bg-black/30">
          <MaxWidthWrapper className="flex size-full flex-col items-center justify-center">
            <motion.div
              variants={horizontalExpand}
              initial="initial"
              whileInView="inView"
              viewport={{ once: true }}
            >
              <Image
                src="/images/logo_wht.png"
                alt="Daniel Oliver Ceramics"
                width={840}
                height={210}
              />
            </motion.div>
          </MaxWidthWrapper>
        </div>

        <motion.div
          className="absolute bottom-8 grid w-full grid-cols-2 gap-4 px-4 text-center text-sm font-semibold md:w-fit md:text-base"
          variants={fromBottomFadeIn}
          initial="initial"
          whileInView="inView"
          viewport={{ once: true }}
        >
          <Link
            href="#about"
            className="from-element to-background hover:from-background hover:to-element flex items-center justify-center rounded-full bg-gradient-to-br px-4 py-2 duration-150 hover:scale-105"
          >
            {t('moreAboutMe')}
          </Link>
          <Link
            href="/what-i-do"
            className="from-accent to-drk-accent hover:from-drk-accent hover:to-accent flex items-center justify-center rounded-full bg-gradient-to-br px-4 py-2 text-white duration-150 hover:scale-105"
          >
            {t('whatIDo')}
          </Link>
        </motion.div>
      </section>

      <section
        id="about"
        className="from-background to-element snap-start snap-always bg-gradient-to-b"
      >
        <MaxWidthWrapper className="grid min-h-dvh items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          {/* image */}
          <motion.div
            className="relative mx-auto w-full max-w-xl"
            variants={fromLeftFadeIn}
            initial="initial"
            whileInView="inView"
            viewport={{ once: true }}
          >
            <Image
              src="/images/DanielOliver.jpg"
              alt="Daniel Oliver working on a ceramic piece in his studio"
              width={640}
              height={640}
              className="h-auto w-full rounded-2xl border border-black/10 object-cover shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition-transform duration-200 ease-out hover:scale-[1.01] hover:shadow-[0_28px_60px_rgba(0,0,0,0.35)]"
              priority
              sizes="(min-width: 1024px) 540px, 100vw"
            />
          </motion.div>

          {/* text */}
          <motion.div
            className="font-hanken-grotesk text-foreground mx-auto max-w-xl"
            variants={fromRightFadeIn}
            initial="initial"
            whileInView="inView"
            viewport={{ once: true }}
          >
            <div className="space-y-4 text-base leading-relaxed">
              <p>{t('intro')}</p>
              <p>{t('technique')}</p>
              <p>{t('firing')}</p>
              <p>{t('goddesses')}</p>

              <p className="border-foreground/20 border-l-2 pl-4 italic">{t('fun')}</p>

              <p>{t('unique')}</p>
            </div>

            <p className="mt-8 text-sm font-semibold tracking-[0.3em] uppercase">
              {t('signature')}
            </p>
          </motion.div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
