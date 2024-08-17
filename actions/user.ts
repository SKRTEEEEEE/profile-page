"use server"

import { utapi } from "@/app/api/uploadthing/core";
import { UserModel } from "@/models/user-schema";
import { UserData } from "@/types/ui";
import { connectToDB } from "@/utils/db-connect"

// NO HAY REVALIDATE NI REDIRECT

export async function publicarUser(data: UserData): Promise<{ success: boolean; message: string }>{
    await connectToDB();
    const nuevoUser = new UserModel(data)
    try {
        const userGuardado = await nuevoUser.save()
        // revalidatePath("/dashboard/config");
        return { success: true, message: `Usuario guardado correctamente en la BDD. Proyecto: ${userGuardado.address}` };
    } catch (error) {
        console.error(error);
        return { success: false, message: `Error al guardar el usuario. Intente-lo de nuevo` };
    }
}

export async function updateUser(data:UserData): Promise<{ success: boolean; message: string }>{
    try {
    await connectToDB();
    const userActualizado = await UserModel.findOneAndUpdate({address: data.address}, data)
    if(!userActualizado){
        console.log(`Error al actualizar el usuario con el address ${data.address}`)
        return {success:false, message: `Error al actualizar el usuario con el address ${data.address} en la bdd`}
    } else {
        return {success:true, message: `Usuario con el address ${data.address} actualizado`}
    }
    } catch (error) {
        console.error(`Error al actualizar el usuario con el address ${data.address}`)
        return {success:false, message: `Error ${error}`}
    }
}

// User image

export async function uploadFile(formData: FormData) {
    console.log("formData: ",formData)
    const fileEntries = formData.getAll("img");
    if (fileEntries.length === 0) {
      throw new Error("No se encontró ningún archivo de imagen");
    }
  
    const file = fileEntries[0];
    if (!(file instanceof File)) {
      throw new Error("El elemento no es un archivo válido");
    }
  
    const results = await utapi.uploadFiles([file]);
    
    const firstResult = results[0];
    if(!firstResult.data)throw new Error("No result: "+firstResult)
    return firstResult.data.url
  }