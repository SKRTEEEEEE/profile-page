import { AuthRepository } from "@/core/application/interfaces/services/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";
import { authRepository } from "../services/thirdweb-auth";

export abstract class UploadThingAdapter {
    protected f = createUploadthing();
    protected static utapiInstance: UTApi | null = null;
  
    protected get utapi(): UTApi {
      if (!UploadThingAdapter.utapiInstance) {
        UploadThingAdapter.utapiInstance = new UTApi();
      }
      return UploadThingAdapter.utapiInstance;
    }
  }
  


class ConcreteUploadThingAdapter extends UploadThingAdapter {
    constructor(private authRepository: AuthRepository){super()}
  createFileRouter(): FileRouter {
    return {
      imageUploader: this.f({ image: { maxFileSize: "4MB" } })
        .middleware(async () => {
          // This code runs on your server before upload
        const user = await this.authRepository.getCookies();
    
        // If you throw, the user will not be able to upload
        if (user === false) throw new UploadThingError("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.sub };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", metadata.userId);
       
            console.log("file url: ", file.url);
          // Aqui se podria poner un 
          //   const timestamp = Date.now();
          //   const extension = file.key.split('.').pop();
          //   const customFileName = `lenguaje.${extension}`;
       
            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId };
        }),
    } satisfies FileRouter;
  }
}
const concreteUploadthingAdapter = new ConcreteUploadThingAdapter(authRepository)
export const ourFileRouter = concreteUploadthingAdapter.createFileRouter()