"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function revrd (path:string) {
    revalidatePath(path)
    redirect(path)
}

export async function serverRev (path:string) {
    revalidatePath(path)
}