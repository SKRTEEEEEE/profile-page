"use server"

import { UserModel } from "@/models/user-schema";
import { IUserBdd } from "@/types";
import { connectToDB } from "@/utils/db-connect"

// NO HAY REVALIDATE NI REDIRECT

export async function publicarUser(data: IUserBdd): Promise<{ success: boolean; message: string }>{
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

export async function updateUser(data:IUserBdd): Promise<{ success: boolean; message: string }>{
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