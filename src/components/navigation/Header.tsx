import { Disclosure, DisclosurePanel, DisclosureButton } from '@headlessui/react';
import { cn } from '@/lib/utils';
import Logo from '../commons/Logo';
import { useTranslations } from 'next-intl';
import LocaleSwitch from '../commons/LocaleSwitch';
import { Link, usePathname } from '@/i18n/navigation';
import MaxWidthWrapper from '../commons/MaxWidthWrapper';
import { List, X } from '@phosphor-icons/react';
import { navigationLinks } from '@/lib/navigation';
import AdminDropdown from '../admin/AdminDropdown';
import AdminMobileNav from '../admin/AdminMobileNav';

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('Header');

  const filteredLinks = navigationLinks.filter((link) => link.header);

  const isLinkActive = (pathname: string, url: string) => {
    if (url === '/') return pathname === '/';
    return pathname === url || pathname.startsWith(`${url}/`);
  };

  const isAdminPath = pathname.startsWith('/admin');

  return (
    <Disclosure
      as="nav"
      className={cn(
        'font-inter fixed inset-x-0 top-0 z-50 backdrop-blur',
        pathname === '/' ? 'bg-transparent' : 'bg-background/95 md:bg-background/55',
      )}
    >
      {/* Header */}
      <MaxWidthWrapper>
        <header className="h-header flex items-center justify-between">
          <div className="flex">
            <Logo />
          </div>
          {/* Navigation */}
          <div className="hidden items-center justify-center lg:ml-6 lg:grid lg:grid-cols-3">
            {filteredLinks.map((link) => {
              const active = isLinkActive(pathname, link.url);

              return (
                <Link
                  key={link.tradKey}
                  href={link.url}
                  className={cn(
                    'hover:text-foreground/80 flex h-16 items-center justify-center border-b-4 px-6 duration-200',
                    active
                      ? 'text-accent border-accent font-bold'
                      : 'text-foreground/60 hover:border-foreground/20 border-transparent font-medium',
                  )}
                >
                  {t(`navigation.${link.tradKey}`)}
                </Link>
              );
            })}
          </div>

          {/* Lang & Theme */}
          <div className="hidden lg:ml-6 lg:flex lg:items-center lg:gap-4">
            {!isAdminPath && <LocaleSwitch />}

            {/* DropDown */}
            <AdminDropdown />
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center lg:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">{t('openMainMenu')}</span>
              <List aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <X aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
        </header>
      </MaxWidthWrapper>

      {/* Mobile Menu */}
      <DisclosurePanel className="h-page bg-background lg:hidden">
        <div className="h-full space-y-1">
          {/** Here goes the navigation links wrapped in DisclosureButton */}
          <div className="flex h-full flex-col items-center justify-center">
            <div className="absolute right-4 bottom-4">{!isAdminPath && <LocaleSwitch />}</div>

            <>
              {filteredLinks.map((link) => (
                <DisclosureButton
                  as={Link}
                  key={link.tradKey}
                  href={link.url}
                  className={cn(
                    'py-6 text-center text-xl',
                    pathname === link.url
                      ? 'text-accent font-bold'
                      : 'text-foreground/60 font-medium',
                  )}
                >
                  {t(`navigation.${link.tradKey}`)}
                </DisclosureButton>
              ))}
            </>

            <AdminMobileNav />
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
