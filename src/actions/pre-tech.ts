"use server"

import {  readByNamePreTechUC, readByQueryPreTechUC,  updatePreTechUC } from "@/core/application/usecases/entities/pre-tech"

export async function updatePreTech(){
    return await updatePreTechUC()  
}
export async function readByQueryPreTech(query: string){
    return await readByQueryPreTechUC(query)
}
export async function readByNamePreTech(name:string){
    return await readByNamePreTechUC(name)
}