import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { cookies } from 'next/headers';
import { deleteCookie, manageRoot } from './actions/root';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Crear una función que combine el middleware de internacionalización con tu lógica
const middleware = async (request: NextRequest) => {
  const i18nMiddleware = createMiddleware(routing)(request);
  console.log("request.nextUrl.pathname: ", request.nextUrl.pathname);
  // Verificar si la ruta es "/"
  if (request.nextUrl.pathname === '/') {
    const cookieStore = await cookies();
    const visits = parseInt((cookieStore.get("visits")?.value) || "0", 10);
    
    console.log("visits: ", visits);
    const response = await manageRoot(visits);
    if (response){
      return response
    }
    else{
      await deleteCookie("visits")
      return i18nMiddleware
    }
  
  }

  // Ejecutar el middleware de internacionalización
  return i18nMiddleware
};

export default middleware;

export const config = {
  matcher: ['/', '/(de|en|es|ca)/:path*']
};
