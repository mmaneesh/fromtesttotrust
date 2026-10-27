export interface SiteConfig {
  name: string;
  brandName: string;
  role: string;
  employer: string;
  email: string;
  socials: {
    id: 'linkedin' | 'github';
    name: string;
    url: string;
    label: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: 'Maneesh Maddala',
  brandName: 'From Test to Trust',
  role: 'Principal SDET Engineer',
  employer: 'Morningstar, Inc.',
  email: 'maneesh.maddala@gmail.com',
  socials: [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/maneesh-maddala/',
      label: 'linkedin.com/in/maneesh-maddala',
    },
    {
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/mmaneesh',
      label: 'github.com/mmaneesh',
    },
  ],
};
