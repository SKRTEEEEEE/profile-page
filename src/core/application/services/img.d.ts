type ImgRepository = {
    deleteImage(img:string): Promise<boolean>;
    uploadImage(file:File): Promise<string>;
}