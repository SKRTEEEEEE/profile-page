import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export type AllPathnamesType = keyof typeof routing.pathnames;

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de', "es"],
 
  // Used when no locale matches
  defaultLocale: 'en',

  // List of rutes translation
  pathnames: {
    "/":"/",
    "/ceo": "/ceo",
    "/ceo/proyectos": {
      en: "/ceo/projects",
      de: "/ceo/projekte",
      es: "/ceo/proyectos"
    },
    "/ceo/proyectos/[id]": {
      en: "/ceo/projects/[id]",
      de: "/ceo/projekte/[id]",
      es: "/ceo/proyectos/[id]"
    },
    "/ceo/portafolio": {
      en: "/ceo/portfolio",
      de: "/ceo/portfolio",
      es: "/ceo/portafolio"
    },
    "/ceo/info": "/ceo/info",
    "/ceo/estudios": {
      en: "/ceo/studies",
      de: "/ceo/studien",
      es: "/ceo/estudios",
    },
    "/ceo/docs/[slug]":"/ceo/docs/[slug]",
    "/ceo/code": "/ceo/code",
    "/admin":"/admin",
    "/academia":{
      en: "/academy",
      de: "/akademie",
      es: "/academia"
    },
    "/academia/ejercicios":"academia/ejercicios"
  }
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);