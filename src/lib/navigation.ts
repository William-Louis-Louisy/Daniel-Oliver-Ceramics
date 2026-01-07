interface INavigationLink {
  tradKey: string;
  url: string;
  header: boolean;
}

export const navigationLinks: INavigationLink[] = [
  { tradKey: 'home', url: '/', header: false },
  { tradKey: 'whatIDo', url: '/what-i-do', header: true },
  { tradKey: 'exhibitions', url: '/exhibitions', header: true },
  { tradKey: 'contact', url: '/contact', header: true },
];
