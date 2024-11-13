import { uploadthingImgRepository } from "@/core/infrastructure/services/uploadthing-img";
import { UTApi } from "uploadthing/server";

abstract class UseImage {
    constructor(protected imgRepository:ImgRepository){}
}

class DeleteImage extends UseImage {
    async execute(img:string): Promise<boolean> {
        const fileName = img.split('/').pop();
        if(fileName===undefined)throw new Error("Error at obtain url path")
        return this.imgRepository.deleteImage(fileName)  
    }
}
export const deleteImageUC = async(img:string) => {
    const d = new DeleteImage(uploadthingImgRepository)
    return await d.execute(img)
}
class UploadImage extends UseImage {
    async execute(file:File): Promise<string> {
        return this.imgRepository.uploadImage(file)
    }
}
export const uploadImageUC = async(file:File) => {
    const u = new UploadImage(uploadthingImgRepository)
    return await u.execute(file)
}
// Caso de uso para recuperar `utapi`
class UseUtapiUC extends UseImage {

    async execute(): Promise<UTApi> {
        return this.imgRepository.useUtapi();
    }
}

// Función para usar el caso de uso y devolver `utapi`
export const useUtapiUC = async (): Promise<UTApi> => {
    const useUtapi = new UseUtapiUC(uploadthingImgRepository);
    return await useUtapi.execute();
};