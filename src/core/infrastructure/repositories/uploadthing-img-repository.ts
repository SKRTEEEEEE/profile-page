import { ImgRepository } from "@/core/domain/repositories/img-repository";
import { UploadThingAdapter } from "../adapters/uploadthing-img-connection";

class UploadThingImgRepository extends UploadThingAdapter implements ImgRepository{
    async uploadImage(file: File): Promise<string> {
    
    if (!(file instanceof File)) {
      throw new Error("El elemento no es un archivo válido");
    }
  
    const results = await this.utapi.uploadFiles([file]);
    const firstResult = results[0];
    if(!firstResult.data)throw new Error("No result: "+firstResult)
    return firstResult.data.url
    }
    async deleteImage(img: string): Promise<boolean> {
        const { success, deletedCount } = await this.utapi.deleteFiles(img);
        console.log(`Eliminada: ${success} \n ${deletedCount} Imagen ${img}`);
        return success
    }
}
export const uploadthingImgRepository = new UploadThingImgRepository()