"use server"

// -> ❕🧠⚠️❗⬇️ SOLO PARA ACCIONES QUE SON LLAMADAS DESDE EL CLIENTE! - sino usar UC/C ⬇️❗⚠️🧠❕

import { apiDeleteUserUC, apiGiveRoleToUserUC, apiUpdateUserByIdSolicitudUC, apiUpdateUserByIdUC, mongooseUpdateUserByIdUC } from "@/core/application/usecases/entities/user";
import { RoleType } from "@/core/domain/entities/role.type";
import { DatabaseActionError, InputParseError } from "@/core/domain/flows/domain.error";
import { deleteUserAccountUCMongoose, giveRoleUCMongoose, resendVerificationEmailCMongoose, updateUserFormCMongoose } from "@/core/presentation/controllers/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LoginPayload } from "thirdweb/auth";



export async function updateUser(id: string, payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
}, formData: {email:string|null,nick?:string,img:string|null}) {

    // await updateUserFormCMongoose(payload,
    //   {  id,

    //      nick: formData.nick,
    //      img: formData.img,
    //      email: formData.email,

    //     }
    //     )
    const res = await apiUpdateUserByIdUC(
      {  payload,
      formData:{  id,

         nick: formData.nick ? formData.nick : null,
         img: formData.img,
         email: formData.email,

        }}
    )
    console.log("res at apiUpdateUserByIdUC: ", res)
        //Aquí hace el revalidate
    revalidatePath("/")
    redirect("/")
}
export async function updateUserSolicitud({id,solicitud}:{id:string, solicitud: RoleType.ADMIN|null}){
    // return await mongooseUpdateUserByIdUC(id, {solicitud})
    if(!solicitud) throw new InputParseError("Solicitud no puede ser nulo")
    return await apiUpdateUserByIdSolicitudUC(id, solicitud)
}
export async function resendVerificationEmail(userI:{id:string, email: string}){
    return await resendVerificationEmailCMongoose(userI)
}
export async function deleteUser(payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
},id:string, address: string) {
    // await deleteUserAccountUCMongoose(payload, id, address)
    const res = await apiDeleteUserUC({payload, id, address})
    if(!res.success)throw new DatabaseActionError("deleteUser", {optionalMessage: res.message})
    revalidatePath("/dashboard/config")
}

export async function giveRole(payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
},id:string, solicitud: RoleType.ADMIN){
    // await giveRoleUCMongoose(payload,id, solicitud)
    const res = await apiGiveRoleToUserUC({payload, id, solicitud})
    if(!res.success)throw new DatabaseActionError("giveRole", {optionalMessage: res.message})
    revalidatePath("/admin/users")
}
