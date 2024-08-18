"use server"

import { CreateUser } from "@/core/application/usecases/CreateUser";
import { User } from "@/core/domain/entities/User";
import { LocalStorageUserRepository } from "@/core/infrastructure/repositories/LocalStorageUserRepository";

export async function createUser(user: User) {
    const userRepository = new LocalStorageUserRepository();
    const createUser = new CreateUser(userRepository)
    return await createUser.execute(user)
}