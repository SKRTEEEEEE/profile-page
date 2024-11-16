"use server"

// -> ❕🧠⚠️❗⬇️ SOLO PARA ACCIONES QUE SON LLAMADAS DESDE EL CLIENTE! - sino usar UC/C ⬇️❗⚠️🧠❕

import { updateUserByIdUC } from "@/core/application/usecases/entities/user";
import { RoleType } from "@/core/domain/entities/Role";
import { deleteUserAccountUC, giveRoleUC, resendVerificationEmailC, updateUserFormC } from "@/core/interface-adapters/controllers/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LoginPayload } from "thirdweb/auth";



export async function updateUser(id: string, payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
}, formData: {email:string|null,nick?:string,img:string|null}) {

    await updateUserFormC(payload,
      {  id,

         nick: formData.nick,
         img: formData.img,
         email: formData.email,

        }
        )
        //Aquí hace el revalidate
    revalidatePath("/")
    redirect("/")
}
export async function updateUserSolicitud({id,solicitud}:{id:string, solicitud: RoleType.PROF_TEST| RoleType.ADMIN|null}){
    return await updateUserByIdUC(id, {solicitud})
}
export async function resendVerificationEmail(userI:{id:string, email: string}){
    return await resendVerificationEmailC(userI)
}
export async function deleteUser(payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
},id:string, address: string) {
    await deleteUserAccountUC(payload, id, address)
    revalidatePath("/dashboard/config")
}

export async function giveRole(payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
},id:string, solicitud: RoleType.ADMIN | RoleType.PROF_TEST){
    await giveRoleUC(payload,id, solicitud)
    revalidatePath("/admin/users")
}
