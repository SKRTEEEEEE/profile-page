import { ImgRepository } from "@/core/domain/repositories/img-repository";

abstract class UseImage {
    constructor(protected imgRepository:ImgRepository){}
}

export class DeleteImage extends UseImage {
    async execute(img:string): Promise<boolean> {
        return this.imgRepository.deleteImage(img)  
    }
}
export class UploadImage extends UseImage {
    async execute(file:File): Promise<string> {
        return this.imgRepository.uploadImage(file)
    }
}