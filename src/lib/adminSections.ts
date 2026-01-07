import { Stack, Images, CalendarDots, Storefront } from '@phosphor-icons/react';

export interface IAdminSection {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
  color: string;
}

export const adminSections: IAdminSection[] = [
  {
    id: 'art-collections',
    name: 'Art Collections',
    description: 'Create and manage your different art collections.',
    href: '/admin/manage-collections',
    icon: Stack,
    color: '#B45F5F',
  },
  {
    id: 'artworks',
    name: 'Artworks',
    description: 'Add, edit, and organize artworks within your collections.',
    href: '/admin/manage-artworks',
    icon: Images,
    color: '#B45FA5',
  },
  {
    id: 'exhibitions',
    name: 'Exhibitions',
    description:
      'Manage your past and upcoming exhibitions, including art festivals and craft markets.',
    href: '/admin/manage-exhibitions',
    icon: CalendarDots,
    color: '#E0A93E',
  },
  {
    id: 'galleries',
    name: 'Galleries',
    description: 'Manage the art galleries where you exhibit your work.',
    href: '/admin/manage-galleries',
    icon: Storefront,
    color: '#3F6D5A',
  },
];
