"use server"

import { deleteTechC } from "@/core/interface-adapters/controllers/tech/delete.controller"

export async function deleteTech(name: string){
    return await deleteTechC(name)
}