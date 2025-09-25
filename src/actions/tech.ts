"use server"

import { apiCreateTechUC, apiUpdateTechUC } from "@/core/application/usecases/entities/tech"
import { TechForm } from "@/core/domain/entities/tech"
import { deleteTechCApi } from "@/core/presentation/controllers/tech/delete.controller"


export async function createTech(params:TechForm) {
    return await apiCreateTechUC(params)
}
export async function updateTech(updateData: TechForm){
    return await apiUpdateTechUC(updateData)
}
export async function deleteTech(name: string){
    return await deleteTechCApi(name)
}