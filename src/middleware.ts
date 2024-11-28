import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { manageRoot } from './actions/root';
import type { NextRequest } from 'next/server';

// Crear una función que combine el middleware de internacionalización con tu lógica
const middleware = async (request: NextRequest) => {
  const i18nMiddleware = createMiddleware(routing);
  if (request.nextUrl.pathname === '/') {
    
    
    const response = await manageRoot(request);
    if (response){
      return response
    }
    // await deleteCookie("visits")

    return i18nMiddleware(request)
  }

  // Ejecutar el middleware de internacionalización
  return i18nMiddleware(request)
};

export default middleware;

export const config = {
  matcher: ['/', '/(de|en|es|ca)/:path*']
};
