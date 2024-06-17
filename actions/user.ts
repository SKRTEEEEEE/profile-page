"use server"

import { UserModel } from "@/models/user-schema";
import { IUserBdd } from "@/types";
import { connectToDB } from "@/utils/db-connect"
import { revalidatePath } from "next/cache";



export async function publicarUser(data: IUserBdd): Promise<{ success: boolean; message: string }>{
    await connectToDB();
    const nuevoUser = new UserModel(data)
    try {
        const userGuardado = await nuevoUser.save()
        revalidatePath("/dashboard/config");
        return { success: true, message: `Usuario guardado correctamente en la BDD. Proyecto: ${userGuardado.address}` };
    } catch (error) {
        console.error(error);
        return { success: false, message: `Error al guardar el usuario. Intente-lo de nuevo` };
    }
}