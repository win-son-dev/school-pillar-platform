import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'km', 'es', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/tutors': {
      en: '/tutors',
      km: '/tutors',
      es: '/tutores',
      fr: '/tuteurs',
    },
    '/about': {
      en: '/about',
      km: '/about',
      es: '/acerca',
      fr: '/a-propos',
    },
    '/subjects': {
      en: '/subjects',
      km: '/subjects',
      es: '/materias',
      fr: '/matieres',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
