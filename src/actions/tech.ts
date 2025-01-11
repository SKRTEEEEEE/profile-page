"use server"

import { TechForm } from "@/core/domain/entities/tech"
import { createTechC } from "@/core/interface-adapters/controllers/tech/create.controller"
import { deleteTechC } from "@/core/interface-adapters/controllers/tech/delete.controller"
import { updateTechC } from "@/core/interface-adapters/controllers/tech/update.controller"


export async function createTech(params:TechForm) {
    return await createTechC(params)
}
export async function updateTech(updateData: TechForm){
    return await updateTechC(updateData)
}
export async function deleteTech(name: string){
    return await deleteTechC(name)
}