"use server"

import { CreateUser } from "@/core/application/usecases/CreateUser";
import { ListUsers } from "@/core/application/usecases/ListUsers";
import { UpdateUser } from "@/core/application/usecases/UpdateUser";
import { RoleType } from "@/core/domain/entities/Role";
import { InMemoryUserRepository } from "@/core/infrastructure/repositories/InMemoryUserRepository";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const userRepository = new InMemoryUserRepository()

export async function createUser(formData:FormData) {
    const name = formData.get("name")
    if (typeof name !== 'string' || !name) {
        throw new Error("Error with name");
    }    
    console.log("name: ",name)
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
    console.log("listUsers: ", listUsers);
    return listUsers
}

export async function updateUser(id:string ,formData:FormData){
    const nameEntry = formData.get("name");
    if (typeof nameEntry !== 'string' || !nameEntry) throw new Error("Error with name");
    const name: string = nameEntry
    const update = new UpdateUser(userRepository)
    await update.execute(
        id,
        name)
    revalidatePath("/")
    redirect("/")
}