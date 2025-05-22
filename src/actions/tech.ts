"use server"

import { TechForm } from "@/core/domain/entities/tech"
import { createTechCMongoose } from "@/core/presentation/controllers/tech/create.controller"
import { deleteTechCMongoose } from "@/core/presentation/controllers/tech/delete.controller"
import { updateTechCMongoose } from "@/core/presentation/controllers/tech/update.controller"


export async function createTech(params:TechForm) {
    return await createTechCMongoose(params)
}
export async function updateTech(updateData: TechForm){
    return await updateTechCMongoose(updateData)
}
export async function deleteTech(name: string){
    return await deleteTechCMongoose(name)
}