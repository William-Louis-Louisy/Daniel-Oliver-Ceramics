import { Variants } from 'motion/react';

export const fromBottomFadeIn: Variants = {
  initial: { opacity: 0, y: 50 },
  inView: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.6,
      bounce: 0.3,
      type: 'spring',
      stiffness: 100,
    },
  },
};

export const fromTopFadeIn: Variants = {
  initial: { opacity: 0, y: -50 },
  inView: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.8,
      bounce: 0.5,
      type: 'spring',
      stiffness: 87,
    },
  },
};

export const fromLeftFadeIn: Variants = {
  initial: { opacity: 0, x: -50 },
  inView: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1,
      duration: 0.6,
      bounce: 0.3,
      type: 'spring',
      stiffness: 100,
    },
  },
};

export const fromRightFadeIn: Variants = {
  initial: { opacity: 0, x: 50 },
  inView: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1,
      duration: 0.6,
      bounce: 0.3,
      type: 'spring',
      stiffness: 100,
    },
  },
};

export const horizontalExpand: Variants = {
  initial: { opacity: 0, scaleX: 0 },
  inView: {
    opacity: 1,
    scaleX: 1,
    transition: {
      delay: 0.2,
      duration: 0.6,
    },
  },
};

export const exhibit: Variants = {
  initial: { opacity: 0, y: -50 },
  animate: (i: number) => {
    const delay = i * 0.2;
    return {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.4,
        bounce: 0.4,
        type: 'spring',
        stiffness: 87,
      },
    };
  },
};

export const cards: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6,
      duration: 0.8,
      bounce: 0.3,
      type: 'spring',
      stiffness: 100,
    },
  },
};

export const loadingSpinner: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      repeatType: 'loop',
      duration: 3,
      ease: 'linear',
      delay: 0.3,
      bounce: 0.9,
      stiffness: 100,
    },
  },
};
