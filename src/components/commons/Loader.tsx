import Image from 'next/image';
import { motion } from 'motion/react';
import { loadingSpinner } from '@/lib/motionVariants';

export default function Loader() {
  return (
    <div className="min-h-page flex size-full flex-1 items-center justify-center">
      <div className="group flex flex-col items-center justify-center gap-2 select-none">
        <motion.div
          className="bg-accent flex size-14 items-center justify-center rounded-full"
          variants={loadingSpinner}
          initial="initial"
          animate="animate"
          whileHover="initial"
        >
          <Image
            src="/images/danolicLoader.png"
            alt="Daniel Oliver Ceramics"
            width={48}
            height={48}
            priority
          />
        </motion.div>

        <span className="text-accent flex text-sm font-semibold group-hover:hidden">
          Loading...
        </span>
        <span className="text-accent pointer-events-none hidden text-sm font-semibold group-hover:flex">
          The oven is heating up...
        </span>
      </div>
    </div>
  );
}
