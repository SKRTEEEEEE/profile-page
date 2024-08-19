"use server"

import { CreateUser } from "@/core/application/usecases/CreateUser";
import { ListUsers } from "@/core/application/usecases/ListUsers";
import { InMemoryUserRepository } from "@/core/infrastructure/repositories/InMemoryUserRepository";
import { revalidatePath } from "next/cache";

const userRepository = new InMemoryUserRepository()

export async function createUser(formData:FormData) {
    const name = formData.get("name")
    if (typeof name !== 'string' || !name) {
        throw new Error("Error with name");
    }    
    console.log("name: ",name)
    const createUser = new CreateUser(userRepository)
    const newUser = await createUser.execute({  // Usa el nuevo nombre aquí
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