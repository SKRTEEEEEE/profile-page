import { UploadThingAdapter } from "../connectors/uploadthing-st";
import { InputParseError, StorageOperationError } from "@/core/domain/errors/main";

class UploadThingImgRepository extends UploadThingAdapter implements ImgRepository{
    async uploadImage(file: File): Promise<string> {
    
    if (!(file instanceof File)) throw new InputParseError("El elemento no es un archivo válido");
  
    const results = await this.utapi.uploadFiles([file]);
    const firstResult = results[0];
    if(!firstResult.data)throw new StorageOperationError("No result: "+firstResult)
    return firstResult.data.url
    }
    async deleteImage(img: string): Promise<boolean> {
        const { success, deletedCount } = await this.utapi.deleteFiles(img);
        console.log(`Eliminada: ${success} \n ${deletedCount} Imagen ${img}`);
        return success
    }
    async useUtapi() {
        return this.utapi
    }
}
export const uploadthingImgRepository = new UploadThingImgRepository()