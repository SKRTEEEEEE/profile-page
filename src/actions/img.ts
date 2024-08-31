"use server"

import { DeleteImage, UploadImage } from "@/core/application/usecases/services/img"
import { uploadthingImgRepository } from "@/core/infrastructure/services/uploadthing-img"

export async function uploadImg(formData: FormData) {
    const img = formData.get('img') as File
    if (!img) throw new Error("No se encontró el archivo en el FormData");
    const u = new UploadImage(uploadthingImgRepository)
    return await u.execute(img)
}
export async function deleteImg(img:string) {
    const d = new DeleteImage(uploadthingImgRepository)
    return await d.execute(img)
}
export async function updateImg(formData: FormData, url:string){
    const img = formData.get('img') as File
    if (!img) throw new Error("No se encontró el archivo en el FormData")
    const d = new DeleteImage(uploadthingImgRepository)
    const dR = await d.execute(url)
    if(!dR)throw new Error("Error at delete img")
    const u = new UploadImage(uploadthingImgRepository)
    return await u.execute(img)

}