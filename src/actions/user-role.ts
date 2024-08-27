"use server"


import { UpdateUser } from "@/core/application/services/user-auth";
import { UserRoleService } from "@/core/application/services/user-role";
import { Logout, VerifyPayload } from "@/core/application/usecases/auth";
import { UpdateRole } from "@/core/application/usecases/role";
import { ListUserById, ListUsers } from "@/core/application/usecases/user";
import { RoleType } from "@/core/domain/entities/Role";
import { roleRepository } from "@/core/infrastructure/repositories/mongoose-role-repository";
import { userRepository } from "@/core/infrastructure/repositories/mongoose-user-repository";
import { authRepository } from "@/core/infrastructure/repositories/thirdweb-auth-repository";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LoginPayload } from "thirdweb/auth";




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
    const users = new ListUsers(userRepository);
    const listUsers = await users.execute()
    return listUsers
}
export async function listUserById(id: string) {
    const list = new ListUserById(userRepository)
    return await list.execute(id)
}
export async function updateUser(id: string, payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
}, formData: {solicitudAdmin:boolean,nick:string}) {

    const update = new UpdateUser(userRepository, authRepository)
    await update.execute(payload,
      {  id,
         solicitudAdmin:formData.solicitudAdmin,
         nick: formData.nick
        }
        )
    revalidatePath("/")
    redirect("/")
}
export async function deleteUser(payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
},id:string, address: string) {
    const v = new VerifyPayload(authRepository)
    const res = await v.execute(payload)
    if(!res.valid)throw new Error("Error at login payload")
    // Comprobar que el res.payload.address, el id de dicho address es el mismo que el que se pretende eliminar.
    if(res.payload.address !== address )throw new Error("User only can delete her address")
    const s = new UserRoleService(userRepository, roleRepository)
    await s.deleteUser(id)
    const a = new Logout(authRepository)
    await a.execute()
    revalidatePath("/dashboard/config")
}


//Falta de aquí para abajo
//Este seria el CREATE
export async function assignRole(id: string, formData: FormData) {
    const roleEntry = formData.get("rolePermission")
    // Primero, verifica que roleEntry no sea null y sea un string
    if (typeof roleEntry !== 'string') {
        throw new Error("Role permission must be a string");
    }
    if (roleEntry === "null") {
        console.log("Assign Role to null")
    } else {
        // Luego, verifica que el string sea un valor válido de RoleType
        if (!Object.values(RoleType).includes(roleEntry as RoleType)) {
            throw new Error("Invalid role permission");
        }

        // En este punto, sabemos que roleEntry es un valor válido de RoleType
        const rolePermission = roleEntry as RoleType;
        const userRole = new UserRoleService(userRepository, roleRepository)
        await userRole.assignRoleToUser(id, rolePermission)
    }
}

export async function updateRole(id: string, formData: FormData) {
    const roleEntry = formData.get("rolePermission")
    const listUserById = new ListUserById(userRepository)
    const user = await listUserById.execute(id)
    if (typeof roleEntry !== 'string') {
        throw new Error("Role permission must be a string");
    }
    if (!user?.roleId) throw new Error("No se ha encontrado roleId en el usuario")
    if (roleEntry === "null") {
        const service = new UserRoleService(userRepository, roleRepository)
        service.deleteRole(user.roleId, id)
    } else {
        if (!Object.values(RoleType).includes(roleEntry as RoleType)) {
            throw new Error("Invalid role permission");
        }
        const rolePermission = roleEntry as RoleType;

        const edit = new UpdateRole(roleRepository)
        edit.execute(user.roleId, rolePermission)
    }
}