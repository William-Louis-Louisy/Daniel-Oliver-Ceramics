export interface ICategory {
  tradKey: string;
  title: string;
  href: string;
  image: string;
}

export const categories: ICategory[] = [
  {
    tradKey: 'urn',
    title: 'Urns and Treasure boxes',
    href: '/what-i-do/urn-treasure',
    image: '/images/urn-treasure.jpg',
  },
  {
    tradKey: 'shield',
    title: 'Xoxox Shields',
    href: '/what-i-do/xoxox-shield',
    image: '/images/shield.jpg',
  },
  {
    tradKey: 'potBelly',
    title: 'Pot Belly boxes',
    href: '/what-i-do/pot-belly',
    image: '/images/pot-belly.jpg',
  },
];
