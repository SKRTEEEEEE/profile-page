import { ImgRepository } from "../repositories/img-repository";

abstract class UseImage {
    constructor(protected imgRepository:ImgRepository){}
}

export class DeleteImage extends UseImage {
    async execute(img:string): Promise<boolean> {
        const fileName = img.split('/').pop();
        if(fileName===undefined)throw new Error("Error at obtain url path")
        return this.imgRepository.deleteImage(fileName)  
    }
}
export class UploadImage extends UseImage {
    async execute(file:File): Promise<string> {
        return this.imgRepository.uploadImage(file)
    }
}