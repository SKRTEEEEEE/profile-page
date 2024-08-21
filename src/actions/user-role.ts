"use server"


import { UserRoleService } from "@/core/application/services/user-role";
import { UpdateRole } from "@/core/application/usecases/role";
import { CreateUser, ListUserById, ListUsers, UpdateUser } from "@/core/application/usecases/user";
import { RoleType } from "@/core/domain/entities/Role";
import { MongooseRoleRepository } from "@/core/infrastructure/repositories/mongoose-role-repository";
import { MongooseUserRepository } from "@/core/infrastructure/repositories/mongoose-user-repository";
import { validateStringField } from "@/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// const userRepository = new InMemoryUserRepository()
// const roleRepository = new InMemoryRoleRepository()
const userRepository = new MongooseUserRepository()
const roleRepository = new MongooseRoleRepository()


export async function createUser(formData:FormData) {
    const formName = formData.get("name")
    const name = validateStringField(formName, "name")
    const create = new CreateUser(userRepository)
    const newUser = await create.execute({  // Usa el nuevo nombre aquí
        id: Date.now().toString() + name,
        name,
        roleId: null,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
    });
    revalidatePath("/")
    return newUser;
    
}

export async function listUsers(){
    const users = new ListUsers(userRepository);
    const listUsers = await users.execute()
    return listUsers
}
export async function listUserById(id:string){
    const list = new ListUserById(userRepository)
    return await list.execute(id)
}
export async function updateUser(id:string ,formData:FormData){
    const nameEntry = formData.get("name");
    const name = validateStringField(nameEntry, "name")
    const update = new UpdateUser(userRepository)
    await update.execute(
        id,
        name)
    revalidatePath("/")
    redirect("/")
}
//⚠️hay que modificar para eliminar el role si existe
export async function deleteUser(formData:FormData){
    const idEntry = formData.get("id")
    const id = validateStringField(idEntry, "id")
    const s = new UserRoleService(userRepository, roleRepository)
    await s.deleteUser(id)
    revalidatePath("/")
}
export async function assignRole(id:string,formData:FormData){
    const roleEntry = formData.get("rolePermission")
    // Primero, verifica que roleEntry no sea null y sea un string
    if (typeof roleEntry !== 'string') {
        throw new Error("Role permission must be a string");
    }
    if(roleEntry==="null"){
        console.log("Assign Role to null")
    }else{
        // Luego, verifica que el string sea un valor válido de RoleType
        if (!Object.values(RoleType).includes(roleEntry as RoleType)) {
             throw new Error("Invalid role permission");
        }

    // En este punto, sabemos que roleEntry es un valor válido de RoleType
    const rolePermission = roleEntry as RoleType;
    const userRole = new UserRoleService(userRepository,roleRepository)
    await userRole.assignRoleToUser(id,rolePermission)
    }
}

//hay que modificar el update para que cuando haga delete se borre tmb de user, para eso modificaremos/eliminaremos deleteRole, y lo pasaremos a service
export async function updateRole(id:string, formData:FormData){
    const roleEntry = formData.get("rolePermission")
    const listUserById = new ListUserById(userRepository)
    const user = await listUserById.execute(id)
    if (typeof roleEntry !== 'string') {
        throw new Error("Role permission must be a string");
    }
    if(!user?.roleId)throw new Error("No se ha encontrado roleId en el usuario")
    if(roleEntry==="null"){
        const service = new UserRoleService( userRepository, roleRepository)
        service.deleteRole(user.roleId,id)
    }else{
    if (!Object.values(RoleType).includes(roleEntry as RoleType)) {
            throw new Error("Invalid role permission");
    }
    const rolePermission = roleEntry as RoleType;

    const edit = new UpdateRole(roleRepository)
    edit.execute(user.roleId, rolePermission)
    }
}