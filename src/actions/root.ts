"use server"

import { getLocale } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function setCookie(name: string, value:string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value,{
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'strict',
  });
}

export async function deleteCookie(name:string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}
export async function manageRoot(visits: number){
    if (visits <= 3) {
        console.log("visits b set: ", visits)
        // Increment the visits count and redirect
        await setCookie("visits", (visits + 1).toString());
        const locale = await getLocale();
        if(visits === 3){
            return NextResponse.redirect(new URL(`/${locale}/ceo?redirect=manageRoot`, 'http://' + (await headers()).get('host')));
        }else{
        return NextResponse.redirect(new URL(`/${locale}/ceo`, 'http://' + (await headers()).get('host')));}
      } 
//       else {
//         const cookieStore = await cookies();
//         console.log("visits a set: ", cookieStore.get("visits")?.value)
//         // Delete the visits cookie and render the page
//         if (cookieStore.get("visits")) {
//           await deleteCookie("visits");
//         }
//         return NextResponse.next();
// }
}