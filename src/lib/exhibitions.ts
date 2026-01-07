interface IGallery {
  name: string;
  location: string;
  website?: string;
}

interface IExhibition {
  date: string;
  title: string;
  location?: string;
  website?: string;
}

export const galleries: IGallery[] = [
  {
    name: 'ACCI GALLERY',
    location: 'Berkeley, CA',
    website: 'https://www.accigallery.com',
  },
  {
    name: 'HEALDSBURG CENTER FOR THE ARTS',
    location: 'Healdsburg, CA',
    website: 'https://www.healdsburgcenterforthearts.org',
  },
  {
    name: 'LAURENCE GLASS WORK GALLERY',
    location: 'Occidental, CA',
  },
  {
    name: 'LORI AUSTIN GALLERY',
    location: 'Sebastopol and Santa Rosa, CA',
    website: 'https://www.loriaustingallery.com',
  },
];

export const exhibitions: IExhibition[] = [
  {
    date: 'May 10',
    title: 'ACCI Gallery Art and Plant Street Sale',
    website: 'https://accigallery.com',
  },
  {
    date: 'May 17',
    title: 'Makers Market at the Mill Valley Lumber Yard',
    location: 'Mill Valley, CA',
    website: 'https://makersmarket.us',
  },
  {
    date: 'August 23, 24',
    title: 'Palo Alto Art Festival (Booth 460)',
    website: 'https://pacificfineart.com',
  },
  {
    date: 'September 20, 21',
    title: 'Mill Valley Fall Arts Festival (Booth 103)',
    location: 'Mill Valley, CA',
    website: 'https://mvfaf.org',
  },
  {
    date: 'December',
    title: 'Dance Palace Artisan Craft and Holiday Fair (Tentative)',
    location: 'Point Reyes Station, CA (Dance Palace)',
  },
];
