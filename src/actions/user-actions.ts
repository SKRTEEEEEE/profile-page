"use server"


import { CreateUser, DeleteUser, ListUsers, UpdateUser } from "@/core/application/usecases/user";
import { InMemoryUserRepository } from "@/core/infrastructure/repositories/InMemoryUserRepository";
import { validateStringField } from "@/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const userRepository = new InMemoryUserRepository()

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
export async function deleteUser(formData:FormData){
    const idEntry = formData.get("id")
    const id = validateStringField(idEntry, "id")
    const d = new DeleteUser(userRepository)
    await d.execute(id)
    revalidatePath("/")
}