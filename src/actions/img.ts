"use server"

import { deleteImageUC, uploadImageUC } from "@/core/application/usecases/services/img";
import { InputParseError } from "@/core/domain/errors/main";

export async function uploadImg(formData: FormData) {
    const img = formData.get('img') as File
    if (!img) throw new InputParseError("No se encontró el archivo en el FormData");
    return await uploadImageUC(img)
}
export async function deleteImg(img:string) {
    return await deleteImageUC(img)
}
export async function updateImg(formData: FormData, url:string){
    const img = formData.get('img') as File
    if (!img) throw new InputParseError("No se encontró el archivo en el FormData")
    const dR = await deleteImageUC(url)
    if(!dR)throw new Error("Error at delete img")
    return await uploadImageUC(img)

}