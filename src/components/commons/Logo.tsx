import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export default function Logo() {
  return (
    <Link href={'/'} className="inline-flex items-center gap-4">
      <Image src="/images/logo_blk.png" alt="Daniel Oliver Ceramics" width={192} height={48} />
    </Link>
  );
}
