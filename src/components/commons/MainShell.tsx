'use client';

import { useSelectedLayoutSegments } from 'next/navigation';
import Footer from '../navigation/Footer';

export default function MainShell({ children }: { children: React.ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const isHome = segments.length === 0;
  const hideFooter = segments[0] === 'admin';

  return (
    <div className={`flex min-h-dvh flex-col ${isHome ? '' : 'pt-16'}`}>
      <main className="flex-1">{children}</main>

      {!hideFooter && (
        <div className={isHome ? 'snap-start' : ''}>
          <Footer />
        </div>
      )}
    </div>
  );
}
