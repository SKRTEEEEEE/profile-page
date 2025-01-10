"use server"

import { updatePreTechUC } from "@/core/application/usecases/entities/pre-tech"

export async function updatePreTech(){
    return await updatePreTechUC()  
}