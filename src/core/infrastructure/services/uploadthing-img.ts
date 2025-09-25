import { StorageActionError } from "../../../dynamic.types";
import { UploadThingAdapter } from "../connectors/uploadthing-st";
import { InputParseError } from "@/core/domain/flows/domain.error";

class UploadThingImgRepository extends UploadThingAdapter implements ImgRepository {
    async uploadImage(file: File): Promise<string> {
        if (!(file instanceof File)) throw new InputParseError(UploadThingImgRepository, "El elemento no es un archivo válido");

        const results = await this.utapi.uploadFiles([file]);
        const firstResult = results[0];
        if (!firstResult.data) throw new StorageActionError("upload", UploadThingImgRepository, { type: "image", optionalMessage: "No result: " + firstResult });
        return firstResult.data.url;
    }
    async deleteImage(img: string): Promise<boolean> {
        const { success, deletedCount } = await this.utapi.deleteFiles(img);
        console.log(`Eliminada: ${success} \n ${deletedCount} Imagen ${img}`);
        return success;
    }
    async useUtapi() {
        return this.utapi;
    }
}
export const uploadthingImgRepository = new UploadThingImgRepository();