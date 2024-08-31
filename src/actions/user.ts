"use server"


import { listUsersByIdUC, listUsersUC } from "@/core/application/usecases/atomic/user";
import { deleteUserAccountUC, makeAdminUC, userInCookiesUC } from "@/core/application/usecases/compound/user";
import { RoleType } from "@/core/domain/entities/Role";
import { updateUserFormC, verifyEmailC } from "@/core/interface-adapters/controllers/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LoginPayload } from "thirdweb/auth";



// ⬇️🧠 Traspasado a login() en auth
// export async function createUser(formData: FormData) {
//     const{ address, isAdmin, solicitudAdmin} = validateUserForm(formData)
//     const create = new CreateUser(userRepository)
//     const newUser = await create.execute(  // Usa el nuevo nombre aquí
//         {
//             address,
//             isAdmin,
//             solicitudAdmin,
//             roleId: null
//         }
//     );
//     revalidatePath("/")
//     return newUser;

// }

export async function listUsers() {
    return await listUsersUC()
}
export async function listUserById(id: string) {
    return await listUsersByIdUC(id)
}
export async function updateUser(id: string, payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
}, formData: {solicitud:RoleType|null, email:string|null,nick?:string,img:string|null}) {

    await updateUserFormC(payload,
      {  id,
         solicitud:formData.solicitud as RoleType,
         nick: formData.nick,
         img: formData.img,
         email: formData.email,

        }
        )
    revalidatePath("/")
    redirect("/")
}
export async function deleteUser(payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
},id:string, address: string) {
    await deleteUserAccountUC(payload, id, address)
    revalidatePath("/dashboard/config")
}

export async function makeAdmin(payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
},id:string){
    await makeAdminUC(payload,id)
    revalidatePath("/admin/users")
}
export async function verifyEmail(id:string, verifyToken:string){
    return await verifyEmailC(id, verifyToken)
}
export async function userInCookies(){
    return await userInCookiesUC()
}
//⚠️⬇️💡 Falta de aquí para abajo ⬇️⚠️
//Este seria el CREATE

// De momento se comentan, ya que solo se utilizan en el test con las viejas func

// export async function assignRole(id: string, formData: FormData) {
//     const roleEntry = formData.get("rolePermission")
//     // Primero, verifica que roleEntry no sea null y sea un string
//     if (typeof roleEntry !== 'string') {
//         throw new Error("Role permission must be a string");
//     }
//     if (roleEntry === "null") {
//         console.log("Assign Role to null")
//     } else {
//         // Luego, verifica que el string sea un valor válido de RoleType
//         if (!Object.values(RoleType).includes(roleEntry as RoleType)) {
//             throw new Error("Invalid role permission");
//         }

//         // En este punto, sabemos que roleEntry es un valor válido de RoleType
//         const rolePermission = roleEntry as RoleType;
//         const userRole = new UserRoleService(userRepository, roleRepository)
//         await userRole.assignRoleToUser(id, rolePermission)
//     }
// }


// // Hay que mirar que funcione
// export async function updateRole(id: string, formData: FormData) {
//     const roleEntry = formData.get("rolePermission")
//     const listUserById = new ListUserById(userRepository)
//     const user = await listUserById.execute(id)
//     if (typeof roleEntry !== 'string') {
//         throw new Error("Role permission must be a string");
//     }
//     if (!user?.roleId) throw new Error("No se ha encontrado roleId en el usuario")
//     if (roleEntry === "null") {
//         const service = new UserRoleService(userRepository, roleRepository)
//         service.deleteRole(user.roleId, id)
//     } else {
//         if (!Object.values(RoleType).includes(roleEntry as RoleType)) {
//             throw new Error("Invalid role permission");
//         }
//         const rolePermission = roleEntry as RoleType;

//         const edit = new UpdateRole(roleRepository)
//         edit.execute(user.roleId, rolePermission)
//     }
// }