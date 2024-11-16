"use server"

// -> ❕🧠⚠️❗⬇️ SOLO PARA ACCIONES QUE SON LLAMADAS DESDE EL CLIENTE! - sino usar UC/C ⬇️❗⚠️🧠❕
//NOT CHECKED!

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const rv = (path:string) => {
    revalidatePath(path)
}
export const rd = (path:string) => {
    redirect(path)
}
export const rvrd = (path:string)=> {
    revalidatePath(path)
    redirect(path)
}